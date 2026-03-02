import { get } from 'lodash';
import PPTX from './PPTX';
import SlideMaster from './SlideMaster';
import { ColorType, BackgroundImageType, GradFillType } from '../types/color';
import { relsType } from '../types/slide';
import { xmlToJSON } from '../utils/xml';
import { getSolidFillColor, getGradFillColor, getBlipFill } from '../utils/color';
import { parseAndCreateNode } from '../utils/parse';

export default class SlideLayout {
  slideType: string;
  name: string;
  source: any;
  pptx: PPTX;
  slideMaster: SlideMaster;
  rels: relsType;
  background: ColorType | GradFillType | BackgroundImageType;
  nodes: Array<any>;

  get _relsPath(): string {
    return this.name.replace('slideLayouts/slideLayout', 'slideLayouts/_rels/slideLayout') + '.rels';
  }

  get theme() {
    return this.slideMaster.theme;
  }

  constructor(name: any, source: any, pptx: any) {
    this.slideType = 'slideLayout';
    this.rels = {};
    this.background = { type: 'none' };
    this.nodes = [];
    this.name = name;
    this.source = source;
    this.pptx = pptx;
  }

  async load(): Promise<void> {
    await this._loadRels();
    await this._loadBackground();
    await this._loadNodes();
  }

  async _loadRels(): Promise<void> {
    const relsXml = await this.pptx.getXmlByPath(this._relsPath);
    const relsJson = xmlToJSON(relsXml);
    let relationships = get(relsJson, ['Relationships', 'Relationship']) || [];
    if (!Array.isArray(relationships)) relationships = [relationships];

    relationships.forEach((rel: any) => {
      switch (get(rel, ['attrs', 'Type'])) {
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster': {
          let target = rel.attrs.Target.replace('../', 'ppt/');
          if (target.startsWith('/ppt')) target = target.substr(1);
          this.slideMaster = this.pptx.getSlideMaster(target);
          break;
        }
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image':
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio':
        case 'http://schemas.microsoft.com/office/2007/relationships/media':
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/video': {
          let target = rel.attrs.Target.replace('../', 'ppt/');
          if (target.startsWith('/ppt')) target = target.substr(1);
          this.rels[rel.attrs.Id] = {
            type: rel.attrs.Type.split('/').pop(),
            target,
          };
          break;
        }
      }
    });
  }

  async _loadBackground(): Promise<void> {
    const bgPr = get(this.source, ['p:sldLayout', 'p:cSld', 'p:bg', 'p:bgPr']);
    if (bgPr && bgPr['a:solidFill']) {
      this.background = getSolidFillColor(bgPr['a:solidFill'], this.theme);
    } else if (bgPr && bgPr['a:gradFill']) {
      this.background = getGradFillColor(bgPr['a:gradFill'], this.theme, this);
    } else if (bgPr && bgPr['a:blipFill']) {
      this.background = getBlipFill(bgPr['a:blipFill'], this.pptx, this);
    }
  }

  async _loadNodes(): Promise<void> {
    const spTree = get(this.source, ['p:sldLayout', 'p:cSld', 'p:spTree']);
    parseAndCreateNode(this.nodes, spTree, this.pptx, this);
  }

  getColorThemeName(aliseName: any): any {
    return this.slideMaster.getColorThemeName(aliseName);
  }

  getNodeByType(type: any): any {
    return this.nodes.find((n) => n.type === type);
  }

  getNodeByIdx(idx: any): any {
    return this.nodes.find((n) => n.idx === idx);
  }

  getNodeInheritAttrsByType(type: any, propertyPath: Array<string>): any {
    const node = this.slideMaster.getNodeByType(type);
    return node && get(node.source, propertyPath);
  }

  getNodeInheritAttrsByIdx(idx: any, propertyPath: Array<string>): any {
    const node = this.slideMaster.getNodeByIdx(idx);
    return node && get(node.source, propertyPath);
  }
}
