import { createSvgNode, getDefaultAdjWidth, getAdjWidth, TextArea } from './shape-common';

export function createRect(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const rect = createSvgNode('rect');
  rect.setAttribute('x', '0');
  rect.setAttribute('y', '0');
  rect.setAttribute('width', ext.w + 'px');
  rect.setAttribute('height', ext.h + 'px');
  return rect;
}

export function createRoundRect(shapeNode: any): SVGElement {
  const rect = createRect(shapeNode);
  const adj = getAdjWidth('adj', shapeNode, getDefaultAdjWidth(shapeNode));
  rect.setAttribute('rx', adj + 'px');
  rect.setAttribute('ry', adj + 'px');
  return rect;
}

export function createRound1Rect(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const r = getAdjWidth('adj', shapeNode, getDefaultAdjWidth(shapeNode));
  const d = [
    'M 0,0',
    `L ${ext.w - r},0`,
    `Q ${ext.w},0 ${ext.w},${r}`,
    `L ${ext.w},${ext.h}`,
    `L 0,${ext.h}`,
    'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return path;
}

export function createRound2SameRect(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const r1 = getAdjWidth('adj1', shapeNode, getDefaultAdjWidth(shapeNode));
  const r2 = getAdjWidth('adj2', shapeNode, 0);
  const d = [
    `M ${r1},0`,
    `L ${ext.w - r1},0`,
    `Q ${ext.w},0 ${ext.w},${r1}`,
    `L ${ext.w},${ext.h - r2}`,
    `Q ${ext.w},${ext.h} ${ext.w - r2},${ext.h}`,
    `L ${r2},${ext.h}`,
    `Q 0,${ext.h} 0,${ext.h - r2}`,
    `L 0,${r1}`,
    `Q 0,0 ${r1},0`,
    'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return path;
}

export function createRound2DiagRect(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const r1 = getAdjWidth('adj1', shapeNode, getDefaultAdjWidth(shapeNode));
  const r2 = getAdjWidth('adj2', shapeNode, 0);
  const d = [
    `M ${r1},0`,
    `L ${ext.w - r2},0`,
    `Q ${ext.w},0 ${ext.w},${r2}`,
    `L ${ext.w},${ext.h - r1}`,
    `Q ${ext.w},${ext.h} ${ext.w - r1},${ext.h}`,
    `L ${r2},${ext.h}`,
    `Q 0,${ext.h} 0,${ext.h - r2}`,
    `L 0,${r1}`,
    `Q 0,0 ${r1},0`,
    'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return path;
}

export function createSnip1Rect(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const polygon = createSvgNode('polygon');
  const r = getAdjWidth('adj', shapeNode, getDefaultAdjWidth(shapeNode));
  const points = [
    '0,0',
    `${ext.w - r},0`,
    `${ext.w},${r}`,
    `${ext.w},${ext.h}`,
    `0,${ext.h}`,
  ].join(' ');
  polygon.setAttribute('points', points);
  return polygon;
}

export function createSnip2SameRect(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const polygon = createSvgNode('polygon');
  const r1 = getAdjWidth('adj1', shapeNode, getDefaultAdjWidth(shapeNode));
  const r2 = getAdjWidth('adj2', shapeNode, 0);
  const points = [
    [r1, 0], [ext.w - r1, 0], [ext.w, r1],
    [ext.w, ext.h - r2], [ext.w - r2, ext.h],
    [r2, ext.h], [0, ext.h - r2], [0, r1],
  ].map(p => `${p[0]},${p[1]}`).join(' ');
  polygon.setAttribute('points', points);
  return polygon;
}

export function createSnip2DiagRect(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const polygon = createSvgNode('polygon');
  const r1 = getAdjWidth('adj1', shapeNode, 0);
  const r2 = getAdjWidth('adj2', shapeNode, getDefaultAdjWidth(shapeNode));
  const points = [
    [r1, 0], [ext.w - r2, 0], [ext.w, r2],
    [ext.w, ext.h - r1], [ext.w - r1, ext.h],
    [r2, ext.h], [0, ext.h - r2], [0, r1],
  ].map(p => `${p[0]},${p[1]}`).join(' ');
  polygon.setAttribute('points', points);
  return polygon;
}

export function createSnipRoundRect(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const r1 = getAdjWidth('adj1', shapeNode, getDefaultAdjWidth(shapeNode));
  const r2 = getAdjWidth('adj2', shapeNode, getDefaultAdjWidth(shapeNode));
  const d = [
    `M ${r1},0`,
    `L ${ext.w - r2},0`,
    `L ${ext.w},${r2}`,
    `L ${ext.w},${ext.h}`,
    `L 0,${ext.h}`,
    `L 0,${r1}`,
    `Q 0,0 ${r1},0`,
    'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return path;
}
