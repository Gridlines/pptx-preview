import { ParagraphType } from '../../types/text';
import { ColorType, GradFillType, BackgroundImageType } from '../../types/color';
import { TableGridType, TableTrType } from '../../types/table';

export type SlideInput = {
  html: string;
  background?: ColorType | GradFillType;
};

export type ShapeDefinition = {
  type: 'textbox' | 'rectangle' | 'ellipse' | 'image' | 'table';
  offset: { x: number; y: number };
  extend: { cx: number; cy: number };
  rotate?: number;
  paragraphs?: ParagraphType[];
  background?: ColorType | GradFillType;
  tableGrid?: TableGridType;
  tableRows?: TableTrType[];
  imageData?: { base64: string; mimeType: string };
  imageRId?: string;
};

export type SlideDefinition = {
  shapes: ShapeDefinition[];
  background?: ColorType | GradFillType | BackgroundImageType;
};

export type WriterOptions = {
  slideWidth?: number;
  slideHeight?: number;
  defaultFontFamily?: string;
  defaultFontSize?: number;
};

export type MediaEntry = {
  path: string;
  data: Uint8Array;
  mimeType: string;
};

export type RelationshipEntry = {
  rId: string;
  type: string;
  target: string;
  targetMode?: string;
};
