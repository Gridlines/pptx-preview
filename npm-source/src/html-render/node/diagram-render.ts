import DiagramNode from '../../reader/node/DiagramNode';
import PicNode from '../../reader/node/PicNode';
import ShapeNode from '../../reader/node/ShapeNode';
import { renderPic } from './pic-render';
import { renderShape } from './shape-render';

export function renderDiagram(diagramNode: DiagramNode): HTMLDivElement {
  const wrapper = document.createElement('div');
  const extend = diagramNode.extend;
  const offset = diagramNode.offset;
  const flipV = diagramNode.flipV;
  const flipH = diagramNode.flipH;
  const rotate = diagramNode.rotate;

  wrapper.className = 'smart-chart-diagram';
  wrapper.style.position = 'absolute';
  wrapper.style.left = offset.x + 'px';
  wrapper.style.top = offset.y + 'px';
  wrapper.style.width = extend.w + 'px';
  wrapper.style.height = extend.h + 'px';

  const transforms: string[] = [];
  if (flipH) transforms.push('scaleX(-1)');
  if (flipV) transforms.push('scaleY(-1)');
  if (rotate) transforms.push(`rotate(${rotate}deg)`);
  wrapper.style.transformOrigin = 'center center';
  wrapper.style.transform = transforms.join(' ');

  for (let i = 0; i < diagramNode.nodes.length; i++) {
    const node = diagramNode.nodes[i];
    let el: HTMLElement | undefined;
    if (node instanceof PicNode) {
      el = renderPic(node);
    } else if (node instanceof ShapeNode) {
      el = renderShape(node);
    }
    if (el) wrapper.appendChild(el);
  }

  return wrapper;
}
