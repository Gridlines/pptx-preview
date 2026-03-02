import PPTX from '../reader/PPTX';
import HtmlRender from '../html-render/HtmlRender';
import { PreviewerOptionsType } from './type';
export default class PPTXPreviewer {
    currentIndex: number;
    dom: HTMLElement;
    options: PreviewerOptionsType;
    wrapper: HTMLElement;
    pptx?: PPTX;
    htmlRender: HtmlRender;
    constructor(dom: HTMLElement, options: PreviewerOptionsType);
    get slideCount(): number;
    _renderWrapper(): void;
    renderNextButton(): HTMLDivElement;
    renderPreButton(): HTMLDivElement;
    updatePagination(): void;
    renderPagination(container: HTMLElement): void;
    removeCurrentSlide(): void;
    renderNextSlide(): void;
    renderPreSlide(): void;
    _addPre(container: HTMLElement): void;
    preview(data: ArrayBuffer): Promise<PPTX>;
    load(data: ArrayBuffer): Promise<PPTX>;
    renderSingleSlide(index: number): void;
    destroy(): void;
}
