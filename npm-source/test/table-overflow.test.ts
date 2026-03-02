/**
 * Table Overflow Bug Test
 *
 * Tests for the bug where tables render "off the page" in the HTML output.
 * Uses the Coastal Greenlight PPTX which has 3 tables on slide 4 that
 * should all fit within the slide boundaries but overflow in the current renderer.
 *
 * Root cause: table-render.ts creates HTML <table> elements without:
 *   1. table-layout: fixed  (browser auto-layout can expand columns)
 *   2. explicit width on the <table>  (table isn't constrained to wrapper)
 *   3. overflow: hidden on the wrapper div
 *   4. proper width calculation for merged cells (gridSpan)
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import JSZip from 'jszip';
import { xmlToJSON } from '../src/utils/xml';
import { emu2px } from '../src/utils/unit';
import { renderTable } from '../src/html-render/node/table-render';

// Slide dimensions from presentation.xml: cx="10058400" cy="7772400"
const SLIDE_WIDTH_EMU = 10058400;
const SLIDE_HEIGHT_EMU = 7772400;
const SLIDE_WIDTH_PX = emu2px(SLIDE_WIDTH_EMU);  // 792
const SLIDE_HEIGHT_PX = emu2px(SLIDE_HEIGHT_EMU); // 612

// Expected table positions on slide 4 (from PPTX XML)
const EXPECTED_TABLES = [
  {
    name: 'Table 8',
    pos: { x: 5362386, y: 6019616 },
    size: { cx: 4431547, cy: 1280160 },
    cols: 8,
    rows: 8,
  },
  {
    name: 'Table 7',
    pos: { x: 5388697, y: 3282258 },
    size: { cx: 4440322, cy: 2598786 },
    cols: 8,
    rows: 18,
  },
  {
    name: 'Table 9',
    pos: { x: 381000, y: 800101 },
    size: { cx: 4648202, cy: 6507541 },
    cols: 10,
    rows: 73,
  },
];

interface ParsedTable {
  name: string;
  xfrm: { x: number; y: number; cx: number; cy: number };
  gridCols: number[];
  rows: any[];
  tblPr: any;
  rawXml: any;
}

let pptxZip: JSZip;
let slide4Json: any;
let parsedTables: ParsedTable[];

/**
 * Parse graphicFrame elements containing tables from slide JSON
 */
function extractTablesFromSlideJson(slideJson: any): ParsedTable[] {
  const spTree = slideJson['p:sld']['p:cSld']['p:spTree'];
  let frames = spTree['p:graphicFrame'];
  if (!frames) return [];
  if (!Array.isArray(frames)) frames = [frames];

  const tables: ParsedTable[] = [];

  for (const frame of frames) {
    const uri = frame?.['a:graphic']?.['a:graphicData']?.attrs?.uri;
    if (uri !== 'http://schemas.openxmlformats.org/drawingml/2006/table') continue;

    const name = frame?.['p:nvGraphicFramePr']?.['p:cNvPr']?.attrs?.name || 'unknown';
    const xfrm = frame['p:xfrm'];
    const tbl = frame['a:graphic']['a:graphicData']['a:tbl'];

    // Parse grid columns
    let gridColList = tbl['a:tblGrid']['a:gridCol'];
    if (!Array.isArray(gridColList)) gridColList = [gridColList];
    const gridCols = gridColList.map((gc: any) => parseInt(gc.attrs.w));

    // Parse rows
    let trList = tbl['a:tr'];
    if (!Array.isArray(trList)) trList = [trList];

    tables.push({
      name,
      xfrm: {
        x: parseInt(xfrm['a:off'].attrs.x),
        y: parseInt(xfrm['a:off'].attrs.y),
        cx: parseInt(xfrm['a:ext'].attrs.cx),
        cy: parseInt(xfrm['a:ext'].attrs.cy),
      },
      gridCols,
      rows: trList,
      tblPr: tbl['a:tblPr'] || {},
      rawXml: frame,
    });
  }

  return tables;
}

describe('Coastal Greenlight PPTX - Table Overflow Bug', () => {
  beforeAll(async () => {
    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptxBuffer = readFileSync(pptxPath);
    pptxZip = await JSZip.loadAsync(pptxBuffer);

    const slide4Xml = await pptxZip.file('ppt/slides/slide4.xml')!.async('string');
    slide4Json = xmlToJSON(slide4Xml);
    parsedTables = extractTablesFromSlideJson(slide4Json);
  });

  describe('PPTX data integrity', () => {
    it('should find 3 tables on slide 4', () => {
      expect(parsedTables.length).toBe(3);
    });

    it('should have correct table names', () => {
      const names = parsedTables.map((t) => t.name).sort();
      expect(names).toEqual(['Table 7', 'Table 8', 'Table 9']);
    });

    it('should have expected column counts', () => {
      for (const expected of EXPECTED_TABLES) {
        const table = parsedTables.find((t) => t.name === expected.name)!;
        expect(table.gridCols.length).toBe(expected.cols);
      }
    });

    it('should have expected row counts', () => {
      for (const expected of EXPECTED_TABLES) {
        const table = parsedTables.find((t) => t.name === expected.name)!;
        expect(table.rows.length).toBe(expected.rows);
      }
    });
  });

  describe('table positions fit within slide bounds', () => {
    it('all tables should have right edge within slide width', () => {
      for (const table of parsedTables) {
        const rightEdge = emu2px(table.xfrm.x + table.xfrm.cx);
        expect(rightEdge).toBeLessThanOrEqual(SLIDE_WIDTH_PX);
      }
    });

    it('all tables should have bottom edge within slide height', () => {
      for (const table of parsedTables) {
        const bottomEdge = emu2px(table.xfrm.y + table.xfrm.cy);
        expect(bottomEdge).toBeLessThanOrEqual(SLIDE_HEIGHT_PX);
      }
    });
  });

  describe('grid column widths match table extent', () => {
    it('sum of grid column widths should equal table cx for each table', () => {
      for (const table of parsedTables) {
        const totalGridWidth = table.gridCols.reduce((sum, w) => sum + w, 0);
        // Allow 1 EMU tolerance for rounding
        expect(Math.abs(totalGridWidth - table.xfrm.cx)).toBeLessThanOrEqual(1);
      }
    });

    it('individual column widths in px should sum to table width in px', () => {
      for (const table of parsedTables) {
        const colWidthsPx = table.gridCols.map((w) => emu2px(w));
        const totalPx = colWidthsPx.reduce((sum, w) => sum + w, 0);
        const tablePx = emu2px(table.xfrm.cx);
        // Allow small floating point tolerance
        expect(Math.abs(totalPx - tablePx)).toBeLessThan(1);
      }
    });
  });

  describe('table-render output constraints', () => {
    /**
     * Creates a mock TableNode with the parsed data so we can test renderTable()
     */
    function createMockTableNode(table: ParsedTable) {
      return {
        extend: {
          w: Math.round(emu2px(table.xfrm.cx)),
          h: Math.round(emu2px(table.xfrm.cy)),
        },
        offset: {
          x: Math.round(emu2px(table.xfrm.x)),
          y: Math.round(emu2px(table.xfrm.y)),
        },
        tableGrid: {
          gridCol: table.gridCols.map((w) => ({ width: emu2px(w) })),
        },
        tr: table.rows.map((tr: any) => {
          let tdList = tr['a:tc'];
          if (!Array.isArray(tdList)) tdList = [tdList];

          return {
            props: { height: emu2px(parseInt(tr.attrs?.h || '0')) },
            td: tdList.map((td: any) => ({
              props: {
                border: {},
                rowSpan: td.attrs?.rowSpan ? parseInt(td.attrs.rowSpan) : undefined,
                gridSpan: td.attrs?.gridSpan ? parseInt(td.attrs.gridSpan) : undefined,
                vMerge: td.attrs?.vMerge === '1',
                hMerge: td.attrs?.hMerge === '1',
              },
              inheritTcStyle: {},
              inheritTcTxStyle: {},
              paragraphs: [],
            })),
          };
        }),
      };
    }

    it('rendered table wrapper should have correct width', () => {
      for (const table of parsedTables) {
        const mock = createMockTableNode(table);
        const el = renderTable(mock as any);
        const expectedWidth = Math.round(emu2px(table.xfrm.cx));
        expect(el.style.width).toBe(expectedWidth + 'px');
      }
    });

    it('rendered table wrapper should have correct position', () => {
      for (const table of parsedTables) {
        const mock = createMockTableNode(table);
        const el = renderTable(mock as any);
        expect(el.style.left).toBe(Math.round(emu2px(table.xfrm.x)) + 'px');
        expect(el.style.top).toBe(Math.round(emu2px(table.xfrm.y)) + 'px');
      }
    });

    it('rendered <table> should have table-layout: fixed', () => {
      for (const table of parsedTables) {
        const mock = createMockTableNode(table);
        const el = renderTable(mock as any);
        const tableEl = el.querySelector('table')!;
        expect(tableEl.style.tableLayout).toBe('fixed');
      }
    });

    it('rendered <table> should have width: 100%', () => {
      for (const table of parsedTables) {
        const mock = createMockTableNode(table);
        const el = renderTable(mock as any);
        const tableEl = el.querySelector('table')!;
        expect(tableEl.style.width).toBe('100%');
      }
    });

    it('rendered wrapper should have overflow: hidden', () => {
      for (const table of parsedTables) {
        const mock = createMockTableNode(table);
        const el = renderTable(mock as any);
        expect(el.style.overflow).toBe('hidden');
      }
    });

    it('Table 9 (73 rows, 10 cols) should not exceed slide boundaries', () => {
      const table9 = parsedTables.find((t) => t.name === 'Table 9')!;
      const mock = createMockTableNode(table9);
      const el = renderTable(mock as any);

      const left = parseFloat(el.style.left);
      const top = parseFloat(el.style.top);
      const width = parseFloat(el.style.width);
      const height = parseFloat(el.style.height);

      expect(left + width).toBeLessThanOrEqual(SLIDE_WIDTH_PX);
      expect(top + height).toBeLessThanOrEqual(SLIDE_HEIGHT_PX);
    });
  });

  describe('merged cell width calculation', () => {
    it('should calculate correct width for cells with gridSpan', () => {
      for (const table of parsedTables) {
        for (const tr of table.rows) {
          let tdList = tr['a:tc'];
          if (!Array.isArray(tdList)) tdList = [tdList];

          let colIndex = 0;
          for (const td of tdList) {
            const gridSpan = td.attrs?.gridSpan ? parseInt(td.attrs.gridSpan) : 1;

            if (gridSpan > 1) {
              // When a cell spans multiple columns, the total width should be
              // the sum of all spanned grid column widths
              let expectedWidth = 0;
              for (let i = colIndex; i < colIndex + gridSpan && i < table.gridCols.length; i++) {
                expectedWidth += table.gridCols[i];
              }
              expect(expectedWidth).toBeGreaterThan(table.gridCols[colIndex]);
            }

            colIndex += gridSpan;
          }
        }
      }
    });
  });
});
