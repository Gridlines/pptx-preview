import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';
import ChartNode from '../src/reader/node/ChartNode';

function walk(nodes: any[], out: any[] = []): any[] {
  for (const n of nodes || []) {
    out.push(n);
    if (n.nodes) walk(n.nodes, out);
  }
  return out;
}

describe('Chart Data Labels Parsing', () => {
  it('parses slide 2 chart data labels into series label options', async () => {
    const pptxPath = resolve(__dirname, 'fixtures/coastal-greenlight.pptx');
    const pptx = new PPTX();
    await pptx.load(new Uint8Array(readFileSync(pptxPath)) as any);

    const slide2 = pptx.slides[1] as any;
    const charts = walk(slide2.nodes || []).filter((n: any) => n instanceof ChartNode);
    expect(charts.length).toBe(3);

    const retransChart = charts.find((c: any) => c.offset?.x === 403 && c.offset?.y === 462);
    expect(retransChart).toBeTruthy();
    expect(retransChart.options.series[0].label?.show).toBe(true);
    expect(retransChart.options.yAxis?.min).toBe(0);
    expect(retransChart.options.yAxis?.max).toBe(17);
    expect(retransChart.options.yAxis?.show).toBe(false);
    expect(retransChart.options.color[2]).toBe('transparent');

    const comboChart = charts.find((c: any) => c.extend?.w === 357 && c.extend?.h === 121 && c.offset?.x === 0 && c.offset?.y === 0);
    expect(comboChart).toBeTruthy();
    expect(comboChart.options.series[0].label?.show).toBe(true);
    expect(comboChart.options.series[4].label?.show).toBe(true);
    expect(comboChart.options.series[4].label?.position).toBe('top');
    expect(comboChart.options.color[4]).toBe('transparent');
    expect(typeof comboChart.options.series[0].label?.formatter).toBe('function');
    expect(comboChart.options.series[0].label.formatter({ value: 6.5275114574287301 })).toBe('6.5');
    expect(comboChart.options.series[4].label.formatter({ value: 20.357711198966602 })).toBe('$20');

    const lineChart = charts.find((c: any) => c.offset?.x === 22 && c.offset?.y === 467);
    expect(lineChart).toBeTruthy();
    expect(lineChart.options.series[0].label?.show).toBe(true);
    expect(lineChart.options.series[0].label?.position).toBe('top');
    expect(lineChart.options.series[1].label?.show).toBe(true);
    expect(lineChart.options.series[1].label?.position).toBe('bottom');
  });
});
