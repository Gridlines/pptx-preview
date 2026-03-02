import Group from '../../reader/Group';
import PicNode from '../../reader/node/PicNode';
import ShapeNode from '../../reader/node/ShapeNode';
import { renderPic } from './pic-render';
import { renderShape } from './shape-render';

export function renderGroup(groupNode: Group): HTMLDivElement {
  const wrapper = document.createElement('div');
  const extend = groupNode.extend;
  const offset = groupNode.offset;

  wrapper.style.position = 'absolute';
  wrapper.style.left = offset.x + 'px';
  wrapper.style.top = offset.y + 'px';
  wrapper.style.width = extend.w + 'px';
  wrapper.style.height = extend.h + 'px';

  const transforms: string[] = [];
  if (groupNode.flipH) transforms.push('scaleX(-1)');
  if (groupNode.flipV) transforms.push('scaleY(-1)');
  if (groupNode.rotate) transforms.push(`rotate(${groupNode.rotate}deg)`);
  wrapper.style.transformOrigin = 'center center';
  wrapper.style.transform = transforms.join(' ');

  for (let i = 0; i < groupNode.nodes.length; i++) {
    const node = groupNode.nodes[i];
    let el: HTMLElement | undefined;
    if (node instanceof PicNode) {
      el = renderPic(node);
    } else if (node instanceof ShapeNode) {
      el = renderShape(node);
    } else if (node instanceof Group) {
      el = renderGroup(node);
    }
    if (el) wrapper.appendChild(el);
  }

  return wrapper;
}
