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
  chartThemeOverride?: Theme;
  chartColorMap?: Record<string, string>;
  chartStyleId?: number;
  plotAreaValueAxisIds: Set<string>;
  plotAreaLayout?: { x: number; y: number; w: number; h: number };
  legendLayout?: { x: number; y: number; w: number; h: number };

  get slideMaster(): any {
    return this.ctx.slideMaster || this.ctx;
  }

  get theme(): Theme {
    return this.chartThemeOverride || this.slideMaster.theme;
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
    this.plotAreaValueAxisIds = new Set<string>();
  }

  getColorThemeName(aliseName: any): any {
    if (aliseName && this.chartColorMap && this.chartColorMap[aliseName]) {
      return this.chartColorMap[aliseName];
    }
    return super.getColorThemeName(aliseName);
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
      const chartSpace = get(chartJson, ['c:chartSpace']);
      this.chartColorMap = get(chartSpace, ['c:clrMapOvr', 'attrs']);
      this.chartStyleId = this.parseChartStyleId(chartXml);
      await this.loadChartThemeOverride(chartPath);

      const chart = get(chartSpace, ['c:chart']);
      const plotArea = get(chart, ['c:plotArea']);
      this.plotAreaValueAxisIds = new Set(this.getValueAxisIds(plotArea));

      // Parse manual layout for plot area positioning
      this.plotAreaLayout = this.parseManualLayout(get(plotArea, ['c:layout', 'c:manualLayout']));

      // Parse manual layout for legend positioning
      const legend = get(chart, ['c:legend']);
      if (legend) {
        this.legendLayout = this.parseManualLayout(get(legend, ['c:layout', 'c:manualLayout']));
      }

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
          const lineValueAxisId = this.getChartValueAxisId(lineData);
          const parsedLineSeries = this.parseLineSeries(lineSeries, lineData, lineValueAxisId);
          const parsedLineColors = this.parseLineColors(lineSeries);
          const lineSeriesIndexes = this.parseSeriesIndexes(lineSeries);

          // Some combo-chart line series rely on chart style for color and parse as empty.
          // Avoid emitting invisible `stroke="none"` lines in static renders.
          const resolvedLineColors = parsedLineColors.map((color, index) =>
            color || this.getDefaultSeriesColorByIndex(lineSeriesIndexes[index], 'line')
          );

          this.options.series.push(...parsedLineSeries);
          this.options.color.push(...resolvedLineColors);
        }
      }

      // Apply axis config from plotArea (hide deleted axes, set min/max)
      this.parseAxes(plotArea);
    } catch (e) {
      // silently ignore chart parse errors
    }
  }

  private async loadChartThemeOverride(chartPath: string): Promise<void> {
    this.chartThemeOverride = undefined;
    try {
      const relsPath = this.getPartRelsPath(chartPath);
      const relsXml = await this.pptx.getXmlByPath(relsPath);
      const relsJson = xmlToJSON(relsXml);
      let relationships = get(relsJson, ['Relationships', 'Relationship']) || [];
      if (!Array.isArray(relationships)) relationships = [relationships];

      const themeOverrideRel = relationships.find(
        (rel: any) =>
          get(rel, ['attrs', 'Type']) ===
          'http://schemas.openxmlformats.org/officeDocument/2006/relationships/themeOverride'
      );
      if (!themeOverrideRel) return;

      const target = get(themeOverrideRel, ['attrs', 'Target']);
      if (!target) return;

      const themeOverridePath = this.resolveRelativePartPath(chartPath, target);
      const themeOverrideXml = await this.pptx.getXmlByPath(themeOverridePath);
      const themeOverrideJson = xmlToJSON(themeOverrideXml);
      const themeOverride = get(themeOverrideJson, ['a:themeOverride']);
      if (!themeOverride) return;

      const normalizedThemeSource = {
        'a:theme': {
          'a:themeElements': {
            'a:clrScheme': get(themeOverride, ['a:clrScheme']) || {},
            'a:fontScheme': get(themeOverride, ['a:fontScheme']) || {},
            'a:fmtScheme': get(themeOverride, ['a:fmtScheme']) || {},
          },
        },
      };

      this.chartThemeOverride = new Theme(themeOverridePath, normalizedThemeSource as any, this.pptx);
    } catch (e) {
      // ignore theme override parsing errors
    }
  }

  private getPartRelsPath(partPath: string): string {
    const segments = partPath.split('/');
    const filename = segments.pop();
    const directory = segments.join('/');
    return `${directory}/_rels/${filename}.rels`;
  }

  private resolveRelativePartPath(basePartPath: string, target: string): string {
    if (!target) return basePartPath;
    if (target.startsWith('/')) return target.replace(/^\//, '');

    const segments = basePartPath.split('/');
    segments.pop();

    for (const segment of target.split('/')) {
      if (!segment || segment === '.') continue;
      if (segment === '..') {
        if (segments.length > 0) segments.pop();
        continue;
      }
      segments.push(segment);
    }

    return segments.join('/');
  }

  private parseChartStyleId(chartXml: string): number | undefined {
    const c14Match = chartXml.match(/<c14:style[^>]*\bval="(\d+)"/);
    if (c14Match) return Number(c14Match[1]);
    const fallbackMatch = chartXml.match(/<c:style[^>]*\bval="(\d+)"/);
    if (fallbackMatch) return Number(fallbackMatch[1]);
    return undefined;
  }

  private getValueAxisIds(plotArea: any): string[] {
    let valAxes = get(plotArea, ['c:valAx']) || [];
    if (!Array.isArray(valAxes)) valAxes = [valAxes];
    return valAxes
      .map((ax: any) => get(ax, ['c:axId', 'attrs', 'val']))
      .filter((id: any) => id !== undefined && id !== null)
      .map((id: any) => String(id));
  }

  private getChartValueAxisId(chartData: any): string | undefined {
    let chartAxIds = get(chartData, ['c:axId']) || [];
    if (!Array.isArray(chartAxIds)) chartAxIds = [chartAxIds];
    const ids = chartAxIds
      .map((ax: any) => get(ax, ['attrs', 'val']))
      .filter((id: any) => id !== undefined && id !== null)
      .map((id: any) => String(id));
    return ids.find((id) => this.plotAreaValueAxisIds.has(id));
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
    const valueAxisId = this.getChartValueAxisId(chartData);

    const titleText = this.parseChartTitle(get(chartRoot, ['c:title']));
    this.options.title = titleText
      ? { top: 'top', left: 'center', text: titleText }
      : { show: false };
    this.options.xAxis = { type: 'category', data: this.getCategory(series[0]) };
    this.options.yAxis = { type: 'value' };
    this.options.series = this.parseLineSeries(series, chartData, valueAxisId);
    const seriesIndexes = this.parseSeriesIndexes(series);
    this.options.color = this.parseLineColors(series).map((color, index) =>
      color || this.getDefaultSeriesColorByIndex(seriesIndexes[index], 'line')
    );
    this.options.legend = { bottom: 'bottom', left: 'center' };

    if (get(chartData, ['c:grouping', 'attrs', 'val']) === 'percentStacked') {
      this.options.tooltip.valueFormatter = (v: number) => (100 * v).toFixed(2) + '%';
    }
  }

  private parseBar(chartData: any, chartRoot: any) {
    let series = get(chartData, ['c:ser']);
    if (!Array.isArray(series)) series = [series];
    const valueAxisId = this.getChartValueAxisId(chartData);

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

    this.options.series = this.parseBarSeries(series, chartData, valueAxisId);
    const seriesIndexes = this.parseSeriesIndexes(series);
    this.options.color = this.parseBarColors(series).map((color, index) =>
      color || this.getDefaultSeriesColorByIndex(seriesIndexes[index], 'bar')
    );
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
    return getRenderColor(getSolidFillColor(fill, this.theme, this)) || '';
  }

  private parseBarColors(series: any[]): string[] {
    return series.map((ser) => {
      // Explicit noFill on the bar shape means transparent
      if (get(ser, ['c:spPr', 'a:noFill']) !== undefined) return 'transparent';
      return this.getSeriesColor(get(ser, ['c:spPr', 'a:solidFill']));
    });
  }

  private parseLineColors(series: any[]): string[] {
    return series.map((ser) => {
      // Explicit noFill on the line stroke means transparent
      if (get(ser, ['c:spPr', 'a:ln', 'a:noFill']) !== undefined) return 'transparent';
      return this.getSeriesColor(
        get(ser, ['c:spPr', 'a:ln', 'a:solidFill']) || get(ser, ['c:spPr', 'a:solidFill'])
      );
    });
  }

  private parseSeriesIndexes(series: any[]): number[] {
    return series.map((ser, index) => {
      const idx = Number(get(ser, ['c:idx', 'attrs', 'val']));
      return Number.isFinite(idx) ? idx : index;
    });
  }

  private getDefaultSeriesColorByIndex(seriesIndex: number, seriesType: 'bar' | 'line'): string {
    const palette = [
      this.theme.getColor('accent1'),
      this.theme.getColor('accent2'),
      this.theme.getColor('accent3'),
      this.theme.getColor('accent4'),
      this.theme.getColor('accent5'),
      this.theme.getColor('accent6'),
    ].filter(Boolean) as string[];

    if (palette.length === 0) return '#6E7079';
    const normalizedIndex = ((seriesIndex % palette.length) + palette.length) % palette.length;
    const baseColor = palette[normalizedIndex];

    // Office chart style 102 often uses a lighter neutral for missing 3rd bar-series fill.
    if (this.chartStyleId === 102 && seriesType === 'bar' && normalizedIndex === 2) {
      const lighter = getRenderColor({
        type: 'solidFill',
        color: baseColor,
        alpha: 1,
        lumMod: 0.6,
        lumOff: 0.4,
      } as any);
      if (lighter) return lighter;
    }

    return baseColor;
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

  private parseBarSeries(series: any[], chartData: any, valueAxisId?: string): any[] {
    let stack: string | undefined;
    const grouping = get(chartData, ['c:grouping', 'attrs', 'val']);
    if (grouping === 'stacked') stack = 'Ad';
    else if (grouping === 'percentStacked') stack = 'total';

    const result = series.map((ser) => {
      const item: any = {
        type: 'bar',
        name: get(ser, ['c:tx', 'c:strRef', 'c:strCache', 'c:pt', 'c:v']),
        data: this.getVal(ser),
        stack,
        __valAxisId: valueAxisId,
      };

      const label = this.parseSeriesLabel(ser, chartData, 'bar');
      if (label) {
        item.label = label;
        item.labelLayout = { hideOverlap: false };
      }

      return item;
    });

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

  private parseLineSeries(series: any[], chartData: any, valueAxisId?: string): any[] {
    let stack: string | undefined;
    const grouping = get(chartData, ['c:grouping', 'attrs', 'val']);
    if (grouping === 'stacked') stack = 'Ad';
    else if (grouping === 'percentStacked') stack = 'total';

    const result = series.map((ser) => {
      const item: any = {
        type: 'line',
        name: get(ser, ['c:tx', 'c:strRef', 'c:strCache', 'c:pt', 'c:v']),
        data: this.getVal(ser),
        stack,
        __valAxisId: valueAxisId,
      };

      const label = this.parseSeriesLabel(ser, chartData, 'line');
      if (label) {
        item.label = label;
        item.labelLayout = { hideOverlap: false };
      }

      return item;
    });

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

  private parseSeriesLabel(ser: any, chartData: any, seriesType: 'bar' | 'line'): any | undefined {
    const dLbls = get(ser, ['c:dLbls']) || get(chartData, ['c:dLbls']);
    if (!dLbls) return undefined;

    const showVal = this.parseLabelBool(get(dLbls, ['c:showVal', 'attrs', 'val']));
    const showCatName = this.parseLabelBool(get(dLbls, ['c:showCatName', 'attrs', 'val']));
    const showSerName = this.parseLabelBool(get(dLbls, ['c:showSerName', 'attrs', 'val']));
    const showPercent = this.parseLabelBool(get(dLbls, ['c:showPercent', 'attrs', 'val']));

    if (!(showVal || showCatName || showSerName || showPercent)) return undefined;

    const numFmtCode =
      get(dLbls, ['c:numFmt', 'attrs', 'formatCode']) || get(ser, ['c:numFmt', 'attrs', 'formatCode']);

    const label: any = { show: true };
    label.formatter = (params: any) => {
      const parts: string[] = [];
      if (showSerName) parts.push(params?.seriesName ?? '');
      if (showCatName) parts.push(params?.name ?? '');
      if (showVal) parts.push(this.formatDataLabelValue(params?.value, numFmtCode));
      if (showPercent) {
        const percent = typeof params?.percent === 'number' ? params.percent.toFixed(0) : '';
        parts.push(percent ? `${percent}%` : '');
      }
      return parts.filter((p) => p !== '').join('\n');
    };

    const pos = get(dLbls, ['c:dLblPos', 'attrs', 'val']);
    const mappedPos = this.mapDataLabelPosition(pos, seriesType);
    if (mappedPos) label.position = mappedPos;

    const defRPr = this.getDataLabelDefRPr(dLbls);
    if (defRPr) {
      const size = get(defRPr, ['attrs', 'sz']);
      if (size !== undefined) label.fontSize = parseInt(size) / 100;
      const color = this.getSeriesColor(get(defRPr, ['a:solidFill']));
      if (color) label.color = color;
      if (get(defRPr, ['attrs', 'b']) === '1') label.fontWeight = 'bold';
      if (get(defRPr, ['attrs', 'i']) === '1') label.fontStyle = 'italic';
    }

    return label;
  }

  private parseLabelBool(val: any): boolean {
    return val === '1' || val === 1 || val === true || val === 'true';
  }

  private mapDataLabelPosition(pos: string | undefined, seriesType: 'bar' | 'line'): string | undefined {
    switch (pos) {
      case 'ctr':
        return seriesType === 'bar' ? 'inside' : 'middle';
      case 'inBase':
        return seriesType === 'bar' ? 'insideBottom' : 'bottom';
      case 'inEnd':
        return seriesType === 'bar' ? 'insideTop' : 'top';
      case 'outEnd':
        return 'top';
      case 't':
        return 'top';
      case 'b':
        return 'bottom';
      case 'l':
        return 'left';
      case 'r':
        return 'right';
      case 'bestFit':
        return seriesType === 'bar' ? 'inside' : 'top';
      default:
        return undefined;
    }
  }

  private getDataLabelDefRPr(dLbls: any): any {
    let paragraphs = get(dLbls, ['c:txPr', 'a:p']);
    if (!paragraphs) return undefined;
    if (!Array.isArray(paragraphs)) paragraphs = [paragraphs];

    for (const p of paragraphs) {
      const defRPr = get(p, ['a:pPr', 'a:defRPr']);
      if (defRPr) return defRPr;
    }

    return get(paragraphs[0], ['a:endParaRPr']);
  }

  private formatDataLabelValue(rawValue: any, formatCode?: string): string {
    const value = typeof rawValue === 'number' ? rawValue : Number(rawValue);
    if (!isFinite(value)) return `${rawValue ?? ''}`;
    if (!formatCode) return `${rawValue}`;

    const sections = this.decodeFormatEntities(formatCode).split(';');
    let section = sections[0] || '';
    if (value < 0 && sections[1]) section = sections[1];
    else if (value === 0 && sections[2]) section = sections[2];

    const cleaned = this.cleanNumberFormatSection(section);
    const placeholderMatch = cleaned.match(/[0#?,.%-]+/);

    if (!placeholderMatch) {
      const literalOnly = this.normalizeFormatLiteral(cleaned);
      return literalOnly || `${value}`;
    }

    const token = placeholderMatch[0];
    const tokenIndex = placeholderMatch.index ?? 0;
    const prefix = this.normalizeFormatLiteral(cleaned.slice(0, tokenIndex));
    const suffix = this.normalizeFormatLiteral(cleaned.slice(tokenIndex + token.length));

    const decimalPart = token.includes('.') ? token.split('.')[1] : '';
    const decimals = (decimalPart.match(/[0#]/g) || []).length;
    const usesGrouping = token.includes(',');
    const isPercent = token.includes('%');

    const absValue = Math.abs(isPercent ? value * 100 : value);
    const numberText = new Intl.NumberFormat('en-US', {
      useGrouping: usesGrouping,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(absValue);

    // If no explicit negative section exists, prefix with minus for negative values.
    const hasNegativeSection = sections.length > 1 && sections[1] !== '';
    const implicitNegative = value < 0 && !hasNegativeSection ? '-' : '';

    return `${implicitNegative}${prefix}${numberText}${suffix}`;
  }

  private decodeFormatEntities(formatCode: string): string {
    return formatCode
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, '\'')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  private cleanNumberFormatSection(section: string): string {
    return section
      .replace(/\[[^\]]*]/g, '') // remove conditions/colors like [Red]
      .replace(/_.?/g, '') // remove spacing directives
      .replace(/\*./g, '') // remove fill characters
      .replace(/\\(.)/g, '$1'); // unescape literals
  }

  private normalizeFormatLiteral(literal: string): string {
    return literal
      .replace(/"([^"]*)"/g, '$1') // unquote literals
      .replace(/\?/g, ' ')
      .trim();
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

  private parseManualLayout(layout: any): { x: number; y: number; w: number; h: number } | undefined {
    if (!layout) return undefined;
    const x = parseFloat(get(layout, ['c:x', 'attrs', 'val']) ?? get(layout, ['c:x']));
    const y = parseFloat(get(layout, ['c:y', 'attrs', 'val']) ?? get(layout, ['c:y']));
    const w = parseFloat(get(layout, ['c:w', 'attrs', 'val']) ?? get(layout, ['c:w']));
    const h = parseFloat(get(layout, ['c:h', 'attrs', 'val']) ?? get(layout, ['c:h']));
    if ([x, y, w, h].some((v) => !isFinite(v))) return undefined;
    return { x, y, w, h };
  }

  private parseAxes(plotArea: any): void {
    // Find the value axis (c:valAx) and category axis (c:catAx or c:dateAx)
    let valAxes = get(plotArea, ['c:valAx']) || [];
    if (!Array.isArray(valAxes)) valAxes = [valAxes];

    const catAxesRaw = get(plotArea, ['c:catAx']) || get(plotArea, ['c:dateAx']) || [];
    const catAxes = Array.isArray(catAxesRaw) ? catAxesRaw : [catAxesRaw];
    const catAx = catAxes[0];

    // Determine which echarts axis is the value axis
    const isBarHorizontal = this.options.yAxis?.type === 'category';
    const valAxisKey = isBarHorizontal ? 'xAxis' : 'yAxis';
    const catAxisKey = isBarHorizontal ? 'yAxis' : 'xAxis';

    // Apply value axis config (supports multi-axis charts)
    const existingValAxis = this.options[valAxisKey];
    const baseValAxis = Array.isArray(existingValAxis) ? existingValAxis[0] : existingValAxis;
    const valAxisConfigs = valAxes.map((valAx: any) => {
      const axisCfg: any = { ...(baseValAxis || { type: 'value' }) };
      const deleted = get(valAx, ['c:delete', 'attrs', 'val']) === '1';
      if (deleted) axisCfg.show = false;
      const min = get(valAx, ['c:scaling', 'c:min', 'attrs', 'val']);
      const max = get(valAx, ['c:scaling', 'c:max', 'attrs', 'val']);
      if (min !== undefined) axisCfg.min = +min;
      if (max !== undefined) axisCfg.max = +max;
      return axisCfg;
    });

    if (valAxisConfigs.length > 1) {
      this.options[valAxisKey] = valAxisConfigs;
    } else if (valAxisConfigs.length === 1) {
      this.options[valAxisKey] = valAxisConfigs[0];
    }

    if (Array.isArray(this.options.series)) {
      const valAxisIdToIndex = new Map<string, number>();
      valAxes.forEach((ax: any, i: number) => {
        const id = get(ax, ['c:axId', 'attrs', 'val']);
        if (id !== undefined && id !== null) valAxisIdToIndex.set(String(id), i);
      });

      this.options.series.forEach((series: any) => {
        const seriesValAxisId = series.__valAxisId ? String(series.__valAxisId) : undefined;
        const axisIndex = seriesValAxisId ? (valAxisIdToIndex.get(seriesValAxisId) ?? 0) : 0;
        if (valAxisConfigs.length > 1) {
          if (valAxisKey === 'yAxis') series.yAxisIndex = axisIndex;
          else series.xAxisIndex = axisIndex;
        }
        delete series.__valAxisId;
      });
    }

    // Apply category axis config
    if (catAx && this.options[catAxisKey]) {
      const catAxisTarget = Array.isArray(this.options[catAxisKey])
        ? this.options[catAxisKey][0]
        : this.options[catAxisKey];
      const deleted = get(catAx, ['c:delete', 'attrs', 'val']) === '1';
      if (deleted && catAxisTarget) {
        catAxisTarget.show = false;
      }
    }

    // Use manual layout from PPTX if available, otherwise compact grid
    const primaryValAx = valAxes[0];
    const hasValAxis = primaryValAx && get(primaryValAx, ['c:delete', 'attrs', 'val']) !== '1';
    if (this.plotAreaLayout) {
      const { x, y, w, h } = this.plotAreaLayout;
      this.options.grid = {
        top: `${(y * 100).toFixed(1)}%`,
        left: `${(x * 100).toFixed(1)}%`,
        right: `${((1 - x - w) * 100).toFixed(1)}%`,
        bottom: `${((1 - y - h) * 100).toFixed(1)}%`,
        containLabel: false,
      };
    } else {
      this.options.grid = {
        top: 5,
        bottom: 5,
        left: hasValAxis ? 5 : 0,
        right: 5,
        containLabel: true,
      };
    }

    // Compact axis labels
    const xAxes = Array.isArray(this.options.xAxis) ? this.options.xAxis : [this.options.xAxis];
    xAxes.filter(Boolean).forEach((axis: any) => {
      axis.axisLabel = { ...axis.axisLabel, fontSize: 8 };
    });

    const yAxes = Array.isArray(this.options.yAxis) ? this.options.yAxis : [this.options.yAxis];
    yAxes.filter(Boolean).forEach((axis: any) => {
      if (axis.show !== false) {
        axis.axisLabel = { ...axis.axisLabel, fontSize: 8 };
      }
    });

    // Apply legend manual layout if available
    if (this.options.legend) {
      if (this.legendLayout) {
        const { x, y, w } = this.legendLayout;
        this.options.legend.left = `${(x * 100).toFixed(1)}%`;
        this.options.legend.top = `${(y * 100).toFixed(1)}%`;
        this.options.legend.width = `${(w * 100).toFixed(1)}%`;
        delete this.options.legend.bottom;
      }
      // Compact legend text
      this.options.legend.textStyle = { fontSize: 8 };
      this.options.legend.itemWidth = 10;
      this.options.legend.itemHeight = 8;
      this.options.legend.itemGap = 5;
      this.options.legend.padding = [0, 0];
    }
  }
}
