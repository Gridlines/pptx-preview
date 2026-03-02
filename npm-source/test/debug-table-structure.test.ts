/**
 * Debug: inspect the HTML table structure of slide 4 (index 3)
 * to understand cell counts, colspans, and logical column widths per row.
 */
import { describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import HtmlRender from '../src/html-render/HtmlRender';

describe('Debug table structure - slide 4', () => {
  it('log cell counts, colspans, and grid column count for each table', async () => {
    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(readFileSync(pptxPath)) as any);

    const container = document.createElement('div');
    const htmlRender = new HtmlRender(container, pptx, {
      viewPort: { width: 960, height: 0 },
      mode: 'scroll',
    });
    htmlRender.renderSlide(3);

    const tables = container.querySelectorAll('table');
    console.log(`\n=== Slide 4: found ${tables.length} table(s) ===\n`);

    tables.forEach((tbl, ti) => {
      console.log(`--- Table ${ti} ---`);
      const trs = tbl.querySelectorAll('tr');
      let maxLogicalCols = 0;

      trs.forEach((tr, ri) => {
        const cells = tr.querySelectorAll('td, th');
        let logicalCols = 0;
        const cellDetails: string[] = [];

        cells.forEach((cell) => {
          const colspanAttr = cell.getAttribute('colspan');
          const colspan = colspanAttr ? parseInt(colspanAttr, 10) : 1;
          const text = (cell.textContent || '').slice(0, 15).replace(/\n/g, '\\n');
          logicalCols += colspan;
          cellDetails.push(`[cs=${colspan} "${text}"]`);
        });

        if (logicalCols > maxLogicalCols) {
          maxLogicalCols = logicalCols;
        }

        console.log(
          `  row[${ri}]: ${cells.length} cell(s), logical cols=${logicalCols}  ${cellDetails.join(' ')}`
        );
      });

      console.log(`  >> Grid column count (max logical cols): ${maxLogicalCols}\n`);
    });
  });
});
