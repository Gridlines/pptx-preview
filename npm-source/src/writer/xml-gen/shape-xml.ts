import { ShapeDefinition } from '../types/writer-types';
import { tag } from '../utils/xml-builder';
import { generateTxBodyXml } from './text-xml';
import { generateColorXml } from './color-xml';

export function generateShapeXml(shape: ShapeDefinition, shapeId: number): string {
  const nvSpPr = tag('p:nvSpPr', undefined,
    tag('p:cNvPr', { id: String(shapeId), name: `Shape ${shapeId}` }) +
    tag('p:cNvSpPr', { txBox: shape.type === 'textbox' ? '1' : undefined }) +
    tag('p:nvPr')
  );

  let xfrmChildren = '';
  xfrmChildren += tag('a:off', { x: String(shape.offset.x), y: String(shape.offset.y) });
  xfrmChildren += tag('a:ext', { cx: String(shape.extend.cx), cy: String(shape.extend.cy) });

  const xfrmAttrs: Record<string, string | undefined> = {};
  if (shape.rotate) xfrmAttrs.rot = String(Math.round(shape.rotate * 60000));

  const xfrm = tag('a:xfrm', xfrmAttrs, xfrmChildren);

  let prstGeom = 'rect';
  if (shape.type === 'ellipse') prstGeom = 'ellipse';
  const geom = tag('a:prstGeom', { prst: prstGeom }, tag('a:avLst'));

  let fillXml = '';
  if (shape.background && shape.background.type === 'solidFill' && (shape.background as any).color) {
    fillXml = tag('a:solidFill', undefined, generateColorXml(shape.background));
  }

  const spPr = tag('p:spPr', undefined, xfrm + geom + fillXml);

  let txBody = '';
  if (shape.paragraphs && shape.paragraphs.length > 0) {
    txBody = tag('p:txBody', undefined, generateTxBodyXml(shape.paragraphs));
  }

  return tag('p:sp', undefined, nvSpPr + spPr + txBody);
}
