import { NodeSourceType } from '../../types/node';
import Theme from '../Theme';
import Group from '../Group';
export default class Node {
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
    get theme(): Theme;
    constructor(source: any, ctx: any, group?: Group);
    getColorThemeName(aliseName: any): any;
    getXfrm(): any;
}
