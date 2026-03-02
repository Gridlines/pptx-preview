import { ColorType } from '../../types/color';
import { ParagraphType } from '../../types/text';
import { CustomGeomSegment, SlideDefinition, ShapeDefinition, WriterOptions } from '../types/writer-types';
import { px2emu } from '../utils/unit-reverse';
import { ParserContext } from './element-handlers';
import { parseImageElement } from './image-parser';
import { parseTableElement } from './table-parser';
import { parseTextElement } from './text-parser';

const DEFAULT_FONT_FAMILY = 'Calibri';
const DEFAULT_FONT_SIZE = 18;

type Box = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
};

type Size = {
  width: number;
  height: number;
};

export function parseRenderedSlideDocument(
  doc: Document,
  options?: WriterOptions
): SlideDefinition | null {
  if (!looksLikeRenderedPreview(doc)) return null;

  const ctx: ParserContext = {
    defaultFontFamily: options?.defaultFontFamily || DEFAULT_FONT_FAMILY,
    defaultFontSize: options?.defaultFontSize || DEFAULT_FONT_SIZE,
  };

  const slideWrapper = doc.querySelector('.pptx-preview-slide-wrapper') as HTMLElement | null;
  const layerRoots = getLayerRoots(doc, slideWrapper);
  if (layerRoots.length === 0) return null;

  const shapes: ShapeDefinition[] = [];
  for (const layerRoot of layerRoots) {
    const wrappers = Array.from(layerRoot.querySelectorAll('.shape-wrapper')) as HTMLElement[];
    for (const wrapper of wrappers) {
      const shape = parseRenderedShape(wrapper, layerRoot, ctx);
      if (shape) shapes.push(shape);
    }
  }

  if (shapes.length === 0) return null;

  const slide: SlideDefinition = { shapes };
  const background = slideWrapper
    ? parseBackgroundColor(slideWrapper)
    : undefined;
  if (background) slide.background = background;
  const sourceSize = inferSourceSize(layerRoots);
  if (sourceSize) slide.sourceSize = sourceSize;

  return slide;
}

function looksLikeRenderedPreview(doc: Document): boolean {
  return !!(
    doc.querySelector('.pptx-preview-slide-wrapper .shape-wrapper') ||
    (doc.querySelector('.slide-wrapper .shape-wrapper') &&
      doc.querySelector('.shape-wrapper svg'))
  );
}

function getLayerRoots(doc: Document, slideWrapper: HTMLElement | null): HTMLElement[] {
  if (slideWrapper) {
    const roots: HTMLElement[] = [];
    for (const child of Array.from(slideWrapper.children)) {
      const el = child as HTMLElement;
      if (
        el.classList.contains('slide-master-wrapper') ||
        el.classList.contains('slide-layout-wrapper') ||
        el.classList.contains('slide-wrapper')
      ) {
        roots.push(el);
      }
    }
    if (roots.length > 0) return roots;
  }

  const directSlide = doc.querySelector('.slide-wrapper') as HTMLElement | null;
  if (directSlide) return [directSlide];

  return [];
}

function inferSourceSize(layerRoots: HTMLElement[]): Size | undefined {
  if (layerRoots.length === 0) return undefined;

  const slideRoot = layerRoots.find((el) => el.classList.contains('slide-wrapper'));
  const target = slideRoot || layerRoots[0];

  const width = getStylePx(target, 'width');
  const height = getStylePx(target, 'height');
  if (width > 0 && height > 0) {
    return { width, height };
  }

  let maxWidth = 0;
  let maxHeight = 0;
  for (const root of layerRoots) {
    maxWidth = Math.max(maxWidth, getStylePx(root, 'width'));
    maxHeight = Math.max(maxHeight, getStylePx(root, 'height'));
  }
  if (maxWidth > 0 && maxHeight > 0) {
    return { width: maxWidth, height: maxHeight };
  }

  return undefined;
}

function parseRenderedShape(
  wrapper: HTMLElement,
  layerRoot: HTMLElement,
  ctx: ParserContext
): ShapeDefinition | null {
  const box = extractAbsoluteBox(wrapper, layerRoot);
  if (!box) return null;

  const tableEl = wrapper.querySelector('table');
  if (tableEl) {
    const tableShape = parseTableElement(tableEl, ctx);
    if (!tableShape) return null;
    applyBoxToShape(tableShape, box);
    return tableShape;
  }

  const imgEl = wrapper.querySelector('img');
  if (imgEl) {
    const imageShape = parseImageElement(imgEl, ctx);
    if (!imageShape) return null;
    applyBoxToShape(imageShape, box);
    return imageShape;
  }

  const paragraphs = parseShapeParagraphs(wrapper, ctx);
  const customGeom = parseCustomGeom(wrapper, box.width, box.height);
  const fill = parsePrimaryFill(wrapper);
  const shapeToken = getShapeToken(wrapper);

  if (customGeom) {
    const shape: ShapeDefinition = createBaseShape('customGeom', box);
    shape.customGeom = customGeom;
    if (paragraphs.length > 0) shape.paragraphs = paragraphs;
    if (fill) shape.background = fill;
    return shape;
  }

  if (paragraphs.length > 0) {
    const textShape: ShapeDefinition = createBaseShape('textbox', box);
    textShape.paragraphs = paragraphs;
    if (fill) textShape.background = fill;
    return textShape;
  }

  if (shapeToken === 'ellipse') {
    const ellipse = createBaseShape('ellipse', box);
    if (fill) ellipse.background = fill;
    return ellipse;
  }

  if (shapeToken === 'rect' || shapeToken === 'flowChartProcess') {
    const rect = createBaseShape('rectangle', box);
    if (fill) rect.background = fill;
    return rect;
  }

  return null;
}

function createBaseShape(type: ShapeDefinition['type'], box: Box): ShapeDefinition {
  const shape: ShapeDefinition = {
    type,
    offset: { x: px2emu(box.x), y: px2emu(box.y) },
    extend: { cx: px2emu(Math.max(box.width, 1)), cy: px2emu(Math.max(box.height, 1)) },
    layoutLocked: true,
  };
  if (box.rotate !== undefined) shape.rotate = box.rotate;
  return shape;
}

function applyBoxToShape(shape: ShapeDefinition, box: Box): void {
  shape.offset = { x: px2emu(box.x), y: px2emu(box.y) };
  shape.extend = { cx: px2emu(Math.max(box.width, 1)), cy: px2emu(Math.max(box.height, 1)) };
  shape.layoutLocked = true;
  if (box.rotate !== undefined) shape.rotate = box.rotate;
}

function parseShapeParagraphs(wrapper: HTMLElement, ctx: ParserContext): ParagraphType[] {
  const pNodes = Array.from(wrapper.querySelectorAll('p')) as HTMLElement[];
  if (pNodes.length === 0) return [];

  const paragraphs: ParagraphType[] = [];
  for (const p of pNodes) {
    const parsed = parseTextElement(p, ctx);
    for (const paragraph of parsed) {
      if (paragraphHasVisibleContent(paragraph)) paragraphs.push(paragraph);
    }
  }
  return paragraphs;
}

function paragraphHasVisibleContent(paragraph: ParagraphType): boolean {
  for (const row of paragraph.rows) {
    if ((row as any).isBr) return true;
    const normalized = (row.text || '').replace(/\u00a0/g, ' ').trim();
    if (normalized) return true;
  }
  return false;
}

function getShapeToken(wrapper: HTMLElement): string {
  const token = Array.from(wrapper.classList).find(
    (cls) => cls.startsWith('shape-') && cls !== 'shape-wrapper'
  );
  return token ? token.slice('shape-'.length) : '';
}

function extractAbsoluteBox(wrapper: HTMLElement, layerRoot: HTMLElement): Box | null {
  let x = 0;
  let y = 0;
  let rotate = 0;
  let current: HTMLElement | null = wrapper;
  let reachedLayer = false;

  while (current) {
    x += getStylePx(current, 'left');
    y += getStylePx(current, 'top');
    rotate += getRotateDeg(current);

    if (current === layerRoot) {
      reachedLayer = true;
      break;
    }
    current = current.parentElement as HTMLElement | null;
  }

  if (!reachedLayer) return null;

  const width = getStylePx(wrapper, 'width');
  const height = getStylePx(wrapper, 'height');
  const box: Box = {
    x,
    y,
    width,
    height,
  };
  if (Math.abs(rotate) > 0.001) box.rotate = rotate;
  return box;
}

function getStylePx(el: HTMLElement, prop: string): number {
  const raw = el.style.getPropertyValue(prop);
  const parsed = parseFloat(raw || '0');
  return Number.isFinite(parsed) ? parsed : 0;
}

function getRotateDeg(el: HTMLElement): number {
  const transform = el.style.getPropertyValue('transform');
  if (!transform) return 0;
  const match = transform.match(/rotate\(([-\d.]+)deg\)/i);
  if (!match) return 0;
  const parsed = parseFloat(match[1]);
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseBackgroundColor(slideWrapper: HTMLElement): ColorType | undefined {
  const bgEl = Array.from(slideWrapper.children).find((el) =>
    (el as HTMLElement).classList?.contains('slide-background')
  ) as HTMLElement | undefined;
  if (!bgEl) return undefined;
  const bg = bgEl.style.getPropertyValue('background') || bgEl.style.getPropertyValue('background-color');
  return parseCssColor(bg || '');
}

function parsePrimaryFill(wrapper: HTMLElement): ColorType | undefined {
  const shapeNode = wrapper.querySelector('svg > rect, svg > ellipse, svg > path');
  if (!shapeNode) return undefined;
  const fill = shapeNode.getAttribute('fill') || (shapeNode as SVGElement).style?.fill || '';
  return parseCssColor(fill);
}

function parseCssColor(colorValue: string): ColorType | undefined {
  const color = colorValue.trim();
  if (!color || color === 'none' || color === 'transparent') return undefined;

  if (color.startsWith('#')) {
    const hex = normalizeHex(color);
    return hex ? { type: 'solidFill', color: hex } : undefined;
  }

  const rgba = color.match(/rgba?\(\s*([.\d]+)\s*,\s*([.\d]+)\s*,\s*([.\d]+)(?:\s*,\s*([.\d]+))?\s*\)/i);
  if (rgba) {
    const r = clamp255(parseFloat(rgba[1]));
    const g = clamp255(parseFloat(rgba[2]));
    const b = clamp255(parseFloat(rgba[3]));
    const alpha = rgba[4] !== undefined ? clamp01(parseFloat(rgba[4])) : undefined;
    const result: ColorType = {
      type: 'solidFill',
      color: toHex(r) + toHex(g) + toHex(b),
    };
    if (alpha !== undefined && alpha < 1) result.alpha = alpha;
    return result;
  }

  return undefined;
}

function normalizeHex(hex: string): string | undefined {
  let value = hex.replace('#', '').trim();
  if (!/^[0-9a-f]{3,8}$/i.test(value)) return undefined;

  if (value.length === 3 || value.length === 4) {
    value = value
      .slice(0, 3)
      .split('')
      .map((ch) => ch + ch)
      .join('');
  }

  if (value.length >= 6) return value.slice(0, 6).toUpperCase();
  return undefined;
}

function clamp255(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(255, Math.round(value)));
}

function clamp01(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(0, Math.min(1, value));
}

function toHex(value: number): string {
  return value.toString(16).padStart(2, '0').toUpperCase();
}

function parseCustomGeom(
  wrapper: HTMLElement,
  boxWidth: number,
  boxHeight: number
): { width: number; height: number; segments: CustomGeomSegment[] } | null {
  const pathEl = wrapper.querySelector('svg > path') as SVGPathElement | null;
  if (!pathEl) return null;
  const d = pathEl.getAttribute('d');
  if (!d) return null;

  const segments = parseSvgPathData(d);
  if (segments.length === 0) return null;

  return {
    width: Math.max(boxWidth, 1),
    height: Math.max(boxHeight, 1),
    segments,
  };
}

function parseSvgPathData(d: string): CustomGeomSegment[] {
  const tokens = tokenizePath(d);
  if (tokens.length === 0) return [];

  const segments: CustomGeomSegment[] = [];
  let i = 0;
  let cmd = '';
  let cx = 0;
  let cy = 0;
  let subpathStartX = 0;
  let subpathStartY = 0;

  while (i < tokens.length) {
    const token = tokens[i];
    if (isCommand(token)) {
      cmd = token;
      i++;
    } else if (!cmd) {
      // Path must start with a command.
      return [];
    }

    switch (cmd) {
      case 'M':
      case 'm': {
        const firstPair = readPair(tokens, i);
        if (!firstPair) return [];
        i = firstPair.nextIndex;
        const [mx, my] = cmd === 'm'
          ? [cx + firstPair.x, cy + firstPair.y]
          : [firstPair.x, firstPair.y];
        segments.push({ cmd: 'M', x: mx, y: my });
        cx = mx;
        cy = my;
        subpathStartX = mx;
        subpathStartY = my;

        // Subsequent coordinate pairs after M/m are treated as L/l.
        while (true) {
          const pair = readPair(tokens, i);
          if (!pair) break;
          i = pair.nextIndex;
          const [lx, ly] = cmd === 'm'
            ? [cx + pair.x, cy + pair.y]
            : [pair.x, pair.y];
          segments.push({ cmd: 'L', x: lx, y: ly });
          cx = lx;
          cy = ly;
        }
        break;
      }
      case 'L':
      case 'l': {
        while (true) {
          const pair = readPair(tokens, i);
          if (!pair) break;
          i = pair.nextIndex;
          const [lx, ly] = cmd === 'l'
            ? [cx + pair.x, cy + pair.y]
            : [pair.x, pair.y];
          segments.push({ cmd: 'L', x: lx, y: ly });
          cx = lx;
          cy = ly;
        }
        break;
      }
      case 'H':
      case 'h': {
        while (i < tokens.length && !isCommand(tokens[i])) {
          const xValue = parseNumber(tokens[i++]);
          if (xValue === null) return [];
          cx = cmd === 'h' ? cx + xValue : xValue;
          segments.push({ cmd: 'L', x: cx, y: cy });
        }
        break;
      }
      case 'V':
      case 'v': {
        while (i < tokens.length && !isCommand(tokens[i])) {
          const yValue = parseNumber(tokens[i++]);
          if (yValue === null) return [];
          cy = cmd === 'v' ? cy + yValue : yValue;
          segments.push({ cmd: 'L', x: cx, y: cy });
        }
        break;
      }
      case 'C':
      case 'c': {
        while (true) {
          const curve = readCurve(tokens, i);
          if (!curve) break;
          i = curve.nextIndex;
          const c = cmd === 'c'
            ? {
                x1: cx + curve.x1,
                y1: cy + curve.y1,
                x2: cx + curve.x2,
                y2: cy + curve.y2,
                x: cx + curve.x,
                y: cy + curve.y,
              }
            : curve;
          segments.push({ cmd: 'C', ...c });
          cx = c.x;
          cy = c.y;
        }
        break;
      }
      case 'Z':
      case 'z': {
        segments.push({ cmd: 'Z' });
        cx = subpathStartX;
        cy = subpathStartY;
        break;
      }
      default:
        // Unsupported command; bail out for now.
        return [];
    }
  }

  return segments;
}

function tokenizePath(d: string): string[] {
  const tokens: string[] = [];
  const re = /([MmLlHhVvCcZz])|(-?\d*\.?\d+(?:e[-+]?\d+)?)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(d)) !== null) {
    if (match[1]) tokens.push(match[1]);
    else if (match[2]) tokens.push(match[2]);
  }
  return tokens;
}

function isCommand(token: string): boolean {
  return /^[MmLlHhVvCcZz]$/.test(token);
}

function parseNumber(token: string): number | null {
  const n = parseFloat(token);
  return Number.isFinite(n) ? n : null;
}

function readPair(tokens: string[], index: number): { x: number; y: number; nextIndex: number } | null {
  if (index + 1 >= tokens.length) return null;
  if (isCommand(tokens[index]) || isCommand(tokens[index + 1])) return null;
  const x = parseNumber(tokens[index]);
  const y = parseNumber(tokens[index + 1]);
  if (x === null || y === null) return null;
  return { x, y, nextIndex: index + 2 };
}

function readCurve(
  tokens: string[],
  index: number
): { x1: number; y1: number; x2: number; y2: number; x: number; y: number; nextIndex: number } | null {
  if (index + 5 >= tokens.length) return null;
  for (let i = 0; i < 6; i++) {
    if (isCommand(tokens[index + i])) return null;
  }
  const x1 = parseNumber(tokens[index]);
  const y1 = parseNumber(tokens[index + 1]);
  const x2 = parseNumber(tokens[index + 2]);
  const y2 = parseNumber(tokens[index + 3]);
  const x = parseNumber(tokens[index + 4]);
  const y = parseNumber(tokens[index + 5]);
  if (x1 === null || y1 === null || x2 === null || y2 === null || x === null || y === null) return null;
  return { x1, y1, x2, y2, x, y, nextIndex: index + 6 };
}
