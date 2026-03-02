import { createSvgNode, getAdjMaxWidth } from './shape-common';

export function createLine(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const d = ['M 0,0', `L ${ext.w},${ext.h}`].join(' ');
  path.setAttribute('d', d);
  return path;
}

export function createStraightConnector1(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const d = ['M 0,0', `L ${ext.w},${ext.h}`].join(' ');
  path.setAttribute('d', d);
  return path;
}

export function createBentConnector3(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjMaxWidth('adj1', shapeNode, 0.5 * Math.max(ext.w, ext.h));
  const d = [
    'M 0,0',
    `L ${adj},0`,
    `L ${adj},${ext.h}`,
    `L ${ext.w},${ext.h}`,
  ].join(' ');
  path.setAttribute('d', d);
  return path;
}

export function createCurvedConnector3(shapeNode: any): SVGElement {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjMaxWidth('adj1', shapeNode, 0.5 * Math.max(ext.w, ext.h));
  const d = [
    'M0,0',
    `Q${adj},0 ${adj},${ext.h / 2}`,
    `T${ext.w},${ext.h}`,
  ].join(' ');
  path.setAttribute('d', d);
  return path;
}
