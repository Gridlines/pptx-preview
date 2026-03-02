import { describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import HtmlRender from '../src/html-render/HtmlRender';
import { setJSDOM } from '../src/writer';

describe('Table cell background pipeline', () => {
  it('checks bg survival through innerHTML serialization', async () => {
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

    const html = container.innerHTML;

    // Find the 2023A text and extract surrounding HTML
    const idx = html.indexOf('2023A');
    if (idx >= 0) {
      // Show 300 chars before and 100 after
      const start = Math.max(0, idx - 300);
      const end = Math.min(html.length, idx + 100);
      console.log('=== HTML around "2023A" ===');
      console.log(html.slice(start, end));
    }

    // Also check: does any <td> have a style attribute?
    const tdStyles = html.match(/<td[^>]*style="[^"]*"/g) || [];
    console.log(`\n<td> elements with style attr: ${tdStyles.length}`);
    if (tdStyles.length > 0) {
      console.log('First 3:', tdStyles.slice(0, 3));
    }

    // Check if background appears anywhere near table cells
    const bgInTd = html.match(/<td[^>]*background[^>]*>/g) || [];
    console.log(`<td> with "background" in attrs: ${bgInTd.length}`);
  });
});
