import { SlideDefinition, WriterOptions } from '../types/writer-types';
export declare function parseSlideHtml(html: string, options?: WriterOptions): SlideDefinition;
/**
 * Allow callers (or Node.js bootstrap) to inject a JSDOM constructor
 * so the parser works in Node.js without browser DOMParser.
 */
export declare function setJSDOM(ctor: any): void;
