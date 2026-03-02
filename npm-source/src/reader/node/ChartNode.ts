import { get } from 'lodash';
import Node from './Node';
import PPTX from '../PPTX';
import Slide from '../Slide';
import SlideLayout from '../SlideLayout';
import SlideMaster from '../SlideMaster';
import Group from '../Group';
import Theme from '../Theme';
import { xmlToJSON } from '../../utils/xml';
import { getSolidFillColor, getRenderColor } from '../../utils/color';

export default class ChartNode extends Node {
  pptx: PPTX;
  options: any;
  userDrawn: boolean;

  get slideMaster(): any {
    return this.ctx.slideMaster || this.ctx;
  }

  get theme(): Theme {
    return this.slideMaster.theme;
  }

  constructor(source: any, pptx: PPTX, ctx: Slide | SlideLayout | SlideMaster, group?: Group) {
    super(source, ctx, group);
    this.options = {
      title: {},
      tooltip: {},
      legend: {},
      series: [],
      color: [],
    };
    this.userDrawn = true;
    this.pptx = pptx;
  }

  async parseNode(): Promise<void> {
    try {
      const chartRelId = get(this.source, [
        'a:graphic', 'a:graphicData', 'c:chart', 'attrs', 'r:id',
      ]);

      if (!chartRelId || !this.ctx.rels[chartRelId]) return;

      const chartPath = this.ctx.rels[chartRelId].target;
      const chartXml = await this.pptx.getXmlByPath(chartPath);
      const chartJson = xmlToJSON(chartXml);

      const chart = get(chartJson, ['c:chartSpace', 'c:chart']);
      const plotArea = get(chart, ['c:plotArea']);

      // Parse the primary chart type (bar takes priority for combo charts)
      if (get(plotArea, ['c:barChart'])) {
        this.parseBar(get(plotArea, ['c:barChart']), chart);
      } else if (get(plotArea, ['c:bar3DChart'])) {
        this.parseBar(get(plotArea, ['c:bar3DChart']), chart);
      } else if (get(plotArea, ['c:lineChart'])) {
        this.parseLine(get(plotArea, ['c:lineChart']), chart);
      } else if (get(plotArea, ['c:line3DChart'])) {
        this.parseLine(get(plotArea, ['c:line3DChart']), chart);
      } else if (get(plotArea, ['c:areaChart'])) {
        this.parseAreaLine(get(plotArea, ['c:areaChart']), chart);
      } else if (get(plotArea, ['c:area3DChart'])) {
        this.parseAreaLine(get(plotArea, ['c:area3DChart']), chart);
      } else if (get(plotArea, ['c:pieChart'])) {
        this.parsePie(get(plotArea, ['c:pieChart']));
      } else if (get(plotArea, ['c:pie3DChart'])) {
        this.parsePie(get(plotArea, ['c:pie3DChart']));
      } else if (get(plotArea, ['c:doughnutChart'])) {
        this.parseDoughnutChart(get(plotArea, ['c:doughnutChart']));
      }

      // Overlay a line chart on top of bar chart (combo chart)
      if (get(plotArea, ['c:barChart']) || get(plotArea, ['c:bar3DChart'])) {
        const lineData = get(plotArea, ['c:lineChart']) || get(plotArea, ['c:line3DChart']);
        if (lineData) {
          let lineSeries = get(lineData, ['c:ser']);
          if (!Array.isArray(lineSeries)) lineSeries = [lineSeries];
          this.options.series.push(...this.parseLineSeries(lineSeries, lineData));
          this.options.color.push(...this.parseLineColors(lineSeries));
        }
      }

      // Apply axis config from plotArea (hide deleted axes, set min/max)
      this.parseAxes(plotArea);
    } catch (e) {
      // silently ignore chart parse errors
    }
  }

  private parseAreaLine(chartData: any, chartRoot: any) {
    this.parseLine(chartData, chartRoot);
    this.options.series = this.options.series.map((s: any) => {
      s.areaStyle = {};
      return s;
    });
  }

  private parseLine(chartData: any, chartRoot: any) {
    let series = get(chartData, ['c:ser']);
    if (!Array.isArray(series)) series = [series];

    const titleText = this.parseChartTitle(get(chartRoot, ['c:title']));
    this.options.title = titleText
      ? { top: 'top', left: 'center', text: titleText }
      : { show: false };
    this.options.xAxis = { type: 'category', data: this.getCategory(series[0]) };
    this.options.yAxis = { type: 'value' };
    this.options.series = this.parseLineSeries(series, chartData);
    this.options.color = this.parseLineColors(series);
    this.options.legend = { bottom: 'bottom', left: 'center' };

    if (get(chartData, ['c:grouping', 'attrs', 'val']) === 'percentStacked') {
      this.options.tooltip.valueFormatter = (v: number) => (100 * v).toFixed(2) + '%';
    }
  }

  private parseBar(chartData: any, chartRoot: any) {
    let series = get(chartData, ['c:ser']);
    if (!Array.isArray(series)) series = [series];

    const titleText = this.parseChartTitle(get(chartRoot, ['c:title']));
    this.options.title = titleText
      ? { top: 'top', left: 'center', text: titleText }
      : { show: false };

    if (get(chartData, ['c:barDir', 'attrs', 'val']) === 'bar') {
      this.options.yAxis = { type: 'category', data: this.getCategory(series[0]) };
      this.options.xAxis = { type: 'value' };
    } else {
      this.options.xAxis = { type: 'category', data: this.getCategory(series[0]) };
      this.options.yAxis = { type: 'value' };
    }

    this.options.series = this.parseBarSeries(series, chartData);
    this.options.color = this.parseBarColors(series);
    this.options.legend = { bottom: 'bottom', left: 'center' };

    // Apply bar overlap and gap width
    const overlap = get(chartData, ['c:overlap', 'attrs', 'val']);
    const gapWidth = get(chartData, ['c:gapWidth', 'attrs', 'val']);
    if (overlap) {
      // OOXML overlap 100 = fully overlapping = echarts barGap '-100%'
      this.options.series.forEach((s: any) => {
        if (s.type === 'bar') s.barGap = `-${overlap}%`;
      });
    }
    if (gapWidth !== undefined) {
      this.options.series.forEach((s: any) => {
        if (s.type === 'bar') s.barCategoryGap = `${gapWidth}%`;
      });
    }

    if (get(chartData, ['c:grouping', 'attrs', 'val']) === 'percentStacked') {
      this.options.tooltip.valueFormatter = (v: number) => (100 * v).toFixed(2) + '%';
    }
  }

  private parsePie(chartData: any) {
    const ser = get(chartData, ['c:ser']);
    this.options.title = { top: 'top', left: 'center', text: this.parsePieTitle(ser) };
    this.options.color = this.parsePieColors(ser);
    this.options.series = [this.parsePieSeries(ser, chartData)];
    this.options.legend = { bottom: 'bottom', left: 'center' };
  }

  private parseDoughnutChart(chartData: any) {
    const ser = get(chartData, ['c:ser']);
    this.options.title.text = this.parsePieTitle(ser);
    this.options.color = this.parsePieColors(ser);
    this.options.series = [this.parsePieSeries(ser, chartData)];
    this.options.legend = { bottom: 'bottom', left: 'center' };
  }

  private parsePieTitle(ser: any): string {
    return get(ser, ['c:tx', 'c:strRef', 'c:strCache', 'c:pt', 'c:v']);
  }

  private parseChartTitle(title: any): string {
    if (!title) return '';
    let paragraphs = get(title, ['c:tx', 'c:rich', 'a:p']);
    if (!paragraphs) return '';
    if (!Array.isArray(paragraphs)) paragraphs = [paragraphs];
    return paragraphs
      .map((p: any) => {
        let runs = get(p, ['a:r']);
        if (!runs) return '';
        if (!Array.isArray(runs)) runs = [runs];
        return runs.map((r: any) => get(r, ['a:t']) || '').join('');
      })
      .join('');
  }

  private getSeriesColor(fill: any): string {
    if (!fill) return '';
    return getRenderColor(getSolidFillColor(fill, this.theme, this.ctx)) || '';
  }

  private parseBarColors(series: any[]): string[] {
    return series.map((ser) =>
      this.getSeriesColor(get(ser, ['c:spPr', 'a:solidFill']))
    );
  }

  private parseLineColors(series: any[]): string[] {
    return series.map((ser) =>
      this.getSeriesColor(
        get(ser, ['c:spPr', 'a:ln', 'a:solidFill']) || get(ser, ['c:spPr', 'a:solidFill'])
      )
    );
  }

  private parsePieColors(ser: any): string[] {
    let dPts = get(ser, ['c:dPt']);
    if (!dPts) return [];
    if (!Array.isArray(dPts)) dPts = [dPts];
    return dPts.map((dPt: any) =>
      this.getSeriesColor(get(dPt, ['c:spPr', 'a:solidFill']))
    );
  }

  private parsePieSeries(ser: any, chartData: any): any {
    const result: any = { type: 'pie', radius: '80%', startAngle: 90, data: [] };

    if (get(chartData, ['c:holeSize', 'attrs', 'val'])) {
      result.radius = [`${0.8 * get(chartData, ['c:holeSize', 'attrs', 'val'])}%`, '80%'];
    }

    const firstSliceAng = get(chartData, ['c:firstSliceAng', 'attrs', 'val']);
    if (firstSliceAng) result.startAngle = 90 - firstSliceAng;

    const categories = this.getCategory(ser);
    const values = this.getVal(ser);
    for (let i = 0; i < categories.length; i++) {
      result.data.push({ name: categories[i], value: values[i] });
    }
    return result;
  }

  private parseBarSeries(series: any[], chartData: any): any[] {
    let stack: string | undefined;
    const grouping = get(chartData, ['c:grouping', 'attrs', 'val']);
    if (grouping === 'stacked') stack = 'Ad';
    else if (grouping === 'percentStacked') stack = 'total';

    const result = series.map((ser) => ({
      type: 'bar',
      name: get(ser, ['c:tx', 'c:strRef', 'c:strCache', 'c:pt', 'c:v']),
      data: this.getVal(ser),
      stack,
    }));

    if (grouping === 'percentStacked') {
      let totals: number[] = [];
      result.forEach((s, i) => {
        totals = i === 0
          ? [...s.data]
          : totals.map((v, j) => v + s.data[j]);
      });
      result.forEach((s) => {
        s.data = s.data.map((v: number, i: number) => (totals[i] <= 0 ? 0 : v / totals[i]));
      });
    }

    return result;
  }

  private parseLineSeries(series: any[], chartData: any): any[] {
    let stack: string | undefined;
    const grouping = get(chartData, ['c:grouping', 'attrs', 'val']);
    if (grouping === 'stacked') stack = 'Ad';
    else if (grouping === 'percentStacked') stack = 'total';

    const result = series.map((ser) => ({
      type: 'line',
      name: get(ser, ['c:tx', 'c:strRef', 'c:strCache', 'c:pt', 'c:v']),
      data: this.getVal(ser),
      stack,
    }));

    if (stack === 'total') {
      let totals: number[] = [];
      result.forEach((s, i) => {
        totals = i === 0
          ? [...s.data]
          : totals.map((v, j) => v + s.data[j]);
      });
      result.forEach((s) => {
        s.data = s.data.map((v: number, i: number) => (totals[i] <= 0 ? 0 : v / totals[i]));
      });
    }

    return result;
  }

  private getCategory(ser: any): string[] {
    if (get(ser, ['c:cat', 'c:strRef'])) {
      let pts = get(ser, ['c:cat', 'c:strRef', 'c:strCache', 'c:pt']);
      if (!Array.isArray(pts)) pts = [pts];
      return pts.map((pt: any) => get(pt, ['c:v']));
    }
    if (get(ser, ['c:cat', 'c:numRef'])) {
      let pts = get(ser, ['c:cat', 'c:numRef', 'c:numCache', 'c:pt']);
      if (!Array.isArray(pts)) pts = [pts];
      return pts.map((pt: any) => get(pt, ['c:v']));
    }
    return [];
  }

  private getVal(ser: any): number[] {
    let pts = get(ser, ['c:val', 'c:numRef', 'c:numCache', 'c:pt']);
    if (!Array.isArray(pts)) pts = [pts];
    return pts.map((pt: any) => +get(pt, ['c:v']));
  }

  private parseAxes(plotArea: any): void {
    // Find the value axis (c:valAx) and category axis (c:catAx or c:dateAx)
    const valAx = get(plotArea, ['c:valAx']);
    const catAx = get(plotArea, ['c:catAx']) || get(plotArea, ['c:dateAx']);

    // Determine which echarts axis is the value axis
    const isBarHorizontal = this.options.yAxis?.type === 'category';
    const valAxisKey = isBarHorizontal ? 'xAxis' : 'yAxis';
    const catAxisKey = isBarHorizontal ? 'yAxis' : 'xAxis';

    // Apply value axis config
    if (valAx && this.options[valAxisKey]) {
      const deleted = get(valAx, ['c:delete', 'attrs', 'val']) === '1';
      if (deleted) {
        this.options[valAxisKey].show = false;
      }
      const min = get(valAx, ['c:scaling', 'c:min', 'attrs', 'val']);
      const max = get(valAx, ['c:scaling', 'c:max', 'attrs', 'val']);
      if (min !== undefined) this.options[valAxisKey].min = +min;
      if (max !== undefined) this.options[valAxisKey].max = +max;
    }

    // Apply category axis config
    if (catAx && this.options[catAxisKey]) {
      const deleted = get(catAx, ['c:delete', 'attrs', 'val']) === '1';
      if (deleted) {
        this.options[catAxisKey].show = false;
      }
    }

    // Compact grid — reduce padding so chart data fills the space
    const hasValAxis = valAx && get(valAx, ['c:delete', 'attrs', 'val']) !== '1';
    this.options.grid = {
      top: 5,
      bottom: 5,
      left: hasValAxis ? 5 : 0,
      right: 5,
      containLabel: true,
    };

    // Compact axis labels
    if (this.options.xAxis) {
      this.options.xAxis.axisLabel = { ...this.options.xAxis.axisLabel, fontSize: 8 };
    }
    if (this.options.yAxis && this.options.yAxis.show !== false) {
      this.options.yAxis.axisLabel = { ...this.options.yAxis.axisLabel, fontSize: 8 };
    }

    // Compact legend text
    if (this.options.legend && this.options.legend.bottom !== undefined) {
      this.options.legend.textStyle = { fontSize: 8 };
      this.options.legend.itemWidth = 10;
      this.options.legend.itemHeight = 8;
      this.options.legend.itemGap = 5;
      this.options.legend.padding = [0, 0];
    }
  }
}
