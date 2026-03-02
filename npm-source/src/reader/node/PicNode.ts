import { get } from 'lodash';
import PPTX from '../PPTX';
import Slide from '../Slide';
import Node from './Node';
import SlideLayout from '../SlideLayout';
import SlideMaster from '../SlideMaster';
import Group from '../Group';

export default class PicNode extends Node {
  pptx: PPTX;
  path: string;
  userDrawn: boolean;
  audioFile: string;
  videoFile: string;
  clip: {
    b?: number;
    t?: number;
    l?: number;
    r?: number;
  };

  get base64(): string {
    return this.pptx.getMedia(this.path);
  }

  constructor(path: any, source: any, pptx: PPTX, ctx: Slide | SlideLayout | SlideMaster, group?: Group) {
    super(source, ctx, group);
    this.userDrawn = true;
    this.pptx = pptx;
    this.path = path;

    const srcRect = get(this.source, ['p:blipFill', 'a:srcRect']);
    if (srcRect) {
      this.clip = {};
      if (srcRect.attrs.b) this.clip.b = parseInt(srcRect.attrs.b) / 1e5;
      if (srcRect.attrs.t) this.clip.t = parseInt(srcRect.attrs.t) / 1e5;
      if (srcRect.attrs.l) this.clip.l = parseInt(srcRect.attrs.l) / 1e5;
      if (srcRect.attrs.r) this.clip.r = parseInt(srcRect.attrs.r) / 1e5;
    }

    const audioLink = get(source, ['p:nvPicPr', 'p:nvPr', 'a:audioFile', 'attrs', 'r:link']);
    if (audioLink) {
      const target = this.ctx.rels[audioLink]?.target;
      this.audioFile = this.pptx.getMedia(target);
    }

    const videoLink = get(source, ['p:nvPicPr', 'p:nvPr', 'a:videoFile', 'attrs', 'r:link']);
    if (videoLink) {
      const target = this.ctx.rels[videoLink]?.target;
      this.videoFile = this.pptx.getMedia(target);
    }
  }
}
