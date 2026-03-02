import { ShapeDefinition } from '../types/writer-types';
import { px2emu } from '../utils/unit-reverse';

const MARGIN_X = 50; // px
const MARGIN_Y = 50; // px
const SHAPE_GAP = 10; // px

export function calculateLayout(
  shapes: ShapeDefinition[],
  slideWidth: number,
  slideHeight: number
): void {
  const contentWidth = slideWidth - 2 * MARGIN_X;
  let currentY = MARGIN_Y;

  for (const shape of shapes) {
    // Explicit coordinates extracted from rendered HTML should never be relaid out.
    if (shape.layoutLocked) continue;

    // If the shape already has non-zero position, skip it
    if (shape.offset.x !== 0 || shape.offset.y !== 0) continue;

    shape.offset.x = px2emu(MARGIN_X);
    shape.offset.y = px2emu(currentY);

    if (shape.extend.cx === 0) {
      shape.extend.cx = px2emu(contentWidth);
    }

    if (shape.extend.cy === 0) {
      shape.extend.cy = estimateShapeHeight(shape);
    }

    currentY += Math.round(shape.extend.cy / 12700) + SHAPE_GAP;
  }
}

function estimateShapeHeight(shape: ShapeDefinition): number {
  if (shape.type === 'table') {
    // Table height is calculated from row data
    if (shape.tableRows) {
      const totalHeight = shape.tableRows.reduce(
        (sum, tr) => sum + (tr.props.height || 29), 0
      );
      return px2emu(totalHeight);
    }
    return px2emu(200);
  }

  if (shape.type === 'image') {
    return shape.extend.cy || px2emu(300);
  }

  if (shape.paragraphs) {
    let lineCount = 0;
    let maxFontSize = 18;

    for (const para of shape.paragraphs) {
      lineCount++;
      for (const row of para.rows) {
        const size = (row.props as any).size || (row.props as any).fontSize || 18;
        if (size > maxFontSize) maxFontSize = size;
      }
    }

    const lineHeight = maxFontSize * 1.5;
    const height = Math.max(lineCount * lineHeight + 16, 30);
    return px2emu(height);
  }

  return px2emu(40);
}
