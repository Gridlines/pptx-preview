import { SlideInput, WriterOptions } from './types/writer-types';
export { setJSDOM } from './parser/html-parser';
export type { SlideInput, WriterOptions, SlideDefinition, ShapeDefinition } from './types/writer-types';
export declare function createPptx(slides: SlideInput[], options?: WriterOptions): Promise<ArrayBuffer>;
