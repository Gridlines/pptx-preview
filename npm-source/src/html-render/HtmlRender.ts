import PPTX from '../reader/PPTX';
import PicNode from '../reader/node/PicNode';
import ShapeNode from '../reader/node/ShapeNode';
import TableNode from '../reader/node/TableNode';
import Group from '../reader/Group';
import DiagramNode from '../reader/node/DiagramNode';
import ChartNode from '../reader/node/ChartNode';
import { renderPic } from './node/pic-render';
import { renderShape } from './node/shape-render';
import { renderTable } from './node/table-render';
import { renderGroup } from './node/group-render';
import { renderDiagram } from './node/diagram-render';
import { renderChart } from './node/chart-render';
import { getRenderColor } from '../utils/color';
import { on, emit } from '../utils/event-bus';

interface RenderOptions {
  viewPort: { width: number; height: number };
  mode: string;
}

interface RenderPort {
  width: number;
  height: number;
  left: number;
  top: number;
}

export default class HtmlRender {
  scale: number = 1;
  wrapper: HTMLElement;
  pptx: PPTX;
  options: RenderOptions;
  renderPort!: RenderPort;

  constructor(wrapper: HTMLElement, pptx: PPTX, options: RenderOptions) {
    this.wrapper = wrapper;
    this.pptx = pptx;
    this.options = options;
    this._calcScaleAndRenderPort();
  }

  _calcScaleAndRenderPort(): void {
    const scale = this.options.viewPort.width / this.pptx.width;
    this.scale = scale;
    const width = this.options.viewPort.width;
    const height = this.pptx.height * this.scale;
    this.renderPort = { width, height, left: 0, top: 0 };
  }

  renderSlide(index: number): void {
    const slide = this.pptx.slides[index];
    const slideWrapper = document.createElement('div');
    slideWrapper.classList.add('pptx-preview-slide-wrapper');
    slideWrapper.classList.add(`pptx-preview-slide-wrapper-${index}`);
    slideWrapper.style.setProperty('width', this.renderPort.width + 'px');
    slideWrapper.style.setProperty('height', this.renderPort.height + 'px');
    slideWrapper.style.setProperty('position', this.options.mode === 'slide' ? 'absolute' : 'relative');
    if (this.options.mode === 'slide') {
      slideWrapper.style.setProperty('top', (this.options.viewPort.height - this.renderPort.height) / 2 + 'px');
    }
    slideWrapper.style.margin = '0 auto 10px';
    slideWrapper.style.setProperty('background', '#fff');
    slideWrapper.style.setProperty('overflow', 'hidden');
    const slideNumber = index + 1;
    this._renderBackground(slide, slideWrapper);
    // Build sets of placeholder keys so each layer skips placeholders overridden by layers above it
    const slidePlaceholders = this._collectPlaceholderKeys(slide.nodes);
    const layoutPlaceholders = this._collectPlaceholderKeys(slide.slideLayout.nodes);
    // Master skips placeholders present in layout OR slide
    const masterOverrides = new Set([...layoutPlaceholders, ...slidePlaceholders]);
    // Layout skips placeholders present in slide
    const layoutOverrides = slidePlaceholders;
    this._renderSlideMaster(slide.slideMaster, slideWrapper, slideNumber, masterOverrides);
    this._renderSlideLayout(slide.slideLayout, slideWrapper, slideNumber, layoutOverrides);
    this._renderSlide(slide, slideWrapper, slideNumber);
    this.wrapper.append(slideWrapper);
  }

  _renderSlideMaster(slideMaster: any, container: HTMLElement, slideNumber?: number, overrides?: Set<string>): void {
    const layer = document.createElement('div');
    layer.classList.add('slide-master-wrapper');
    layer.style.setProperty('position', 'absolute');
    layer.style.setProperty('left', '0');
    layer.style.setProperty('top', '0');
    layer.style.setProperty('width', this.pptx.width + 'px');
    layer.style.setProperty('height', this.pptx.height + 'px');
    layer.style.setProperty('transform', `scale(${this.scale})`);
    layer.style.setProperty('transform-origin', '0 0');
    const nodes = [...slideMaster.nodes].filter((n: any) =>
      this._shouldRenderMasterNode(n) && !this._isOverridden(n, overrides)
    );
    nodes.sort((a: any, b: any) => a.order > b.order ? 1 : -1);
    for (const node of nodes) {
      const el = this._renderNode(node, slideNumber);
      if (el) layer.append(el);
    }
    container.append(layer);
  }

  _renderSlideLayout(slideLayout: any, container: HTMLElement, slideNumber?: number, overrides?: Set<string>): void {
    const layer = document.createElement('div');
    layer.classList.add('slide-layout-wrapper');
    layer.style.setProperty('position', 'absolute');
    layer.style.setProperty('left', '0');
    layer.style.setProperty('top', '0');
    layer.style.setProperty('width', this.pptx.width + 'px');
    layer.style.setProperty('height', this.pptx.height + 'px');
    layer.style.setProperty('transform', `scale(${this.scale})`);
    layer.style.setProperty('transform-origin', '0 0');
    const nodes = [...slideLayout.nodes].filter((n: any) =>
      this._shouldRenderMasterNode(n) && !this._isOverridden(n, overrides)
    );
    nodes.sort((a: any, b: any) => a.order > b.order ? 1 : -1);
    for (const node of nodes) {
      const el = this._renderNode(node, slideNumber);
      if (el) layer.append(el);
    }
    container.append(layer);
  }

  _renderSlide(slide: any, container: HTMLElement, slideNumber?: number): void {
    const layer = document.createElement('div');
    layer.classList.add('slide-wrapper');
    layer.style.setProperty('position', 'absolute');
    layer.style.setProperty('left', '0');
    layer.style.setProperty('top', '0');
    layer.style.setProperty('width', this.pptx.width + 'px');
    layer.style.setProperty('height', this.pptx.height + 'px');
    layer.style.setProperty('transform', `scale(${this.scale})`);
    layer.style.setProperty('transform-origin', '0 0');
    const nodes = [...slide.nodes];
    nodes.sort((a: any, b: any) => a.order > b.order ? 1 : -1);
    for (const node of nodes) {
      const el = this._renderNode(node, slideNumber);
      if (el) layer.append(el);
    }
    container.append(layer);
  }

  _renderNode(node: any, slideNumber?: number): HTMLElement | undefined {
    if (node instanceof PicNode) return renderPic(node);
    if (node instanceof ShapeNode) return renderShape(node, slideNumber);
    if (node instanceof Group) return renderGroup(node, slideNumber);
    if (node instanceof DiagramNode) return renderDiagram(node);
    if (node instanceof TableNode) return renderTable(node);
    if (node instanceof ChartNode) return renderChart(node);
    return undefined;
  }

  /**
   * Determines if a node from a slide master or layout should be rendered.
   * Include: userDrawn shapes, non-placeholder shapes, and informational placeholders (sldNum, ftr, dt).
   * Exclude: content placeholders (title, body, etc.) that are empty layout templates.
   */
  _shouldRenderMasterNode(n: any): boolean {
    if (n.userDrawn) return true;
    if (!n.type && !n.idx) return true;
    const infoTypes = new Set(['sldNum', 'ftr', 'dt']);
    return infoTypes.has(n.type);
  }

  /** Collect placeholder keys (type or idx) from a node list. */
  _collectPlaceholderKeys(nodes: any[]): Set<string> {
    const keys = new Set<string>();
    for (const n of nodes) {
      if (n.type) keys.add('type:' + n.type);
      else if (n.idx) keys.add('idx:' + n.idx);
    }
    return keys;
  }

  /** Check if a placeholder node is overridden by a higher layer. */
  _isOverridden(n: any, overrides?: Set<string>): boolean {
    if (!overrides) return false;
    if (n.type && overrides.has('type:' + n.type)) return true;
    if (!n.type && n.idx && overrides.has('idx:' + n.idx)) return true;
    return false;
  }

  _renderBackground(slide: any, container: HTMLElement): void {
    const bgDiv = document.createElement('div');
    bgDiv.classList.add('slide-background');
    bgDiv.style.setProperty('position', 'absolute');
    bgDiv.style.setProperty('left', '0');
    bgDiv.style.setProperty('top', '0');
    bgDiv.style.setProperty('width', '100%');
    bgDiv.style.setProperty('height', '100%');

    let bg = slide.background;
    if (bg.type === 'none') bg = slide.slideLayout.background;
    if (bg.type === 'none') bg = slide.slideMaster.background;

    if (bg.type === 'blipFill') {
      const { base64, alpha, fillRect = {} } = bg;
      const { b = 0, t: top = 0, l = 0, r = 0 } = fillRect;
      const imgX = this.renderPort.width * l;
      const imgY = this.renderPort.height * top;
      const imgW = this.renderPort.width * (1 - l - r);
      const imgH = this.renderPort.height * (1 - top - b);
      bgDiv.style.backgroundImage = `url(${base64})`;
      bgDiv.style.backgroundSize = `${imgW} ${imgH}`;
      bgDiv.style.backgroundPosition = `${imgX}px ${imgY}px`;
      if (alpha) bgDiv.style.opacity = alpha + '';
      bgDiv.style.backgroundRepeat = 'no-repeat';
    } else if (bg.type === 'solidFill') {
      const color = getRenderColor(slide.background) || getRenderColor(slide.slideLayout.background) || getRenderColor(slide.slideMaster.background);
      if (color) bgDiv.style.setProperty('background', color);
      else bgDiv.style.setProperty('background', '#fff');
    } else if (bg.type === 'gradFill') {
      if (bg.path === 'circle') {
        const tileRect = bg.tileRect || {};
        const { b: tb, t: tt, l: tl, r: tr } = tileRect;
        let gradient = 'radial-gradient(circle at ';
        if (tr === -1) gradient += ' right';
        else if (tl === -1) gradient += ' left';
        if (tt === -1) gradient += ' top';
        else if (tb === -1) gradient += ' bottom';
        if (!tb && !tt && !tl && !tr) gradient += ' center';
        gradient += ',';
        gradient += bg.gsList.map((gs: any) => `${getRenderColor(gs.color)} ${100 * gs.pos + '%'}`).join(',');
        bgDiv.style.setProperty('background', gradient);
      } else {
        const angle = bg.lin?.ang || 0;
        let gradient = `linear-gradient(${angle + 90}deg,`;
        gradient += bg.gsList.map((gs: any) => `${getRenderColor(gs.color)} ${100 * gs.pos + '%'}`).join(',');
        bgDiv.style.setProperty('background', gradient);
      }
    }

    container.append(bgDiv);
  }
}
