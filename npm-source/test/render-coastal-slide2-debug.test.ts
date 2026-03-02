import { describe, it, expect } from 'vitest';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import HtmlRender from '../src/html-render/HtmlRender';

describe('Render coastal slide 2 debug HTML', () => {
  it('renders slide 2 and writes coastal-slide2-debug.html', async () => {
    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptxBuffer = readFileSync(pptxPath);
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(pptxBuffer) as any);

    const container = document.createElement('div');
    const htmlRender = new HtmlRender(container, pptx, {
      viewPort: { width: 960, height: 0 },
      mode: 'scroll',
    });

    htmlRender.renderSlide(1);

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Coastal Greenlight - Slide 2 Debug</title>
<style>
  body { margin:0; padding:20px; background:#444; display:flex; flex-direction:column; align-items:center; }
  .pptx-preview-slide-wrapper { box-shadow: 0 2px 12px rgba(0,0,0,0.4); border-radius: 4px; }
</style>
</head>
<body>
${container.innerHTML}
</body>
</html>`;

    const outDir = resolve(__dirname, '../slide-captures');
    mkdirSync(outDir, { recursive: true });
    const outPath = resolve(outDir, 'coastal-slide2-debug.html');
    writeFileSync(outPath, html);

    expect(container.innerHTML).toContain('pptx-preview-slide-wrapper');
  });
});
