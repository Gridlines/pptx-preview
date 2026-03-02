import { ParagraphType, RowPropsType } from '../../types/text';
import { ParserContext } from './element-handlers';
export type TextParserOptions = ParserContext & {
    bold?: boolean;
    italic?: boolean;
    underline?: string;
    strike?: string;
    marginLeft?: number;
};
export declare function parseTextElement(element: Element, options: TextParserOptions): ParagraphType[];
export declare function parseInlineContent(node: Node, inheritedProps: RowPropsType & {
    size?: number;
    fontFamily?: string;
}): Array<{
    text: string;
    props: RowPropsType;
    link?: string;
}>;
