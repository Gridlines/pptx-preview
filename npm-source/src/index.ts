import PPTXPreviewer from './previewer/PPTXPreviewer';
import { PreviewerOptionsType } from './previewer/type';

export function init(dom: HTMLElement, options: PreviewerOptionsType): PPTXPreviewer {
  return new PPTXPreviewer(dom, options);
}

export { PPTXPreviewer };
export type { PreviewerOptionsType };
