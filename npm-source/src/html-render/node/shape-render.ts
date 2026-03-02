import ShapeNode from '../../reader/node/ShapeNode';
import { createSvgNode, TextArea } from './shape-rander/shape-common';
import { applyEndMarkers } from './shape-rander/marker';
import { getRenderColor } from '../../utils/color';
import { renderTextBody } from './TextRender';
import { ShapeResult } from './shape-rander/base-shape';

// Import rect shapes
import {
  createRect,
  createRoundRect,
  createRound1Rect,
  createRound2SameRect,
  createRound2DiagRect,
  createSnip1Rect,
  createSnip2SameRect,
  createSnip2DiagRect,
  createSnipRoundRect,
} from './shape-rander/rect';

// Import line shapes
import {
  createLine,
  createStraightConnector1,
  createBentConnector3,
  createCurvedConnector3,
} from './shape-rander/line';

// Import arrow shapes
import {
  createRightArrow,
  createLeftArrow,
  createUpArrow,
  createDownArrow,
  createLeftRightArrow,
  createUpDownArrow,
  createQuadArrow,
  createLeftRightUpArrow,
  createBentArrow,
  createUturnArrow,
  createLeftUpArrow,
  createBentUpArrow,
  createCurvedRightArrow,
  createCurvedLeftArrow,
  createCurvedUpArrow,
  createCurvedDownArrow,
  createStripedRightArrow,
  createNotchedRightArrow,
  createHomePlate,
  createChevron,
  createRightArrowCallout,
  createLeftArrowCallout,
  createUpArrowCallout,
  createDownArrowCallout,
  createLeftRightArrowCallout,
  createQuadArrowCallout,
} from './shape-rander/arrow';

// Import base shapes
import {
  createCustomGeom,
  createTriangle,
  createRtTriangle,
  createEllipse,
  createParallelogram,
  createTrapezoid,
  createDiamond,
  createPentagon,
  createHexagon,
  createHeptagon,
  createOctagon,
  createDecagon,
  createDodecagon,
  createPie,
  createArc,
  createChord,
  createTeardrop,
  createBracketPair,
  createBracePair,
  createFrame,
  createHalfFrame,
  createCorner,
  createDiagStripe,
  createPlus,
  createPlaque,
  createCan,
  createCube,
  createBevel,
  createDonut,
  createNoSmoking,
  createBlockArc,
  createFoldedCorner,
} from './shape-rander/base-shape';

const SVG_NS = 'http://www.w3.org/2000/svg';

function applyBlipFill(shapeNode: ShapeNode, svg: SVGElement, shapeDom: SVGElement): void {
  const bg = (shapeNode.background || {}) as any;
  const ext = shapeNode.extend;
  const { base64, alpha, fillRect = {} } = bg;
  const { b = 0, t: top = 0, l = 0, r = 0 } = fillRect;
  const defs = createSvgNode('defs');
  const pattern = createSvgNode('pattern');
  pattern.setAttribute('id', 'background_' + shapeNode.uuid);
  pattern.setAttribute('patternUnits', 'userSpaceOnUse');
  pattern.setAttribute('width', ext.w + '');
  pattern.setAttribute('height', ext.h + '');
  const image = createSvgNode('image');
  image.setAttribute('href', base64);
  image.setAttribute('preserveAspectRatio', 'none');
  const imgX = ext.w * l;
  const imgY = ext.h * top;
  const imgW = ext.w * (1 - l - r);
  const imgH = ext.h * (1 - top - b);
  image.setAttribute('width', imgW + '');
  image.setAttribute('height', imgH + '');
  image.setAttribute('x', imgX + '');
  image.setAttribute('y', imgY + '');
  if (typeof alpha === 'number') image.setAttribute('opacity', alpha + '');
  pattern.appendChild(image);
  defs.appendChild(pattern);
  svg.appendChild(defs);
  shapeDom.setAttribute('fill', `url(#background_${shapeNode.uuid})`);
}

function applyGradFill(shapeNode: ShapeNode, svg: SVGElement, shapeDom: SVGElement): void {
  const bg = (shapeNode.background || {}) as any;
  const { gsList, lin, path: gradPath, tileRect = {} } = bg;
  const defs = createSvgNode('defs');
  const gradEl = createSvgNode(gradPath === 'circle' ? 'radialGradient' : 'linearGradient');
  gradEl.setAttribute('id', 'background_grad_fill_' + shapeNode.uuid);
  const stops = (gsList || []).slice().sort((a: any, b: any) => a.pos - b.pos);
  stops.forEach((s: any) => {
    const stop = createSvgNode('stop');
    stop.setAttribute('offset', `${100 * s.pos}%`);
    stop.setAttribute('stop-color', getRenderColor(s.color));
    gradEl.appendChild(stop);
  });
  if (gradPath === 'circle') {
    const { r: tr, l: tl, t: tt, b: tb } = tileRect;
    if (tr === -1) gradEl.setAttribute('cx', '100%');
    else if (tl === -1) gradEl.setAttribute('cx', '0%');
    if (tt === -1) gradEl.setAttribute('cy', '0%');
    else if (tb === -1) gradEl.setAttribute('cy', '100%');
  } else if (lin?.ang) {
    gradEl.setAttribute('gradientTransform', `rotate(${lin.ang})`);
  }
  defs.appendChild(gradEl);
  svg.appendChild(defs);
  shapeDom.setAttribute('fill', `url(#background_grad_fill_${shapeNode.uuid})`);
}

function getStrokeDasharray(border: any): string {
  if (!border || !border.type || border.type === 'solid') return '';
  const patterns: Record<string, number[]> = {
    sysDot: [1, 1],
    sysDash: [3, 1],
    dash: [4, 3],
    dashDot: [4, 3, 1, 3],
    lgDash: [8, 3],
    lgDashDot: [8, 3, 1, 3],
    lgDashDotDot: [8, 3, 1, 3, 1, 3],
  };
  return (patterns[border.type] || []).map((v: number) => v * border.width).join(',');
}

export function renderShape(shapeNode: ShapeNode): HTMLDivElement {
  const ext = shapeNode.extend;
  const offset = shapeNode.offset;
  const border = shapeNode.border;
  const background = shapeNode.background as any;
  const rotate = shapeNode.rotate;
  const flipH = shapeNode.flipH;
  const flipV = shapeNode.flipV;

  const wrapper = document.createElement('div');
  wrapper.className = `shape-wrapper shape-${shapeNode.shape}`;
  wrapper.style.setProperty('position', 'absolute');
  wrapper.style.setProperty('width', (ext.w || 1) + 'px');
  wrapper.style.setProperty('height', (ext.h || 1) + 'px');
  wrapper.style.setProperty('left', offset.x + 'px');
  wrapper.style.setProperty('top', offset.y + 'px');

  let shapeDom: SVGElement | undefined;
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.style.setProperty('position', 'absolute');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.style.setProperty('left', '0');
  svg.style.setProperty('top', '0');
  svg.style.overflow = 'visible';

  let textArea: TextArea = { left: 0, top: 0, bottom: 0, right: 0, w: ext.w, h: ext.h };
  let hasFill = true;

  let result: ShapeResult | undefined;

  switch (shapeNode.shape) {
    case 'customGeom':
      result = createCustomGeom(shapeNode);
      applyEndMarkers(shapeNode, svg, result.dom);
      break;
    case 'flowChartProcess':
    case 'rect':
      result = { dom: createRect(shapeNode) };
      break;
    case 'snip1Rect':
      result = { dom: createSnip1Rect(shapeNode) };
      break;
    case 'snip2SameRect':
      result = { dom: createSnip2SameRect(shapeNode) };
      break;
    case 'snip2DiagRect':
      result = { dom: createSnip2DiagRect(shapeNode) };
      break;
    case 'snipRoundRect':
      result = { dom: createSnipRoundRect(shapeNode) };
      break;
    case 'roundRect':
      result = { dom: createRoundRect(shapeNode) };
      break;
    case 'round1Rect':
      result = { dom: createRound1Rect(shapeNode) };
      break;
    case 'round2SameRect':
      result = { dom: createRound2SameRect(shapeNode) };
      break;
    case 'round2DiagRect':
      result = { dom: createRound2DiagRect(shapeNode) };
      break;
    case 'triangle':
      result = createTriangle(shapeNode);
      break;
    case 'rtTriangle':
      result = createRtTriangle(shapeNode);
      break;
    case 'ellipse':
      result = createEllipse(shapeNode);
      break;
    case 'line': {
      const lineDom = createLine(shapeNode);
      applyEndMarkers(shapeNode, svg, lineDom);
      hasFill = false;
      result = { dom: lineDom, hasFill: false };
      break;
    }
    case 'straightConnector1': {
      const sc1Dom = createStraightConnector1(shapeNode);
      applyEndMarkers(shapeNode, svg, sc1Dom);
      hasFill = false;
      result = { dom: sc1Dom, hasFill: false };
      break;
    }
    case 'bentConnector3': {
      const bc3Dom = createBentConnector3(shapeNode);
      applyEndMarkers(shapeNode, svg, bc3Dom);
      hasFill = false;
      result = { dom: bc3Dom, hasFill: false };
      break;
    }
    case 'curvedConnector3': {
      const cc3Dom = createCurvedConnector3(shapeNode);
      applyEndMarkers(shapeNode, svg, cc3Dom);
      hasFill = false;
      result = { dom: cc3Dom, hasFill: false };
      break;
    }
    case 'parallelogram':
      result = createParallelogram(shapeNode);
      break;
    case 'trapezoid':
      result = createTrapezoid(shapeNode);
      break;
    case 'diamond':
      result = createDiamond(shapeNode);
      break;
    case 'pentagon':
      result = createPentagon(shapeNode);
      break;
    case 'hexagon':
      result = createHexagon(shapeNode);
      break;
    case 'heptagon':
      result = createHeptagon(shapeNode);
      break;
    case 'octagon':
      result = createOctagon(shapeNode);
      break;
    case 'decagon':
      result = createDecagon(shapeNode);
      break;
    case 'dodecagon':
      result = createDodecagon(shapeNode);
      break;
    case 'pie':
      result = createPie(shapeNode);
      break;
    case 'arc':
      result = createArc(shapeNode);
      break;
    case 'bracketPair':
      result = createBracketPair(shapeNode);
      break;
    case 'bracePair':
      result = createBracePair(shapeNode);
      break;
    case 'chord':
      result = createChord(shapeNode);
      break;
    case 'teardrop':
      result = createTeardrop(shapeNode);
      break;
    case 'frame':
      result = createFrame(shapeNode);
      break;
    case 'halfFrame':
      result = createHalfFrame(shapeNode);
      break;
    case 'corner':
      result = createCorner(shapeNode);
      break;
    case 'diagStripe':
      result = createDiagStripe(shapeNode);
      break;
    case 'plus':
      result = createPlus(shapeNode);
      break;
    case 'plaque':
      result = createPlaque(shapeNode);
      break;
    case 'can':
      result = createCan(shapeNode);
      break;
    case 'cube':
      result = createCube(shapeNode);
      break;
    case 'bevel':
      result = createBevel(shapeNode);
      break;
    case 'donut':
      result = createDonut(shapeNode);
      break;
    case 'noSmoking':
      result = createNoSmoking(shapeNode);
      break;
    case 'rightArrow':
      result = createRightArrow(shapeNode);
      break;
    case 'leftArrow':
      result = createLeftArrow(shapeNode);
      break;
    case 'upArrow':
      result = createUpArrow(shapeNode);
      break;
    case 'downArrow':
      result = createDownArrow(shapeNode);
      break;
    case 'leftRightArrow':
      result = createLeftRightArrow(shapeNode);
      break;
    case 'upDownArrow':
      result = createUpDownArrow(shapeNode);
      break;
    case 'quadArrow':
      result = createQuadArrow(shapeNode);
      break;
    case 'leftRightUpArrow':
      result = createLeftRightUpArrow(shapeNode);
      break;
    case 'bentArrow':
      result = createBentArrow(shapeNode);
      break;
    case 'uturnArrow':
      result = createUturnArrow(shapeNode);
      break;
    case 'leftUpArrow':
      result = createLeftUpArrow(shapeNode);
      break;
    case 'bentUpArrow':
      result = createBentUpArrow(shapeNode);
      break;
    case 'curvedRightArrow':
      result = createCurvedRightArrow(shapeNode);
      break;
    case 'curvedLeftArrow':
      result = createCurvedLeftArrow(shapeNode);
      break;
    case 'curvedUpArrow':
      result = createCurvedUpArrow(shapeNode);
      break;
    case 'curvedDownArrow':
      result = createCurvedDownArrow(shapeNode);
      break;
    case 'stripedRightArrow':
      result = createStripedRightArrow(shapeNode);
      break;
    case 'notchedRightArrow':
      result = createNotchedRightArrow(shapeNode);
      break;
    case 'homePlate':
      result = createHomePlate(shapeNode);
      break;
    case 'chevron':
      result = createChevron(shapeNode);
      break;
    case 'blockArc':
      result = createBlockArc(shapeNode);
      break;
    case 'foldedCorner':
      result = createFoldedCorner(shapeNode);
      break;
    case 'rightArrowCallout':
      result = createRightArrowCallout(shapeNode);
      break;
    case 'leftArrowCallout':
      result = createLeftArrowCallout(shapeNode);
      break;
    case 'upArrowCallout':
      result = createUpArrowCallout(shapeNode);
      break;
    case 'downArrowCallout':
      result = createDownArrowCallout(shapeNode);
      break;
    case 'leftRightArrowCallout':
      result = createLeftRightArrowCallout(shapeNode);
      break;
    case 'quadArrowCallout':
      result = createQuadArrowCallout(shapeNode);
      break;
  }

  if (result) {
    shapeDom = result.dom;
    if (result.textArea) textArea = result.textArea;
    if (result.hasFill === false) hasFill = false;
  }

  if (shapeDom) {
    // Apply fill
    if (hasFill) {
      if (background && background.type === 'blipFill') {
        applyBlipFill(shapeNode, svg, shapeDom);
      } else if (background && background.type === 'gradFill') {
        applyGradFill(shapeNode, svg, shapeDom);
      } else {
        const fillColor = getRenderColor(background);
        shapeDom.setAttribute('fill', fillColor || 'transparent');
      }
    } else {
      shapeDom.setAttribute('fill', 'transparent');
    }

    // Apply stroke
    if (border.width) {
      shapeDom.setAttribute('stroke-width', border.width + '');
      shapeDom.setAttribute('stroke', getRenderColor(border.color) || 'transparent');
    } else {
      shapeDom.setAttribute('stroke-width', '0');
    }

    // Apply stroke-dasharray
    const dasharray = getStrokeDasharray(border);
    if (dasharray) {
      shapeDom.setAttribute('stroke-dasharray', dasharray);
    }

    // Apply stroke-linecap
    if (border.width) {
      let linecap = 'square';
      switch ((border as any).cap) {
        case 'sq':
          linecap = 'square';
          break;
        case 'rnd':
          linecap = 'round';
          break;
        case 'flat':
          linecap = 'butt';
          break;
        default:
          linecap = 'square';
          break;
      }
      shapeDom.setAttribute('stroke-linecap', linecap);
    }

    // Apply stroke-linejoin
    const lineJoin = border.lineJoin || 'round';
    shapeDom.setAttribute('stroke-linejoin', lineJoin);
    if (lineJoin === 'miter' && border.miterLim) {
      shapeDom.setAttribute('stroke-miterlimit', border.miterLim + '');
    }

    svg.appendChild(shapeDom);
  }

  // Apply flip transforms to svg
  const transforms: string[] = [];
  if (flipH) transforms.push('scaleX(-1)');
  if (flipV) transforms.push('scaleY(-1)');
  if (transforms.length > 0) {
    svg.style.transform = transforms.join(' ');
  }

  wrapper.appendChild(svg);

  // Render text body
  const renderArea = { left: textArea.left, top: textArea.top, right: textArea.right || 0, bottom: textArea.bottom, w: textArea.w, h: textArea.h };
  const textEl = renderTextBody(shapeNode.textBody, renderArea, shapeNode.isTextBox);
  if (textEl) wrapper.appendChild(textEl);

  // Apply rotation
  if (rotate) {
    wrapper.style.transform = `rotate(${rotate}deg)`;
  }

  return wrapper;
}
