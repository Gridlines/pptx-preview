import { ShapeDefinition } from '../types/writer-types';
import { tag } from '../utils/xml-builder';
import { generateTxBodyXml } from './text-xml';
import { generateColorXml } from './color-xml';
import { px2emu } from '../utils/unit-reverse';

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

  let geom = '';
  if (shape.type === 'customGeom' && shape.customGeom?.segments?.length) {
    geom = generateCustomGeomXml(shape);
  } else {
    let prstGeom = 'rect';
    if (shape.type === 'ellipse') prstGeom = 'ellipse';
    geom = tag('a:prstGeom', { prst: prstGeom }, tag('a:avLst'));
  }

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

function generateCustomGeomXml(shape: ShapeDefinition): string {
  const geom = shape.customGeom;
  if (!geom || !geom.segments.length) {
    return tag('a:prstGeom', { prst: 'rect' }, tag('a:avLst'));
  }

  const w = px2emu(Math.max(geom.width, 1));
  const h = px2emu(Math.max(geom.height, 1));

  let order = 1;
  const pathChildren = geom.segments
    .map((seg) => {
      if (seg.cmd === 'M') {
        return tag(
          'a:moveTo',
          { order: String(order++) },
          tag('a:pt', { x: String(px2emu(seg.x)), y: String(px2emu(seg.y)) })
        );
      }
      if (seg.cmd === 'L') {
        return tag(
          'a:lnTo',
          { order: String(order++) },
          tag('a:pt', { x: String(px2emu(seg.x)), y: String(px2emu(seg.y)) })
        );
      }
      if (seg.cmd === 'C') {
        return tag(
          'a:cubicBezTo',
          { order: String(order++) },
          tag('a:pt', { x: String(px2emu(seg.x1)), y: String(px2emu(seg.y1)) }) +
            tag('a:pt', { x: String(px2emu(seg.x2)), y: String(px2emu(seg.y2)) }) +
            tag('a:pt', { x: String(px2emu(seg.x)), y: String(px2emu(seg.y)) })
        );
      }
      return tag('a:close', { order: String(order++) });
    })
    .join('');

  return tag(
    'a:custGeom',
    undefined,
    tag('a:avLst') +
      tag('a:pathLst', undefined, tag('a:path', { w: String(w), h: String(h) }, pathChildren))
  );
}
