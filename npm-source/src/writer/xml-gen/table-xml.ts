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

  const tblPr = tag('a:tblPr', { firstRow: '1', bandRow: '1' },
    tag('a:noFill')
  );

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

  const txBody = tag('a:txBody', undefined, generateTxBodyXml(paragraphs));

  let tcPrChildren = '';
  if (td.props.background && td.props.background.type === 'solidFill') {
    tcPrChildren += tag('a:solidFill', undefined, generateColorXml(td.props.background));
  }

  const borderMap: Record<string, string> = {
    left: 'a:lnL',
    right: 'a:lnR',
    top: 'a:lnT',
    bottom: 'a:lnB',
  };

  if (td.props.border) {
    for (const [side, xmlTag] of Object.entries(borderMap)) {
      const border = (td.props.border as any)[side];
      if (border) {
        const width = border.width ? Math.round(border.width * 12700) : 12700;
        let lineContent = '';
        if (border.color && border.color.type === 'solidFill') {
          lineContent += tag('a:solidFill', undefined, generateColorXml(border.color));
        }
        tcPrChildren += tag(xmlTag, { w: String(width), cap: 'flat', cmpd: 'sng', algn: 'ctr' }, lineContent || undefined);
      }
    }
  }

  const tcPrAttrs: Record<string, string | undefined> = {};
  if (td.props.marL !== undefined) tcPrAttrs.marL = String(px2emu(td.props.marL));
  if (td.props.marR !== undefined) tcPrAttrs.marR = String(px2emu(td.props.marR));
  if (td.props.marT !== undefined) tcPrAttrs.marT = String(px2emu(td.props.marT));
  if (td.props.marB !== undefined) tcPrAttrs.marB = String(px2emu(td.props.marB));
  if (td.props.anchor) tcPrAttrs.anchor = td.props.anchor;
  if (td.props.gridSpan && td.props.gridSpan > 1) tcPrAttrs.gridSpan = String(td.props.gridSpan);
  if (td.props.rowSpan && td.props.rowSpan > 1) tcPrAttrs.rowSpan = String(td.props.rowSpan);
  if (td.props.vMerge) tcPrAttrs.vMerge = '1';
  if (td.props.hMerge) tcPrAttrs.hMerge = '1';

  const tcPr = tag('a:tcPr', tcPrAttrs, tcPrChildren || undefined);

  return tag('a:tc', undefined, txBody + tcPr);
}
