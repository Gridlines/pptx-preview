import { BorderType } from '../types/line';

export function getStrokeDasharray(border: BorderType): string {
  if (!border || !border.type) return '';

  switch (border.type) {
    case 'dash':
      return '4 3';
    case 'dashDot':
      return '4 3 1 3';
    case 'dot':
      return '1 3';
    case 'lgDash':
      return '8 3';
    case 'lgDashDot':
      return '8 3 1 3';
    case 'lgDashDotDot':
      return '8 3 1 3 1 3';
    case 'sysDash':
      return '3 1';
    case 'sysDashDot':
      return '3 1 1 1';
    case 'sysDashDotDot':
      return '3 1 1 1 1 1';
    case 'sysDot':
      return '1 1';
    default:
      return '';
  }
}
