import { get } from 'lodash';
import PPTX from '../reader/PPTX';
import Theme from '../reader/Theme';
import { BackgroundImageType, ColorType, GradFillType } from '../types/color';
import { emu2px, angle, percent } from './unit';

interface SolidFill {
  'a:srgbClr'?: {
    attrs: { val: string };
    'a:alpha'?: { attrs: { val: string } };
  };
  'a:schemeClr'?: {
    attrs: { val: string };
    'a:alpha'?: { attrs: { val: string } };
  };
}

const COLOR_NAMES = [
  'white', 'AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure',
  'Beige', 'Bisque', 'black', 'BlanchedAlmond', 'Blue', 'BlueViolet',
  'Brown', 'BurlyWood', 'CadetBlue', 'Chartreuse', 'Chocolate', 'Coral',
  'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue', 'DarkCyan',
  'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki',
  'DarkMagenta', 'DarkOliveGreen', 'DarkOrange', 'DarkOrchid', 'DarkRed',
  'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray',
  'DarkSlateGrey', 'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue',
  'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite',
  'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod',
  'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew', 'HotPink',
  'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush',
  'LawnGreen', 'LemonChiffon', 'LightBlue', 'LightCoral', 'LightCyan',
  'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen',
  'LightPink', 'LightSalmon', 'LightSeaGreen', 'LightSkyBlue',
  'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow',
  'Lime', 'LimeGreen', 'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine',
  'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen',
  'MediumSlateBlue', 'MediumSpringGreen', 'MediumTurquoise',
  'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin',
  'NavajoWhite', 'Navy', 'OldLace', 'Olive', 'OliveDrab', 'Orange',
  'OrangeRed', 'Orchid', 'PaleGoldenRod', 'PaleGreen', 'PaleTurquoise',
  'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum',
  'PowderBlue', 'Purple', 'RebeccaPurple', 'Red', 'RosyBrown', 'RoyalBlue',
  'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell', 'Sienna',
  'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow',
  'SpringGreen', 'SteelBlue', 'Tan', 'Teal', 'Thistle', 'Tomato',
  'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow',
  'YellowGreen',
];

const COLOR_HEX = [
  'ffffff', 'f0f8ff', 'faebd7', '00ffff', '7fffd4', 'f0ffff',
  'f5f5dc', 'ffe4c4', '000000', 'ffebcd', '0000ff', '8a2be2',
  'a52a2a', 'deb887', '5f9ea0', '7fff00', 'd2691e', 'ff7f50',
  '6495ed', 'fff8dc', 'dc143c', '00ffff', '00008b', '008b8b',
  'b8860b', 'a9a9a9', 'a9a9a9', '006400', 'bdb76b',
  '8b008b', '556b2f', 'ff8c00', '9932cc', '8b0000',
  'e9967a', '8fbc8f', '483d8b', '2f4f4f',
  '2f4f4f', '00ced1', '9400d3', 'ff1493', '00bfff',
  '696969', '696969', '1e90ff', 'b22222', 'fffaf0',
  '228b22', 'ff00ff', 'dcdcdc', 'f8f8ff', 'ffd700', 'daa520',
  '808080', '808080', '008000', 'adff2f', 'f0fff0', 'ff69b4',
  'cd5c5c', '4b0082', 'fffff0', 'f0e68c', 'e6e6fa', 'fff0f5',
  '7cfc00', 'fffacd', 'add8e6', 'f08080', 'e0ffff',
  'fafad2', 'd3d3d3', 'd3d3d3', '90ee90',
  'ffb6c1', 'ffa07a', '20b2aa', '87cefa',
  '778899', '778899', 'b0c4de', 'ffffe0',
  '00ff00', '32cd32', 'faf0e6', 'ff00ff', '800000', '66cdaa',
  '0000cd', 'ba55d3', '9370db', '3cb371',
  '7b68ee', '00fa9a', '48d1cc',
  'c71585', '191970', 'f5fffa', 'ffe4e1', 'ffe4b5',
  'ffdead', '000080', 'fdf5e6', '808000', '6b8e23', 'ffa500',
  'ff4500', 'da70d6', 'eee8aa', '98fb98', 'afeeee',
  'db7093', 'ffefd5', 'ffdab9', 'cd853f', 'ffc0cb', 'dda0dd',
  'b0e0e6', '800080', '663399', 'ff0000', 'bc8f8f', '4169e1',
  '8b4513', 'fa8072', 'f4a460', '2e8b57', 'fff5ee', 'a0522d',
  'c0c0c0', '87ceeb', '6a5acd', '708090', '708090', 'fffafa',
  '00ff7f', '4682b4', 'd2b48c', '008080', 'd8bfd8', 'ff6347',
  '40e0d0', 'ee82ee', 'f5deb3', 'ffffff', 'f5f5f5', 'ffff00',
  '9acd32',
];

export function getColorName2Hex(name: string): string {
  let hex;
  const idx = COLOR_NAMES.indexOf(name);
  if (idx !== -1) hex = COLOR_HEX[idx];
  return `#${hex || '000000'}`;
}

export function getSolidFillColor(
  solidFill: SolidFill,
  theme: Theme,
  node?: { getColorThemeName(name: any): string }
): ColorType {
  const result: any = { type: 'solidFill' };

  if (solidFill['a:srgbClr']) {
    result.color = '#' + solidFill['a:srgbClr'].attrs.val;
  } else if (solidFill['a:schemeClr']) {
    let themeName = solidFill['a:schemeClr'].attrs.val;
    if (node) themeName = node.getColorThemeName(themeName);
    result.color = theme.getColor(themeName);
  } else if ((solidFill as any)['a:sysClr']) {
    result.color = '#' + (solidFill as any)['a:sysClr'].attrs.lastClr;
  } else if ((solidFill as any)['a:prstClr']) {
    const presetName = get((solidFill as any)['a:prstClr'], ['attrs', 'val']);
    result.color = getColorName2Hex(presetName);
  }

  const colorSource =
    solidFill['a:srgbClr'] || solidFill['a:schemeClr'] || (solidFill as any)['a:sysClr'];
  const alpha = get(colorSource, ['a:alpha', 'attrs', 'val'], 1e5);
  result.alpha = alpha / 1e5;

  const shade = get(colorSource, ['a:shade', 'attrs', 'val']);
  if (shade) result.shade = shade / 1e5;

  const lumMod = get(colorSource, ['a:lumMod', 'attrs', 'val']);
  if (lumMod) result.lumMod = lumMod / 1e5;

  const lumOff = get(colorSource, ['a:lumOff', 'attrs', 'val']);
  if (lumOff) result.lumOff = lumOff / 1e5;

  const tint = get(colorSource, ['a:tint', 'attrs', 'val']);
  if (tint) result.tint = tint / 1e5;

  return result;
}

export function getBlipFill(blipFill: any, pptx: PPTX, ctx: any): BackgroundImageType {
  const result: any = { type: 'blipFill' };
  const embedId = get(blipFill, ['a:blip', 'attrs', 'r:embed']);
  if (embedId) {
    const target = ctx.rels[embedId]?.target;
    if (target) result.base64 = pptx.getMedia(target);
  }

  const alphaAmt = get(blipFill, ['a:blip', 'a:alphaModFix', 'attrs', 'amt']);
  if (alphaAmt) result.alpha = alphaAmt / 1e5;

  const fillRect = get(blipFill, ['a:stretch', 'a:fillRect', 'attrs']);
  if (fillRect) {
    result.fillRect = {};
    if (fillRect.b) result.fillRect.b = fillRect.b / 1e5;
    if (fillRect.t) result.fillRect.t = fillRect.t / 1e5;
    if (fillRect.r) result.fillRect.r = fillRect.r / 1e5;
    if (fillRect.l) result.fillRect.l = fillRect.l / 1e5;
  }

  return result;
}

export function getGradFillColor(
  gradFill: any,
  theme: Theme,
  node?: { getColorThemeName(name: any): string }
): GradFillType {
  const result: any = {
    type: 'gradFill',
    tileRect: {},
    lin: {},
    gsList: [],
  };

  result.flip = gradFill.attrs.flip;
  result.path = get(gradFill, ['a:path', 'attrs', 'path']) || 'linear';
  result.rotWithShape = gradFill.attrs.rotWithShape === '1';

  if (get(gradFill, ['a:lin', 'attrs', 'ang'])) {
    result.lin.ang = angle(gradFill['a:lin'].attrs.ang);
  }
  if (get(gradFill, ['a:lin', 'attrs', 'scaled'])) {
    result.lin.scaled = gradFill['a:lin'].attrs.scaled === '1';
  }

  const gsLst = get(gradFill, ['a:gsLst', 'a:gs']) || [];
  result.gsList = gsLst.map((gs: any) => ({
    color: getSolidFillColor(gs, theme, node),
    pos: percent(gs.attrs.pos),
  }));

  if (get(gradFill, ['a:tileRect', 'attrs', 'l']))
    result.tileRect.l = percent(gradFill['a:tileRect'].attrs.l);
  if (get(gradFill, ['a:tileRect', 'attrs', 't']))
    result.tileRect.t = percent(gradFill['a:tileRect'].attrs.t);
  if (get(gradFill, ['a:tileRect', 'attrs', 'r']))
    result.tileRect.r = percent(gradFill['a:tileRect'].attrs.r);
  if (get(gradFill, ['a:tileRect', 'attrs', 'b']))
    result.tileRect.b = percent(gradFill['a:tileRect'].attrs.b);

  return result;
}

// Color space conversion helpers
function linearize(value: number): number {
  return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
}

function delinearize(value: number): number {
  return value < 0.0031308 ? 12.92 * value : 1.055 * Math.pow(value, 1 / 2.4) - 0.055;
}

function applyDark(rgb: number[], factor: number): number[] {
  const r = linearize(rgb[0] / 255) * factor;
  const g = linearize(rgb[1] / 255) * factor;
  const b = linearize(rgb[2] / 255) * factor;
  return [
    Math.round(255 * delinearize(r)),
    Math.round(255 * delinearize(g)),
    Math.round(255 * delinearize(b)),
  ];
}

function rgbToHsl(r: number, g: number, b: number) {
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;
  const max = Math.max(rNorm, gNorm, bNorm);
  const min = Math.min(rNorm, gNorm, bNorm);
  const delta = max - min;
  let h = 0;
  const l = (max + min) / 2;

  if (delta === 0) {
    h = 0;
  } else if (max === rNorm) {
    h = ((gNorm - bNorm) / delta) % 6;
  } else if (max === gNorm) {
    h = (bNorm - rNorm) / delta + 2;
  } else if (max === bNorm) {
    h = (rNorm - gNorm) / delta + 4;
  }

  h = Math.round(60 * h);
  if (h < 0) h += 360;

  return {
    h,
    s: delta === 0 || l === 0 || l === 1 ? 0 : delta / (1 - Math.abs(2 * l - 1)),
    l,
  };
}

function hslToRgb(h: number, s: number, l: number): number[] {
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r: number, g: number, b: number;

  if (h < 60) {
    r = c; g = x; b = 0;
  } else if (h < 120) {
    r = x; g = c; b = 0;
  } else if (h < 180) {
    r = 0; g = c; b = x;
  } else if (h < 240) {
    r = 0; g = x; b = c;
  } else if (h < 300) {
    r = x; g = 0; b = c;
  } else {
    r = c; g = 0; b = x;
  }

  return [
    Math.round(255 * (r + m)),
    Math.round(255 * (g + m)),
    Math.round(255 * (b + m)),
  ];
}

export function getRenderColor(
  colorConfig: ColorType,
  options?: { light?: number; dark?: number }
): string {
  if (!colorConfig || colorConfig.type === 'none') return '';

  if (colorConfig.type === 'solidFill' && /^#[\da-fA-F]{3,6}$/.test(colorConfig.color!)) {
    let r = parseInt(colorConfig.color!.substr(1, 2), 16);
    let g = parseInt(colorConfig.color!.substr(3, 2), 16);
    let b = parseInt(colorConfig.color!.substr(5, 2), 16);

    if (colorConfig.shade) {
      const shaded = applyDark([r, g, b], colorConfig.shade);
      r = shaded[0]; g = shaded[1]; b = shaded[2];
    }

    if (colorConfig.lumMod) {
      const hsl = rgbToHsl(r, g, b);
      let newL = hsl.l * colorConfig.lumMod;
      if (newL >= 1) newL = 1;
      const rgb = hslToRgb(hsl.h, hsl.s, newL);
      r = rgb[0]; g = rgb[1]; b = rgb[2];
    }

    if (colorConfig.lumOff) {
      const hsl = rgbToHsl(r, g, b);
      let newL = colorConfig.lumOff + hsl.l;
      if (newL > 1) newL = 1;
      const rgb = hslToRgb(hsl.h, hsl.s, newL);
      r = rgb[0]; g = rgb[1]; b = rgb[2];
    }

    if (colorConfig.tint || options?.light) {
      const hsl = rgbToHsl(r, g, b);
      let factor = colorConfig.tint || options?.light!;
      if (factor >= 1) factor = 1;
      const rgb = hslToRgb(hsl.h, hsl.s, hsl.l * factor + (1 - factor));
      r = rgb[0]; g = rgb[1]; b = rgb[2];
    }

    if (options?.dark) {
      const darkened = applyDark([r, g, b], options.dark);
      r = darkened[0]; g = darkened[1]; b = darkened[2];
    }

    const alpha = (colorConfig as any).alpha;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  return '';
}
