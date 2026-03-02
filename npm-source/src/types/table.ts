import { ColorType } from './color';
import { BorderType } from './line';
import { ParagraphType } from './text';

export type TableGridType = {
  gridCol: Array<{
    width: number;
  }>;
};

export type TablePropsType = {
  tableStyleId?: string;
  bandCol?: boolean;
  bandRow?: boolean;
  firstCol?: boolean;
  firstRow?: boolean;
  lastCol?: boolean;
  lastRow?: boolean;
};

export type TableStyleType = {
  fill?: ColorType;
  border?: {
    left?: BorderType;
    right?: BorderType;
    top?: BorderType;
    bottom?: BorderType;
    insideH?: BorderType;
    insideV?: BorderType;
  };
  fontColor?: ColorType;
  bold?: boolean;
  italic?: boolean;
};

export type TableTdType = {
  props: {
    marB?: number;
    marT?: number;
    marL?: number;
    marR?: number;
    anchor?: string;
    border?: {
      left?: BorderType;
      right?: BorderType;
      top?: BorderType;
      bottom?: BorderType;
    };
    background?: ColorType;
    gridSpan?: number;
    rowSpan?: number;
    vMerge?: boolean;
    hMerge?: boolean;
  };
  paragraphs: ParagraphType[];
};

export type TableTrType = {
  props: {
    height?: number;
  };
  td: TableTdType[];
};

export type TableStylesType = {
  [styleId: string]: {
    wholeTbl?: TableStyleType;
    band1H?: TableStyleType;
    band2H?: TableStyleType;
    band1V?: TableStyleType;
    band2V?: TableStyleType;
    lastCol?: TableStyleType;
    firstCol?: TableStyleType;
    lastRow?: TableStyleType;
    firstRow?: TableStyleType;
  };
};
