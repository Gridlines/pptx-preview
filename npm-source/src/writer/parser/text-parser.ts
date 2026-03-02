import { ParagraphType, RowPropsType } from '../../types/text';
import { ParserContext } from './element-handlers';

export type TextParserOptions = ParserContext & {
  bold?: boolean;
  italic?: boolean;
  underline?: string;
  strike?: string;
  marginLeft?: number;
};

export function parseTextElement(
  element: Element,
  options: TextParserOptions
): ParagraphType[] {
  const inheritedRunProps: any = {
    size: options.defaultFontSize,
    fontFamily: options.defaultFontFamily,
    bold: options.bold,
    italic: options.italic,
    underline: options.underline,
    strike: options.strike,
  };

  // Apply block-level style to inherited run props (color, font-family, font-size)
  const style = (element as HTMLElement).getAttribute?.('style');
  if (style) {
    applyInlineStyleToRunProps(style, inheritedRunProps);
  }

  const rows = parseInlineContent(element, inheritedRunProps);

  const props: any = {};
  if (options.marginLeft) props.marL = options.marginLeft;

  if (style) {
    applyInlineStyle(style, props);
  }

  return [{
    props,
    rows,
  }];
}

export function parseInlineContent(
  node: Node,
  inheritedProps: RowPropsType & { size?: number; fontFamily?: string }
): Array<{ text: string; props: RowPropsType; link?: string }> {
  const rows: Array<{ text: string; props: RowPropsType; link?: string }> = [];

  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === 3) {
      const text = child.textContent || '';
      if (text) {
        rows.push({ text, props: { ...inheritedProps } });
      }
    } else if (child.nodeType === 1) {
      const el = child as Element;
      const tagName = el.tagName.toLowerCase();
      const childProps = { ...inheritedProps };
      let link: string | undefined;

      switch (tagName) {
        case 'strong':
        case 'b':
          childProps.bold = true;
          break;
        case 'em':
        case 'i':
          childProps.italic = true;
          break;
        case 'u':
          childProps.underline = 'sng';
          break;
        case 's':
        case 'del':
        case 'strike':
          childProps.strike = 'sngStrike';
          break;
        case 'a':
          link = el.getAttribute('href') || undefined;
          childProps.underline = 'sng';
          childProps.color = { type: 'solidFill', color: '0563C1' };
          break;
        case 'code':
          childProps.fontFamily = 'Courier New';
          break;
        case 'sup':
          childProps.baseline = 30000;
          break;
        case 'sub':
          childProps.baseline = -25000;
          break;
        case 'br':
          rows.push({ text: '', props: { ...inheritedProps }, isBr: true } as any);
          continue;
      }

      // Apply inline style from ANY element (not just <span>)
      const elStyle = el.getAttribute('style');
      if (elStyle) {
        applyInlineStyleToRunProps(elStyle, childProps);
      }

      const childRows = parseInlineContent(el, childProps);
      for (const row of childRows) {
        if (link && !row.link) row.link = link;
        rows.push(row);
      }
    }
  }

  return rows;
}

function applyInlineStyle(style: string, props: any): void {
  const textAlign = extractStyleValue(style, 'text-align');
  if (textAlign) {
    const alignMap: Record<string, string> = {
      left: 'l', center: 'ctr', right: 'r', justify: 'just',
    };
    if (alignMap[textAlign]) props.algn = alignMap[textAlign];
  }
}

function applyInlineStyleToRunProps(style: string, props: any): void {
  const fontWeight = extractStyleValue(style, 'font-weight');
  if (fontWeight === 'bold' || parseInt(fontWeight) >= 700) props.bold = true;

  const fontStyle = extractStyleValue(style, 'font-style');
  if (fontStyle === 'italic') props.italic = true;

  const textDecoration = extractStyleValue(style, 'text-decoration');
  if (textDecoration?.includes('underline')) props.underline = 'sng';
  if (textDecoration?.includes('line-through')) props.strike = 'sngStrike';

  const color = extractStyleValue(style, 'color');
  if (color) {
    const hex = colorToHex(color);
    if (hex) props.color = { type: 'solidFill', color: hex };
  }

  const fontSize = extractStyleValue(style, 'font-size');
  if (fontSize) {
    const px = parseFloat(fontSize);
    if (!isNaN(px)) props.size = px * 0.75; // px to pt
  }

  const fontFamily = extractStyleValue(style, 'font-family');
  if (fontFamily) props.fontFamily = fontFamily.replace(/['"]/g, '').split(',')[0].trim();

  const bgColor = extractStyleValue(style, 'background-color');
  if (bgColor) {
    const hex = colorToHex(bgColor);
    if (hex) props.highlight = { type: 'solidFill', color: hex };
  }
}

function extractStyleValue(style: string, property: string): string | undefined {
  // Use word boundary (or start of string) to prevent "color" matching inside "background-color"
  const regex = new RegExp(`(?:^|;|\\s)${property}\\s*:\\s*([^;]+)`, 'i');
  const match = style.match(regex);
  return match?.[1]?.trim();
}

function colorToHex(color: string): string | undefined {
  color = color.trim();
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) hex = hex.split('').map((c) => c + c).join('');
    return hex.toUpperCase();
  }
  const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);
  if (rgbMatch) {
    const r = parseInt(rgbMatch[1]).toString(16).padStart(2, '0');
    const g = parseInt(rgbMatch[2]).toString(16).padStart(2, '0');
    const b = parseInt(rgbMatch[3]).toString(16).padStart(2, '0');
    return (r + g + b).toUpperCase();
  }
  return undefined;
}
