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

export function chineseNumber(number: number): string {
  const chinese = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const units = ['', '十', '百', '千'];
  if (number === 0) return chinese[0];
  let result = '';
  let num = number;
  let unitIndex = 0;
  while (num > 0) {
    const digit = num % 10;
    if (digit !== 0) {
      result = chinese[digit] + units[unitIndex] + result;
    }
    num = Math.floor(num / 10);
    unitIndex++;
  }
  return result;
}
