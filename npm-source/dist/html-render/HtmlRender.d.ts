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
    _renderSlideMaster(slideMaster: any, container: HTMLElement, slideNumber?: number, overrides?: Set<string>): void;
    _renderSlideLayout(slideLayout: any, container: HTMLElement, slideNumber?: number, overrides?: Set<string>): void;
    _renderSlide(slide: any, container: HTMLElement, slideNumber?: number): void;
    _renderNode(node: any, slideNumber?: number): HTMLElement | undefined;
    /**
     * Determines if a node from a slide master or layout should be rendered.
     * Include: userDrawn shapes, non-placeholder shapes, and informational placeholders (sldNum, ftr, dt).
     * Exclude: content placeholders (title, body, etc.) that are empty layout templates.
     */
    _shouldRenderMasterNode(n: any): boolean;
    /** Collect placeholder keys (type or idx) from a node list. */
    _collectPlaceholderKeys(nodes: any[]): Set<string>;
    /** Check if a placeholder node is overridden by a higher layer. */
    _isOverridden(n: any, overrides?: Set<string>): boolean;
    _renderBackground(slide: any, container: HTMLElement): void;
}
export {};
