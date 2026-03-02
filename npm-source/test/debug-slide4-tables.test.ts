/**
 * Debug: inspect slide 4 tables to understand the writer issue.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import HtmlRender from '../src/html-render/HtmlRender';
import { createPptx, setJSDOM } from '../src/writer';
import { parseSlideHtml } from '../src/writer/parser/html-parser';
import JSZip from 'jszip';

describe('Debug slide 4 tables', () => {
  it('inspects slide 4 node types', async () => {
    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptxBuffer = readFileSync(pptxPath);
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(pptxBuffer) as any);

    console.log('Total slides:', pptx.slides.length);
    const slide4 = pptx.slides[3];
    console.log('Slide 4 node count:', slide4.nodes.length);
    slide4.nodes.forEach((n: any, i: number) => {
      console.log(`  node[${i}]:`, n.constructor.name,
        'offset:', JSON.stringify(n.offset),
        'extend:', JSON.stringify(n.extend));
    });
  });

  it('renders slide 4 and checks HTML structure', async () => {
    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptxBuffer = readFileSync(pptxPath);
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(pptxBuffer) as any);

    const container = document.createElement('div');
    const htmlRender = new HtmlRender(container, pptx, {
      viewPort: { width: 960, height: 0 },
      mode: 'scroll',
    });
    htmlRender.renderSlide(3);

    const wrapper = container.querySelector('.pptx-preview-slide-wrapper')!;
    const layers = Array.from(wrapper.children).filter((c: any) =>
      c.classList?.contains('slide-wrapper') ||
      c.classList?.contains('slide-layout-wrapper') ||
      c.classList?.contains('slide-master-wrapper')
    );

    for (const layer of layers) {
      const el = layer as HTMLElement;
      console.log(`\nLayer: ${el.className}`);
      const children = Array.from(el.children) as HTMLElement[];
      for (const child of children) {
        const hasTable = child.querySelector('table') ? ' [HAS TABLE]' : '';
        const hasImg = child.querySelector('img') ? ' [HAS IMG]' : '';
        console.log(`  child: <${child.tagName}> class="${child.className}" pos=${child.style.position} left=${child.style.left} top=${child.style.top} w=${child.style.width} h=${child.style.height}${hasTable}${hasImg}`);
      }
    }

    const tables = wrapper.querySelectorAll('table');
    console.log(`\nTotal <table> elements in slide 4: ${tables.length}`);
  });

  it('parses slide 4 HTML and checks shapes', async () => {
    const { JSDOM } = await import('jsdom');
    setJSDOM(JSDOM as any);

    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptxBuffer = readFileSync(pptxPath);
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(pptxBuffer) as any);

    const container = document.createElement('div');
    const htmlRender = new HtmlRender(container, pptx, {
      viewPort: { width: 960, height: 0 },
      mode: 'scroll',
    });
    htmlRender.renderSlide(3);

    const html = container.innerHTML;
    const slideDef = parseSlideHtml(html);

    console.log(`\nParsed shapes: ${slideDef.shapes.length}`);
    for (const shape of slideDef.shapes) {
      console.log(`  type=${shape.type} offset=(${shape.offset.x}, ${shape.offset.y}) extend=(${shape.extend.cx}, ${shape.extend.cy})`,
        shape.type === 'table' ? `rows=${shape.tableRows?.length} cols=${shape.tableGrid?.gridCol.length}` : '');
    }
  });

  it('generates slide 4 PPTX and checks XML', async () => {
    const { JSDOM } = await import('jsdom');
    setJSDOM(JSDOM as any);

    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptxBuffer = readFileSync(pptxPath);
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(pptxBuffer) as any);

    const container = document.createElement('div');
    const htmlRender = new HtmlRender(container, pptx, {
      viewPort: { width: 960, height: 0 },
      mode: 'scroll',
    });
    htmlRender.renderSlide(3);

    const buffer = await createPptx([{ html: container.innerHTML }]);
    const zip = await JSZip.loadAsync(buffer);
    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');

    // Check for table and gridSpan/rowSpan placement
    console.log('\nHas <a:tbl>:', slideXml.includes('<a:tbl>'));
    console.log('Has <a:tc>:', slideXml.includes('<a:tc>'));

    // Check if gridSpan is wrongly on tcPr
    if (slideXml.includes('gridSpan')) {
      const tcPrMatch = slideXml.match(/<a:tcPr[^>]*gridSpan/);
      const tcMatch = slideXml.match(/<a:tc[^>]*gridSpan/);
      console.log('gridSpan on <a:tcPr>:', !!tcPrMatch);
      console.log('gridSpan on <a:tc>:', !!tcMatch);
    }

    // Write for inspection
    const outDir = resolve(__dirname, '../writer-output');
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'coastal-slide4-only.pptx'), Buffer.from(buffer));
    console.log('Wrote slide 4 only PPTX');
  });
});
