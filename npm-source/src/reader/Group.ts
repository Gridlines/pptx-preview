import { get } from 'lodash';
import PPTX from './PPTX';
import { BackgroundImageType, ColorType, GradFillType } from '../types/color';
import { getSolidFillColor, getGradFillColor, getBlipFill } from '../utils/color';
import { detectUnit, emu2px, wpsEmu2px, angle } from '../utils/unit';
import { parseAndCreateNode } from '../utils/parse';

export default class Group {
  source: any;
  order: number;
  pptx: PPTX;
  ctx: any;
  offset: { x: number; y: number };
  chOffset: { x: number; y: number };
  extend: { w: number; h: number };
  chExtend: { w: number; h: number };
  rotate: number;
  nodes: any[];
  flipV: boolean;
  flipH: boolean;
  background: ColorType | GradFillType | BackgroundImageType;
  group: Group;
  userDrawn: boolean;

  constructor(source: any, pptx: PPTX, ctx: any, group?: Group) {
    this.offset = { x: 0, y: 0 };
    this.chOffset = { x: 0, y: 0 };
    this.extend = { w: 0, h: 0 };
    this.chExtend = { w: 0, h: 0 };
    this.rotate = 0;
    this.nodes = [];
    this.flipV = false;
    this.flipH = false;
    this.userDrawn = true;
    this.order = get(source, ['attrs', 'order']);
    this.pptx = pptx;
    this.ctx = ctx;
    this.source = source;
    this.group = group;

    if (this.source['p:grpSpPr']) {
      const xfrm = get(this.source, ['p:grpSpPr', 'a:xfrm']);
      if (xfrm) {
        const useWps = this.group && this.pptx.wps;

        this.offset = {
          x: Math.round(useWps ? wpsEmu2px(parseInt(xfrm['a:off'].attrs.x)) : emu2px(parseInt(xfrm['a:off'].attrs.x))),
          y: Math.round(useWps ? wpsEmu2px(parseInt(xfrm['a:off'].attrs.y)) : emu2px(parseInt(xfrm['a:off'].attrs.y))),
        };
        this.chOffset = {
          x: Math.round(
            detectUnit(xfrm['a:chOff'].attrs.x) === 'point' || this.pptx.wps
              ? wpsEmu2px(parseInt(xfrm['a:chOff'].attrs.x))
              : emu2px(parseInt(xfrm['a:chOff'].attrs.x))
          ),
          y: Math.round(
            detectUnit(xfrm['a:chOff'].attrs.y) === 'point' || this.pptx.wps
              ? wpsEmu2px(parseInt(xfrm['a:chOff'].attrs.y))
              : emu2px(parseInt(xfrm['a:chOff'].attrs.y))
          ),
        };
        this.chExtend = {
          w: Math.round(
            detectUnit(xfrm['a:chExt'].attrs.cx) === 'point' || this.pptx.wps
              ? wpsEmu2px(parseInt(xfrm['a:chExt'].attrs.cx))
              : emu2px(parseInt(xfrm['a:chExt'].attrs.cx))
          ),
          h: Math.round(
            detectUnit(xfrm['a:chExt'].attrs.cy) === 'point' || this.pptx.wps
              ? wpsEmu2px(parseInt(xfrm['a:chExt'].attrs.cy))
              : emu2px(parseInt(xfrm['a:chExt'].attrs.cy))
          ),
        };
        this.extend = {
          w: Math.round(useWps ? wpsEmu2px(parseInt(xfrm['a:ext'].attrs.cx)) : emu2px(parseInt(xfrm['a:ext'].attrs.cx))),
          h: Math.round(useWps ? wpsEmu2px(parseInt(xfrm['a:ext'].attrs.cy)) : emu2px(parseInt(xfrm['a:ext'].attrs.cy))),
        };
        this.rotate = angle(parseInt(get(xfrm, 'attrs.rot', 0)));
        this.flipV = get(xfrm, 'attrs.flipV') === '1';
        this.flipH = get(xfrm, 'attrs.flipH') === '1';

        if (group) {
          const ext = group.extend;
          const chExt = group.chExtend;
          const chOff = group.chOffset;
          const scaleX = ext.w / chExt.w;
          const scaleY = ext.h / chExt.h;
          this.extend.w = this.extend.w * scaleX;
          this.extend.h = this.extend.h * scaleY;
          this.offset.x = (this.offset.x - chOff.x) * scaleX;
          this.offset.y = (this.offset.y - chOff.y) * scaleY;
        }
      }
    }

    this._parseBackground();
    this._parseNodes();
  }

  getBackground(): any {
    if (this.background && (this.background as any).type !== 'none') {
      return this.background;
    }
    return this.group ? this.group.getBackground() : undefined;
  }

  private _parseBackground() {
    const grpSpPr = get(this.source, ['p:grpSpPr']);
    if (grpSpPr && grpSpPr['a:solidFill']) {
      this.background = getSolidFillColor(grpSpPr['a:solidFill'], this.ctx.theme, this.ctx);
    } else if (grpSpPr && grpSpPr['a:gradFill']) {
      this.background = getGradFillColor(grpSpPr['a:gradFill'], this.ctx.theme, this.ctx);
    } else if (grpSpPr && grpSpPr['a:blipFill']) {
      this.background = getBlipFill(grpSpPr['a:blipFill'], this.pptx, this.ctx);
    }
  }

  private _parseNodes() {
    parseAndCreateNode(this.nodes, this.source, this.pptx, this.ctx, this);
  }
}
