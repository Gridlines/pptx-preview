import { createSvgNode } from './shape-common';
import { getRenderColor } from '../../../utils/color';

function getMarkerSize(sizeType: string, borderWidth: number): number {
  let size = 0;
  switch (sizeType) {
    case 'sm':
      size = 1 * borderWidth;
      break;
    case 'med':
      size = 1.5 * borderWidth;
      break;
    case 'lg':
      size = 2.5 * borderWidth;
      break;
  }
  return Math.max(size, 2);
}

function createOvalMarker(shapeNode: any, svg: any, path: any, isStart: boolean = false): void {
  const border = shapeNode.border || {};
  const uuid = shapeNode.uuid;
  const { headEnd, width, color, tailEnd } = border;
  const endConfig = isStart ? headEnd : tailEnd;
  const len = endConfig.len ?? 'med';
  const w = endConfig.w ?? 'med';
  const markerLen = getMarkerSize(len, width);
  const markerW = getMarkerSize(w, width);

  const defs = createSvgNode('defs');
  const marker = createSvgNode('marker');
  const id = `marker-${uuid}-${isStart ? 'start' : 'end'}`;

  marker.setAttribute('id', id);
  marker.setAttribute('viewBox', `0 0 ${2 * markerLen} ${2 * markerW}`);
  marker.setAttribute('refX', markerLen + 'px');
  marker.setAttribute('refY', markerW + 'px');
  marker.setAttribute('markerWidth', 2 * markerLen + 'px');
  marker.setAttribute('markerHeight', 2 * markerW + 'px');
  marker.setAttribute('orient', 'auto');
  marker.setAttribute('markerUnits', 'userSpaceOnUse');

  const ellipse = createSvgNode('ellipse');
  ellipse.setAttribute('cx', markerLen + 'px');
  ellipse.setAttribute('cy', markerW + 'px');
  ellipse.setAttribute('rx', markerLen + 'px');
  ellipse.setAttribute('ry', markerW + 'px');
  ellipse.setAttribute('fill', getRenderColor(color) || 'transparent');
  marker.appendChild(ellipse);
  defs.appendChild(marker);
  svg.appendChild(defs);
  path.setAttribute(isStart ? 'marker-start' : 'marker-end', `url(#${id})`);
}

function createTriangleMarker(shapeNode: any, svg: any, path: any, isStart: boolean = false): void {
  const border = shapeNode.border || {};
  const uuid = shapeNode.uuid;
  const { headEnd, width, color, tailEnd } = border;
  const endConfig = isStart ? headEnd : tailEnd;
  const len = endConfig.len ?? 'med';
  const w = endConfig.w ?? 'med';
  const markerLen = getMarkerSize(len, width);
  const markerW = getMarkerSize(w, width);

  const defs = createSvgNode('defs');
  const marker = createSvgNode('marker');
  const id = `marker-${uuid}-${isStart ? 'start' : 'end'}`;

  marker.setAttribute('id', id);
  marker.setAttribute('viewBox', `0 0 ${2 * markerLen} ${2 * markerW}`);
  marker.setAttribute('refX', (isStart ? 0.9 * markerLen : 1.1 * markerLen) + 'px');
  marker.setAttribute('refY', markerW + 'px');
  marker.setAttribute('markerWidth', 2 * markerLen + 'px');
  marker.setAttribute('markerHeight', 2 * markerW + 'px');
  marker.setAttribute('orient', 'auto');
  marker.setAttribute('markerUnits', 'userSpaceOnUse');

  const pathEl = createSvgNode('path');
  const d = isStart
    ? [`M ${2 * markerLen},0`, `L 0,${markerW}`, `L ${2 * markerLen},${2 * markerW}`, 'Z'].join(' ')
    : ['M 0,0', `L ${2 * markerLen},${markerW}`, `L 0,${2 * markerW}`, 'Z'].join(' ');
  pathEl.setAttribute('d', d);
  pathEl.setAttribute('fill', getRenderColor(color) || 'transparent');
  marker.appendChild(pathEl);
  defs.appendChild(marker);
  svg.appendChild(defs);
  path.setAttribute(isStart ? 'marker-start' : 'marker-end', `url(#${id})`);
}

function createDiamondMarker(shapeNode: any, svg: any, path: any, isStart: boolean = false): void {
  const border = shapeNode.border || {};
  const uuid = shapeNode.uuid;
  const { headEnd, width, color, tailEnd } = border;
  const endConfig = isStart ? headEnd : tailEnd;
  const len = endConfig.len ?? 'med';
  const w = endConfig.w ?? 'med';
  const markerLen = getMarkerSize(len, width);
  const markerW = getMarkerSize(w, width);

  const defs = createSvgNode('defs');
  const marker = createSvgNode('marker');
  const id = `marker-${uuid}-${isStart ? 'start' : 'end'}`;

  marker.setAttribute('id', id);
  marker.setAttribute('viewBox', `0 0 ${2 * markerLen} ${2 * markerW}`);
  marker.setAttribute('refX', markerLen + 'px');
  marker.setAttribute('refY', markerW + 'px');
  marker.setAttribute('markerWidth', 2 * markerLen + 'px');
  marker.setAttribute('markerHeight', 2 * markerW + 'px');
  marker.setAttribute('orient', 'auto');
  marker.setAttribute('markerUnits', 'userSpaceOnUse');

  const pathEl = createSvgNode('path');
  const d = [
    `M 0,${markerW}`,
    `L ${markerLen},0`,
    `L ${2 * markerLen},${markerW}`,
    `L ${markerLen},${2 * markerW}`,
    'Z',
  ].join(' ');
  pathEl.setAttribute('d', d);
  pathEl.setAttribute('fill', getRenderColor(color) || 'transparent');
  marker.appendChild(pathEl);
  defs.appendChild(marker);
  svg.appendChild(defs);
  path.setAttribute(isStart ? 'marker-start' : 'marker-end', `url(#${id})`);
}

function createArrowMarker(shapeNode: any, svg: any, path: any, isStart: boolean = false): void {
  const border = shapeNode.border || {};
  const uuid = shapeNode.uuid;
  const { headEnd, width, color, tailEnd } = border;
  const endConfig = isStart ? headEnd : tailEnd;
  const len = endConfig.len ?? 'med';
  const w = endConfig.w ?? 'med';
  const markerLen = getMarkerSize(len, width);
  const markerW = getMarkerSize(w, width);

  const defs = createSvgNode('defs');
  const marker = createSvgNode('marker');
  const id = `marker-${uuid}-${isStart ? 'start' : 'end'}`;

  marker.setAttribute('id', id);
  marker.setAttribute('viewBox', `0 0 ${2 * markerLen + 2 * width} ${2 * markerW + 2 * width}`);

  const refX = isStart
    ? (w === 'lg' ? 2 * width : 3 * width)
    : (w === 'lg' ? 2 * markerLen : 2 * markerLen - width);
  marker.setAttribute('refX', refX + 'px');
  marker.setAttribute('refY', (markerW + width) + 'px');
  marker.setAttribute('markerWidth', 2 * markerLen + 'px');
  marker.setAttribute('markerHeight', 2 * markerW + 'px');
  marker.setAttribute('orient', 'auto');
  marker.setAttribute('markerUnits', 'userSpaceOnUse');

  const pathEl = createSvgNode('path');
  const d = isStart
    ? [
        `M ${2 * markerLen + width}, ${width}`,
        `L ${width},${markerW + width}`,
        `L ${2 * markerLen + width},${2 * markerW + width}`,
      ].join(' ')
    : [
        `M ${width}, ${width}`,
        `L ${2 * markerLen + width},${markerW + width}`,
        `L ${width},${2 * markerW + width}`,
      ].join(' ');
  pathEl.setAttribute('d', d);
  pathEl.setAttribute('stroke-width', width + 'px');
  pathEl.setAttribute('stroke', getRenderColor(color) || 'transparent');
  pathEl.setAttribute('fill', 'transparent');
  pathEl.setAttribute('stroke-linecap', 'round');
  pathEl.setAttribute('stroke-linejoin', 'miter');
  (pathEl as any).style.overflow = 'visible';
  marker.appendChild(pathEl);
  defs.appendChild(marker);
  svg.appendChild(defs);
  path.setAttribute(isStart ? 'marker-start' : 'marker-end', `url(#${id})`);
}

function createStealthMarker(shapeNode: any, svg: any, path: any, isStart: boolean = false): void {
  const border = shapeNode.border || {};
  const uuid = shapeNode.uuid;
  const { headEnd, width, color, tailEnd } = border;
  const endConfig = isStart ? headEnd : tailEnd;
  const len = endConfig.len ?? 'med';
  const w = endConfig.w ?? 'med';
  const markerLen = getMarkerSize(len, width);
  const markerW = getMarkerSize(w, width);

  const defs = createSvgNode('defs');
  const marker = createSvgNode('marker');
  const id = `marker-${uuid}-${isStart ? 'start' : 'end'}`;

  marker.setAttribute('id', id);
  marker.setAttribute('viewBox', `0 0 ${2 * markerLen} ${2 * markerW}`);

  const refX = isStart
    ? (w === 'sm' ? 1.5 * width : 2 * width)
    : (w === 'sm' ? 2 * markerLen - 1.5 * width : 2 * markerLen - 2 * width);
  marker.setAttribute('refX', refX + 'px');
  marker.setAttribute('refY', markerW + 'px');
  marker.setAttribute('markerWidth', 2 * markerLen + 'px');
  marker.setAttribute('markerHeight', 2 * markerW + 'px');
  marker.setAttribute('orient', 'auto');
  marker.setAttribute('markerUnits', 'userSpaceOnUse');

  const pathEl = createSvgNode('path');
  const d = isStart
    ? [
        `M 0, ${markerW}`,
        `L ${2 * markerLen},0`,
        `L ${markerLen},${markerW}`,
        `L ${2 * markerLen},${2 * markerW}`,
        'Z',
      ].join(' ')
    : [
        'M 0,0',
        `L ${2 * markerLen},${markerW}`,
        `L 0,${2 * markerW}`,
        `L ${markerLen},${markerW}`,
        'Z',
      ].join(' ');
  pathEl.setAttribute('d', d);
  pathEl.setAttribute('fill', getRenderColor(color) || 'transparent');
  (pathEl as any).style.overflow = 'visible';
  marker.appendChild(pathEl);
  defs.appendChild(marker);
  svg.appendChild(defs);
  path.setAttribute(isStart ? 'marker-start' : 'marker-end', `url(#${id})`);
}

export function applyEndMarkers(shapeNode: any, svg: any, path: any): void {
  const border = shapeNode.border || {};
  shapeNode.extend;
  const { headEnd, tailEnd } = border;

  if (headEnd && headEnd.type !== 'none') {
    switch (headEnd.type) {
      case 'triangle':
        createTriangleMarker(shapeNode, svg, path, true);
        break;
      case 'oval':
        createOvalMarker(shapeNode, svg, path, true);
        break;
      case 'diamond':
        createDiamondMarker(shapeNode, svg, path, true);
        break;
      case 'arrow':
        createArrowMarker(shapeNode, svg, path, true);
        break;
      case 'stealth':
        createStealthMarker(shapeNode, svg, path, true);
        break;
    }
  }

  if (tailEnd && tailEnd.type !== 'none') {
    switch (tailEnd.type) {
      case 'triangle':
        createTriangleMarker(shapeNode, svg, path, false);
        break;
      case 'oval':
        createOvalMarker(shapeNode, svg, path, false);
        break;
      case 'diamond':
        createDiamondMarker(shapeNode, svg, path, false);
        break;
      case 'arrow':
        createArrowMarker(shapeNode, svg, path, false);
        break;
      case 'stealth':
        createStealthMarker(shapeNode, svg, path, false);
        break;
    }
  }
}

export function createBackgroundImage(shapeNode: any, svg: any, shapeDom: any): void {
  if (!shapeNode.background || shapeNode.background.type !== 'blipFill') return;

  const defs = svg.querySelector('defs') || createSvgNode('defs');
  if (!svg.querySelector('defs')) svg.prepend(defs);

  const pattern = createSvgNode('pattern');
  const patternId = 'bg-' + shapeNode.uuid;
  pattern.setAttribute('id', patternId);
  pattern.setAttribute('patternUnits', 'objectBoundingBox');
  pattern.setAttribute('width', '1');
  pattern.setAttribute('height', '1');

  const image = createSvgNode('image');
  image.setAttribute('href', shapeNode.background.base64);
  image.setAttribute('width', shapeNode.extend.w + '');
  image.setAttribute('height', shapeNode.extend.h + '');
  image.setAttribute('preserveAspectRatio', 'none');
  pattern.appendChild(image);
  defs.appendChild(pattern);

  shapeDom.setAttribute('fill', `url(#${patternId})`);
}

export function createGradFill(shapeNode: any, svg: any, shapeDom: any): void {
  if (!shapeNode.background || shapeNode.background.type !== 'gradFill') return;

  const defs = svg.querySelector('defs') || createSvgNode('defs');
  if (!svg.querySelector('defs')) svg.prepend(defs);

  const gradId = 'grad-' + shapeNode.uuid;
  const grad = shapeNode.background;

  let gradEl: SVGElement;
  if (grad.path === 'circle' || grad.path === 'shape') {
    gradEl = createSvgNode('radialGradient');
  } else {
    gradEl = createSvgNode('linearGradient');
    if (grad.lin && grad.lin.ang !== undefined) {
      const angle = grad.lin.ang;
      gradEl.setAttribute('gradientTransform', `rotate(${angle})`);
    }
  }

  gradEl.setAttribute('id', gradId);

  if (grad.gsList) {
    grad.gsList.forEach((gs: any) => {
      const stop = createSvgNode('stop');
      stop.setAttribute('offset', gs.pos * 100 + '%');
      stop.setAttribute('stop-color', getRenderColor(gs.color));
      gradEl.appendChild(stop);
    });
  }

  defs.appendChild(gradEl);
  shapeDom.setAttribute('fill', `url(#${gradId})`);
}
