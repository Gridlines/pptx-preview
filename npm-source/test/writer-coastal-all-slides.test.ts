/**
 * Render all slides of Coastal Greenlight PPTX to HTML, then run the writer
 * to produce a single multi-slide PPTX output.
 *
 * Output goes to writer-output/ (slide-captures/ is reserved for HTML).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import HtmlRender from '../src/html-render/HtmlRender';
import { createPptx, setJSDOM } from '../src/writer';

describe('Writer: coastal-greenlight all slides', () => {
  it('renders all slides to HTML then writes a PPTX', async () => {
    // Need JSDOM for the writer parser in Node/vitest
    const { JSDOM } = await import('jsdom');
    setJSDOM(JSDOM as any);

    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptxBuffer = readFileSync(pptxPath);

    const pptx = new PPTX();
    await pptx.load(new Uint8Array(pptxBuffer) as any);

    const slideCount = pptx.slides.length;
    console.log(`Found ${slideCount} slides in coastal-greenlight.pptx`);

    // Render each slide individually so we get one HTML string per slide
    const slideHtmls: string[] = [];
    for (let i = 0; i < slideCount; i++) {
      const container = document.createElement('div');
      const htmlRender = new HtmlRender(container, pptx, {
        viewPort: { width: 960, height: 0 },
        mode: 'scroll',
      });
      htmlRender.renderSlide(i);
      slideHtmls.push(container.innerHTML);
    }

    // Build SlideInput array for the writer
    const slideInputs = slideHtmls.map((html) => ({ html }));

    // Generate PPTX
    const buffer = await createPptx(slideInputs);
    expect(buffer.byteLength).toBeGreaterThan(0);

    // Write to writer-output/ folder
    const outDir = resolve(__dirname, '../writer-output');
    mkdirSync(outDir, { recursive: true });
    const outPath = resolve(outDir, 'coastal-greenlight-all-slides.pptx');
    writeFileSync(outPath, Buffer.from(buffer));

    console.log(`Wrote ${slideCount}-slide PPTX to ${outPath}`);

    expect(slideCount).toBeGreaterThan(0);
  });
});
