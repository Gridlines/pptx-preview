import { get } from 'lodash';
import { v4 as uuid } from 'uuid';
import { NodeSourceType } from '../../types/node';
import Theme from '../Theme';
import Group from '../Group';
import { detectUnit, emu2px, wpsEmu2px, angle } from '../../utils/unit';

export default class Node {
  uuid: string;
  source: NodeSourceType;
  offset: { x: number; y: number };
  extend: { w: number; h: number };
  rotate: number;
  order: number;
  ctx: any;
  idx: string;
  type: string;
  userDrawn: boolean;
  flipV: boolean;
  flipH: boolean;
  group: Group;

  get theme(): Theme {
    return (this.ctx.sliderMaster || this.ctx).theme;
  }

  constructor(source: any, ctx: any, group?: Group) {
    this.uuid = uuid();
    this.offset = { x: 0, y: 0 };
    this.extend = { w: 0, h: 0 };
    this.rotate = 0;
    this.order = 0;
    this.flipV = false;
    this.flipH = false;
    this.source = source;
    this.ctx = ctx;
    this.group = group;

    const nvPr = get(source, ['p:nvSpPr', 'p:nvPr']);
    if (nvPr) {
      const ph = get(nvPr, 'p:ph');
      if (ph && ph.attrs) {
        this.idx = ph.attrs.idx;
        this.type = ph.attrs.type;
      }
      if (get(nvPr, ['attrs', 'userDrawn'])) {
        this.userDrawn = get(nvPr, ['attrs', 'userDrawn']) === '1';
      }
    }

    this.order = get(source, 'attrs.order', 0);

    if (this.source['p:spPr']) {
      const xfrm = this.getXfrm();
      if (xfrm) {
        const convert =
          this.group &&
          (this.ctx.pptx?.wps || detectUnit(parseInt(xfrm['a:off'].attrs.x)) === 'point')
            ? wpsEmu2px
            : emu2px;

        this.offset = {
          x: Math.round(convert(parseInt(xfrm['a:off'].attrs.x))),
          y: Math.round(convert(parseInt(xfrm['a:off'].attrs.y))),
        };
        this.extend = {
          w: Math.round(convert(parseInt(xfrm['a:ext'].attrs.cx))),
          h: Math.round(convert(parseInt(xfrm['a:ext'].attrs.cy || '0'))),
        };
        this.rotate = angle(parseInt(get(xfrm, 'attrs.rot', 0)));
        this.flipV = get(xfrm, 'attrs.flipV') === '1';
        this.flipH = get(xfrm, 'attrs.flipH') === '1';
      }
    } else if (this.source['p:xfrm']) {
      const xfrm = this.source['p:xfrm'];
      const convert =
        this.group &&
        (this.ctx.pptx?.wps || detectUnit(parseInt(xfrm['a:off'].attrs.x)) === 'point')
          ? wpsEmu2px
          : emu2px;

      this.offset = {
        x: Math.round(convert(parseInt(xfrm['a:off'].attrs.x))),
        y: Math.round(convert(parseInt(xfrm['a:off'].attrs.y))),
      };
      this.extend = {
        w: Math.round(convert(parseInt(xfrm['a:ext'].attrs.cx))),
        h: Math.round(convert(parseInt(xfrm['a:ext'].attrs.cy))),
      };
    }

    if (group) {
      const ext = group.extend;
      const chExt = group.chExtend;
      const chOff = group.chOffset;
      const scaleX = chExt.w === 0 ? 0 : ext.w / chExt.w;
      const scaleY = chExt.h === 0 ? 0 : ext.h / chExt.h;
      this.extend.w = this.extend.w * scaleX;
      this.extend.h = this.extend.h * scaleY;
      this.offset.x = (this.offset.x - chOff.x) * scaleX;
      this.offset.y = (this.offset.y - chOff.y) * scaleY;
    }
  }

  getColorThemeName(aliseName: any): any {
    return this.ctx.getColorThemeName(aliseName);
  }

  getXfrm() {
    let xfrm = this.source['p:spPr']['a:xfrm'];
    if (!xfrm) {
      if (this.idx) {
        xfrm = this.ctx.getNodeInheritAttrsByIdx(this.idx, ['p:spPr', 'a:xfrm']);
      } else if (this.type) {
        xfrm = this.ctx.getNodeInheritAttrsByType(this.type, ['p:spPr', 'a:xfrm']);
      }
    }
    return xfrm;
  }
}
