import { get } from 'lodash';
import { NodeType } from '../../types/node';
import { TextPropsType, ParagraphType } from '../../types/text';
import { getSolidFillColor } from '../../utils/color';
import { emu2px, percent } from '../../utils/unit';

export default class TextBody {
  source: any;
  node: NodeType;
  props: TextPropsType;
  inheritProps: TextPropsType;
  lstStyle: any;
  paragraphs: ParagraphType[];

  constructor(source: any, node: NodeType) {
    this.props = {};
    this.inheritProps = {};
    this.source = source;
    this.node = node;
    this._getInheritBodyProps();
    this._parseBodyProps();
    this._parseLstStyle();
    this._parseText();
  }

  private _getInheritBodyProps() {
    let inheritNode: any;
    const ctx = this.node.ctx;
    const type = this.node.type;
    const idx = this.node.idx;

    if (type || idx) {
      switch (ctx.slideType) {
        case 'slideMaster':
          break;
        case 'slideLayout':
          inheritNode = type
            ? ctx.slideMaster.getNodeByType(type)
            : ctx.slideMaster.getNodeByIdx(idx);
          if (inheritNode) {
            this.inheritProps = get(inheritNode, ['textBody', 'props']) || {};
          }
          break;
        case 'slide':
          inheritNode = type
            ? ctx.slideLayout.slideMaster.getNodeByType(type)
            : ctx.slideLayout.slideMaster.getNodeByIdx(idx);
          if (inheritNode) {
            Object.assign(this.inheritProps, get(inheritNode, ['textBody', 'props']) || {});
          }
          inheritNode = type
            ? ctx.slideLayout.getNodeByType(type)
            : ctx.slideLayout.getNodeByIdx(idx);
          if (inheritNode) {
            Object.assign(this.inheritProps, get(inheritNode, ['textBody', 'props']) || {});
          }
          break;
      }
    }
  }

  private _parseBodyProps() {
    const attrs = get(this.source, ['a:bodyPr', 'attrs']) || {};
    Object.keys(attrs).forEach((key) => {
      switch (key) {
        case 'anchor':
          this.props.anchor = attrs[key];
          break;
        case 'rtlCol':
          this.props.rtlCol = attrs[key] === '1';
          break;
        case 'lIns':
        case 'rIns':
        case 'tIns':
        case 'bIns':
          this.props[key] = emu2px(parseInt(attrs[key]));
          break;
        case 'order':
          break;
        default:
          this.props[key] = attrs[key];
      }
    });

    const normAutofit = get(this.source, ['a:bodyPr', 'a:normAutofit', 'attrs']);
    if (normAutofit) {
      this.props.normAutofit = {};
      const fontScale = normAutofit.fontScale;
      if (fontScale) this.props.normAutofit.fontScale = percent(parseInt(fontScale));
      const lnSpcReduction = normAutofit.lnSpcReduction;
      if (lnSpcReduction) this.props.normAutofit.lnSpcReduction = percent(parseInt(lnSpcReduction));
    }
  }

  private _parseLstStyle() {
    const result: any = {};
    const lstStyle = get(this.source, 'a:lstStyle') || {};

    Object.keys(lstStyle).forEach((key) => {
      if (key.startsWith('a:') && key.endsWith('pPr')) {
        const level = key.substr(2, key.length - 5);
        result[level] = { props: this._formatPPr(lstStyle[key]) };
        const defRPr = get(lstStyle[key], ['a:defRPr']);
        result[level].defRPr = this._formatRPr(defRPr);
      }
    });

    this.lstStyle = result;
  }

  private _parseText() {
    let paragraphs = get(this.source, ['a:p']) || [];
    if (!Array.isArray(paragraphs)) paragraphs = [paragraphs];
    this.paragraphs = paragraphs.map((p: any) => this._parseParagraph(p));
  }

  private _parseParagraph(source: any): any {
    const result: any = {
      props: {},
      inheritProps: {},
      inheritRProps: {},
      endParaRProps: {},
      rows: [],
    };

    const pPr = get(source, ['a:pPr']) || {};
    result.props = this._formatPPr(pPr);

    const endParaRPr = get(source, ['a:endParaRPr']);
    result.endParaRProps = this._formatRPr(endParaRPr);

    let runs = get(source, ['a:r']) || [];
    if (!Array.isArray(runs)) runs = [runs];

    let fields = get(source, ['a:fld']) || [];
    if (!Array.isArray(fields)) fields = [fields];
    runs = runs.concat(
      fields.filter((f: any) => f).map((fld: any) => ({ ...fld, _fieldType: get(fld, ['attrs', 'type']) }))
    );

    let breaks = get(source, ['a:br']) || [];
    if (!Array.isArray(breaks)) breaks = [breaks];

    runs = runs.concat(
      breaks.map((br: any) => ({ isBr: true, ...br }))
    );

    runs.sort((a: any, b: any) => get(a, ['attrs', 'order']) - get(b, ['attrs', 'order']));

    result.rows = runs.map((run: any) => this._parseRow(run));
    result.inheritProps = this._getInheritPProps(result.props.level);
    result.inheritRProps = this._getInheritRProps(result.props.level);

    return result;
  }

  private _getInheritPProps(level: string = '0'): any {
    let inheritNode: any;
    const result: any = {};
    const ctx = this.node.ctx;
    const type = this.node.type;
    const idx = this.node.idx;
    const lvlKey = `lvl${level ? +level + 1 : 1}`;

    switch (ctx.slideType) {
      case 'slideMaster':
        if ((this.node as any).isTextBox) {
          Object.assign(result, get(ctx.defaultTextStyle, [lvlKey, 'props']) || {});
        } else {
          Object.assign(result, get(ctx, ['textStyles', 'otherStyle', lvlKey, 'props']) || {});
        }
        break;
      case 'slideLayout':
        if ((this.node as any).isTextBox) {
          Object.assign(result, get(ctx.slideMaster.defaultTextStyle, [lvlKey, 'props']) || {});
        } else {
          Object.assign(result, get(ctx.slideMaster, ['textStyles', 'otherStyle', lvlKey, 'props']) || {});
        }
        if (type || idx) {
          inheritNode = type
            ? ctx.slideMaster.getNodeByType(type)
            : ctx.slideMaster.getNodeByIdx(idx);
          if (inheritNode) {
            Object.assign(result, get(inheritNode, ['textBody', 'lstStyle', lvlKey, 'props']) || {});
          }
        }
        break;
      case 'slide':
        if ((this.node as any).isTextBox) {
          Object.assign(result, get(ctx.slideLayout.slideMaster.defaultTextStyle, [lvlKey, 'props']) || {});
        } else {
          Object.assign(result, get(ctx.slideLayout.slideMaster, ['textStyles', 'otherStyle', lvlKey, 'props']) || {});
        }
        if (type || idx) {
          if (['subTitle', 'ctrTitle', 'title'].includes(type)) {
            Object.assign(result, get(ctx.slideLayout.slideMaster, ['textStyles', 'titleStyle', lvlKey, 'props']) || {});
          }
          inheritNode = type
            ? ctx.slideLayout.slideMaster.getNodeByType(type)
            : ctx.slideLayout.slideMaster.getNodeByIdx(idx);
          if (inheritNode) {
            Object.assign(result, get(inheritNode, ['textBody', 'lstStyle', lvlKey, 'props']) || {});
          }
          inheritNode = type
            ? ctx.slideLayout.getNodeByType(type)
            : ctx.slideLayout.getNodeByIdx(idx);
          if (inheritNode) {
            Object.assign(result, get(inheritNode, ['textBody', 'lstStyle', lvlKey, 'props']) || {});
          }
        }
        break;
    }

    if (get(this.lstStyle, [lvlKey, 'props'])) {
      Object.assign(result, get(this.lstStyle, [lvlKey, 'props']));
    }

    return result;
  }

  private _getInheritRProps(level: string = '0'): any {
    let inheritNode: any;
    let result: any = {};
    const ctx = this.node.ctx;
    const type = this.node.type;
    const idx = this.node.idx;
    const lvlKey = `lvl${level ? +level + 1 : 1}`;

    switch (ctx.slideType) {
      case 'slideMaster':
        if ((this.node as any).isTextBox) {
          Object.assign(result, get(ctx.defaultTextStyle, [lvlKey, 'defRPr']) || {});
        } else {
          Object.assign(result, get(ctx, ['textStyles', 'otherStyle', lvlKey, 'defRPr']) || {});
        }
        break;
      case 'slideLayout':
        if ((this.node as any).isTextBox) {
          Object.assign(result, get(ctx.slideMaster.defaultTextStyle, [lvlKey, 'defRPr']) || {});
        } else {
          Object.assign(result, get(ctx.slideMaster, ['textStyles', 'otherStyle', lvlKey, 'defRPr']) || {});
        }
        if (type || idx) {
          inheritNode = type
            ? ctx.slideMaster.getNodeByType(type)
            : ctx.slideMaster.getNodeByIdx(idx);
          if (inheritNode) {
            result = get(inheritNode, ['textBody', 'lstStyle', lvlKey, 'defRPr']) || {};
          }
        }
        break;
      case 'slide':
        if ((this.node as any).isTextBox) {
          Object.assign(result, get(ctx.slideLayout.slideMaster.defaultTextStyle, [lvlKey, 'defRPr']) || {});
        } else {
          Object.assign(result, get(ctx.slideLayout.slideMaster, ['textStyles', 'otherStyle', lvlKey, 'defRPr']) || {});
        }
        if (type || idx) {
          if (['subTitle', 'ctrTitle', 'title'].includes(type)) {
            Object.assign(result, get(ctx.slideLayout.slideMaster, ['textStyles', 'titleStyle', lvlKey, 'defRPr']) || {});
          }
          inheritNode = type
            ? ctx.slideLayout.slideMaster.getNodeByType(type)
            : ctx.slideLayout.slideMaster.getNodeByIdx(idx);
          if (inheritNode) {
            Object.assign(result, get(inheritNode, ['textBody', 'lstStyle', lvlKey, 'defRPr']) || {});
          }
          inheritNode = type
            ? ctx.slideLayout.getNodeByType(type)
            : ctx.slideLayout.getNodeByIdx(idx);
          if (inheritNode) {
            Object.assign(result, get(inheritNode, ['textBody', 'lstStyle', lvlKey, 'defRPr']) || {});
          }
        }
        break;
    }

    const fontRef = get(this.node.source, ['p:style', 'a:fontRef']);
    if (get(fontRef, 'a:schemeClr')) {
      result.color = getSolidFillColor(fontRef, this.node.theme, this.node);
    }

    if (get(this.lstStyle, [lvlKey, 'defRPr'])) {
      Object.assign(result, get(this.lstStyle, [lvlKey, 'defRPr']));
    }

    return result;
  }

  private _formatPPr(pPr: any): any {
    const result: any = {};
    const attrs = get(pPr, 'attrs') || {};

    Object.keys(attrs).forEach((key) => {
      switch (key) {
        case 'algn':
          result.align = attrs[key];
          break;
        case 'marL':
          result.marginLeft = emu2px(parseInt(attrs[key]));
          break;
        case 'indent':
          result.indent = emu2px(parseInt(attrs[key]));
          break;
        case 'lvl':
          result.level = attrs[key];
          break;
      }
    });

    if (get(pPr, ['a:lnSpc', 'a:spcPct', 'attrs', 'val'])) {
      result.lineHeight = parseInt(pPr['a:lnSpc']['a:spcPct'].attrs.val) / 1e5;
    }

    if (get(pPr, ['a:buAutoNum', 'attrs', 'type'])) {
      result.buAutoNum = pPr['a:buAutoNum'].attrs.type;
    }

    if (get(pPr, ['a:buChar', 'attrs', 'char'])) {
      result.buChar = pPr['a:buChar'].attrs.char;
    }

    if (get(pPr, ['a:buNone'])) {
      result.buNone = true;
    }

    if (get(pPr, ['a:spcBef', 'a:spcPts', 'attrs', 'val'])) {
      result.spaceBefore = parseInt(pPr['a:spcBef']['a:spcPts'].attrs.val) / 100;
    }

    if (get(pPr, ['a:spcAft', 'a:spcPts', 'attrs', 'val'])) {
      result.spaceAfter = parseInt(pPr['a:spcAft']['a:spcPts'].attrs.val) / 100;
    }

    if (get(pPr, ['a:defRPr'])) {
      result.defRPr = this._formatRPr(get(pPr, ['a:defRPr']));
    }

    return result;
  }

  private _parseRow(run: any): any {
    if (run.isBr) return { isBr: true };
    const result: any = { props: {}, text: '' };
    const rPr = get(run, ['a:rPr']) || {};
    result.props = this._formatRPr(rPr);
    result.text = get(run, 'a:t') || '';
    if (run._fieldType) result.fieldType = run._fieldType;
    return result;
  }

  private _formatRPr(rPr: any): any {
    const result: any = {};
    const attrs = get(rPr, 'attrs') || {};

    Object.keys(attrs).forEach((key) => {
      switch (key) {
        case 'sz':
          result.size = parseInt(attrs[key]) / 100;
          break;
        case 'b':
          result.bold = attrs[key] === '1';
          break;
        case 'i':
          result.italic = attrs[key] === '1';
          break;
        case 'u':
          result.underline = attrs[key];
          break;
        case 'strike':
          result.strike = attrs[key];
          break;
        case 'order':
        case 'dirty':
          break;
        default:
          result[key] = attrs[key];
      }
    });

    const solidFill = get(rPr, 'a:solidFill');
    if (solidFill) result.color = getSolidFillColor(solidFill, this.node.theme, this.node);

    const highlight = get(rPr, 'a:highlight');
    if (highlight) result.background = getSolidFillColor(highlight, this.node.theme, this.node);

    result.typeface = get(rPr, ['a:ea', 'attrs', 'typeface']);

    return result;
  }
}
