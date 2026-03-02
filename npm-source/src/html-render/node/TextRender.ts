import TextBody from '../../reader/node/TextBody';
import { getRenderColor } from '../../utils/color';
import { englishCode } from '../../utils/unit';

export interface textArea {
  left: number;
  top: number;
  right: number;
  bottom: number;
  w: number;
  h: number;
}

function renderRow(row: any, inheritRProps: any, bodyProps?: any, slideNumber?: number): HTMLSpanElement {
  const mergedProps = { ...inheritRProps, ...row.props };
  const span = document.createElement('span');
  let text = typeof row.text === 'string' ? row.text : '';
  if (row.fieldType === 'slidenum' && slideNumber !== undefined) {
    text = String(slideNumber);
  }
  span.innerHTML = text;

  let fontSize = 18;
  if (mergedProps.size) {
    if (bodyProps?.normAutofit?.fontScale) {
      fontSize = mergedProps.size * bodyProps.normAutofit.fontScale;
      span.style.fontSize = fontSize + 'px';
    } else {
      fontSize = mergedProps.size;
      span.style.fontSize = fontSize + 'px';
    }
  }

  const color = getRenderColor(mergedProps.color);
  if (color) span.style.color = color;

  const nonChinese = /^[^\u4e00-\u9fff]+$/;
  if (mergedProps.typeface) {
    span.style.fontFamily = mergedProps.typeface;
    switch (mergedProps.typeface) {
      case 'DengXian':
        if (nonChinese.test(row.text)) span.style.letterSpacing = -0.04 * fontSize + 'px';
        break;
      case 'DengXian Light':
        if (nonChinese.test(row.text)) span.style.letterSpacing = -0.05 * fontSize + 'px';
        break;
      case 'STLiti':
      case 'SimSun':
      case 'NSimSun':
      case 'SimHei':
        if (nonChinese.test(row.text)) span.style.fontSize = 0.85 * parseInt(span.style.fontSize) + 'px';
        break;
      case '华文中宋':
      case 'Fira Sans Extra Condensed Medium':
        span.style.fontSize = 0.85 * parseInt(span.style.fontSize) + 'px';
        break;
      case 'FangSong':
        span.style.letterSpacing = -0.08 * fontSize + 'px';
        break;
    }
  } else {
    if (nonChinese.test(row.text)) span.style.letterSpacing = -0.04 * fontSize + 'px';
  }

  if (mergedProps.bold) span.style.fontWeight = 'bold';
  if (mergedProps.italic) span.style.fontStyle = 'italic';
  if (mergedProps.underline && mergedProps.underline !== 'none') span.style.textDecoration = 'underline';
  if (mergedProps.background) span.style.backgroundColor = getRenderColor(mergedProps.background);
  if (mergedProps.baseline) {
    const val = parseInt(mergedProps.baseline);
    if (val > 0) span.style.verticalAlign = 'super';
    else if (val < 0) span.style.verticalAlign = 'sub';
    span.style.fontSize = Math.round(fontSize * 0.65) + 'px';
  }
  span.style.wordBreak = 'break-word';

  return span;
}

function renderBulletAutoNum(p: HTMLElement, props: any, levelIndex: number) {
  const span = document.createElement('span');
  const firstChild = p.firstElementChild as HTMLElement;
  span.style.fontSize = firstChild.style.fontSize;
  span.style.color = firstChild.style.color;
  span.style.fontWeight = firstChild.style.fontWeight;
  span.style.fontStyle = firstChild.style.fontStyle;
  const indent = Math.abs(props.indent || 0);
  if (indent > 0) {
    span.style.display = 'inline-block';
    span.style.width = indent + 'px';
    span.style.marginLeft = -indent + 'px';
  } else {
    span.style.marginRight = '10px';
  }

  switch (props.buAutoNum) {
    case 'arabicPeriod':
    default:
      span.textContent = levelIndex + '.';
      break;
    case 'circleNumDbPlain':
      span.textContent = ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩','⑪','⑫','⑬','⑭','⑮','⑯','⑰','⑱','⑲','⑳'][levelIndex - 1] || levelIndex + '';
      break;
    case 'romanUcPeriod':
      span.textContent = toRoman(levelIndex) + '.';
      break;
    case 'alphaUcPeriod':
      span.textContent = englishCode(levelIndex) + '.';
      break;
    case 'alphaLcPeriod':
      span.textContent = englishCode(levelIndex).toLowerCase() + '.';
      break;
    case 'alphaLcParenR':
      span.textContent = englishCode(levelIndex).toLowerCase() + ')';
      break;
    case 'ea1JpnChsDbPeriod':
      span.textContent = toChineseNumber(levelIndex) + '.';
      break;
  }
  p.prepend(span);
}

function toRoman(num: number): string {
  const numerals = [
    { value: 1000, numeral: 'M' }, { value: 900, numeral: 'CM' },
    { value: 500, numeral: 'D' }, { value: 400, numeral: 'CD' },
    { value: 100, numeral: 'C' }, { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' }, { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' }, { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' }, { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' },
  ];
  if (typeof num !== 'number' || num < 1 || num > 3999) throw new Error('Input must be a number between 1 and 3999.');
  let result = '';
  for (let i = 0; i < numerals.length; i++) {
    while (num >= numerals[i].value) {
      result += numerals[i].numeral;
      num -= numerals[i].value;
    }
  }
  return result;
}

function toChineseNumber(num: number): string {
  const chars = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  if (!Number.isInteger(num) || num < 0) return '';
  let result = '';
  const str = num.toString();
  for (let i = 0; i < str.length; i++) result += chars[parseInt(str[i], 10)];
  return result;
}

function renderBulletChar(p: HTMLElement, props: any) {
  const span = document.createElement('span');
  const firstChild = p.firstElementChild as HTMLElement;
  span.style.color = firstChild.style.color;
  span.style.fontSize = firstChild.style.fontSize;
  if (props.buFont) span.style.fontFamily = props.buFont;
  const charMap: { [key: string]: string } = {
    'n': '■', 'l': '●', 'u': '◆', 'p': '□', 'ü': '✔', 'Ø': '➢', '•': '•', '§': '■',
  };
  span.textContent = charMap[props.buChar] || '■';
  const textFontSize = parseFloat(firstChild.style.fontSize) || 10;
  let bulletFontSize = textFontSize;
  if (typeof props.buSzPts === 'number') {
    bulletFontSize = props.buSzPts;
  } else if (typeof props.buSzPct === 'number') {
    bulletFontSize = textFontSize * props.buSzPct;
  } else if (props.buSzTx) {
    bulletFontSize = textFontSize;
  }
  span.style.fontSize = bulletFontSize + 'px';
  span.style.verticalAlign = 'middle';
  const indent = Math.abs(props.indent || 0);
  if (indent > 0) {
    span.style.display = 'inline-block';
    span.style.width = indent + 'px';
    span.style.marginLeft = -indent + 'px';
  } else {
    span.style.marginRight = '10px';
  }
  p.prepend(span);
}

export function _renderParagraph(
  paragraph: any,
  levelIndex: number = 0,
  options: { isFirst?: boolean; isLast?: boolean; bodyProps?: any; isTable?: boolean; slideNumber?: number } = {}
): HTMLElement {
  const inheritProps = paragraph.inheritProps;
  const inheritRProps = paragraph.inheritRProps;
  const props = paragraph.props;
  const rows = paragraph.rows;
  const mergedProps = { ...inheritProps, ...props };

  const calcFontSize = () => {
    let maxSize = 0;
    for (const row of rows) {
      if (row.props && row.props.size) maxSize = Math.max(maxSize, row.props.size);
    }
    const fontScale = options?.bodyProps?.normAutofit?.fontScale || 1;
    const defaultSize = options.isTable ? (inheritRProps.size || 8) : 18;
    return (maxSize || inheritRProps.size || defaultSize) * fontScale;
  };

  const resolveParagraphSpace = (kind: 'Before' | 'After') => {
    const pointsKey = kind === 'Before' ? 'spaceBefore' : 'spaceAfter';
    const pctKey = kind === 'Before' ? 'spaceBeforePct' : 'spaceAfterPct';

    if (props[pointsKey] !== undefined) return props[pointsKey];
    if (props[pctKey] !== undefined) return props[pctKey] * calcFontSize();

    if (inheritProps[pointsKey] !== undefined) return inheritProps[pointsKey];
    if (inheritProps[pctKey] !== undefined) return inheritProps[pctKey] * calcFontSize();

    return 0;
  };

  const resolveLineHeight = () => {
    // spcPct values from OOXML are percentages of "single" (normal) line spacing,
    // which corresponds to ~1.2× font-size in CSS. Multiply by 1.2 to convert.
    const SINGLE_SPACING_FACTOR = 1.2;
    if (props.lineHeight !== undefined) return props.lineHeight * SINGLE_SPACING_FACTOR;
    if (props.lineHeightPts !== undefined) return props.lineHeightPts / calcFontSize();
    if (inheritProps.lineHeight !== undefined) return inheritProps.lineHeight * SINGLE_SPACING_FACTOR;
    if (inheritProps.lineHeightPts !== undefined) return inheritProps.lineHeightPts / calcFontSize();
    return 1;
  };

  const wrapper = document.createElement('div');
  const spaceBefore = options.isFirst ? 0 : resolveParagraphSpace('Before');
  const spaceAfter = options.isLast ? 0 : resolveParagraphSpace('After');
  const topMargin = options.isTable ? 0 : (options.isFirst ? Math.floor(0.2 * calcFontSize()) : 0);
  wrapper.style.margin = `${topMargin}px  0 0 0`;
  wrapper.style.padding = `${Math.floor(spaceBefore)}px 0px ${Math.floor(spaceAfter)}px 0px`;

  const p = document.createElement('p');
  p.style.margin = '0';
  p.style.padding = '0px';
  p.style.wordBreak = 'break-word';

  const alignMap: { [key: string]: string } = { ctr: 'center', l: 'left', r: 'right', dist: 'justify' };
  const defaultAlign = options.isTable ? 'left' : 'center';
  p.style.textAlign = (mergedProps.align && alignMap[mergedProps.align]) || defaultAlign;
  if (mergedProps.align === 'dist') p.style.textAlignLast = 'justify';

  let lineHeight = resolveLineHeight();
  if (options.bodyProps?.normAutofit?.lnSpcReduction) {
    lineHeight *= 1 - options.bodyProps.normAutofit.lnSpcReduction;
  }
  p.style.lineHeight = lineHeight + '';
  p.style.fontSize = calcFontSize() + 'px';

  if (rows.length) {
    for (const row of rows) {
      if (row.isBr) {
        p.appendChild(document.createElement('br'));
      } else {
        p.appendChild(renderRow(row, { ...inheritRProps, marginTop: Math.floor(0.2 * calcFontSize()) }, options.bodyProps, options.slideNumber));
      }
    }
    if (!mergedProps.buNone) {
      if (mergedProps.buAutoNum) {
        renderBulletAutoNum(p, mergedProps, levelIndex);
      } else if (mergedProps.buChar) {
        renderBulletChar(p, mergedProps);
      }
    }
    p.style.paddingLeft = (mergedProps.marginLeft || 0) + 'px';
  } else {
    const emptySpan = document.createElement('span');
    emptySpan.innerHTML = '&nbsp;';
    emptySpan.style.fontSize = inheritRProps.size + 'px';
    p.appendChild(emptySpan);
  }

  wrapper.appendChild(p);
  return wrapper;
}

export function renderTextBody(textBody: TextBody, textArea: textArea, isTextBox?: boolean, slideNumber?: number): HTMLElement {
  const bodyProps = { ...textBody.inheritProps, ...textBody.props };
  const textWrapper = document.createElement('div');

  textWrapper.style.position = 'absolute';
  textWrapper.style.top = (textArea.top || 0) + 'px';
  textWrapper.style.bottom = (textArea.bottom || 0) + 'px';
  textWrapper.style.left = (textArea.left || 0) + 'px';
  textWrapper.style.right = (textArea.right || 0) + 'px';
  textWrapper.style.width = textArea.w + 'px';
  textWrapper.style.height = textArea.h + 'px';
  textWrapper.style.overflow = 'hidden';

  const lIns = bodyProps.lIns !== undefined ? bodyProps.lIns : 7;
  const rIns = bodyProps.rIns !== undefined ? bodyProps.rIns : 7;
  const tIns = bodyProps.tIns !== undefined ? bodyProps.tIns : 3.5;
  const bIns = bodyProps.bIns !== undefined ? bodyProps.bIns : 3.5;

  textWrapper.style.paddingLeft = lIns + 'px';
  textWrapper.style.paddingRight = rIns + 'px';
  textWrapper.style.paddingTop = tIns + 'px';
  textWrapper.style.paddingBottom = bIns + 'px';
  textWrapper.style.boxSizing = 'border-box';

  if (bodyProps.anchor === 'ctr') {
    textWrapper.style.display = 'flex';
    textWrapper.style.flexDirection = 'column';
    textWrapper.style.justifyContent = 'center';
  } else if (bodyProps.anchor === 'b') {
    textWrapper.style.display = 'flex';
    textWrapper.style.flexDirection = 'column';
    textWrapper.style.justifyContent = 'flex-end';
  }

  let buIndex = 0;
  const paragraphs = textBody.paragraphs || [];
  for (let i = 0; i < paragraphs.length; i++) {
    const para = paragraphs[i];
    const mergedProps = { ...(para as any).inheritProps, ...para.props };
    if (mergedProps.buAutoNum) buIndex++;
    else buIndex = 0;

    const paraEl = _renderParagraph(para, buIndex || i + 1, {
      isFirst: i === 0,
      isLast: i === paragraphs.length - 1,
      bodyProps,
      slideNumber,
    });
    textWrapper.appendChild(paraEl);
  }

  return textWrapper;
}
