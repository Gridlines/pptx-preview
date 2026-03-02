import { ShapeDefinition } from '../types/writer-types';
import { ParserContext } from './element-handlers';
import { px2emu } from '../utils/unit-reverse';

export function parseImageElement(
  element: Element,
  ctx: ParserContext
): ShapeDefinition | null {
  const src = element.getAttribute('src');
  if (!src) return null;

  // Only support base64/data URI images for now
  if (!src.startsWith('data:')) return null;

  const mimeMatch = src.match(/^data:([^;,]+)/);
  const mimeType = mimeMatch?.[1] || 'image/png';

  let width = parseInt(element.getAttribute('width') || '0', 10);
  let height = parseInt(element.getAttribute('height') || '0', 10);

  if (!width) width = 400;
  if (!height) height = 300;

  return {
    type: 'image',
    offset: { x: 0, y: 0 },
    extend: { cx: px2emu(width), cy: px2emu(height) },
    imageData: {
      base64: src,
      mimeType,
    },
  };
}
