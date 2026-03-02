import Group from '../reader/Group';
import Theme from '../reader/Theme';
export type NodeSourceType = {
    'p:nvSpPr'?: any;
    'p:spPr'?: any;
    'p:xfrm'?: any;
    'p:txBody'?: any;
    attrs?: any;
    [key: string]: any;
};
export type NodeType = {
    uuid: string;
    source: NodeSourceType;
    offset: {
        x: number;
        y: number;
    };
    extend: {
        w: number;
        h: number;
    };
    rotate: number;
    order: number;
    ctx: any;
    idx: string;
    type: string;
    userDrawn: boolean;
    flipV: boolean;
    flipH: boolean;
    group: Group;
    theme: Theme;
    getColorThemeName(aliseName: any): any;
};
