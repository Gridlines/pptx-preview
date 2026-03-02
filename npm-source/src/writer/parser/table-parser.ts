import { ShapeDefinition } from '../types/writer-types';
import { TableGridType, TableTrType, TableTdType } from '../../types/table';
import { ParagraphType } from '../../types/text';
import { parseInlineContent } from './text-parser';
import { ParserContext } from './element-handlers';
import { px2emu } from '../utils/unit-reverse';

export function parseTableElement(
  element: Element,
  ctx: ParserContext
): ShapeDefinition | null {
  const rows = extractTableRows(element);
  if (rows.length === 0) return null;

  const colCount = getMaxColCount(rows);
  if (colCount === 0) return null;

  // Try to read actual column widths from the first row's <td> style.width
  const colWidths = extractColumnWidths(rows, colCount);

  const gridCol: TableGridType = {
    gridCol: colWidths.map((w) => ({ width: w })),
  };

  const tableRows: TableTrType[] = rows.map((tr) => parseTableRow(tr as HTMLElement, ctx, colCount));

  const totalWidth = colWidths.reduce((sum, w) => sum + w, 0);
  const totalHeight = tableRows.reduce((sum, tr) => sum + (tr.props.height || 29), 0);

  return {
    type: 'table',
    offset: { x: 0, y: 0 },
    extend: { cx: px2emu(totalWidth), cy: px2emu(totalHeight) },
    tableGrid: gridCol,
    tableRows,
  };
}

function extractTableRows(table: Element): Element[] {
  const rows: Element[] = [];
  const tbody = table.querySelector('thead, tbody, tfoot');
  const container = tbody || table;

  for (const child of Array.from(container.children)) {
    if (child.tagName.toLowerCase() === 'tr') {
      rows.push(child);
    } else if (['thead', 'tbody', 'tfoot'].includes(child.tagName.toLowerCase())) {
      for (const tr of Array.from(child.children)) {
        if (tr.tagName.toLowerCase() === 'tr') rows.push(tr);
      }
    }
  }

  return rows;
}

function getMaxColCount(rows: Element[]): number {
  let max = 0;
  for (const row of rows) {
    let count = 0;
    for (const cell of Array.from(row.children)) {
      const tag = cell.tagName.toLowerCase();
      if (tag === 'td' || tag === 'th') {
        count += parseInt(cell.getAttribute('colspan') || '1', 10);
      }
    }
    if (count > max) max = count;
  }
  return max;
}

/**
 * Read actual column widths from the rendered HTML.
 *
 * table-render.ts sets explicit pixel widths on each <td>:
 *   tdEl.style.width = (cellWidth || 30) + 'px'
 *
 * We scan the first row that has the full column count (accounting for
 * colspan) and read widths from the style attribute.  For merged cells
 * the width is divided equally across the spanned columns.
 *
 * Falls back to equal distribution of a default 800px total.
 */
function extractColumnWidths(rows: Element[], colCount: number): number[] {
  const defaultWidth = 800 / colCount;

  for (const row of rows) {
    const cells = Array.from(row.children).filter((c) => {
      const t = c.tagName.toLowerCase();
      return t === 'td' || t === 'th';
    }) as HTMLElement[];

    // Count logical columns in this row
    let logicalCols = 0;
    for (const cell of cells) {
      logicalCols += parseInt(cell.getAttribute('colspan') || '1', 10);
    }
    if (logicalCols < colCount) continue;

    const widths: number[] = [];
    let gotAll = true;
    for (const cell of cells) {
      const span = parseInt(cell.getAttribute('colspan') || '1', 10);
      const rawWidth = getStyleAttr(cell as HTMLElement, 'width') || cell.getAttribute('width') || '';
      const px = parseFloat(rawWidth);
      if (!Number.isFinite(px) || px <= 0) {
        gotAll = false;
        break;
      }
      // Distribute merged cell width equally
      const perCol = px / span;
      for (let i = 0; i < span; i++) {
        widths.push(perCol);
      }
    }

    if (gotAll && widths.length === colCount) {
      return widths;
    }
  }

  return Array.from({ length: colCount }, () => defaultWidth);
}

function parseTableRow(tr: HTMLElement, ctx: ParserContext, colCount: number): TableTrType {
  const rawHeight = getStyleAttr(tr, 'height');
  const heightPx = parseFloat(rawHeight);
  const rowHeight = Number.isFinite(heightPx) && heightPx > 0 ? heightPx : 29;

  const cells = Array.from(tr.children).filter((c) => {
    const tag = c.tagName.toLowerCase();
    return tag === 'td' || tag === 'th';
  }) as HTMLElement[];

  const td: TableTdType[] = cells.map((cell) => parseTableCell(cell, ctx));

  return {
    props: { height: rowHeight },
    td,
  };
}

function parseTableCell(cell: HTMLElement, ctx: ParserContext): TableTdType {
  const isHeader = cell.tagName.toLowerCase() === 'th';
  const colspan = parseInt(cell.getAttribute('colspan') || '1', 10);
  const rowspan = parseInt(cell.getAttribute('rowspan') || '1', 10);

  const rows = parseInlineContent(cell, {
    size: ctx.defaultFontSize,
    fontFamily: ctx.defaultFontFamily,
    bold: isHeader,
  });

  const paragraphs: ParagraphType[] = [{
    props: {},
    rows: rows.length > 0 ? rows : [{ text: '', props: { size: ctx.defaultFontSize } }],
  }];

  const tdDef: TableTdType = {
    props: {
      marL: 0,
      marR: 0,
      marT: 0,
      marB: 0,
    },
    paragraphs,
  };

  // Read cell background from raw style attribute
  // (JSDOM style.* getters lose CSS values after re-parsing innerHTML)
  const bg = parseCellBackground(cell);
  if (bg) {
    tdDef.props.background = bg;
  }

  // Read cell borders from raw style attribute
  const border = parseCellBorders(cell);
  if (border) {
    tdDef.props.border = border;
  }

  // Read vertical alignment
  const vAlign = getStyleAttr(cell, 'vertical-align');
  if (vAlign === 'middle') tdDef.props.anchor = 'ctr';
  else if (vAlign === 'bottom') tdDef.props.anchor = 'b';

  // Read padding from raw style attribute
  const padL = parseFloat(getStyleAttr(cell, 'padding-left'));
  const padR = parseFloat(getStyleAttr(cell, 'padding-right'));
  const padT = parseFloat(getStyleAttr(cell, 'padding-top'));
  const padB = parseFloat(getStyleAttr(cell, 'padding-bottom'));
  if (Number.isFinite(padL) && padL > 0) tdDef.props.marL = padL;
  if (Number.isFinite(padR) && padR > 0) tdDef.props.marR = padR;
  if (Number.isFinite(padT) && padT > 0) tdDef.props.marT = padT;
  if (Number.isFinite(padB) && padB > 0) tdDef.props.marB = padB;

  if (colspan > 1) tdDef.props.gridSpan = colspan;
  if (rowspan > 1) tdDef.props.rowSpan = rowspan;

  return tdDef;
}

// ---- Style parsing from raw attribute (JSDOM style.* is unreliable) ----

/**
 * Read a CSS property value from the raw `style` attribute string.
 * Falls back to the CSSOM `style.*` getter.
 */
function getStyleAttr(el: HTMLElement, prop: string): string {
  const raw = el.getAttribute('style') || '';
  // Match "prop: value" accounting for border-left, padding-top etc.
  const re = new RegExp(`(?:^|;)\\s*${escapeRegExp(prop)}\\s*:\\s*([^;]+)`, 'i');
  const m = raw.match(re);
  if (m) return m[1].trim();
  // Fallback to CSSOM
  const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return (el.style as any)?.[camelProp] || '';
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function parseCellBackground(cell: HTMLElement): { type: 'solidFill'; color: string } | undefined {
  // Try background-color first (longhand), then background (shorthand)
  const bgColor = getStyleAttr(cell, 'background-color');
  const bg = bgColor || getStyleAttr(cell, 'background');
  if (!bg || bg === 'transparent' || bg === 'none') return undefined;
  const hex = cssColorToHex(bg);
  return hex ? { type: 'solidFill', color: hex } : undefined;
}

function parseCellBorders(cell: HTMLElement): Record<string, any> | undefined {
  const sideProps = [
    { key: 'top', cssProp: 'border-top' },
    { key: 'bottom', cssProp: 'border-bottom' },
    { key: 'left', cssProp: 'border-left' },
    { key: 'right', cssProp: 'border-right' },
  ];
  let hasBorder = false;
  const border: Record<string, any> = {};

  for (const { key, cssProp } of sideProps) {
    const raw = getStyleAttr(cell, cssProp);
    if (!raw) continue;
    const parsed = parseBorderShorthand(raw);
    if (parsed) {
      border[key] = parsed;
      hasBorder = true;
    }
  }

  return hasBorder ? border : undefined;
}

function parseBorderShorthand(raw: string): { width: number; color: { type: 'solidFill'; color: string }; type?: string } | undefined {
  // e.g. "0.5px solid rgb(0, 0, 0)" or "1px dashed #FF0000"
  const match = raw.match(/^([\d.]+)px\s+(solid|dashed|dotted|double|none)\s+(.+)$/i);
  if (!match) return undefined;

  const width = parseFloat(match[1]);
  if (!Number.isFinite(width) || width <= 0) return undefined;

  const style = match[2].toLowerCase();
  if (style === 'none') return undefined;

  const hex = cssColorToHex(match[3]);
  if (!hex) return undefined;

  return {
    width,
    color: { type: 'solidFill', color: hex },
    type: style === 'dashed' ? 'dash' : style === 'dotted' ? 'dot' : undefined,
  };
}

function cssColorToHex(color: string): string | undefined {
  const c = color.trim();
  if (!c || c === 'none' || c === 'transparent') return undefined;

  if (c.startsWith('#')) {
    let hex = c.slice(1);
    if (hex.length === 3) hex = hex.split('').map((ch) => ch + ch).join('');
    if (/^[0-9a-f]{6}$/i.test(hex)) return hex.toUpperCase();
    return undefined;
  }

  const rgba = c.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)/i);
  if (rgba) {
    const r = Math.max(0, Math.min(255, Math.round(parseFloat(rgba[1]))));
    const g = Math.max(0, Math.min(255, Math.round(parseFloat(rgba[2]))));
    const b = Math.max(0, Math.min(255, Math.round(parseFloat(rgba[3]))));
    return [r, g, b].map((v) => v.toString(16).padStart(2, '0').toUpperCase()).join('');
  }

  return undefined;
}
