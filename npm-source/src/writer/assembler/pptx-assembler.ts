import JSZip from 'jszip';
import { SlideDefinition, WriterOptions, MediaEntry, RelationshipEntry } from '../types/writer-types';
import { RelationshipTracker } from './relationship-tracker';
import { MediaManager } from './media-manager';
import { generateContentTypesXml, PartEntry } from '../xml-gen/content-types-xml';
import { generateRelsXml } from '../xml-gen/rels-xml';
import { generatePresentationXml } from '../xml-gen/presentation-xml';
import { generateSlideXml } from '../xml-gen/slide-xml';
import { generateThemeXml } from '../xml-gen/theme-xml';
import { generateSlideMasterXml } from '../xml-gen/slide-master-xml';
import { generateSlideLayoutXml } from '../xml-gen/slide-layout-xml';
import { REL_TYPE, CONTENT_TYPE } from '../templates/namespaces';

const DEFAULT_WIDTH = 960;
const DEFAULT_HEIGHT = 540;

export async function assemblePptx(
  slides: SlideDefinition[],
  mediaManager: MediaManager,
  options?: WriterOptions
): Promise<ArrayBuffer> {
  const zip = new JSZip();
  const inferredSize = inferSlideSize(slides);
  const slideWidth = options?.slideWidth || inferredSize?.width || DEFAULT_WIDTH;
  const slideHeight = options?.slideHeight || inferredSize?.height || DEFAULT_HEIGHT;
  const slideCount = Math.max(slides.length, 1);

  // 1. Root .rels
  const rootRels = new RelationshipTracker();
  rootRels.addRelationship(REL_TYPE.officeDocument, 'ppt/presentation.xml');
  zip.file('_rels/.rels', generateRelsXml(rootRels.getRelationships()));

  // 2. Presentation rels
  const presRels = new RelationshipTracker();
  presRels.addRelationship(REL_TYPE.slideMaster, 'slideMasters/slideMaster1.xml');
  for (let i = 0; i < slideCount; i++) {
    presRels.addRelationship(REL_TYPE.slide, `slides/slide${i + 1}.xml`);
  }
  const themeRId = presRels.addRelationship(REL_TYPE.theme, 'theme/theme1.xml');

  zip.file('ppt/presentation.xml', generatePresentationXml(slideCount, slideWidth, slideHeight));
  zip.file('ppt/_rels/presentation.xml.rels', generateRelsXml(presRels.getRelationships()));

  // 3. Theme
  zip.file('ppt/theme/theme1.xml', generateThemeXml());

  // 4. Slide Master
  const masterRels = new RelationshipTracker();
  masterRels.addRelationship(REL_TYPE.slideLayout, '../slideLayouts/slideLayout1.xml');
  masterRels.addRelationship(REL_TYPE.theme, '../theme/theme1.xml');

  zip.file('ppt/slideMasters/slideMaster1.xml', generateSlideMasterXml(['rId1']));
  zip.file('ppt/slideMasters/_rels/slideMaster1.xml.rels', generateRelsXml(masterRels.getRelationships()));

  // 5. Slide Layout
  const layoutRels = new RelationshipTracker();
  layoutRels.addRelationship(REL_TYPE.slideMaster, '../slideMasters/slideMaster1.xml');

  zip.file('ppt/slideLayouts/slideLayout1.xml', generateSlideLayoutXml());
  zip.file('ppt/slideLayouts/_rels/slideLayout1.xml.rels', generateRelsXml(layoutRels.getRelationships()));

  // 6. Slides
  for (let i = 0; i < slideCount; i++) {
    const slide = slides[i] || { shapes: [] };
    const slideRels = new RelationshipTracker();
    slideRels.addRelationship(REL_TYPE.slideLayout, '../slideLayouts/slideLayout1.xml');

    // Add image relationships for this slide
    for (const shape of slide.shapes) {
      if (shape.type === 'image' && shape.imageData) {
        const mediaPath = mediaManager.addImage(shape.imageData.base64, shape.imageData.mimeType);
        const rId = slideRels.addRelationship(REL_TYPE.image, `../${mediaPath}`);
        shape.imageRId = rId;
      }
    }

    // Add hyperlink relationships
    for (const shape of slide.shapes) {
      if (shape.paragraphs) {
        for (const para of shape.paragraphs) {
          for (const row of para.rows) {
            if (row.link && !row.link.startsWith('rId')) {
              const url = row.link;
              const rId = slideRels.addRelationship(REL_TYPE.hyperlink, url, 'External');
              row.link = rId;
            }
          }
        }
      }
    }

    zip.file(`ppt/slides/slide${i + 1}.xml`, generateSlideXml(slide));
    zip.file(`ppt/slides/_rels/slide${i + 1}.xml.rels`, generateRelsXml(slideRels.getRelationships()));
  }

  // 7. Media files
  for (const entry of mediaManager.getEntries()) {
    zip.file(entry.path, entry.data);
  }

  // 8. Content Types
  const parts: PartEntry[] = [
    { partName: '/ppt/presentation.xml', contentType: CONTENT_TYPE.presentation },
    { partName: '/ppt/theme/theme1.xml', contentType: CONTENT_TYPE.theme },
    { partName: '/ppt/slideMasters/slideMaster1.xml', contentType: CONTENT_TYPE.slideMaster },
    { partName: '/ppt/slideLayouts/slideLayout1.xml', contentType: CONTENT_TYPE.slideLayout },
  ];
  for (let i = 0; i < slideCount; i++) {
    parts.push({ partName: `/ppt/slides/slide${i + 1}.xml`, contentType: CONTENT_TYPE.slide });
  }
  zip.file('[Content_Types].xml', generateContentTypesXml(parts));

  return zip.generateAsync({ type: 'arraybuffer' });
}

function inferSlideSize(slides: SlideDefinition[]): { width: number; height: number } | undefined {
  let width = 0;
  let height = 0;

  for (const slide of slides) {
    const sourceSize = slide.sourceSize;
    if (!sourceSize) continue;
    if (!Number.isFinite(sourceSize.width) || !Number.isFinite(sourceSize.height)) continue;
    if (sourceSize.width <= 0 || sourceSize.height <= 0) continue;

    width = Math.max(width, sourceSize.width);
    height = Math.max(height, sourceSize.height);
  }

  if (width > 0 && height > 0) {
    return { width, height };
  }
  return undefined;
}
