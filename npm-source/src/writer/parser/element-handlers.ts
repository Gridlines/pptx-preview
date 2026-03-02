import { ShapeDefinition } from '../types/writer-types';
import { ParagraphType } from '../../types/text';
import { parseTextElement, parseInlineContent } from './text-parser';
import { parseListElement } from './list-parser';
import { parseTableElement } from './table-parser';
import { parseImageElement } from './image-parser';

export type ParserContext = {
  defaultFontFamily: string;
  defaultFontSize: number;
};

export function handleElement(
  element: Element,
  ctx: ParserContext
): ShapeDefinition | ShapeDefinition[] | null {
  const tagName = element.tagName.toLowerCase();

  switch (tagName) {
    case 'h1':
      return createTextShape(parseTextElement(element, { ...ctx, defaultFontSize: 44, bold: true }));
    case 'h2':
      return createTextShape(parseTextElement(element, { ...ctx, defaultFontSize: 36, bold: true }));
    case 'h3':
      return createTextShape(parseTextElement(element, { ...ctx, defaultFontSize: 28, bold: true }));
    case 'h4':
      return createTextShape(parseTextElement(element, { ...ctx, defaultFontSize: 24, bold: true }));
    case 'h5':
      return createTextShape(parseTextElement(element, { ...ctx, defaultFontSize: 20, bold: true }));
    case 'h6':
      return createTextShape(parseTextElement(element, { ...ctx, defaultFontSize: 18, bold: true }));

    case 'p':
      return createTextShape(parseTextElement(element, ctx));

    case 'blockquote':
      return createTextShape(parseTextElement(element, {
        ...ctx,
        marginLeft: 40,
      }));

    case 'pre': {
      const codeEl = element.querySelector('code');
      const text = codeEl ? codeEl.textContent || '' : element.textContent || '';
      return createTextShape([{
        props: {},
        rows: [{
          text,
          props: {
            size: 14,
            fontFamily: 'Courier New',
          },
        }],
      }]);
    }

    case 'code':
      return createTextShape([{
        props: {},
        rows: [{
          text: element.textContent || '',
          props: {
            size: ctx.defaultFontSize,
            fontFamily: 'Courier New',
          },
        }],
      }]);

    case 'ul':
    case 'ol':
      return createTextShape(parseListElement(element, ctx));

    case 'table':
      return parseTableElement(element, ctx);

    case 'img':
      return parseImageElement(element, ctx);

    case 'div':
    case 'section':
    case 'article':
    case 'main':
    case 'header':
    case 'footer':
    case 'nav':
    case 'aside': {
      const shapes: ShapeDefinition[] = [];
      const children = Array.from(element.children);
      for (const child of children) {
        const result = handleElement(child, ctx);
        if (result) {
          shapes.push(...(Array.isArray(result) ? result : [result]));
        }
      }
      if (shapes.length === 0 && element.textContent?.trim()) {
        return createTextShape(parseTextElement(element, ctx));
      }
      return shapes.length > 0 ? shapes : null;
    }

    case 'br':
      return null;

    case 'hr':
      return null;

    default: {
      if (element.textContent?.trim()) {
        return createTextShape(parseTextElement(element, ctx));
      }
      return null;
    }
  }
}

function createTextShape(paragraphs: ParagraphType[]): ShapeDefinition | null {
  if (!paragraphs || paragraphs.length === 0) return null;
  return {
    type: 'textbox',
    offset: { x: 0, y: 0 },
    extend: { cx: 0, cy: 0 },
    paragraphs,
  };
}
