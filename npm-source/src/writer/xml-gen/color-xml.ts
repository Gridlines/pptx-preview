import { ColorType } from '../../types/color';
import { tag } from '../utils/xml-builder';

export function generateColorXml(color: ColorType): string {
  if (!color || color.type === 'none') return '';

  const hexColor = (color.color || '000000').replace('#', '');
  let children = '';

  if (color.alpha !== undefined && color.alpha < 1) {
    children += tag('a:alpha', { val: String(Math.round(color.alpha * 100000)) });
  }

  return tag('a:srgbClr', { val: hexColor }, children || undefined);
}
