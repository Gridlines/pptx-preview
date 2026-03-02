import { ShapeDefinition } from '../types/writer-types';
export type ParserContext = {
    defaultFontFamily: string;
    defaultFontSize: number;
};
export declare function handleElement(element: Element, ctx: ParserContext): ShapeDefinition | ShapeDefinition[] | null;
