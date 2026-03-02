/**
 * Debug: generate slide 2 only, inspect the table XML closely.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import HtmlRender from '../src/html-render/HtmlRender';
import { createPptx, setJSDOM } from '../src/writer';
import { parseSlideHtml } from '../src/writer/parser/html-parser';
import JSZip from 'jszip';

describe('Debug slide 2 table', () => {
  it('inspect slide 2 nodes', async () => {
    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(readFileSync(pptxPath)) as any);

    const slide = pptx.slides[1];
    console.log('Slide 2 node count:', slide.nodes.length);
    slide.nodes.forEach((n: any, i: number) => {
      console.log(`  node[${i}]:`, n.constructor.name,
        'offset:', JSON.stringify(n.offset),
        'extend:', JSON.stringify(n.extend));
      if (n.constructor.name === 'TableNode') {
        console.log('    rows:', n.tr?.length, 'gridCols:', n.tableGrid?.gridCol?.length);
        // Show first row's cells
        if (n.tr?.[0]) {
          const firstRow = n.tr[0];
          console.log('    row0 height:', firstRow.props?.height);
          firstRow.td?.forEach((td: any, ci: number) => {
            console.log(`      td[${ci}]:`,
              'gridSpan:', td.props?.gridSpan,
              'rowSpan:', td.props?.rowSpan,
              'vMerge:', td.props?.vMerge,
              'hMerge:', td.props?.hMerge);
          });
        }
      }
    });
  });

  it('render slide 2 HTML and inspect table wrapper', async () => {
    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(readFileSync(pptxPath)) as any);

    const container = document.createElement('div');
    const htmlRender = new HtmlRender(container, pptx, {
      viewPort: { width: 960, height: 0 },
      mode: 'scroll',
    });
    htmlRender.renderSlide(1);

    // Find all tables
    const tables = container.querySelectorAll('table');
    console.log('Tables found in slide 2 HTML:', tables.length);

    tables.forEach((tbl, ti) => {
      const wrapper = tbl.parentElement!;
      console.log(`\nTable ${ti}: wrapper left=${wrapper.style.left} top=${wrapper.style.top} w=${wrapper.style.width} h=${wrapper.style.height}`);

      const trs = tbl.querySelectorAll('tr');
      console.log(`  rows: ${trs.length}`);

      // First 3 rows detail
      for (let ri = 0; ri < Math.min(3, trs.length); ri++) {
        const tr = trs[ri] as HTMLElement;
        console.log(`  tr[${ri}] height=${tr.style.height}`);
        const tds = tr.querySelectorAll('td, th');
        tds.forEach((td, ci) => {
          const tdEl = td as HTMLElement;
          console.log(`    td[${ci}] w=${tdEl.style.width} colspan=${td.getAttribute('colspan')} rowspan=${td.getAttribute('rowspan')} bg=${tdEl.style.background} text="${td.textContent?.slice(0, 30)}"`);
        });
      }
    });
  });

  it('generate slide 2 only PPTX and dump XML', async () => {
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
    htmlRender.renderSlide(1);

    const buffer = await createPptx([{ html: container.innerHTML }]);
    const zip = await JSZip.loadAsync(buffer);
    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');

    // Dump the full graphicFrame sections
    const graphicFrames = slideXml.match(/<p:graphicFrame>[\s\S]*?<\/p:graphicFrame>/g) || [];
    console.log('graphicFrame count:', graphicFrames.length);

    for (let i = 0; i < graphicFrames.length; i++) {
      const gf = graphicFrames[i];
      // Count rows and cells
      const trCount = (gf.match(/<a:tr /g) || []).length;
      const tcCount = (gf.match(/<a:tc[ >]/g) || []).length;
      const gridColCount = (gf.match(/<a:gridCol /g) || []).length;

      // Extract offset
      const offMatch = gf.match(/<a:off x="(\d+)" y="(\d+)"/);
      const extMatch = gf.match(/<a:ext cx="(\d+)" cy="(\d+)"/);
      console.log(`\ngraphicFrame[${i}]: rows=${trCount} cells=${tcCount} gridCols=${gridColCount}`);
      if (offMatch) console.log(`  offset: x=${offMatch[1]} y=${offMatch[2]}`);
      if (extMatch) console.log(`  extent: cx=${extMatch[1]} cy=${extMatch[2]}`);

      // Check for gridSpan on tc vs tcPr
      if (gf.includes('gridSpan')) {
        console.log(`  gridSpan on <a:tc>:`, !!(gf.match(/<a:tc[^>]*gridSpan/)));
        console.log(`  gridSpan on <a:tcPr[^>]*>:`, !!(gf.match(/<a:tcPr[^>]*gridSpan/)));
      }

      // First 500 chars for inspection
      console.log(`  XML preview: ${gf.slice(0, 800)}...`);
    }

    const outDir = resolve(__dirname, '../writer-output');
    mkdirSync(outDir, { recursive: true });
    writeFileSync(resolve(outDir, 'coastal-slide2-only.pptx'), Buffer.from(buffer));
    // Also dump full slide XML for inspection
    writeFileSync(resolve(outDir, 'coastal-slide2-slide1.xml'), slideXml);
    console.log('\nWrote slide 2 PPTX and XML');
  });
});
