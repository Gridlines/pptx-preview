import PPTX from '../reader/PPTX';
interface RenderOptions {
    viewPort: {
        width: number;
        height: number;
    };
    mode: string;
}
interface RenderPort {
    width: number;
    height: number;
    left: number;
    top: number;
}
export default class HtmlRender {
    scale: number;
    wrapper: HTMLElement;
    pptx: PPTX;
    options: RenderOptions;
    renderPort: RenderPort;
    constructor(wrapper: HTMLElement, pptx: PPTX, options: RenderOptions);
    _calcScaleAndRenderPort(): void;
    renderSlide(index: number): void;
    _renderSlideMaster(slideMaster: any, container: HTMLElement): void;
    _renderSlideLayout(slideLayout: any, container: HTMLElement): void;
    _renderSlide(slide: any, container: HTMLElement): void;
    _renderNode(node: any): HTMLElement | undefined;
    _renderBackground(slide: any, container: HTMLElement): void;
}
export {};
