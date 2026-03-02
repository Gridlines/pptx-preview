import { createSvgNode, getAdjWidth, getAdj, TextArea } from './shape-common';
import { getRenderColor } from '../../../utils/color';
import { ShapeResult } from './base-shape';

export function createRightArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const a = getAdjWidth('adj1', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const b = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h / 2 - a / 2}`, `L${ext.w - b},${ext.h / 2 - a / 2}`,
    `L${ext.w - b},0`, `L${ext.w},${ext.h / 2}`,
    `L${ext.w - b},${ext.h}`, `L${ext.w - b},${ext.h / 2 + a / 2}`,
    `L0,${ext.h / 2 + a / 2}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const insetR = (a * b) / ext.h;
  return { dom: path, textArea: { top: ext.h / 2 - a / 2, bottom: ext.h / 2 - a / 2, left: 0, right: insetR, w: ext.w - insetR, h: a } };
}

export function createLeftArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const a = getAdjWidth('adj1', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const b = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h / 2}`, `L${b},0`, `L${b},${ext.h / 2 - a / 2}`,
    `L${ext.w},${ext.h / 2 - a / 2}`, `L${ext.w},${ext.h / 2 + a / 2}`,
    `L${b},${ext.h / 2 + a / 2}`, `L${b},${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const insetL = (a * b) / ext.h;
  return { dom: path, textArea: { top: ext.h / 2 - a / 2, bottom: ext.h / 2 - a / 2, left: insetL, right: 0, w: ext.w - insetL, h: a } };
}

export function createUpArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const a = getAdjWidth('adj1', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const b = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const path = createSvgNode('path');
  const d = [
    `M${ext.w / 2},0`, `L${ext.w},${b}`, `L${ext.w / 2 + a / 2},${b}`,
    `L${ext.w / 2 + a / 2},${ext.h}`, `L${ext.w / 2 - a / 2},${ext.h}`,
    `L${ext.w / 2 - a / 2},${b}`, `L0,${b}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const insetT = (a * b) / ext.w;
  return { dom: path, textArea: { top: insetT, bottom: 0, left: ext.w / 2 - a / 2, right: ext.w / 2 - a / 2, w: a, h: ext.h - insetT } };
}

export function createDownArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const a = getAdjWidth('adj1', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const b = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const path = createSvgNode('path');
  const d = [
    `M${ext.w / 2},${ext.h}`, `L0,${ext.h - b}`, `L${ext.w / 2 - a / 2},${ext.h - b}`,
    `L${ext.w / 2 - a / 2},0`, `L${ext.w / 2 + a / 2},0`, `L${ext.w / 2 + a / 2},${ext.h - b}`,
    `L${ext.w},${ext.h - b}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const insetB = (a * b) / ext.w;
  return { dom: path, textArea: { top: 0, bottom: insetB, left: ext.w / 2 - a / 2, right: ext.w / 2 - a / 2, w: a, h: ext.h - insetB } };
}

export function createLeftRightArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const a = getAdjWidth('adj1', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const b = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h / 2}`, `L${b},0`, `L${b},${ext.h / 2 - a / 2}`,
    `L${ext.w - b},${ext.h / 2 - a / 2}`, `L${ext.w - b},0`, `L${ext.w},${ext.h / 2}`,
    `L${ext.w - b},${ext.h}`, `L${ext.w - b},${ext.h / 2 + a / 2}`,
    `L${b},${ext.h / 2 + a / 2}`, `L${b},${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const inset = (a * b) / ext.h;
  return { dom: path, textArea: { top: ext.h / 2 - a / 2, bottom: ext.h / 2 - a / 2, left: inset, right: inset, w: ext.w - 2 * inset, h: a } };
}

export function createUpDownArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const a = getAdjWidth('adj1', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const b = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const path = createSvgNode('path');
  const d = [
    `M${ext.w / 2},${ext.h}`, `L0,${ext.h - b}`, `L${ext.w / 2 - a / 2},${ext.h - b}`,
    `L${ext.w / 2 - a / 2},${b}`, `L0,${b}`, `L${ext.w / 2},0`,
    `L${ext.w},${b}`, `L${ext.w / 2 + a / 2},${b}`, `L${ext.w / 2 + a / 2},${ext.h - b}`,
    `L${ext.w},${ext.h - b}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const inset = (a * b) / ext.w;
  return { dom: path, textArea: { top: inset, bottom: inset, left: ext.w / 2 - a / 2, right: ext.w / 2 - a / 2, w: a, h: ext.h - 2 * inset } };
}

export function createQuadArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const a = getAdjWidth('adj1', shapeNode, 0.225 * Math.min(ext.w, ext.h));
  const r = getAdjWidth('adj2', shapeNode, 0.225 * Math.min(ext.w, ext.h));
  const n = getAdjWidth('adj3', shapeNode, 0.225 * Math.min(ext.w, ext.h));
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h / 2}`, `L${n},${ext.h / 2 - r}`, `L${n},${ext.h / 2 - a / 2}`,
    `L${ext.w / 2 - a / 2},${ext.h / 2 - a / 2}`, `L${ext.w / 2 - a / 2},${n}`,
    `L${ext.w / 2 - r},${n}`, `L${ext.w / 2},0`, `L${ext.w / 2 + r},${n}`,
    `L${ext.w / 2 + a / 2},${n}`, `L${ext.w / 2 + a / 2},${ext.h / 2 - a / 2}`,
    `L${ext.w - n},${ext.h / 2 - a / 2}`, `L${ext.w - n},${ext.h / 2 - r}`,
    `L${ext.w},${ext.h / 2}`, `L${ext.w - n},${ext.h / 2 + r}`,
    `L${ext.w - n},${ext.h / 2 + a / 2}`, `L${ext.w / 2 + a / 2},${ext.h / 2 + a / 2}`,
    `L${ext.w / 2 + a / 2},${ext.h - n}`, `L${ext.w / 2 + r},${ext.h - n}`,
    `L${ext.w / 2},${ext.h}`, `L${ext.w / 2 - r},${ext.h - n}`,
    `L${ext.w / 2 - a / 2},${ext.h - n}`, `L${ext.w / 2 - a / 2},${ext.h / 2 + a / 2}`,
    `L${n},${ext.h / 2 + a / 2}`, `L${n},${ext.h / 2 + r}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const inset = r === 0 ? 0 : (a * n) / r / 2;
  return { dom: path, textArea: { top: ext.h / 2 - a / 2, bottom: ext.h / 2 - a / 2, left: inset, right: inset, w: ext.w - 2 * inset, h: a } };
}

export function createLeftRightUpArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const a = getAdjWidth('adj1', shapeNode, 0.225 * Math.min(ext.w, ext.h));
  const r = getAdjWidth('adj2', shapeNode, 0.225 * Math.min(ext.w, ext.h));
  const n = getAdjWidth('adj3', shapeNode, 0.225 * Math.min(ext.w, ext.h));
  if (a > 2 * r) { /* clamp */ }
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h - r}`, `L${n},${ext.h - 2 * r}`, `L${n},${ext.h - r - a / 2}`,
    `L${ext.w / 2 - a / 2},${ext.h - r - a / 2}`, `L${ext.w / 2 - a / 2},${n}`,
    `L${ext.w / 2 - r},${n}`, `L${ext.w / 2},0`, `L${ext.w / 2 + r},${n}`,
    `L${ext.w / 2 + a / 2},${n}`, `L${ext.w / 2 + a / 2},${ext.h - r - a / 2}`,
    `L${ext.w - n},${ext.h - r - a / 2}`, `L${ext.w - n},${ext.h - 2 * r}`,
    `L${ext.w},${ext.h - r}`, `L${ext.w - n},${ext.h}`,
    `L${ext.w - n},${ext.h - r + a / 2}`, `L${n},${ext.h - r + a / 2}`,
    `L${n},${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const inset = r === 0 ? 0 : (a * n) / r / 2;
  return { dom: path, textArea: { top: ext.h - r - a / 2, bottom: r - a / 2, left: inset, right: inset, w: ext.w - 2 * inset, h: a } };
}

export function createBentArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  let a = getAdjWidth('adj1', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const r = getAdjWidth('adj2', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const n = getAdjWidth('adj3', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const o = getAdjWidth('adj4', shapeNode, 0.4375 * Math.min(ext.w, ext.h));
  if (a > 2 * r) a = 2 * r;
  let innerR = o - a;
  if (innerR < 0) innerR = 0;
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h}`, `L0,${r - a / 2 + o}`,
    `A${o} ${o} 0 0 1 ${o} ${r - a / 2}`,
    `L${ext.w - n},${r - a / 2}`, `L${ext.w - n},0`,
    `L${ext.w},${r}`, `L${ext.w - n},${2 * r}`,
    `L${ext.w - n},${r + a / 2}`, `L${a + innerR},${r + a / 2}`,
    `A${innerR} ${innerR}  0 0 0 ${a} ${r + a / 2 + innerR}`,
    `L${a},${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path };
}

export function createUturnArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  let a = getAdjWidth('adj1', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const r = getAdjWidth('adj2', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const n = getAdjWidth('adj3', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  let o = getAdjWidth('adj4', shapeNode, 0.4375 * Math.min(ext.w, ext.h));
  let c = getAdjWidth('adj5', shapeNode, 0.75 * Math.min(ext.w, ext.h));
  if (a > 2 * r) a = 2 * r;
  if (c < n) c = n + a;
  if (o > c - n) o = c - n;
  let innerR = o - a;
  if (innerR > c - n - a) innerR = c - n - a;
  if (innerR < 0) innerR = 0;
  const halfW = r - a / 2;
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h}`, `L0,${o}`,
    `A${o} ${o} 0 0 1 ${o} 0`,
    `L${ext.w - o - halfW},0`,
    `A${o} ${o} 0 0 1 ${ext.w - halfW} ${o}`,
    `L${ext.w - halfW},${c - n}`, `L${ext.w},${c - n}`,
    `L${ext.w - r},${c}`, `L${ext.w - 2 * r},${c - n}`,
    `L${ext.w - r - a / 2},${c - n}`, `L${ext.w - r - a / 2},${a + innerR}`,
    `A${innerR} ${innerR}  0 0 0 ${ext.w - innerR - r - a / 2} ${a}`,
    `L${a + innerR},${a}`,
    `A${innerR} ${innerR}  0 0 0 ${a} ${a + innerR}`,
    `L${a},${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path };
}

export function createLeftUpArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  let a = getAdjWidth('adj1', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const r = getAdjWidth('adj2', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  let n = getAdjWidth('adj3', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  if (a > 2 * r) a = 2 * r;
  let maxN = Math.min(ext.w, ext.h) - 2 * r;
  if (n > maxN) n = maxN;
  if (n < 0) n = 0;
  const halfW = r - a / 2;
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h - r}`, `L${n},${ext.h - 2 * r}`, `L${n},${ext.h - r - a / 2}`,
    `L${ext.w - r - a / 2},${ext.h - r - a / 2}`, `L${ext.w - r - a / 2},${n}`,
    `L${ext.w - 2 * r},${n}`, `L${ext.w - r},0`, `L${ext.w},${n}`,
    `L${ext.w - halfW},${n}`, `L${ext.w - halfW},${ext.h - halfW}`,
    `L${n},${ext.h - halfW}`, `L${n},${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const inset = r === 0 ? 0 : (a * n) / r / 2;
  return { dom: path, textArea: { top: ext.h - r - a / 2, bottom: r - a / 2, left: inset, right: r, w: ext.w - inset - r, h: a } };
}

export function createBentUpArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  let a = getAdjWidth('adj1', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const r = getAdjWidth('adj2', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  let n = getAdjWidth('adj3', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  if (a > 2 * r) a = 2 * r;
  const halfW = r - a / 2;
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h}`, `L0,${ext.h - a}`,
    `L${ext.w - r - a / 2},${ext.h - a}`, `L${ext.w - r - a / 2},${n}`,
    `L${ext.w - 2 * r},${n}`, `L${ext.w - r},0`, `L${ext.w},${n}`,
    `L${ext.w - halfW},${n}`, `L${ext.w - halfW},${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: { top: ext.h - a, bottom: 0, left: 0, right: 0, w: ext.w, h: a } };
}

export function createCurvedRightArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const bg = shapeNode.background;
  let a = getAdjWidth('adj1', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const n = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const o = getAdjWidth('adj3', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  if (a > n) a = n;
  const c = n / 2 - a / 2;
  const i = (ext.h - n / 2 - a / 2) / 2;
  const s = (ext.h - c - a) / 2;
  const g = createSvgNode('g');
  const bgPath = createSvgNode('path');
  bgPath.setAttribute('d', [
    `M${ext.w},0`, `A ${ext.w} ${i} 0 0 0 0 ${i}`,
    `L0,${s + a}`, `A ${ext.w} ${s} 0 0 1 ${ext.w} ${a}`, 'Z',
  ].join(' '));
  if (bg?.type === 'solidFill') bgPath.setAttribute('fill', getRenderColor(bg, { dark: 0.6 }) || 'transparent');
  const fgPath = createSvgNode('path');
  fgPath.setAttribute('d', [
    `M0,${i}`, `A ${ext.w} ${i} 0 0 0 ${ext.w - o} ${ext.h - n / 2 - a / 2}`,
    `L${ext.w - o},${ext.h - n}`, `L${ext.w},${ext.h - n / 2}`,
    `L${ext.w - o},${ext.h}`, `L${ext.w - o},${ext.h - c}`,
    `A ${ext.w} ${s} 0 0 1 0 ${a + s}`, 'Z',
  ].join(' '));
  g.appendChild(bgPath);
  g.appendChild(fgPath);
  return { dom: g };
}

export function createCurvedLeftArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const bg = shapeNode.background;
  let a = getAdjWidth('adj1', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const n = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const o = getAdjWidth('adj3', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  if (a > n) a = n;
  const c = n / 2 - a / 2;
  const i = (ext.h - n / 2 - a / 2) / 2;
  const s = (ext.h - c - a) / 2;
  const g = createSvgNode('g');
  const fgPath = createSvgNode('path');
  fgPath.setAttribute('d', [
    `M0,${ext.h - n / 2}`, `L${o},${ext.h - n}`, `L${o},${ext.h - n / 2 - a / 2}`,
    `A${ext.w} ${i} 0 0 0 ${ext.w} ${i}`, `L${ext.w},${s + a}`,
    `A ${ext.w} ${s} 0 0 1 ${o} ${ext.h - c}`, `L${o},${ext.h}`, 'Z',
  ].join(' '));
  const bgPath = createSvgNode('path');
  bgPath.setAttribute('d', [
    `M0,0`, `A ${ext.w} ${i} 0 0 1 ${ext.w} ${i}`,
    `L${ext.w},${s + a}`, `A ${ext.w} ${s} 0 0 0 0 ${a}`, 'Z',
  ].join(' '));
  if (bg?.type === 'solidFill') bgPath.setAttribute('fill', getRenderColor(bg, { dark: 0.6 }) || 'transparent');
  g.appendChild(fgPath);
  g.appendChild(bgPath);
  return { dom: g };
}

export function createCurvedUpArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const bg = shapeNode.background;
  let a = getAdjWidth('adj1', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const n = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const o = getAdjWidth('adj3', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  if (a > n) a = n;
  const c = n / 2 - a / 2;
  const i = (ext.w - n / 2 - a / 2) / 2;
  const s = (ext.w - c - a) / 2;
  const g = createSvgNode('g');
  const fgPath = createSvgNode('path');
  fgPath.setAttribute('d', [
    `M${ext.w - n / 2},0`, `L${ext.w - n},${o}`, `L${ext.w - n / 2 - a / 2},${o}`,
    `A${i} ${ext.h} 0 0 1 ${i} ${ext.h}`, `L${i + a},${ext.h}`,
    `A${s} ${ext.h} 0 0 0 ${ext.w - c} ${o}`, `L${ext.w},${o}`, 'Z',
  ].join(' '));
  const bgPath = createSvgNode('path');
  bgPath.setAttribute('d', [
    `M${a},0`, `L0,0`, `A ${i} ${ext.h} 0 0 0 ${i} ${ext.h}`,
    `L${i + a},${ext.h}`, `A ${s} ${ext.h} 0 0 1 ${a} 0`, 'Z',
  ].join(' '));
  if (bg?.type === 'solidFill') bgPath.setAttribute('fill', getRenderColor(bg, { dark: 0.6 }) || 'transparent');
  g.appendChild(fgPath);
  g.appendChild(bgPath);
  return { dom: g };
}

export function createCurvedDownArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const bg = shapeNode.background;
  let a = getAdjWidth('adj1', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const n = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const o = getAdjWidth('adj3', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  if (a > n) a = n;
  const c = n / 2 - a / 2;
  const i = (ext.w - n / 2 - a / 2) / 2;
  const s = (ext.w - c - a) / 2;
  const g = createSvgNode('g');
  const bgPath = createSvgNode('path');
  bgPath.setAttribute('d', [
    `M0,${ext.h}`, `L${a},${ext.h}`,
    `A${s} ${ext.h} 0 0 1 ${s + a} 0`, `L${i},0`,
    `A${i} ${ext.h} 0 0 0 0 ${ext.h}`, 'Z',
  ].join(' '));
  if (bg?.type === 'solidFill') bgPath.setAttribute('fill', getRenderColor(bg, { dark: 0.6 }) || 'transparent');
  const fgPath = createSvgNode('path');
  fgPath.setAttribute('d', [
    `M${ext.w - n / 2},${ext.h}`, `L${ext.w - n},${ext.h - o}`,
    `L${ext.w - n / 2 - a / 2},${ext.h - o}`,
    `A ${i} ${ext.h} 0 0 0 ${i} 0`, `L${i + a},0`,
    `A ${s} ${ext.h} 0 0 1 ${ext.w - c} ${ext.h - o}`,
    `L${ext.w},${ext.h - o}`, 'Z',
  ].join(' '));
  g.appendChild(bgPath);
  g.appendChild(fgPath);
  return { dom: g };
}

export function createStripedRightArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const arrowH = getAdj('adj1', shapeNode, 0.5) * ext.h;
  const arrowW = getAdj('adj2', shapeNode, 0.5) * minDim;
  const stripeW = minDim / 8;
  const stripe2 = minDim / 16;
  const stripe1 = minDim / 32;
  const bodyStart = (5 * minDim) / 32;
  const top = ext.h / 2 - arrowH / 2;
  const bottom = ext.h / 2 + arrowH / 2;

  const g = createSvgNode('g');
  const s1 = createSvgNode('path');
  s1.setAttribute('d', [`M0,${top}`, `L${stripe1},${top}`, `L${stripe1},${bottom}`, `L0,${bottom}`, 'Z'].join(' '));
  const s2 = createSvgNode('path');
  s2.setAttribute('d', [`M${stripe2},${top}`, `L${stripeW},${top}`, `L${stripeW},${bottom}`, `L${stripe2},${bottom}`, 'Z'].join(' '));
  const body = createSvgNode('path');
  body.setAttribute('d', [
    `M${bodyStart},${top}`, `L${ext.w - arrowW},${top}`, `L${ext.w - arrowW},0`,
    `L${ext.w},${ext.h / 2}`, `L${ext.w - arrowW},${ext.h}`,
    `L${ext.w - arrowW},${bottom}`, `L${bodyStart},${bottom}`, 'Z',
  ].join(' '));
  g.appendChild(body);
  g.appendChild(s1);
  g.appendChild(s2);

  const insetR = (arrowH * arrowW) / ext.h;
  return { dom: g, textArea: { top, bottom: top, left: 0, right: insetR, w: ext.w - insetR, h: arrowH } };
}

export function createNotchedRightArrow(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const arrowH = getAdj('adj1', shapeNode, 0.5) * ext.h;
  const arrowW = getAdj('adj2', shapeNode, 0.5) * minDim;
  const notch = (arrowH * arrowW) / ext.h;
  const top = ext.h / 2 - arrowH / 2;
  const bottom = ext.h / 2 + arrowH / 2;
  const path = createSvgNode('path');
  const d = [
    `M0,${top}`, `L${ext.w - arrowW},${top}`, `L${ext.w - arrowW},0`,
    `L${ext.w},${ext.h / 2}`, `L${ext.w - arrowW},${ext.h}`,
    `L${ext.w - arrowW},${bottom}`, `L0,${bottom}`,
    `L${notch},${ext.h / 2}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const insetR = (arrowH * arrowW) / ext.h;
  return { dom: path, textArea: { top, bottom: top, left: insetR, right: insetR, w: ext.w - 2 * insetR, h: arrowH } };
}

export function createHomePlate(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const adj = getAdj('adj', shapeNode, 0.5) * minDim;
  const path = createSvgNode('path');
  const d = [`M0,0`, `L${ext.w - adj},0`, `L${ext.w},${ext.h / 2}`, `L${ext.w - adj},${ext.h}`, `L0,${ext.h}`, 'Z'].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: { top: 0, bottom: 0, left: 0, right: adj / 2, w: ext.w - adj / 2, h: ext.h } };
}

export function createChevron(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const adj = getAdj('adj', shapeNode, 0.5) * minDim;
  const path = createSvgNode('path');
  const d = [
    `M0,0`, `L${ext.w - adj},0`, `L${ext.w},${ext.h / 2}`,
    `L${ext.w - adj},${ext.h}`, `L0,${ext.h}`, `L${adj},${ext.h / 2}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: { top: 0, bottom: 0, left: adj, right: adj, w: ext.w - 2 * adj, h: ext.h } };
}

export function createRightArrowCallout(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const arrowStem = getAdj('adj1', shapeNode, 0.25) * minDim;
  const arrowHead = getAdj('adj2', shapeNode, 0.25) * minDim;
  const arrowLen = getAdj('adj3', shapeNode, 0.25) * minDim;
  const boxW = getAdj('adj4', shapeNode, 0.64977) * ext.w;
  const path = createSvgNode('path');
  const d = [
    `M0,0`, `L${boxW},0`, `L${boxW},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w - arrowLen},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w - arrowLen},${ext.h / 2 - arrowHead}`,
    `L${ext.w},${ext.h / 2}`,
    `L${ext.w - arrowLen},${ext.h / 2 + arrowHead}`,
    `L${ext.w - arrowLen},${ext.h / 2 + arrowStem / 2}`,
    `L${boxW},${ext.h / 2 + arrowStem / 2}`, `L${boxW},${ext.h}`,
    `L0,${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: { top: 0, bottom: 0, left: 0, right: ext.w - boxW, w: boxW, h: ext.h } };
}

export function createLeftArrowCallout(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const arrowStem = getAdj('adj1', shapeNode, 0.25) * minDim;
  const arrowHead = getAdj('adj2', shapeNode, 0.25) * minDim;
  const arrowLen = getAdj('adj3', shapeNode, 0.25) * minDim;
  const boxW = getAdj('adj4', shapeNode, 0.64977) * ext.w;
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h / 2}`, `L${arrowLen},${ext.h / 2 - arrowHead}`,
    `L${arrowLen},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w - boxW},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w - boxW},0`, `L${ext.w},0`, `L${ext.w},${ext.h}`,
    `L${ext.w - boxW},${ext.h}`, `L${ext.w - boxW},${ext.h / 2 + arrowStem / 2}`,
    `L${arrowLen},${ext.h / 2 + arrowStem / 2}`,
    `L${arrowLen},${ext.h / 2 + arrowHead}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: { top: 0, bottom: 0, left: ext.w - boxW, right: 0, w: boxW, h: ext.h } };
}

export function createUpArrowCallout(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const arrowStem = getAdj('adj1', shapeNode, 0.25) * minDim;
  const arrowHead = getAdj('adj2', shapeNode, 0.25) * minDim;
  const arrowLen = getAdj('adj3', shapeNode, 0.25) * minDim;
  const boxH = getAdj('adj4', shapeNode, 0.64977) * ext.h;
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h - boxH}`, `L${ext.w / 2 - arrowStem / 2},${ext.h - boxH}`,
    `L${ext.w / 2 - arrowStem / 2},${arrowLen}`,
    `L${ext.w / 2 - arrowHead},${arrowLen}`, `L${ext.w / 2},0`,
    `L${ext.w / 2 + arrowHead},${arrowLen}`,
    `L${ext.w / 2 + arrowStem / 2},${arrowLen}`,
    `L${ext.w / 2 + arrowStem / 2},${ext.h - boxH}`,
    `L${ext.w},${ext.h - boxH}`, `L${ext.w},${ext.h}`, `L0,${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: { top: ext.h - boxH, bottom: 0, left: 0, right: 0, w: ext.w, h: boxH } };
}

export function createDownArrowCallout(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const arrowStem = getAdj('adj1', shapeNode, 0.25) * minDim;
  const arrowHead = getAdj('adj2', shapeNode, 0.25) * minDim;
  const arrowLen = getAdj('adj3', shapeNode, 0.25) * minDim;
  const boxH = getAdj('adj4', shapeNode, 0.64977) * ext.h;
  const path = createSvgNode('path');
  const d = [
    `M0,0`, `L${ext.w},0`, `L${ext.w},${boxH}`,
    `L${ext.w / 2 + arrowStem / 2},${boxH}`,
    `L${ext.w / 2 + arrowStem / 2},${ext.h - arrowLen}`,
    `L${ext.w / 2 + arrowHead},${ext.h - arrowLen}`,
    `L${ext.w / 2},${ext.h}`,
    `L${ext.w / 2 - arrowHead},${ext.h - arrowLen}`,
    `L${ext.w / 2 - arrowStem / 2},${ext.h - arrowLen}`,
    `L${ext.w / 2 - arrowStem / 2},${boxH}`, `L0,${boxH}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: { top: 0, bottom: ext.h - boxH, left: 0, right: 0, w: ext.w, h: boxH } };
}

export function createLeftRightArrowCallout(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const arrowStem = getAdj('adj1', shapeNode, 0.25) * minDim;
  const arrowHead = getAdj('adj2', shapeNode, 0.25) * minDim;
  const arrowLen = getAdj('adj3', shapeNode, 0.25) * minDim;
  const boxW = getAdj('adj4', shapeNode, 0.48123) * ext.w;
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h / 2}`, `L${arrowLen},${ext.h / 2 - arrowHead}`,
    `L${arrowLen},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w / 2 - boxW / 2},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w / 2 - boxW / 2},0`, `L${ext.w / 2 + boxW / 2},0`,
    `L${ext.w / 2 + boxW / 2},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w - arrowLen},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w - arrowLen},${ext.h / 2 - arrowHead}`, `L${ext.w},${ext.h / 2}`,
    `L${ext.w - arrowLen},${ext.h / 2 + arrowHead}`,
    `L${ext.w - arrowLen},${ext.h / 2 + arrowStem / 2}`,
    `L${ext.w / 2 + boxW / 2},${ext.h / 2 + arrowStem / 2}`,
    `L${ext.w / 2 + boxW / 2},${ext.h}`, `L${ext.w / 2 - boxW / 2},${ext.h}`,
    `L${ext.w / 2 - boxW / 2},${ext.h / 2 + arrowStem / 2}`,
    `L${arrowLen},${ext.h / 2 + arrowStem / 2}`,
    `L${arrowLen},${ext.h / 2 + arrowHead}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: { top: 0, bottom: 0, left: ext.w / 2 - boxW / 2, right: ext.w / 2 - boxW / 2, w: boxW, h: ext.h } };
}

export function createQuadArrowCallout(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const arrowStem = getAdj('adj1', shapeNode, 0.18515) * minDim;
  const arrowHead = getAdj('adj2', shapeNode, 0.18515) * minDim;
  const arrowLen = getAdj('adj3', shapeNode, 0.18515) * minDim;
  const boxW = getAdj('adj4', shapeNode, 0.48123) * ext.w;
  const boxH = getAdj('adj4', shapeNode, 0.48123) * ext.h;
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h / 2}`, `L${arrowLen},${ext.h / 2 - arrowHead}`,
    `L${arrowLen},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w / 2 - boxW / 2},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w / 2 - boxW / 2},${ext.h / 2 - boxH / 2}`,
    `L${ext.w / 2 - arrowStem / 2},${ext.h / 2 - boxH / 2}`,
    `L${ext.w / 2 - arrowStem / 2},${arrowLen}`,
    `L${ext.w / 2 - arrowHead},${arrowLen}`, `L${ext.w / 2},0`,
    `L${ext.w / 2 + arrowHead},${arrowLen}`,
    `L${ext.w / 2 + arrowStem / 2},${arrowLen}`,
    `L${ext.w / 2 + arrowStem / 2},${ext.h / 2 - boxH / 2}`,
    `L${ext.w / 2 + boxW / 2},${ext.h / 2 - boxH / 2}`,
    `L${ext.w / 2 + boxW / 2},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w - arrowLen},${ext.h / 2 - arrowStem / 2}`,
    `L${ext.w - arrowLen},${ext.h / 2 - arrowHead}`, `L${ext.w},${ext.h / 2}`,
    `L${ext.w - arrowLen},${ext.h / 2 + arrowHead}`,
    `L${ext.w - arrowLen},${ext.h / 2 + arrowStem / 2}`,
    `L${ext.w / 2 + boxW / 2},${ext.h / 2 + arrowStem / 2}`,
    `L${ext.w / 2 + boxW / 2},${ext.h / 2 + boxH / 2}`,
    `L${ext.w / 2 + arrowStem / 2},${ext.h / 2 + boxH / 2}`,
    `L${ext.w / 2 + arrowStem / 2},${ext.h - arrowLen}`,
    `L${ext.w / 2 + arrowHead},${ext.h - arrowLen}`, `L${ext.w / 2},${ext.h}`,
    `L${ext.w / 2 - arrowHead},${ext.h - arrowLen}`,
    `L${ext.w / 2 - arrowStem / 2},${ext.h - arrowLen}`,
    `L${ext.w / 2 - arrowStem / 2},${ext.h / 2 + boxH / 2}`,
    `L${ext.w / 2 - boxW / 2},${ext.h / 2 + boxH / 2}`,
    `L${ext.w / 2 - boxW / 2},${ext.h / 2 + arrowStem / 2}`,
    `L${arrowLen},${ext.h / 2 + arrowStem / 2}`,
    `L${arrowLen},${ext.h / 2 + arrowHead}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: { top: ext.h / 2 - boxH / 2, bottom: ext.h / 2 - boxH / 2, left: ext.w / 2 - boxW / 2, right: ext.w / 2 - boxW / 2, w: boxW, h: boxH } };
}
