import { get } from 'lodash';
import Theme from '../reader/Theme';
import { BorderType } from '../types/line';
import { getSolidFillColor } from './color';
import { emu2px } from './unit';

export function parseLine(
  line: any,
  theme: Theme,
  node?: { getColorThemeName(name: any): string }
): BorderType {
  const result: BorderType = {};

  if (get(line, 'a:noFill')) return result;

  if (get(line, 'attrs.w')) {
    result.width = emu2px(parseInt(get(line, 'attrs.w')));
  }

  const solidFill = get(line, 'a:solidFill');
  if (solidFill) {
    result.color = getSolidFillColor(solidFill, theme, node);
  }

  const prstDash = get(line, 'a:prstDash');
  if (prstDash) result.type = prstDash.attrs.val;

  if (get(line, ['a:miter'])) result.lineJoin = 'miter';
  if (get(line, ['a:bevel'])) result.lineJoin = 'bevel';
  if (get(line, ['a:round'])) result.lineJoin = 'round';

  if (get(line, ['a:miter', 'attrs', 'lim'])) {
    result.miterLim = emu2px(parseInt(get(line, ['a:miter', 'attrs', 'lim'])));
  }

  if (get(line, ['a:headEnd'])) {
    const headAttrs = get(line, ['a:headEnd', 'attrs']);
    result.headEnd = { type: headAttrs.type, len: headAttrs.len, w: headAttrs.w };
  }

  if (get(line, ['a:tailEnd'])) {
    const tailAttrs = get(line, ['a:tailEnd', 'attrs']);
    result.tailEnd = { type: tailAttrs.type, len: tailAttrs.len, w: tailAttrs.w };
  }

  return result;
}
