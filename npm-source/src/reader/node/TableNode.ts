import { get } from 'lodash';
import Node from './Node';
import PPTX from '../PPTX';
import Slide from '../Slide';
import SlideLayout from '../SlideLayout';
import SlideMaster from '../SlideMaster';
import Group from '../Group';
import { TableGridType, TablePropsType, TableStyleType, TableTrType } from '../../types/table';
import Theme from '../Theme';
import { getSolidFillColor } from '../../utils/color';
import { parseLine } from '../../utils/line';
import { emu2px } from '../../utils/unit';

export default class TableNode extends Node {
  pptx: PPTX;
  userDrawn: boolean;
  props: TablePropsType;
  tableGrid: TableGridType;
  tr: Array<TableTrType>;
  tableStyles: {
    wholeTbl?: any;
    band1H?: any;
    band2H?: any;
    band1V?: any;
    band2V?: any;
    lastCol?: any;
    firstCol?: any;
    lastRow?: any;
    firstRow?: any;
  };

  get slideMaster(): any {
    return this.ctx.slideMaster || this.ctx;
  }

  get theme(): Theme {
    return this.slideMaster.theme;
  }

  constructor(source: any, pptx: PPTX, ctx: Slide | SlideLayout | SlideMaster, group?: Group) {
    super(source, ctx, group);
    this.userDrawn = true;
    this.props = { tableStyleId: '' };
    this.tableGrid = { gridCol: [] };
    this.tr = [];
    this.tableStyles = {};
    this.pptx = pptx;
    this._parseTableProps();
    this._parseTableGrid();
    this._parseTr();
    this._parseInheritStyles();
  }

  private _parseTableProps() {
    const tblPr = get(this.source, ['a:graphic', 'a:graphicData', 'a:tbl', 'a:tblPr']);
    this.props.tableStyleId = get(tblPr, 'a:tableStyleId');
    this.tableStyles = get(this.slideMaster.tableStyles, this.props.tableStyleId) || {};

    if (get(tblPr, ['attrs', 'bandCol']) === '1') this.props.bandCol = true;
    if (get(tblPr, ['attrs', 'bandRow']) === '1') this.props.bandRow = true;
    if (get(tblPr, ['attrs', 'firstCol']) === '1') this.props.firstCol = true;
    if (get(tblPr, ['attrs', 'firstRow']) === '1') this.props.firstRow = true;
    if (get(tblPr, ['attrs', 'lastCol']) === '1') this.props.lastCol = true;
    if (get(tblPr, ['attrs', 'lastRow']) === '1') this.props.lastRow = true;
  }

  private _parseTableGrid() {
    const gridCols = get(this.source, ['a:graphic', 'a:graphicData', 'a:tbl', 'a:tblGrid', 'a:gridCol']);
    if (gridCols) {
      for (let i = 0; i < gridCols.length; i++) {
        const w = get(gridCols[i], ['attrs', 'w']);
        this.tableGrid.gridCol.push({ width: emu2px(parseInt(w)) });
      }
    }
  }

  private _parseTr() {
    const rows: any[] = [];
    let trList = get(this.source, ['a:graphic', 'a:graphicData', 'a:tbl', 'a:tr']);
    if (!Array.isArray(trList)) trList = [trList];

    for (let i = 0; i < trList.length; i++) {
      const tr: any = { props: {}, td: [] };
      const trSource = trList[i];
      tr.props.height = emu2px(parseInt(get(trSource, ['attrs', 'h'])));

      let tdList = get(trSource, ['a:tc']);
      if (!Array.isArray(tdList)) tdList = [tdList];

      for (let j = 0; j < tdList.length; j++) {
        tr.td.push(this._parseTd(tdList[j]));
      }
      rows.push(tr);
    }
    this.tr = rows;
  }

  private _parseTd(td: any): any {
    const result: any = { props: { border: {} }, paragraphs: [] };
    const attrs = get(td, ['a:tcPr', 'attrs']);

    if (attrs?.marB) result.props.marB = emu2px(parseInt(attrs.marB));
    if (attrs?.marT) result.props.marT = emu2px(parseInt(attrs.marT));
    if (attrs?.marL) result.props.marL = emu2px(parseInt(attrs.marL));
    if (attrs?.marR) result.props.marR = emu2px(parseInt(attrs.marR));
    if (attrs?.anchor) result.props.anchor = attrs.anchor;

    const tcPr = get(td, ['a:tcPr']);
    if (get(tcPr, ['a:lnR'])) result.props.border.right = parseLine(get(tcPr, ['a:lnR']), this.theme, this.ctx);
    if (get(tcPr, ['a:lnL'])) result.props.border.left = parseLine(get(tcPr, ['a:lnL']), this.theme, this.ctx);
    if (get(tcPr, ['a:lnT'])) result.props.border.top = parseLine(get(tcPr, ['a:lnT']), this.theme, this.ctx);
    if (get(tcPr, ['a:lnB'])) result.props.border.bottom = parseLine(get(tcPr, ['a:lnB']), this.theme, this.ctx);

    if (td?.attrs?.rowSpan) result.props.rowSpan = parseInt(td.attrs.rowSpan);
    if (td?.attrs?.gridSpan) result.props.gridSpan = parseInt(td.attrs.gridSpan);
    if (td?.attrs?.vMerge) result.props.vMerge = td.attrs.vMerge === '1';
    if (td?.attrs?.hMerge) result.props.hMerge = td.attrs.hMerge === '1';

    const solidFill = get(td, ['a:tcPr', 'a:solidFill']);
    if (solidFill) result.props.background = getSolidFillColor(solidFill, this.theme, this.ctx);
    if (get(td, ['a:tcPr', 'a:noFill']) !== undefined) result.props.noFill = true;

    const txBody = get(td, ['a:txBody']);
    let paragraphs = get(txBody, ['a:p']);
    if (!Array.isArray(paragraphs)) paragraphs = [paragraphs];
    result.paragraphs = paragraphs.map((p: any) => this._parseParagraph(p));

    return result;
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

    let breaks = get(source, ['a:br']) || [];
    if (!Array.isArray(breaks)) breaks = [breaks];

    runs = runs.concat(breaks.map((br: any) => ({ isBr: true, ...br })));
    runs.sort((a: any, b: any) => get(a, ['attrs', 'order']) - get(b, ['attrs', 'order']));

    result.rows = runs.map((run: any) => this._parseRow(run));

    return result;
  }

  private _parseRow(run: any): any {
    if (run.isBr) return { isBr: true };
    const result: any = { props: {}, text: '' };
    const rPr = get(run, ['a:rPr']) || {};
    result.props = this._formatRPr(rPr);
    result.text = get(run, 'a:t') || '';
    return result;
  }

  private _formatPPr(pPr: any): any {
    const result: any = {};
    const attrs = get(pPr, 'attrs') || {};

    Object.keys(attrs).forEach((key) => {
      if (key === 'algn') result.align = attrs[key];
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
    if (get(pPr, ['a:spcBef', 'a:spcPts', 'attrs', 'val'])) {
      result.spaceBefore = parseInt(pPr['a:spcBef']['a:spcPts'].attrs.val) / 100;
    }
    if (get(pPr, ['a:spcAft', 'a:spcPts', 'attrs', 'val'])) {
      result.spaceAfter = parseInt(pPr['a:spcAft']['a:spcPts'].attrs.val) / 100;
    }

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
    if (solidFill) result.color = getSolidFillColor(solidFill, this.theme, this.ctx);

    const highlight = get(rPr, 'a:highlight');
    if (highlight) result.background = getSolidFillColor(highlight, this.theme, this.ctx);

    result.typeface = get(rPr, ['a:ea', 'attrs', 'typeface']);

    return result;
  }

  private _isLastCol(tdList: any[], colIndex: number): boolean {
    if (colIndex === tdList.length - 1) return true;
    for (let i = colIndex + 1; i < tdList.length; i++) {
      if (!tdList[i].props?.hMerge && !tdList[i].props?.vMerge) return false;
    }
    return true;
  }

  private _isBandRow(rowIndex: number): boolean {
    return this.props?.firstRow ? rowIndex % 2 === 1 : rowIndex % 2 === 0;
  }

  private _isBandCol(colIndex: number): boolean {
    return this.props?.firstCol ? colIndex % 2 === 1 : colIndex % 2 === 0;
  }

  private _parseInheritStyles() {
    const wholeTblStyle = this.tableStyles?.wholeTbl?.tcStyle;
    const wholeTblTxStyle = this.tableStyles?.wholeTbl?.tcTxStyle;
    const defaultProps = this.slideMaster.defaultTextStyle?.lvl1?.props;
    const defaultRProps = this.slideMaster.defaultTextStyle?.lvl1?.defRPr;

    this.tr.forEach((tr, rowIndex) => {
      tr.td.forEach((td: any, colIndex: number) => {
        let tcStyle = { ...defaultProps, ...wholeTblStyle };
        let tcTxStyle = { ...defaultRProps, ...wholeTblTxStyle };

        if (this.props.firstRow && rowIndex === 0) {
          tcStyle = {
            ...tcStyle,
            ...this.tableStyles?.firstRow?.tcStyle,
            border: { ...tcStyle?.border, ...this.tableStyles?.firstRow?.tcStyle?.border },
          };
          tcTxStyle = { ...tcTxStyle, ...this.tableStyles?.firstRow?.tcTxStyle };
        } else if (this.props.lastRow && rowIndex === this.tr.length - 1) {
          tcStyle = {
            ...tcStyle,
            ...this.tableStyles?.lastRow?.tcStyle,
            border: { ...tcStyle?.border, ...this.tableStyles?.lastRow?.tcStyle?.border },
          };
          tcTxStyle = { ...tcTxStyle, ...this.tableStyles?.lastRow?.tcTxStyle };
        } else if (this.props.firstCol && colIndex === 0) {
          tcStyle = {
            ...tcStyle,
            ...this.tableStyles?.firstCol?.tcStyle,
            border: { ...tcStyle?.border, ...this.tableStyles?.firstCol?.tcStyle?.border },
          };
          tcTxStyle = { ...tcTxStyle, ...this.tableStyles?.firstCol?.tcTxStyle };
        } else if (this.props.lastCol && this._isLastCol(tr.td, colIndex)) {
          tcStyle = {
            ...tcStyle,
            ...this.tableStyles?.lastCol?.tcStyle,
            border: { ...tcStyle?.border, ...this.tableStyles?.lastCol?.tcStyle?.border },
          };
          tcTxStyle = { ...tcTxStyle, ...this.tableStyles?.lastCol?.tcTxStyle };
        } else {
          if (this.props.bandRow) {
            if (this._isBandRow(rowIndex)) {
              tcStyle = {
                ...tcStyle,
                ...this.tableStyles?.band1H?.tcStyle,
                border: { ...tcStyle?.border, ...this.tableStyles?.band1H?.tcStyle?.border },
              };
              tcTxStyle = { ...tcTxStyle, ...this.tableStyles?.band1H?.tcTxStyle };
            } else {
              tcStyle = {
                ...tcStyle,
                ...this.tableStyles?.band2V?.tcStyle,
                border: { ...tcStyle?.border, ...this.tableStyles?.band2V?.tcStyle?.border },
              };
              tcTxStyle = { ...tcTxStyle, ...this.tableStyles?.band2V?.tcTxStyle };
            }
          }
          if (this.props.bandCol) {
            if (this._isBandCol(colIndex)) {
              tcStyle = {
                ...tcStyle,
                ...this.tableStyles?.band1V?.tcStyle,
                border: { ...tcStyle?.border, ...this.tableStyles?.band1V?.tcStyle?.border },
              };
              tcTxStyle = { ...tcTxStyle, ...this.tableStyles?.band1V?.tcTxStyle };
            } else {
              tcStyle = {
                ...tcStyle,
                ...this.tableStyles?.band2H?.tcStyle,
                border: { ...tcStyle?.border, ...this.tableStyles?.band2H?.tcStyle?.border },
              };
              tcTxStyle = { ...tcTxStyle, ...this.tableStyles?.band2H?.tcTxStyle };
            }
          }
        }

        (td as any).inheritTcStyle = tcStyle;
        (td as any).inheritTcTxStyle = tcTxStyle;
      });
    });
  }
}
