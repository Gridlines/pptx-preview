import { get, omit } from 'lodash';
import PPTX from './PPTX';
import Theme from './Theme';
import { ParagraphPropsType, RowPropsType } from '../types/text';
import { ColorType, BackgroundImageType, GradFillType } from '../types/color';
import { relsType } from '../types/slide';
import { TableStylesType } from '../types/table';
import { xmlToJSON } from '../utils/xml';
import { getSolidFillColor, getGradFillColor, getBlipFill } from '../utils/color';
import { parseParagraphPr, parseRowPr, parseAndCreateNode } from '../utils/parse';
import { parseLine } from '../utils/line';

export default class SlideMaster {
  slideType: string;
  name: string;
  source: any;
  pptx: PPTX;
  rels: relsType;
  background: ColorType | GradFillType | BackgroundImageType;
  colorMap: { [key: string]: string };
  textStyles: {
    titleStyle: { [key: string]: { props: ParagraphPropsType; defRPr: RowPropsType } };
    bodyStyle: { [key: string]: { props: ParagraphPropsType; defRPr: RowPropsType } };
    otherStyle: { [key: string]: { props: ParagraphPropsType; defRPr: RowPropsType } };
  };
  defaultTextStyle: { [key: string]: { props: ParagraphPropsType; defRPr: RowPropsType } };
  nodes: Array<any>;
  theme: Theme;
  tableStyles: TableStylesType;

  get _relsPath(): string {
    return this.name.replace('slideMasters/slideMaster', 'slideMasters/_rels/slideMaster') + '.rels';
  }

  constructor(name: any, source: any, pptx: any) {
    this.slideType = 'slideMaster';
    this.rels = {};
    this.background = { type: 'none' };
    this.textStyles = { titleStyle: {}, bodyStyle: {}, otherStyle: {} };
    this.defaultTextStyle = {};
    this.nodes = [];
    this.tableStyles = {};
    this.name = name;
    this.source = source;
    this.pptx = pptx;
    this.load();
  }

  async load(): Promise<void> {
    await this._parseRels();
    this._parseColorMap();
    this._parseBackground();
    this._parseTextStyles();
    this._parseTableStyles();
    this._parseDefaultTextStyle();
    this._loadNodes();
  }

  private async _parseRels() {
    const relsXml = await this.pptx.getXmlByPath(this._relsPath);
    const relsJson = xmlToJSON(relsXml);
    let relationships = get(relsJson, ['Relationships', 'Relationship']) || [];
    if (!Array.isArray(relationships)) relationships = [relationships];

    relationships.forEach((rel: any) => {
      switch (get(rel, ['attrs', 'Type'])) {
        case 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme': {
          let target = rel.attrs.Target.replace('../', 'ppt/');
          if (target.startsWith('/ppt')) target = target.substr(1);
          this.theme = this.pptx.getTheme(target);
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

  _parseColorMap(): void {
    this.colorMap = omit(
      get(this.source, ['p:sldMaster', 'p:clrMap', 'attrs']) || {},
      ['order']
    );
  }

  getColorThemeName(aliseName: any): any {
    return this.colorMap[aliseName] || aliseName;
  }

  _parseBackground(): void {
    const bgPr = get(this.source, ['p:sldMaster', 'p:cSld', 'p:bg', 'p:bgPr']);
    const bgRef = get(this.source, ['p:sldMaster', 'p:cSld', 'p:bg', 'p:bgRef']);

    if (bgPr && bgPr['a:solidFill']) {
      this.background = getSolidFillColor(bgPr['a:solidFill'], this.theme, this);
    } else if (bgPr && bgPr['a:gradFill']) {
      this.background = getGradFillColor(bgPr['a:gradFill'], this.theme, this);
    } else if (bgPr && bgPr['a:blipFill']) {
      this.background = getBlipFill(bgPr['a:blipFill'], this.pptx, this);
    } else if (bgRef) {
      this.background = getSolidFillColor(bgRef, this.theme, this);
    }
  }

  _parseDefaultTextStyle(): void {
    const defaultTextStyle = this.pptx.defaultTextStyleSource;
    Object.keys(defaultTextStyle).forEach((key) => {
      if (key.startsWith('a:') && key.endsWith('pPr')) {
        const level = key.substr(2, key.length - 5);
        const defRPr = get(defaultTextStyle[key], ['a:defRPr']);
        this.defaultTextStyle[level] = {
          props: parseParagraphPr(defaultTextStyle[key]),
          defRPr: parseRowPr(defRPr, this.theme, this),
        };
      }
    });
  }

  _parseTextStyles(): void {
    const txStyles = get(this.source, ['p:sldMaster', 'p:txStyles']);
    ['titleStyle', 'bodyStyle', 'otherStyle'].forEach((styleName) => {
      const styleObj = (this.textStyles as any)[styleName];
      const styleSource = get(txStyles, `p:${styleName}`) || {};
      Object.keys(styleSource).forEach((key) => {
        if (key.startsWith('a:') && key.endsWith('pPr')) {
          const level = key.substr(2, key.length - 5);
          styleObj[level] = {};
          styleObj[level].props = parseParagraphPr(styleSource[key]);
          const defRPr = get(styleSource[key], ['a:defRPr']);
          styleObj[level].defRPr = parseRowPr(defRPr, this.theme, this);
        }
      });
    });
  }

  _parseTableStyles(): void {
    const result: any = {};
    let tblStyles = get(this.pptx.tableStyles, ['a:tblStyleLst', 'a:tblStyle']) || [];
    if (!Array.isArray(tblStyles)) tblStyles = [tblStyles];

    tblStyles.forEach((tblStyle: any) => {
      const styleId = get(tblStyle, ['attrs', 'styleId']);
      result[styleId] = {};

      Object.keys(tblStyle).forEach((key) => {
        if (key.startsWith('a:')) {
          const name = key.substr(2);
          result[styleId][name] = {};

          const tcStyle = get(tblStyle[key], ['a:tcStyle']);
          if (tcStyle) {
            const style: any = {};
            if (get(tcStyle, ['a:fill', 'a:solidFill'])) {
              style.background = getSolidFillColor(get(tcStyle, ['a:fill', 'a:solidFill']), this.theme, this);
            }
            const tcBdr = get(tcStyle, 'a:tcBdr');
            if (tcBdr) {
              style.border = {};
              Object.keys(tcBdr).forEach((bdrKey) => {
                if (bdrKey.startsWith('a:')) {
                  const bdrName = bdrKey.substr(2);
                  const ln = get(tcBdr[bdrKey], ['a:ln']);
                  style.border[bdrName] = parseLine(ln, this.theme, this);
                }
              });
            }
            result[styleId][name].tcStyle = style;
          }

          const tcTxStyle = get(tblStyle[key], ['a:tcTxStyle']);
          if (tcTxStyle) {
            const txStyle: any = {};
            txStyle.color = getSolidFillColor(tcTxStyle, this.theme, this);
            if (get(tcTxStyle, ['attrs', 'b']) === 'on') txStyle.bold = true;
            result[styleId][name].tcTxStyle = txStyle;
          }
        }
      });
    });

    this.tableStyles = result;
  }

  async _loadNodes(): Promise<void> {
    const spTree = get(this.source, ['p:sldMaster', 'p:cSld', 'p:spTree']);
    parseAndCreateNode(this.nodes, spTree, this.pptx, this);
  }

  getNodeByType(type: any): any {
    return this.nodes.find((n) => n.type === type);
  }

  getNodeByIdx(idx: any): any {
    return this.nodes.find((n) => n.idx === idx);
  }

  getNodeInheritAttrsByType(type: any, propertyPath: Array<string>): void {}

  getNodeInheritAttrsByIdx(idx: any, propertyPath: Array<string>): void {}
}
