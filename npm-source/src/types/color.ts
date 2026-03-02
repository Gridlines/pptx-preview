export type ColorType = {
  type: 'solidFill' | 'none';
  color?: string;
  alpha?: number;
  shade?: number;
  lumMod?: number;
  lumOff?: number;
  tint?: number;
};

export type GradFillType = {
  type: 'gradFill';
  flip?: string;
  path?: string;
  rotWithShape?: boolean;
  lin?: {
    ang?: number;
    scaled?: boolean;
  };
  gsList?: Array<{
    color: ColorType;
    pos: number;
  }>;
  tileRect?: {
    l?: number;
    t?: number;
    r?: number;
    b?: number;
  };
};

export type BackgroundImageType = {
  type: 'blipFill';
  base64?: string;
  alpha?: number;
  fillRect?: {
    b?: number;
    t?: number;
    r?: number;
    l?: number;
  };
};
