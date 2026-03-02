export function detectUnit(value: number): 'emu' | 'point' {
  return Math.abs(value) > 2e4 ? 'emu' : 'point';
}

export function emu2px(emu: number): number {
  return emu / 12700;
}

export function wpsEmu2px(emu: number): number {
  return emu / 20;
}

export function pt2px(pt: number): number {
  return pt / 100;
}

export function angle(rotate: number): number {
  return rotate / 6e4;
}

export function percent(value: number): number {
  return value / 1e5;
}

export function romanUcPeriod(number: any): string {
  const level = Math.ceil(number / 26);
  const charCode = ((number % 26) || 26) - 1 + 65;
  return String.fromCharCode(charCode).repeat(level);
}

export function englishCode(number: number): string {
  const level = Math.ceil(number / 26);
  const charCode = ((number % 26) || 26) - 1 + 65;
  return String.fromCharCode(charCode).repeat(level);
}
