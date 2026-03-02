import { ShapeDefinition } from '../types/writer-types';
import { tag } from '../utils/xml-builder';

export function generateImageShapeXml(shape: ShapeDefinition, shapeId: number): string {
  if (!shape.imageRId) return '';

  const nvPicPr = tag('p:nvPicPr', undefined,
    tag('p:cNvPr', { id: String(shapeId), name: `Image ${shapeId}` }) +
    tag('p:cNvPicPr', undefined, tag('a:picLocks', { noChangeAspect: '1' })) +
    tag('p:nvPr')
  );

  const blipFill = tag('p:blipFill', undefined,
    tag('a:blip', { 'r:embed': shape.imageRId }) +
    tag('a:stretch', undefined, tag('a:fillRect'))
  );

  const xfrm = tag('a:xfrm', undefined,
    tag('a:off', { x: String(shape.offset.x), y: String(shape.offset.y) }) +
    tag('a:ext', { cx: String(shape.extend.cx), cy: String(shape.extend.cy) })
  );

  const spPr = tag('p:spPr', undefined,
    xfrm +
    tag('a:prstGeom', { prst: 'rect' }, tag('a:avLst'))
  );

  return tag('p:pic', undefined, nvPicPr + blipFill + spPr);
}
