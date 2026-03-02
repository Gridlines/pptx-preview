import { ShapeDefinition } from '../types/writer-types';
import { tag } from '../utils/xml-builder';
import { px2emu } from '../utils/unit-reverse';
import { generateTxBodyXml } from './text-xml';
import { generateColorXml } from './color-xml';
import { TableGridType, TableTrType, TableTdType } from '../../types/table';

export function generateTableShapeXml(shape: ShapeDefinition, shapeId: number): string {
  if (!shape.tableGrid || !shape.tableRows) return '';

  const nvGraphicFramePr = tag('p:nvGraphicFramePr', undefined,
    tag('p:cNvPr', { id: String(shapeId), name: `Table ${shapeId}` }) +
    tag('p:cNvGraphicFramePr', undefined, tag('a:graphicFrameLocks', { noGrp: '1' })) +
    tag('p:nvPr')
  );

  const xfrm = tag('p:xfrm', undefined,
    tag('a:off', { x: String(shape.offset.x), y: String(shape.offset.y) }) +
    tag('a:ext', { cx: String(shape.extend.cx), cy: String(shape.extend.cy) })
  );

  const tblGrid = tag('a:tblGrid', undefined,
    shape.tableGrid.gridCol
      .map((col) => tag('a:gridCol', { w: String(px2emu(col.width)) }))
      .join('')
  );

  // Match the original: plain <a:tblPr/> without banding/style attributes
  const tblPr = tag('a:tblPr');

  const rows = shape.tableRows.map((tr) => generateTableRowXml(tr)).join('');

  const tbl = tag('a:tbl', undefined, tblPr + tblGrid + rows);

  const graphic = tag('a:graphic', undefined,
    tag('a:graphicData', { uri: 'http://schemas.openxmlformats.org/drawingml/2006/table' }, tbl)
  );

  return tag('p:graphicFrame', undefined, nvGraphicFramePr + xfrm + graphic);
}

function generateTableRowXml(tr: TableTrType): string {
  const height = tr.props.height ? px2emu(tr.props.height) : 370840;
  const cells = tr.td.map((td) => generateTableCellXml(td)).join('');
  return tag('a:tr', { h: String(height) }, cells);
}

function generateTableCellXml(td: TableTdType): string {
  const paragraphs = td.paragraphs && td.paragraphs.length > 0
    ? td.paragraphs
    : [{ props: {}, rows: [{ text: '', props: {} }] }];

  // Table cells use plain <a:bodyPr/> without wrap/rtlCol attributes
  const txBody = tag('a:txBody', undefined, generateTxBodyXml(paragraphs, {}));

  // OOXML schema order for <a:tcPr> children:
  //   1. lnL, lnR, lnT, lnB  (border lines — always emit all four)
  //   2. fill (solidFill / noFill)
  let tcPrChildren = '';

  // --- Borders (always emit all 4 in order: L, R, T, B) ---
  const borderSides: Array<{ key: string; xmlTag: string }> = [
    { key: 'left', xmlTag: 'a:lnL' },
    { key: 'right', xmlTag: 'a:lnR' },
    { key: 'top', xmlTag: 'a:lnT' },
    { key: 'bottom', xmlTag: 'a:lnB' },
  ];

  for (const { key, xmlTag } of borderSides) {
    const border = td.props.border ? (td.props.border as any)[key] : undefined;
    if (border && border.width > 0) {
      const width = Math.round(border.width * 12700);
      let lineContent = '';
      if (border.color && border.color.type === 'solidFill') {
        lineContent += tag('a:solidFill', undefined, generateColorXml(border.color));
      }
      lineContent += tag('a:prstDash', { val: 'solid' });
      tcPrChildren += tag(xmlTag, { w: String(width), cap: 'flat', cmpd: 'sng', algn: 'ctr' }, lineContent);
    } else {
      // No border on this side → emit <a:lnX><a:noFill/></a:lnX>
      tcPrChildren += tag(xmlTag, undefined, tag('a:noFill'));
    }
  }

  // --- Fill (AFTER borders per schema) ---
  if (td.props.background && td.props.background.type === 'solidFill') {
    tcPrChildren += tag('a:solidFill', undefined, generateColorXml(td.props.background));
  } else {
    tcPrChildren += tag('a:noFill');
  }

  const tcPrAttrs: Record<string, string | undefined> = {
    marL: String(td.props.marL !== undefined ? px2emu(td.props.marL) : 0),
    marR: String(td.props.marR !== undefined ? px2emu(td.props.marR) : 0),
    marT: String(td.props.marT !== undefined ? px2emu(td.props.marT) : 0),
    marB: String(td.props.marB !== undefined ? px2emu(td.props.marB) : 0),
  };
  if (td.props.anchor) tcPrAttrs.anchor = td.props.anchor;

  const tcPr = tag('a:tcPr', tcPrAttrs, tcPrChildren);

  // gridSpan, rowSpan, vMerge, hMerge are attributes of <a:tc>
  const tcAttrs: Record<string, string | undefined> = {};
  if (td.props.gridSpan && td.props.gridSpan > 1) tcAttrs.gridSpan = String(td.props.gridSpan);
  if (td.props.rowSpan && td.props.rowSpan > 1) tcAttrs.rowSpan = String(td.props.rowSpan);
  if (td.props.vMerge) tcAttrs.vMerge = '1';
  if (td.props.hMerge) tcAttrs.hMerge = '1';

  return tag('a:tc', tcAttrs, txBody + tcPr);
}
