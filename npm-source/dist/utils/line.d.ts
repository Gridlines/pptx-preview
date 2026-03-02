import Theme from '../reader/Theme';
import { BorderType } from '../types/line';
export declare function parseLine(line: any, theme: Theme, node?: {
    getColorThemeName(name: any): string;
}): BorderType;
