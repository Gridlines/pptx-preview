import { SlideDefinition, ShapeDefinition, WriterOptions } from '../types/writer-types';
import { handleElement } from './element-handlers';
import { calculateLayout } from './layout-calculator';
import { parseRenderedSlideDocument } from './rendered-html-parser';

const DEFAULT_WIDTH = 960;
const DEFAULT_HEIGHT = 540;

export function parseSlideHtml(html: string, options?: WriterOptions): SlideDefinition {
  const slideWidth = options?.slideWidth || DEFAULT_WIDTH;
  const slideHeight = options?.slideHeight || DEFAULT_HEIGHT;
  const defaultFontFamily = options?.defaultFontFamily || 'Calibri';
  const defaultFontSize = options?.defaultFontSize || 18;

  const doc = parseHtmlFragment(html);

  // If this is HTML emitted by our renderer, parse positioned shape wrappers directly.
  const renderedSlide = parseRenderedSlideDocument(doc, options);
  if (renderedSlide) {
    calculateLayout(renderedSlide.shapes, slideWidth, slideHeight);
    return renderedSlide;
  }

  const shapes: ShapeDefinition[] = [];

  const children = doc.body ? Array.from(doc.body.childNodes) : Array.from(doc.childNodes);

  for (const node of children) {
    if (node.nodeType === 1) {
      const element = node as Element;
      const result = handleElement(element, { defaultFontFamily, defaultFontSize });
      if (result) {
        shapes.push(...(Array.isArray(result) ? result : [result]));
      }
    } else if (node.nodeType === 3) {
      const text = (node.textContent || '').trim();
      if (text) {
        shapes.push({
          type: 'textbox',
          offset: { x: 0, y: 0 },
          extend: { cx: 0, cy: 0 },
          paragraphs: [{
            props: {},
            rows: [{
              text,
              props: { size: defaultFontSize, fontFamily: defaultFontFamily },
            }],
          }],
        });
      }
    }
  }

  calculateLayout(shapes, slideWidth, slideHeight);

  return { shapes };
}

let _JSDOM: any;

/**
 * Allow callers (or Node.js bootstrap) to inject a JSDOM constructor
 * so the parser works in Node.js without browser DOMParser.
 */
export function setJSDOM(ctor: any): void {
  _JSDOM = ctor;
}

function parseHtmlFragment(html: string): Document {
  if (typeof DOMParser !== 'undefined') {
    return new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
  }

  // Auto-detect jsdom in Node.js
  if (!_JSDOM) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const jsdom = eval('require')('jsdom');
      _JSDOM = jsdom.JSDOM;
    } catch {
      throw new Error(
        'DOMParser not available. Install jsdom and call setJSDOM() or run in a browser.'
      );
    }
  }

  const dom = new _JSDOM(`<body>${html}</body>`);
  return dom.window.document;
}
