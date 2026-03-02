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

  const defaultColWidth = 800 / colCount; // in px, will be proportioned
  const gridCol: TableGridType = {
    gridCol: Array.from({ length: colCount }, () => ({ width: defaultColWidth })),
  };

  const tableRows: TableTrType[] = rows.map((tr) => parseTableRow(tr, ctx, colCount));

  const totalWidth = gridCol.gridCol.reduce((sum, col) => sum + col.width, 0);
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

function parseTableRow(tr: Element, ctx: ParserContext, colCount: number): TableTrType {
  const cells = Array.from(tr.children).filter((c) => {
    const tag = c.tagName.toLowerCase();
    return tag === 'td' || tag === 'th';
  });

  const td: TableTdType[] = cells.map((cell) => {
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
        marL: 4,
        marR: 4,
        marT: 4,
        marB: 4,
        border: {
          left: { width: 1, color: { type: 'solidFill', color: 'D9D9D9' } },
          right: { width: 1, color: { type: 'solidFill', color: 'D9D9D9' } },
          top: { width: 1, color: { type: 'solidFill', color: 'D9D9D9' } },
          bottom: { width: 1, color: { type: 'solidFill', color: 'D9D9D9' } },
        },
      },
      paragraphs,
    };

    if (colspan > 1) tdDef.props.gridSpan = colspan;
    if (rowspan > 1) tdDef.props.rowSpan = rowspan;

    return tdDef;
  });

  return {
    props: { height: 29 },
    td,
  };
}
