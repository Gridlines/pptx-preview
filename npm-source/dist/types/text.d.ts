import { ColorType } from './color';
import { BorderType } from './line';
export type TextPropsType = {
    anchor?: string;
    rtlCol?: boolean;
    lIns?: number;
    rIns?: number;
    tIns?: number;
    bIns?: number;
    normAutofit?: {
        fontScale?: number;
        lnSpcReduction?: number;
    };
    [key: string]: any;
};
export type RowPropsType = {
    fontSize?: number;
    fontFamily?: string;
    bold?: boolean;
    italic?: boolean;
    underline?: string;
    strike?: string;
    color?: ColorType;
    highlight?: ColorType;
    border?: BorderType;
    baseline?: number;
    spacing?: number;
    solidFill?: ColorType;
    [key: string]: any;
};
export type ParagraphPropsType = {
    algn?: string;
    indent?: number;
    marL?: number;
    marR?: number;
    lvl?: number;
    spcBef?: number;
    spcAft?: number;
    lnSpc?: number;
    buNone?: boolean;
    buChar?: string;
    buAutoNum?: string;
    buFontSize?: number;
    buColor?: ColorType;
    [key: string]: any;
};
export type ParagraphType = {
    props: ParagraphPropsType;
    rows: Array<{
        text: string;
        props: RowPropsType;
        link?: string;
    }>;
    defRPr?: RowPropsType;
};
