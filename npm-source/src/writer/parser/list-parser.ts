import { ParagraphType } from '../../types/text';
import { parseInlineContent } from './text-parser';
import { ParserContext } from './element-handlers';

export function parseListElement(
  element: Element,
  ctx: ParserContext,
  depth: number = 0
): ParagraphType[] {
  const tagName = element.tagName.toLowerCase();
  const isOrdered = tagName === 'ol';
  const paragraphs: ParagraphType[] = [];

  const items = Array.from(element.children).filter(
    (child) => child.tagName.toLowerCase() === 'li'
  );

  for (const li of items) {
    const rows = parseInlineContent(li, {
      size: ctx.defaultFontSize,
      fontFamily: ctx.defaultFontFamily,
    });

    // Filter out rows that come from nested lists (their text will be handled recursively)
    const textRows = rows.filter(row => {
      // Keep all text rows except those that are purely from nested list content
      return row.text !== undefined;
    });

    // Get direct text content only (not from nested lists)
    const directRows: typeof rows = [];
    for (const child of Array.from(li.childNodes)) {
      if (child.nodeType === 3) {
        const text = child.textContent || '';
        if (text.trim()) {
          directRows.push({
            text,
            props: { size: ctx.defaultFontSize, fontFamily: ctx.defaultFontFamily },
          });
        }
      } else if (child.nodeType === 1) {
        const childEl = child as Element;
        const childTag = childEl.tagName.toLowerCase();
        if (childTag !== 'ul' && childTag !== 'ol') {
          const inlineRows = parseInlineContent(childEl, {
            size: ctx.defaultFontSize,
            fontFamily: ctx.defaultFontFamily,
          });
          directRows.push(...inlineRows);
        }
      }
    }

    if (directRows.length > 0) {
      paragraphs.push({
        props: {
          marL: (depth + 1) * 36,
          indent: -18,
          lvl: depth,
          ...(isOrdered
            ? { buAutoNum: 'arabicPeriod' }
            : { buChar: '\u2022' }),
        },
        rows: directRows,
      });
    }

    // Handle nested lists
    for (const child of Array.from(li.children)) {
      const childTag = child.tagName.toLowerCase();
      if (childTag === 'ul' || childTag === 'ol') {
        paragraphs.push(...parseListElement(child, ctx, depth + 1));
      }
    }
  }

  return paragraphs;
}
