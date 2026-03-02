/**
 * Debug: generate slide 4 only, inspect table XML.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import HtmlRender from '../src/html-render/HtmlRender';
import { createPptx, setJSDOM } from '../src/writer';
import { parseSlideHtml } from '../src/writer/parser/html-parser';
import JSZip from 'jszip';

describe('Debug slide 4 tables', () => {
  it('render slide 4 HTML and inspect table wrappers', async () => {
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
    console.log('Tables found:', tables.length);

    tables.forEach((tbl, ti) => {
      const wrapper = tbl.parentElement!;
      const styleAttr = wrapper.getAttribute('style') || '';
      console.log(`\nTable ${ti}: wrapper style="${styleAttr}"`);

      const trs = tbl.querySelectorAll('tr');
      console.log(`  rows: ${trs.length}`);

      // First 3 rows
      for (let ri = 0; ri < Math.min(3, trs.length); ri++) {
        const tr = trs[ri] as HTMLElement;
        const trStyle = tr.getAttribute('style') || '';
        console.log(`  tr[${ri}] style="${trStyle}"`);
        const tds = tr.querySelectorAll('td, th');
        for (let ci = 0; ci < Math.min(4, tds.length); ci++) {
          const td = tds[ci] as HTMLElement;
          const tdStyle = td.getAttribute('style') || '';
          console.log(`    td[${ci}] style="${tdStyle.slice(0, 120)}..." text="${td.textContent?.slice(0, 20)}"`);
        }
      }
    });
  });

  it('generate slide 4 only PPTX and check tables', async () => {
    const { JSDOM } = await import('jsdom');
    setJSDOM(JSDOM as any);

    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(readFileSync(pptxPath)) as any);

    const container = document.createElement('div');
    const htmlRender = new HtmlRender(container, pptx, {
      viewPort: { width: 960, height: 0 },
      mode: 'scroll',
    });
    htmlRender.renderSlide(3);

    const slideDef = parseSlideHtml(container.innerHTML);
    const tableShapes = slideDef.shapes.filter(s => s.type === 'table');
    console.log(`\nParsed table shapes: ${tableShapes.length}`);
    for (const t of tableShapes) {
      console.log(`  offset=(${t.offset.x}, ${t.offset.y}) extend=(${t.extend.cx}, ${t.extend.cy}) rows=${t.tableRows?.length} cols=${t.tableGrid?.gridCol.length}`);
      // Check first row cells
      if (t.tableRows?.[0]) {
        const row0 = t.tableRows[0];
        console.log(`    row0: height=${row0.props.height} cells=${row0.td.length}`);
        for (let ci = 0; ci < Math.min(3, row0.td.length); ci++) {
          const td = row0.td[ci];
          const text = td.paragraphs?.[0]?.rows?.[0]?.text || '';
          console.log(`      td[${ci}]: bg=${JSON.stringify(td.props.background)} border=${td.props.border ? 'yes' : 'no'} text="${text.slice(0, 20)}"`);
        }
      }
    }

    const buffer = await createPptx([{ html: container.innerHTML }]);
    const zip = await JSZip.loadAsync(buffer);
    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');

    const graphicFrames = slideXml.match(/<p:graphicFrame>[\s\S]*?<\/p:graphicFrame>/g) || [];
    console.log(`\ngraphicFrame count: ${graphicFrames.length}`);
    for (let i = 0; i < graphicFrames.length; i++) {
      const gf = graphicFrames[i];
      const trCount = (gf.match(/<a:tr /g) || []).length;
      const tcCount = (gf.match(/<a:tc[ >]/g) || []).length;
      const gridColCount = (gf.match(/<a:gridCol /g) || []).length;
      const offMatch = gf.match(/<a:off x="(\d+)" y="(\d+)"/);
      const extMatch = gf.match(/<a:ext cx="(\d+)" cy="(\d+)"/);
      console.log(`  frame[${i}]: rows=${trCount} cells=${tcCount} gridCols=${gridColCount} off=(${offMatch?.[1]},${offMatch?.[2]}) ext=(${extMatch?.[1]},${extMatch?.[2]})`);
    }

    const outDir = resolve(__dirname, '../writer-output');
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'coastal-slide4-only.pptx'), Buffer.from(buffer));
    console.log('Wrote coastal-slide4-only.pptx');
  });
});
