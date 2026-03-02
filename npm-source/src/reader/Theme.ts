import { get } from 'lodash';
import { BorderType } from '../types/line';
import PPTX from './PPTX';
import { getSolidFillColor } from '../utils/color';
import { emu2px } from '../utils/unit';

export default class Theme {
  name: string;
  source: any;
  defaultColor: '#000';
  clrScheme: { [themeName: string]: string };
  borderScheme: Array<BorderType>;
  pptx: PPTX;

  constructor(name: any, source: any, pptx: PPTX) {
    this.clrScheme = {};
    this.borderScheme = [];
    this.name = name;
    this.source = source;
    this.pptx = pptx;
    this._parseClrScheme();
    this._parseLineStyleLst();
  }

  _parseClrScheme() {
    const clrScheme = get(this.source, ['a:theme', 'a:themeElements', 'a:clrScheme']);
    for (const key in clrScheme) {
      if (key.startsWith('a:')) {
        const name = key.substring(2);
        const color =
          get(clrScheme[key], ['a:sysClr', 'attrs', 'lastClr']) ||
          get(clrScheme[key], ['a:srgbClr', 'attrs', 'val']);
        this.clrScheme[name] = '#' + color;
      }
    }
  }

  _parseLineStyleLst() {
    const lnList =
      get(this.source, [
        'a:theme', 'a:themeElements', 'a:fmtScheme', 'a:lnStyleLst', 'a:ln',
      ]) || [];

    this.borderScheme = lnList.map((ln: any) => {
      const result: any = { color: {} };
      if (get(ln, ['attrs', 'w'])) result.width = emu2px(parseInt(get(ln, ['attrs', 'w'])));
      if (get(ln, ['attrs', 'algn'])) result.algn = get(ln, ['attrs', 'algn']);
      if (get(ln, ['attrs', 'cap'])) result.cap = get(ln, ['attrs', 'cap']);
      if (get(ln, ['attrs', 'cmpd'])) result.cmpd = get(ln, ['attrs', 'cmpd']);
      if (get(ln, ['a:miter', 'attrs', 'lim'])) {
        result.miterLim = emu2px(parseInt(get(ln, ['a:miter', 'attrs', 'lim'])));
      }
      if (get(ln, ['a:prstDash', 'attrs', 'val'])) {
        result.type = get(ln, ['a:prstDash', 'attrs', 'val']);
      }
      if (get(ln, ['a:solidFill'])) {
        result.color = getSolidFillColor(get(ln, ['a:solidFill']), this as any);
      }
      return result;
    });
  }

  getColor(themeName: string): string {
    if (themeName !== 'phClr') {
      return this.clrScheme[themeName] || this.defaultColor;
    }
    return undefined as any;
  }

  getLineStyle(index: number): BorderType {
    return this.borderScheme[index - 1];
  }
}
