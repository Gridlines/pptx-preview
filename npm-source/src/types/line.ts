import { ColorType } from './color';

export type BorderType = {
  width?: number;
  color?: ColorType;
  type?: string;
  lineJoin?: string;
  miterLim?: number;
  headEnd?: {
    type: string;
    len: string;
    w: string;
  };
  tailEnd?: {
    type: string;
    len: string;
    w: string;
  };
};
