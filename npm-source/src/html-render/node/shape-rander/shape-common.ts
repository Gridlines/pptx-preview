import ShapeNode from '../../../reader/node/ShapeNode';

const SVG_NS = 'http://www.w3.org/2000/svg';

export interface TextArea {
  left: number;
  top: number;
  bottom: number;
  right?: number;
  w: number;
  h: number;
}

export function createSvg(): SVGElement {
  return document.createElementNS(SVG_NS, 'svg') as SVGElement;
}

export function createSvgNode(tagName: string): SVGElement {
  return document.createElementNS(SVG_NS, tagName) as SVGElement;
}

export function getDefaultAdjWidth(shapeNode: ShapeNode): number {
  const ext = shapeNode.extend;
  return 0.16667 * Math.min(ext.w, ext.h);
}

export function getAdj(adjName: string, shapeNode: ShapeNode, defaultAdj?: number): any {
  if (shapeNode.prstGeom && shapeNode.prstGeom.gd) {
    const gdList = Array.isArray(shapeNode.prstGeom.gd)
      ? shapeNode.prstGeom.gd
      : [shapeNode.prstGeom.gd];
    const found = gdList.find((g: any) => g.name === adjName);
    if (found) return found.fmla;
  }
  return defaultAdj;
}

export function getAdjWidth(adjName: string, shapeNode: ShapeNode, defaultAdjWidth?: number): number {
  const adj = getAdj(adjName, shapeNode);
  if (adj !== undefined) {
    const ext = shapeNode.extend;
    return Math.min(ext.w, ext.h) * adj;
  }
  return defaultAdjWidth !== undefined ? defaultAdjWidth : getDefaultAdjWidth(shapeNode);
}

export function getAdjMaxWidth(adjName: string, shapeNode: ShapeNode, defaultAdjWidth?: number): number {
  const adj = getAdj(adjName, shapeNode);
  if (adj !== undefined) {
    const ext = shapeNode.extend;
    return Math.max(ext.w, ext.h) * adj;
  }
  return defaultAdjWidth !== undefined ? defaultAdjWidth : getDefaultAdjWidth(shapeNode);
}

export function getLineAdjWidth(adjName: string, shapeNode: ShapeNode, defaultAdjWidth?: number): number {
  const adj = getAdj(adjName, shapeNode);
  if (adj !== undefined) {
    const w = shapeNode.extend.w;
    return w * adj;
  }
  return defaultAdjWidth !== undefined ? defaultAdjWidth : getDefaultAdjWidth(shapeNode);
}

export function ellipsePoint(
  angleDeg: number, cx: number, cy: number, rx: number, ry: number
): [number, number] {
  const rad = (angleDeg * Math.PI) / 180;
  const x =
    rad === 0 || rad === 2 * Math.PI
      ? cx + rx
      : rad === Math.PI
        ? cx - rx
        : rad === Math.PI / 2 || rad === (3 * Math.PI) / 2
          ? cx
          : (rad > 0 && rad < Math.PI / 2) || (rad > (3 * Math.PI) / 2 && rad < 2 * Math.PI)
            ? cx + Math.sqrt(1 / (1 / Math.pow(rx, 2) + Math.pow(Math.tan(rad), 2) / Math.pow(ry, 2)))
            : cx - Math.sqrt(1 / (1 / Math.pow(rx, 2) + Math.pow(Math.tan(rad), 2) / Math.pow(ry, 2)));

  const y =
    rad === 0 || rad === 2 * Math.PI || rad === Math.PI
      ? cy
      : rad === Math.PI / 2
        ? cy + ry
        : rad === (3 * Math.PI) / 2
          ? cy - ry
          : rad > Math.PI && rad < 2 * Math.PI
            ? cy - Math.sqrt(1 / (1 / Math.pow(ry, 2) + Math.pow(1 / Math.tan(rad), 2) / Math.pow(rx, 2)))
            : cy + Math.sqrt(1 / (1 / Math.pow(ry, 2) + Math.pow(1 / Math.tan(rad), 2) / Math.pow(rx, 2)));

  return [x, y];
}

export function arcSweepFlag(startAngle: number, endAngle: number): number {
  let flag = 0;
  if ((endAngle > startAngle && endAngle - startAngle > 180) ||
      (endAngle < startAngle && startAngle - endAngle < 180)) {
    flag = 1;
  }
  return flag;
}

export function getDefaultInset(shapeNode: ShapeNode): TextArea {
  const ext = shapeNode.extend;
  const insetX = 0.146 * ext.w;
  const insetY = 0.146 * ext.h;
  return {
    top: insetY,
    bottom: insetY,
    left: insetX,
    right: insetX,
    w: ext.w - 2 * insetX,
    h: ext.h - 2 * insetY,
  };
}
