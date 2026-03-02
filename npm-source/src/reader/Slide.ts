import { get } from 'lodash';
import PPTX from './PPTX';
import SlideLayout from './SlideLayout';
import { ColorType, BackgroundImageType, GradFillType } from '../types/color';
import { relsType } from '../types/slide';
import { xmlToJSON } from '../utils/xml';
import { getSolidFillColor, getGradFillColor, getBlipFill } from '../utils/color';
import { parseAndCreateNode } from '../utils/parse';

export default class Slide {
  slideType: string;
  name: string;
  source: any;
  pptx: PPTX;
  slideLayout: SlideLayout;
  rels: relsType;
  background: ColorType | GradFillType | BackgroundImageType;
  nodes: Array<any>;

  get index(): number {
    if (!this.name) return 0;
    const match = this.name.match(/(\d+)/);
    return match ? parseInt(match[0]) : 1;
  }

  get slideMaster() {
    return this.slideLayout && this.slideLayout.slideMaster;
  }

  get theme() {
    return this.slideMaster.theme;
  }

  get _relsPath(): string {
    return this.name.replace('slides/slide', 'slides/_rels/slide') + '.rels';
  }

  constructor(name: any, source: any, pptx: any) {
    this.slideType = 'slide';
    this.rels = {};
    this.background = { type: 'none' };
    this.nodes = [];
    this.name = name;
    this.source = source;
    this.pptx = pptx;
  }

  async load(): Promise<void> {
    await this._loadRels();
    this._loadBackground();
    await this._loadNodes();
  }

  async _loadRels(): Promise<void> {
    const relsXml = await this.pptx.getXmlByPath(this._relsPath);
    const relsJson = xmlToJSON(relsXml);
    let relationships = get(relsJson, ['Relationships', 'Relationship']) || [];
    if (!Array.isArray(relationships)) relationships = [relationships];

    relationships.forEach((rel: any) => {
      switch (get(rel, ['attrs', 'Type'])) {
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout': {
          let target = rel.attrs.Target.replace('../', 'ppt/');
          if (target.startsWith('/ppt')) target = target.substr(1);
          this.slideLayout = this.pptx.getSlideLayout(target);
          break;
        }
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image':
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio':
        case 'http://schemas.microsoft.com/office/2007/relationships/media':
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/video':
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramLayout':
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramData':
        case 'http://schemas.microsoft.com/office/2007/relationships/diagramDrawing':
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramColors':
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart': {
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

  _loadBackground(): void {
    const bgPr = get(this.source, ['p:sld', 'p:cSld', 'p:bg', 'p:bgPr']);
    if (bgPr && bgPr['a:solidFill']) {
      this.background = getSolidFillColor(bgPr['a:solidFill'], this.theme, this);
    } else if (bgPr && bgPr['a:gradFill']) {
      this.background = getGradFillColor(bgPr['a:gradFill'], this.theme, this);
    } else if (bgPr && bgPr['a:blipFill']) {
      this.background = getBlipFill(bgPr['a:blipFill'], this.pptx, this);
    }
  }

  async _loadNodes(): Promise<void> {
    const spTree = get(this.source, ['p:sld', 'p:cSld', 'p:spTree']);
    await parseAndCreateNode(this.nodes, spTree, this.pptx, this);
  }

  getColorThemeName(aliseName: any): any {
    return this.slideLayout.getColorThemeName(aliseName);
  }

  getNodeInheritAttrsByType(type: any, propertyPath: Array<string>): any {
    const node = this.slideLayout.getNodeByType(type);
    const result = get(node.source, propertyPath);
    return result || this.slideLayout.getNodeInheritAttrsByType(type, propertyPath);
  }

  getNodeInheritAttrsByIdx(idx: any, propertyPath: Array<string>): any {
    const node = this.slideLayout.getNodeByIdx(idx);
    const result = get(node.source, propertyPath);
    return result || this.slideLayout.getNodeInheritAttrsByIdx(idx, propertyPath);
  }
}
