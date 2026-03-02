import { get } from 'lodash';
import Node from './Node';
import PPTX from '../PPTX';
import Slide from '../Slide';
import SlideLayout from '../SlideLayout';
import SlideMaster from '../SlideMaster';
import { ColorType, GradFillType, BackgroundImageType } from '../../types/color';
import { BorderType } from '../../types/line';
import TextBody from './TextBody';
import Group from '../Group';
import { getSolidFillColor, getGradFillColor, getBlipFill } from '../../utils/color';
import { parseLine } from '../../utils/line';
import { emu2px, angle, percent } from '../../utils/unit';

export default class ShapeNode extends Node {
  pptx: PPTX;
  shape: string;
  background: ColorType | GradFillType | BackgroundImageType;
  border: BorderType;
  static defaultBorderWidth = 0.75;
  textBody: TextBody;
  prstGeom: {
    gd?: any;
    pathList?: Array<{ type: string; points?: Array<number>; order?: number }>;
    w?: number;
    h?: number;
  };
  isTextBox: boolean;

  constructor(source: any, pptx: PPTX, ctx: Slide | SlideLayout | SlideMaster, group?: Group) {
    super(source, ctx, group);
    this.border = {};
    this.prstGeom = {};
    this.isTextBox = false;
    this.pptx = pptx;
    this._parseShape();
    this._parIsTextBox();
    this._parsePrstGeom();
    this._parseBackground();
    this._parseBorder();
    this._parseTxt();
  }

  private _parseShape() {
    this.shape = get(this.source, ['p:spPr', 'a:prstGeom', 'attrs', 'prst']);

    if (!this.shape && get(this.source, ['p:spPr', 'a:custGeom'])) {
      this.shape = 'customGeom';
      const pathSource = get(this.source, ['p:spPr', 'a:custGeom', 'a:pathLst', 'a:path']);
      let pathList: any[] = [];

      const processTag = (tag: string) => {
        let items: any[];
        switch (tag) {
          case 'a:moveTo':
          case 'a:cubicBezTo':
          case 'a:lnTo':
            items = Array.isArray(pathSource[tag]) ? pathSource[tag] : [pathSource[tag]];
            pathList = pathList.concat(
              items.map((item: any) => ({
                order: item.attrs.order,
                type: tag.split(':')[1],
                points: (Array.isArray(item['a:pt']) ? item['a:pt'] : [item['a:pt']]).map(
                  (pt: any) => [
                    emu2px(parseInt(get(pt, ['attrs', 'x']))),
                    emu2px(parseInt(get(pt, ['attrs', 'y']))),
                  ]
                ),
              }))
            );
            break;
          case 'a:close':
            items = Array.isArray(pathSource[tag]) ? pathSource[tag] : [pathSource[tag]];
            pathList = pathList.concat(
              items.map((item: any) => ({
                order: item.attrs.order,
                type: tag.split(':')[1],
              }))
            );
            break;
        }
      };

      for (const tag in pathSource) processTag(tag);

      pathList.sort((a, b) => a.order - b.order);
      this.prstGeom.pathList = pathList;

      if (get(pathSource, ['attrs', 'w'])) {
        this.prstGeom.w = emu2px(parseInt(get(pathSource, ['attrs', 'w'])));
      }
      if (get(pathSource, ['attrs', 'h'])) {
        this.prstGeom.h = emu2px(parseInt(get(pathSource, ['attrs', 'h'])));
      }
    }
  }

  private _parIsTextBox() {
    this.isTextBox = get(this.source, ['p:nvSpPr', 'p:cNvSpPr', 'attrs', 'txBox']) === '1';
  }

  private _parsePrstGeom() {
    const prstGeom = get(this.source, ['p:spPr', 'a:prstGeom']);
    let gdList = get(prstGeom, ['a:avLst', 'a:gd']);

    if (gdList) {
      if (!Array.isArray(gdList)) gdList = [gdList];
      this.prstGeom.gd = gdList.map((gd: any) => {
        const value =
          ['pie', 'chord', 'arc'].includes(this.shape) ||
          (['blockArc'].includes(this.shape) && ['adj1', 'adj2'].includes(gd.attrs.name))
            ? angle(parseInt(gd.attrs.fmla.split(' ')[1]))
            : percent(parseInt(gd.attrs.fmla.split(' ')[1]));
        return { name: gd.attrs.name, fmla: value };
      });
    }
  }

  private _parseBackground() {
    if (get(this.source, ['p:spPr', 'a:noFill'])) return;

    if (get(this.source, ['p:spPr', 'a:grpFill']) && this.group) {
      this.background = this.group.getBackground();
      return;
    }

    const solidFill = get(this.source, ['p:spPr', 'a:solidFill']);
    if (solidFill) {
      this.background = getSolidFillColor(solidFill, this.theme, this);
      return;
    }

    const gradFill = get(this.source, ['p:spPr', 'a:gradFill']);
    if (gradFill) {
      this.background = getGradFillColor(gradFill, this.theme, this);
      return;
    }

    const blipFill = get(this.source, ['p:spPr', 'a:blipFill']);
    if (blipFill) {
      this.background = getBlipFill(blipFill, this.pptx, this.ctx);
      return;
    }

    const fillRef = get(this.source, ['p:style', 'a:fillRef']);
    if (fillRef) {
      this.background = getSolidFillColor(fillRef, this.theme, this);
    }
  }

  private _parseBorder() {
    const lnRef = get(this.source, ['p:style', 'a:lnRef']);
    if (lnRef) {
      const idx = parseInt(lnRef.attrs.idx);
      const lineStyle = this.theme.getLineStyle(idx);
      this.border = { ...lineStyle, ...this.border };
      if (!this.border.color || !this.border.color.color) {
        this.border.color = getSolidFillColor(lnRef, this.theme, this);
      }
    }

    const ln = get(this.source, ['p:spPr', 'a:ln']);
    if (ln) {
      if (get(ln, 'a:noFill')) {
        // Shape explicitly says no border — override any theme-inherited border
        this.border = {};
      } else {
        Object.assign(this.border, parseLine(ln, this.theme, this));
      }
    }

    if (this.border.color && this.border.color.color && !this.border.width) {
      this.border.width = ShapeNode.defaultBorderWidth;
    }
  }

  private _parseTxt() {
    this.textBody = new TextBody(get(this.source, ['p:txBody']), this as any);
  }
}
