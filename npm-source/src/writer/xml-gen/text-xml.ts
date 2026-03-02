import { ParagraphType } from '../../types/text';
import { tag, escapeXml } from '../utils/xml-builder';
import { fontSize2hundredthPt } from '../utils/unit-reverse';
import { generateColorXml } from './color-xml';

export function generateTxBodyXml(
  paragraphs: ParagraphType[],
  bodyProps?: Record<string, string>
): string {
  const defaultBodyProps: Record<string, string> = {
    wrap: 'square',
    rtlCol: '0',
    ...bodyProps,
  };

  const bodyPr = tag('a:bodyPr', defaultBodyProps);
  const lstStyle = tag('a:lstStyle');

  const pElements = paragraphs.map((p) => generateParagraphXml(p)).join('');

  return bodyPr + lstStyle + (pElements || tag('a:p'));
}

function generateParagraphXml(para: ParagraphType): string {
  const pPr = generateParagraphPropsXml(para);
  const runs = para.rows.map((row) => generateRunXml(row)).join('');
  return tag('a:p', undefined, pPr + runs);
}

function generateParagraphPropsXml(para: ParagraphType): string {
  const props = para.props;
  const attrs: Record<string, string | undefined> = {};

  if (props.algn) attrs.algn = props.algn;
  if (props.indent !== undefined) attrs.indent = String(Math.round(props.indent * 12700));
  if (props.marL !== undefined) attrs.marL = String(Math.round(props.marL * 12700));
  if (props.marR !== undefined) attrs.marR = String(Math.round(props.marR * 12700));
  if (props.lvl !== undefined) attrs.lvl = String(props.lvl);

  let children = '';

  if (props.lnSpc !== undefined) {
    children += tag('a:lnSpc', undefined,
      tag('a:spcPct', { val: String(Math.round(props.lnSpc * 100000)) })
    );
  }

  if (props.spcBef !== undefined) {
    children += tag('a:spcBef', undefined,
      tag('a:spcPts', { val: String(Math.round(props.spcBef * 100)) })
    );
  }

  if (props.spcAft !== undefined) {
    children += tag('a:spcAft', undefined,
      tag('a:spcPts', { val: String(Math.round(props.spcAft * 100)) })
    );
  }

  if (props.buNone) {
    children += tag('a:buNone');
  } else if (props.buChar) {
    if (props.buFontSize) {
      children += tag('a:buSzPct', { val: String(Math.round(props.buFontSize * 1000)) });
    }
    if (props.buColor) {
      children += tag('a:buClr', undefined, generateColorXml(props.buColor));
    }
    children += tag('a:buChar', { char: props.buChar });
  } else if (props.buAutoNum) {
    if (props.buFontSize) {
      children += tag('a:buSzPct', { val: String(Math.round(props.buFontSize * 1000)) });
    }
    if (props.buColor) {
      children += tag('a:buClr', undefined, generateColorXml(props.buColor));
    }
    children += tag('a:buAutoNum', { type: props.buAutoNum });
  }

  if (para.defRPr) {
    children += tag('a:defRPr', generateRunPropsAttrs(para.defRPr));
  }

  return tag('a:pPr', attrs, children);
}

function generateRunXml(row: { text: string; props: any; link?: string; isBr?: boolean }): string {
  if ((row as any).isBr) {
    return tag('a:br');
  }

  const attrs = generateRunPropsAttrs(row.props);
  let rPrChildren = '';

  if (row.props.color && row.props.color.type === 'solidFill' && row.props.color.color) {
    rPrChildren += tag('a:solidFill', undefined, generateColorXml(row.props.color));
  }

  if (row.props.highlight && row.props.highlight.type === 'solidFill') {
    rPrChildren += tag('a:highlight', undefined, generateColorXml(row.props.highlight));
  }

  if (row.props.fontFamily || row.props.typeface) {
    const typeface = row.props.fontFamily || row.props.typeface;
    rPrChildren += tag('a:latin', { typeface });
    rPrChildren += tag('a:ea', { typeface });
    rPrChildren += tag('a:cs', { typeface });
  }

  if (row.link) {
    rPrChildren += tag('a:hlinkClick', { 'r:id': row.link });
  }

  const rPr = tag('a:rPr', { lang: 'en-US', ...attrs }, rPrChildren || undefined);
  const textContent = tag('a:t', undefined, escapeXml(row.text));

  return tag('a:r', undefined, rPr + textContent);
}

function generateRunPropsAttrs(props: any): Record<string, string | undefined> {
  const attrs: Record<string, string | undefined> = {};

  if (props.size !== undefined || props.fontSize !== undefined) {
    const size = props.size || props.fontSize;
    attrs.sz = String(fontSize2hundredthPt(size));
  }

  if (props.bold) attrs.b = '1';
  if (props.italic) attrs.i = '1';
  if (props.underline) attrs.u = props.underline;
  if (props.strike) attrs.strike = props.strike;

  return attrs;
}
