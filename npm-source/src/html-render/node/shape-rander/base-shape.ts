import { createSvgNode, getAdjWidth, getDefaultAdjWidth, getAdj, ellipsePoint, arcSweepFlag, getDefaultInset, TextArea } from './shape-common';
import { getRenderColor } from '../../../utils/color';

export interface ShapeResult {
  dom: SVGElement;
  textArea?: TextArea;
  hasFill?: boolean;
}

export function createCustomGeom(shapeNode: any): ShapeResult {
  const prstGeom = shapeNode.prstGeom || {};
  const ext = shapeNode.extend;
  const pathList = prstGeom.pathList;
  const gw = prstGeom.w;
  const gh = prstGeom.h;
  const path = createSvgNode('path');
  const cmdMap: Record<string, string> = { moveTo: 'M', lnTo: 'L', cubicBezTo: 'C', close: 'Z' };
  const scaleX = ext.w / gw;
  const scaleY = ext.h / gh;
  const d = pathList.map((seg: any) => {
    const cmd = cmdMap[seg.type];
    const pts = Array.isArray(seg.points)
      ? seg.points.map((p: any) => `${p[0] * scaleX},${p[1] * scaleY}`).join(' ')
      : '';
    return pts ? `${cmd} ${pts}` : `${cmd}`;
  }).join(' ');
  path.setAttribute('d', d);
  path.style.fillRule = 'evenodd';
  return { dom: path };
}

export function createTriangle(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const polygon = createSvgNode('polygon');
  const points = [`${ext.w / 2},0`, `0,${ext.h}`, `${ext.w},${ext.h}`].join(' ');
  polygon.setAttribute('points', points);
  return { dom: polygon };
}

export function createRtTriangle(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const polygon = createSvgNode('polygon');
  const points = [`0,${ext.h}`, '0,0', `${ext.w},${ext.h}`].join(' ');
  polygon.setAttribute('points', points);
  return { dom: polygon };
}

export function createEllipse(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const ellipse = createSvgNode('ellipse');
  const rx = ext.w / 2;
  const ry = ext.h / 2;
  ellipse.setAttribute('cx', rx + 'px');
  ellipse.setAttribute('cy', ry + 'px');
  ellipse.setAttribute('rx', rx + 'px');
  ellipse.setAttribute('ry', ry + 'px');
  return { dom: ellipse };
}

export function createParallelogram(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const d = [
    `M${adj},0`, `L${ext.w},0`, `L${ext.w - adj},${ext.h}`, `L0,${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);

  const textW = 0.84 * (ext.w - adj);
  const textTop = 0.08 * ext.h + (adj / ext.w) * ext.h * 0.42;
  return {
    dom: path,
    textArea: {
      top: textTop, bottom: textTop,
      left: (ext.w - textW) / 2, right: (ext.w - textW) / 2,
      w: textW, h: ext.h - 2 * textTop,
    },
  };
}

export function createTrapezoid(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const d = [
    `M${adj},0`, `L${ext.w - adj},0`, `L${ext.w},${ext.h}`, `L0,${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);

  const adjW = getAdjWidth('adj', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const tTop = (adjW / ext.w) * 0.66 * ext.h;
  const tLeft = 0.66 * adjW;
  return {
    dom: path,
    textArea: { top: tTop, bottom: 0, left: tLeft, right: tLeft, w: ext.w - 2 * tLeft, h: ext.h - tTop },
  };
}

export function createDiamond(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const d = [
    `M${ext.w / 2},0`, `L${ext.w},${ext.h / 2}`, `L${ext.w / 2},${ext.h}`, `L0,${ext.h / 2}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return {
    dom: path,
    textArea: { top: 0.25 * ext.h, bottom: 0.25 * ext.h, left: 0.25 * ext.w, right: 0.25 * ext.w, w: 0.5 * ext.w, h: 0.5 * ext.h },
  };
}

export function createPentagon(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const d = [
    `M${ext.w / 2},0`, `L${ext.w},${0.3771 * ext.h}`,
    `L${0.808 * ext.w},${ext.h}`, `L${0.192 * ext.w},${ext.h}`,
    `L0,${0.3771 * ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return {
    dom: path,
    textArea: { top: 0.227 * ext.h, bottom: 0, left: 0.192 * ext.w, right: 0.192 * ext.w, w: 0.616 * ext.w, h: 0.773 * ext.h },
  };
}

export function createHexagon(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const d = [
    `M${adj},0`, `L${ext.w - adj},0`, `L${ext.w},${ext.h / 2}`,
    `L${ext.w - adj},${ext.h}`, `L${adj},${ext.h}`, `L0,${ext.h / 2}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const tTop = 0.098 * ext.h + (adj / ext.w) * 0.38 * ext.h;
  const tLeft = 0.088 * ext.w + 0.422 * adj;
  return {
    dom: path,
    textArea: { top: tTop, bottom: tTop, left: tLeft, right: tLeft, w: ext.w - 2 * tLeft, h: ext.h - 2 * tTop },
  };
}

export function createHeptagon(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const d = [
    `M${ext.w / 2},0`, `L${0.9 * ext.w},${0.2 * ext.h}`,
    `L${ext.w},${0.642 * ext.h}`, `L${0.722 * ext.w},${ext.h}`,
    `L${0.278 * ext.w},${ext.h}`, `L0,${0.642 * ext.h}`,
    `L${0.1 * ext.w},${0.2 * ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return {
    dom: path,
    textArea: { top: 0.2 * ext.h, bottom: 0.2 * ext.h, left: 0.1 * ext.w, right: 0.1 * ext.w, w: 0.8 * ext.w, h: 0.6 * ext.h },
  };
}

export function createOctagon(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.29 * Math.min(ext.w, ext.h));
  const d = [
    `M${adj},0`, `L${ext.w - adj},0`, `L${ext.w},${adj}`,
    `L${ext.w},${ext.h - adj}`, `L${ext.w - adj},${ext.h}`,
    `L${adj},${ext.h}`, `L0,${ext.h - adj}`, `L0,${adj}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return {
    dom: path,
    textArea: { top: 0.5 * adj, bottom: 0.5 * adj, left: 0.5 * adj, right: 0.5 * adj, w: ext.w - adj, h: ext.h - adj },
  };
}

export function createDecagon(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const r1 = 0.344, r2 = 0.117, r3 = 0.19;
  const d = [
    `M${ext.w * r1},0`, `L${0.656 * ext.w},0`,
    `L${0.883 * ext.w},${ext.h * r3}`, `L${ext.w},${0.5 * ext.h}`,
    `L${0.883 * ext.w},${0.81 * ext.h}`, `L${0.656 * ext.w},${ext.h}`,
    `L${ext.w * r1},${ext.h}`, `L${ext.w * r2},${0.81 * ext.h}`,
    `L0,${0.5 * ext.h}`, `L${ext.w * r2},${ext.h * r3}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return {
    dom: path,
    textArea: { top: ext.h * r3, bottom: ext.h * r3, left: ext.w * r2, right: ext.w * r2, w: 0.766 * ext.w, h: 0.62 * ext.h },
  };
}

export function createDodecagon(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const r1 = 0.364, r2 = 0.133, r3 = 0.135;
  const d = [
    `M${ext.w * r1},0`, `L${0.636 * ext.w},0`,
    `L${0.867 * ext.w},${ext.h * r3}`, `L${ext.w},${ext.h * r1}`,
    `L${ext.w},${0.636 * ext.h}`, `L${0.867 * ext.w},${0.865 * ext.h}`,
    `L${0.636 * ext.w},${ext.h}`, `L${ext.w * r1},${ext.h}`,
    `L${ext.w * r2},${0.865 * ext.h}`, `L0,${0.636 * ext.h}`,
    `L0,${ext.h * r1}`, `L${ext.w * r2},${ext.h * r3}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return {
    dom: path,
    textArea: { top: ext.h * r3, bottom: ext.h * r3, left: ext.w * r2, right: ext.w * r2, w: 0.734 * ext.w, h: 0.73 * ext.h },
  };
}

export function createPie(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const startAngle = getAdj('adj1', shapeNode, 360);
  const endAngle = getAdj('adj2', shapeNode, 270);
  const cx = ext.w / 2, cy = ext.h / 2;
  const rx = ext.w / 2, ry = ext.h / 2;
  const [sx, sy] = ellipsePoint(startAngle, cx, cy, rx, ry);
  const [ex, ey] = ellipsePoint(endAngle, cx, cy, rx, ry);
  const sweep = arcSweepFlag(startAngle, endAngle);
  const d = `M${cx},${cy}, L${sx} ${sy} A ${rx} ${ry} 0 ${sweep} 1 ${ex} ${ey} Z`;
  path.setAttribute('d', d);
  return { dom: path, textArea: getDefaultInset(shapeNode) };
}

export function createArc(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const startAngle = getAdj('adj1', shapeNode, 270);
  const endAngle = getAdj('adj2', shapeNode, 0);
  const cx = ext.w / 2, cy = ext.h / 2;
  const rx = ext.w / 2, ry = ext.h / 2;
  const [sx, sy] = ellipsePoint(startAngle, cx, cy, rx, ry);
  const [ex, ey] = ellipsePoint(endAngle, cx, cy, rx, ry);
  const sweep = arcSweepFlag(startAngle, endAngle);
  const d = `M${sx},${sy} A ${rx} ${ry} 0 ${sweep} 1 ${ex} ${ey}`;
  path.setAttribute('d', d);
  return { dom: path, hasFill: false };
}

export function createChord(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const startAngle = getAdj('adj1', shapeNode, 45);
  const endAngle = getAdj('adj2', shapeNode, 270);
  const cx = ext.w / 2, cy = ext.h / 2;
  const rx = ext.w / 2, ry = ext.h / 2;
  const [sx, sy] = ellipsePoint(startAngle, cx, cy, rx, ry);
  const [ex, ey] = ellipsePoint(endAngle, cx, cy, rx, ry);
  const sweep = arcSweepFlag(startAngle, endAngle);
  const d = `M${sx} ${sy} A ${rx} ${ry} 0 ${sweep} 1 ${ex} ${ey} Z`;
  path.setAttribute('d', d);
  return { dom: path, textArea: getDefaultInset(shapeNode) };
}

export function createTeardrop(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adjVal = getAdj('adj', shapeNode, 1);
  const cx = ext.w / 2, cy = ext.h / 2;
  const rx = ext.w / 2, ry = ext.h / 2;
  const [sx, sy] = ellipsePoint(0, cx, cy, rx, ry);
  const [ex, ey] = ellipsePoint(270, cx, cy, rx, ry);
  const sweep = arcSweepFlag(0, 270);
  let d = `M${sx} ${sy} A ${rx} ${ry} 0 ${sweep} 1 ${ex} ${ey}`;
  const tearLen = rx * adjVal;
  const tearX = cx + tearLen;
  const tearY = cy - (ry * tearLen) / (ext.w / 2);
  const cpx = (ext.w / 2 + tearX) / 2;
  const cpy = (ext.h / 2 + tearY) / 2;
  d += ` Q${cpx},0 ${tearX},${tearY}`;
  d += ` Q${ext.w},${cpy} ${cx + rx},${cy}`;
  path.setAttribute('d', d);
  return { dom: path, textArea: getDefaultInset(shapeNode) };
}

export function createBracketPair(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.16667 * Math.min(ext.w, ext.h));
  const d = [
    `M${adj},${ext.h}`,
    `Q0,${ext.h} 0,${ext.h - adj}`,
    `L0,${adj}`,
    `Q0,0 ${adj},0`,
    `M${ext.w - adj},0`,
    `Q${ext.w},0 ${ext.w},${adj}`,
    `L${ext.w},${ext.h - adj}`,
    `Q${ext.w},${ext.h} ${ext.w - adj},${ext.h}`,
  ].join(' ');
  path.setAttribute('d', d);
  const inset = 0.285 * adj;
  return {
    dom: path, hasFill: false,
    textArea: { top: inset, bottom: inset, left: inset, right: inset, w: ext.w - 2 * inset, h: ext.h - 2 * inset },
  };
}

export function createBracePair(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.083335 * Math.min(ext.w, ext.h));
  const d = [
    `M${2 * adj},${ext.h}`,
    `Q${adj},${ext.h} ${adj},${ext.h - adj}`,
    `L${adj},${ext.h / 2 + adj}`,
    `Q${adj},${ext.h / 2} 0,${ext.h / 2}`,
    `Q${adj},${ext.h / 2} ${adj},${ext.h / 2 - adj}`,
    `L${adj},${adj}`,
    `Q${adj},0 ${2 * adj},0`,
    `M${ext.w - 2 * adj},0`,
    `Q${ext.w - adj},0 ${ext.w - adj},${adj}`,
    `L${ext.w - adj},${ext.h / 2 - adj}`,
    `Q${ext.w - adj},${ext.h / 2} ${ext.w},${ext.h / 2}`,
    `Q${ext.w - adj},${ext.h / 2} ${ext.w - adj},${ext.h / 2 + adj}`,
    `L${ext.w - adj},${ext.h - adj}`,
    `Q${ext.w - adj},${ext.h} ${ext.w - 2 * adj},${ext.h}`,
  ].join(' ');
  path.setAttribute('d', d);
  const inset = 0.285 * getAdjWidth('adj', shapeNode, 0.16667 * Math.min(ext.w, ext.h));
  return {
    dom: path, hasFill: false,
    textArea: { top: inset, bottom: inset, left: inset, right: inset, w: ext.w - 2 * inset, h: ext.h - 2 * inset },
  };
}

export function createFrame(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj1', shapeNode, 0.12 * Math.min(ext.w, ext.h));
  const d = [
    'M0,0', `L${ext.w},0`, `L${ext.w},${ext.h}`, `L0,${ext.h}`, 'Z',
    `M${adj},${adj}`, `L${adj},${ext.h - adj}`, `L${ext.w - adj},${ext.h - adj}`, `L${ext.w - adj},${adj}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return {
    dom: path,
    textArea: { top: adj, bottom: adj, left: adj, right: adj, w: ext.w - 2 * adj, h: ext.h - 2 * adj },
  };
}

export function createHalfFrame(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj1 = getAdjWidth('adj1', shapeNode, 0.333 * Math.min(ext.w, ext.h));
  const adj2 = Math.min(
    getAdjWidth('adj2', shapeNode, 0.333 * Math.min(ext.w, ext.h)),
    ext.w * (1 - adj1 / ext.h)
  );
  const d = [
    'M0,0', `L${ext.w},0`, `L${ext.w * (1 - adj1 / ext.h)},${adj1}`,
    `L${adj2},${adj1}`, `L${adj2},${ext.h * (1 - adj2 / ext.w)}`,
    `L0,${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path };
}

export function createCorner(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj1 = getAdjWidth('adj1', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const adj2 = getAdjWidth('adj2', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const d = [
    'M0,0', `L${adj2},0`, `L${adj2},${ext.h - adj1}`,
    `L${ext.w},${ext.h - adj1}`, `L${ext.w},${ext.h}`,
    `L0,${ext.h}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return {
    dom: path,
    textArea: { top: ext.h - adj1, bottom: 0, left: 0, right: 0, w: ext.w, h: adj1 },
  };
}

export function createDiagStripe(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.5 * Math.min(ext.w, ext.h));
  const topX = (ext.w * adj) / ext.h;
  const d = [`M${topX},0`, `L${ext.w},0`, `L0,${ext.h}`, `L0,${adj}`, 'Z'].join(' ');
  path.setAttribute('d', d);

  const adjRaw = getAdj('adj', shapeNode, 0.5);
  const bR = 0.5 * (1 - adjRaw) * ext.h;
  const rR = 0.5 * (1 - adjRaw) * ext.w;
  return {
    dom: path,
    textArea: { top: 0, bottom: bR, left: 0, right: rR, w: ext.w - rR, h: ext.h - bR },
  };
}

export function createPlus(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const d = [
    `M${adj},0`, `L${ext.w - adj},0`, `L${ext.w - adj},${adj}`,
    `L${ext.w},${adj}`, `L${ext.w},${ext.h - adj}`,
    `L${ext.w - adj},${ext.h - adj}`, `L${ext.w - adj},${ext.h}`,
    `L${adj},${ext.h}`, `L${adj},${ext.h - adj}`,
    `L0,${ext.h - adj}`, `L0,${adj}`, `L${adj},${adj}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return {
    dom: path,
    textArea: { top: adj, bottom: adj, left: 0, right: 0, w: ext.w, h: ext.h - 2 * adj },
  };
}

export function createPlaque(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const path = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.16667 * Math.min(ext.w, ext.h));
  const d = [
    `M${adj},0`, `L${ext.w - adj},0`,
    `Q${ext.w - adj},${adj} ${ext.w},${adj}`,
    `L${ext.w},${ext.h - adj}`,
    `Q${ext.w - adj},${ext.h - adj} ${ext.w - adj},${ext.h}`,
    `L${adj},${ext.h}`,
    `Q${adj},${ext.h - adj} 0,${ext.h - adj}`,
    `L0,${adj}`,
    `Q${adj},${adj} ${adj},0`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  const inset = 0.72 * adj;
  return {
    dom: path,
    textArea: { top: inset, bottom: inset, left: inset, right: inset, w: ext.w - 1.44 * adj, h: ext.w - 1.44 * adj },
  };
}

export function createCan(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const bg = shapeNode.background;
  const g = createSvgNode('g');
  const bodyPath = createSvgNode('path');
  const adj = getAdjWidth('adj', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const bodyD = [
    `M0,${adj / 2}`, `L0,${ext.h - adj / 2}`,
    `A${ext.w / 2},${adj / 2} 0 0 0 ${ext.w},${ext.h - adj / 2}`,
    `L${ext.w},${adj / 2}`,
    `A${ext.w / 2},${adj / 2} 0 0 1 0,${adj / 2}`, 'Z',
  ].join(' ');
  bodyPath.setAttribute('d', bodyD);
  const ellipse = createSvgNode('ellipse');
  ellipse.setAttribute('cx', ext.w / 2 + 'px');
  ellipse.setAttribute('cy', adj / 2 + 'px');
  ellipse.setAttribute('rx', ext.w / 2 + 'px');
  ellipse.setAttribute('ry', adj / 2 + 'px');
  if (bg?.type === 'solidFill') {
    ellipse.setAttribute('fill', getRenderColor(bg, { light: 0.5 }) || 'transparent');
  }
  g.appendChild(bodyPath);
  g.appendChild(ellipse);
  return {
    dom: g,
    textArea: { top: adj, bottom: 0, left: 0, right: 0, w: ext.w, h: ext.h - adj },
  };
}

export function createCube(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const bg = shapeNode.background;
  const adj = getAdjWidth('adj', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const g = createSvgNode('g');
  const front = createSvgNode('path');
  front.setAttribute('d', [`M0,${adj}`, `L${ext.w - adj},${adj}`, `L${ext.w - adj},${ext.h}`, `L0,${ext.h}`, 'Z'].join(' '));
  const top = createSvgNode('path');
  top.setAttribute('d', [`M0,${adj}`, `L${adj},0`, `L${ext.w},0`, `L${ext.w - adj},${adj}`, 'Z'].join(' '));
  if (bg?.type === 'solidFill') top.setAttribute('fill', getRenderColor(bg, { light: 0.8 }) || 'transparent');
  const side = createSvgNode('path');
  side.setAttribute('d', [`M${ext.w},0`, `L${ext.w - adj},${adj}`, `L${ext.w - adj},${ext.h}`, `L${ext.w},${ext.h - adj}`, 'Z'].join(' '));
  if (bg?.type === 'solidFill') side.setAttribute('fill', getRenderColor(bg, { dark: 0.6 }) || 'transparent');
  g.appendChild(front);
  g.appendChild(top);
  g.appendChild(side);
  return {
    dom: g,
    textArea: { top: adj, bottom: 0, left: 0, right: adj, w: ext.w - adj, h: ext.h - adj },
  };
}

export function createBevel(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const bg = shapeNode.background;
  const adj = getAdjWidth('adj', shapeNode, 0.125 * Math.min(ext.w, ext.h));
  const g = createSvgNode('g');

  const center = createSvgNode('path');
  center.setAttribute('d', [`M${adj},${adj}`, `L${ext.w - adj},${adj}`, `L${ext.w - adj},${ext.h - adj}`, `L${adj},${ext.h - adj}`, 'Z'].join(' '));

  const topFace = createSvgNode('path');
  topFace.setAttribute('d', ['M0,0', `L${adj},${adj}`, `L${ext.w - adj},${adj}`, `L${ext.w},0`, 'Z'].join(' '));
  if (bg?.type === 'solidFill') topFace.setAttribute('fill', getRenderColor(bg, { light: 0.8 }) || 'transparent');

  const rightFace = createSvgNode('path');
  rightFace.setAttribute('d', [`M${ext.w},0`, `L${ext.w - adj},${adj}`, `L${ext.w - adj},${ext.h - adj}`, `L${ext.w},${ext.h}`, 'Z'].join(' '));
  if (bg?.type === 'solidFill') rightFace.setAttribute('fill', getRenderColor(bg, { dark: 0.6 }) || 'transparent');

  const bottomFace = createSvgNode('path');
  bottomFace.setAttribute('d', [`M${ext.w},${ext.h}`, `L${ext.w - adj},${ext.h - adj}`, `L${adj},${ext.h - adj}`, `L0,${ext.h}`, 'Z'].join(' '));
  if (bg?.type === 'solidFill') bottomFace.setAttribute('fill', getRenderColor(bg, { dark: 0.625 }) || 'transparent');

  const leftFace = createSvgNode('path');
  leftFace.setAttribute('d', [`M0,${ext.h}`, `L${adj},${ext.h - adj}`, `L${adj},${adj}`, 'L0,0', 'Z'].join(' '));
  if (bg?.type === 'solidFill') leftFace.setAttribute('fill', getRenderColor(bg, { light: 0.6 }) || 'transparent');

  g.appendChild(center);
  g.appendChild(topFace);
  g.appendChild(rightFace);
  g.appendChild(bottomFace);
  g.appendChild(leftFace);
  return {
    dom: g,
    textArea: { top: adj, bottom: adj, left: adj, right: adj, w: ext.w - 2 * adj, h: ext.h - 2 * adj },
  };
}

export function createDonut(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const adj = getAdjWidth('adj', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const path = createSvgNode('path');
  const d = [
    `M0,${ext.h / 2}`,
    `A${ext.w / 2},${ext.h / 2} 0 1,1 0,${ext.h / 2 + 1}`, 'Z',
    `M${ext.w - adj},${ext.h / 2}`,
    `A${ext.w / 2 - adj},${ext.h / 2 - adj} 0 1,0 ${ext.w - adj},${ext.h / 2 + 1}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: getDefaultInset(shapeNode) };
}

export function createNoSmoking(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const adj = getAdjWidth('adj', shapeNode, 0.25 * Math.min(ext.w, ext.h));
  const path = createSvgNode('path');
  const angle = Math.atan(ext.h / ext.w);
  const offset = adj / 2 / Math.sin(angle);
  const cx = ext.w / 2, cy = ext.h / 2;
  const slope = (-1 * ext.h) / ext.w;
  const intercept1 = (ext.h * offset) / ext.w;
  const irx = ext.w / 2 - adj, iry = ext.h / 2 - adj;

  const D = -2 * irx * irx * slope * intercept1;
  const sqrtVal = Math.sqrt(
    Math.pow(2 * irx * irx * slope * intercept1, 2) -
    4 * (iry * iry + irx * irx * slope * slope) * irx * irx * (intercept1 * intercept1 - iry * iry)
  );
  const denom = 2 * (iry * iry + irx * irx * slope * slope);
  const x1 = (D - sqrtVal) / denom, y1 = slope * x1 + intercept1;
  const x2 = (D + sqrtVal) / denom, y2 = slope * x2 + intercept1;

  const intercept2 = (-ext.h * offset) / ext.w;
  const D2 = -2 * irx * irx * slope * intercept2;
  const sqrtVal2 = Math.sqrt(
    Math.pow(2 * irx * irx * slope * intercept2, 2) -
    4 * (iry * iry + irx * irx * slope * slope) * irx * irx * (intercept2 * intercept2 - iry * iry)
  );
  const denom2 = 2 * (iry * iry + irx * irx * slope * slope);
  const x3 = (D2 - sqrtVal2) / denom2, y3 = slope * x3 + intercept2;
  const x4 = (D2 + sqrtVal2) / denom2, y4 = slope * x4 + intercept2;

  const d = [
    `M0,${ext.h / 2}`,
    `A${ext.w / 2},${ext.h / 2} 0 1,1 0,${ext.h / 2 + 1}`, 'Z',
    `M${cx + x2},${cy - y2}`,
    `A${irx},${iry} 0 0 0 ${cx + x1},${cy - y1}`, 'Z',
    `M${cx + x3},${cy - y3}`,
    `A${irx},${iry} 0 0 0 ${cx + x4},${cy - y4}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);
  return { dom: path, textArea: getDefaultInset(shapeNode) };
}

export function createBlockArc(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const minDim = Math.min(ext.w, ext.h);
  const path = createSvgNode('path');
  const startAngle = getAdj('adj1', shapeNode, 180);
  const endAngle = getAdj('adj2', shapeNode, 0);
  const thickness = getAdjWidth('adj3', shapeNode, 0.25 * minDim);
  const cx = ext.w / 2, cy = ext.h / 2;
  const outerRx = ext.w / 2, outerRy = ext.h / 2;
  const innerRx = ext.w / 2 - thickness, innerRy = ext.h / 2 - thickness;

  const [osx, osy] = ellipsePoint(startAngle, cx, cy, outerRx, outerRy);
  const [oex, oey] = ellipsePoint(endAngle, cx, cy, outerRx, outerRy);
  const [isx, isy] = ellipsePoint(startAngle, cx, cy, innerRx, innerRy);
  const [iex, iey] = ellipsePoint(endAngle, cx, cy, innerRx, innerRy);
  const sweep = arcSweepFlag(startAngle, endAngle);

  const d = [
    `M${osx},${osy}`,
    `A${outerRx} ${outerRy} 0 ${sweep} 1 ${oex} ${oey}`,
    `L${iex},${iey}`,
    `A${innerRx} ${innerRy} 0 ${sweep} 0 ${isx} ${isy}`, 'Z',
  ].join(' ');
  path.setAttribute('d', d);

  // Compute bounding box for text area
  const points: [number, number][] = [[osx, osy], [oex, oey], [isx, isy], [iex, iey]];
  if (startAngle > endAngle) points.push([ext.w, ext.h / 2]);
  if ((endAngle > 180 && endAngle <= 360 && startAngle < 180) ||
      (startAngle > endAngle && endAngle >= 0 && endAngle < 180 && startAngle < 180)) {
    points.push([0, ext.h / 2]);
  }
  if ((startAngle < endAngle && startAngle < 90 && endAngle > 90) ||
      (startAngle > endAngle && endAngle > 90) ||
      (startAngle > endAngle && startAngle < 90)) {
    points.push([ext.w / 2, ext.h]);
  }
  if ((startAngle < endAngle && startAngle < 270 && endAngle > 270) ||
      (startAngle > endAngle && endAngle > 270) ||
      (startAngle > endAngle && startAngle < 270)) {
    points.push([ext.w / 2, 0]);
  }

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  points.forEach(p => {
    minX = Math.min(p[0], minX);
    minY = Math.min(p[1], minY);
    maxX = Math.max(p[0], maxX);
    maxY = Math.max(p[1], maxY);
  });

  return {
    dom: path,
    textArea: { top: minY, bottom: ext.h - maxY, left: minX, right: ext.w - maxX, w: maxX - minX, h: maxY - minY },
  };
}

export function createFoldedCorner(shapeNode: any): ShapeResult {
  const ext = shapeNode.extend;
  const bg = shapeNode.background;
  const g = createSvgNode('g');
  const adj = getAdjWidth('adj', shapeNode, 0.16667 * Math.min(ext.w, ext.h));

  const body = createSvgNode('path');
  body.setAttribute('d', [
    'M0,0', `L${ext.w},0`, `L${ext.w},${ext.h - adj}`, `L${ext.w - adj},${ext.h}`, `L0,${ext.h}`, 'Z',
  ].join(' '));

  const foldOffset = (adj * Math.cos(Math.PI / 4)) / Math.cos(Math.PI / 6) * Math.cos((75 / 180) * Math.PI);
  const fold = createSvgNode('path');
  fold.setAttribute('d', [
    `M${ext.w - adj + foldOffset}, ${ext.h - adj + foldOffset}`,
    `L${ext.w},${ext.h - adj}`, `L${ext.w - adj},${ext.h}`, 'Z',
  ].join(' '));
  if (bg?.type === 'solidFill') {
    fold.setAttribute('fill', getRenderColor(bg, { dark: 0.6 }) || 'transparent');
  }

  g.appendChild(body);
  g.appendChild(fold);
  return {
    dom: g,
    textArea: { top: 0, bottom: adj, left: 0, right: 0, w: ext.w, h: ext.h - adj },
  };
}
