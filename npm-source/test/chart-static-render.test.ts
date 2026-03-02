import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import HtmlRender from '../src/html-render/HtmlRender';

function extractChartSvgSection(html: string, marker: string): string {
  const start = html.indexOf(marker);
  expect(start).toBeGreaterThan(-1);
  const end = html.indexOf('</svg>', start);
  expect(end).toBeGreaterThan(start);
  return html.slice(start, end);
}

function firstPathByFill(svgSection: string, fill: string): string {
  const re = new RegExp(`<path d=\"([^\"]+)\" fill=\"${fill}\"`);
  const match = svgSection.match(re);
  expect(match?.[1]).toBeTruthy();
  return match![1];
}

describe('Static Chart Rendering', () => {
  it('renders non-zero bar heights for slide 2 charts in jsdom captures', async () => {
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
    const html = container.innerHTML;

    const retransChart = extractChartSvgSection(
      html,
      'left: 403px; top: 462px; width: 334px; height: 114px;'
    );
    const retransBarPath = firstPathByFill(retransChart, 'rgb\\(21,54,92\\)');
    expect(retransBarPath).toMatch(/l0 -[0-9.]+l-/);
    expect(/fill=\"(rgb\(201,201,201\)|rgba\(201,201,201,1\)|#C9C9C9)\"/.test(retransChart)).toBe(true);

    const industryAdChart = extractChartSvgSection(
      html,
      'left: 0px; top: 0px; width: 357px; height: 121px;'
    );
    const industryAdBarPath = firstPathByFill(industryAdChart, 'rgb\\(21,54,92\\)');
    expect(industryAdBarPath).toMatch(/l0 -[0-9.]+l-/);

    const comboLine = industryAdChart.match(
      /<path d=\"([^\"]+L[^\"]+L[^\"]+)\" fill=\"none\" stroke=\"([^\"]+)\" stroke-width=\"2\"/
    );
    expect(comboLine).toBeTruthy();
    expect(comboLine![2]).not.toBe('none');
    expect(new Set(['#5B9BD5', 'rgb(91,155,213)']).has(comboLine![2])).toBe(true);
    expect(industryAdChart).toContain('>6.5<');
    expect(industryAdChart).toContain('>$20<');
    expect(industryAdChart).not.toContain('20.357711198966602');
  });
});
