// Reverse of src/utils/unit.ts — converts from pixels/degrees back to OOXML units

export function px2emu(px: number): number {
  return Math.round(px * 12700);
}

export function px2pt(px: number): number {
  return Math.round(px * 100);
}

export function degrees2angle(deg: number): number {
  return Math.round(deg * 60000);
}

export function toPercent(value: number): number {
  return Math.round(value * 100000);
}

export function fontSize2hundredthPt(sizePt: number): number {
  return Math.round(sizePt * 100);
}
