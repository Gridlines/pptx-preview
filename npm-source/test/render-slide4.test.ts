/**
 * Render all slides of Coastal Greenlight PPTX to HTML and save to slide-captures/
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import HtmlRender from '../src/html-render/HtmlRender';

describe('Render all slides to HTML', () => {
  it('should render and save all slides to a single HTML', async () => {
    const pptxPath = '/Users/stephaniegoldman/gridlines/new_features/mgg/folder/files/WFG Greenlight vf.pptx';
    const pptxBuffer = readFileSync(pptxPath);
    const uint8 = new Uint8Array(pptxBuffer);

    const pptx = new PPTX();
    await pptx.load(uint8 as any);

    const slideCount = pptx.slides.length;
    console.log(`Found ${slideCount} slides`);

    const container = document.createElement('div');
    const htmlRender = new HtmlRender(container, pptx, {
      viewPort: { width: 960, height: 0 },
      mode: 'scroll',
    });

    // Render all slides
    for (let i = 0; i < slideCount; i++) {
      htmlRender.renderSlide(i);
    }

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>WFG Greenlight vf - All Slides</title>
<style>
  body { margin:0; padding:20px; background:#444; display:flex; flex-direction:column; align-items:center; }
  .pptx-preview-slide-wrapper { box-shadow: 0 2px 12px rgba(0,0,0,0.4); border-radius: 4px; }
  h2 { color: #fff; font-family: sans-serif; margin: 18px 0 6px; }
</style>
</head>
<body>
${container.innerHTML}
</body>
</html>`;

    const outDir = resolve(__dirname, '../slide-captures');
    mkdirSync(outDir, { recursive: true });
    const outPath = resolve(outDir, 'wfg-greenlight-all-slides.html');
    writeFileSync(outPath, html);

    expect(slideCount).toBeGreaterThan(0);
    console.log(`Wrote ${slideCount} slides to ${outPath}`);
  });
});
