import TableNode from '../../reader/node/TableNode';
import { getRenderColor } from '../../utils/color';
import { _renderParagraph } from './TextRender';

export function renderTable(tableNode: TableNode): HTMLDivElement {
  const extend = tableNode.extend;
  const offset = tableNode.offset;
  const rows = tableNode.tr;
  const gridCols = tableNode.tableGrid.gridCol;

  const wrapper = document.createElement('div');
  wrapper.style.position = 'absolute';
  wrapper.style.left = offset.x + 'px';
  wrapper.style.top = offset.y + 'px';
  wrapper.style.width = extend.w + 'px';
  wrapper.style.height = extend.h + 'px';
  wrapper.style.overflow = 'hidden';

  const table = document.createElement('table');
  table.style.borderCollapse = 'collapse';
  table.style.tableLayout = 'fixed';
  table.style.width = '100%';

  rows.forEach((tr: any) => {
    const trHeight = tr.props.height;
    const trEl = document.createElement('tr');
    trEl.style.height = trHeight + 'px';

    tr.td.forEach((td: any, colIndex: number) => {
      const tdProps = td.props;
      const inheritTcStyle = td.inheritTcStyle;
      const inheritTcTxStyle = td.inheritTcTxStyle;
      const paragraphs = td.paragraphs;

      if (tdProps.vMerge || tdProps.hMerge) return;

      const tdEl = document.createElement('td');
      // Calculate width: sum of all spanned columns for merged cells
      let cellWidth = 0;
      const span = tdProps.gridSpan || 1;
      for (let ci = colIndex; ci < colIndex + span && ci < gridCols.length; ci++) {
        cellWidth += gridCols[ci]?.width || 0;
      }
      tdEl.style.width = (cellWidth || 30) + 'px';
      tdEl.style.wordBreak = 'break-word';
      tdEl.style.overflowWrap = 'break-word';
      if (tdProps.rowSpan) tdEl.setAttribute('rowspan', tdProps.rowSpan + '');
      if (tdProps.gridSpan) tdEl.setAttribute('colspan', tdProps.gridSpan + '');

      const background = tdProps.background || inheritTcStyle?.background;
      if (background) tdEl.style.background = getRenderColor(background);

      const border = { ...inheritTcStyle?.border, ...tdProps.border };
      const getBorderStyle = (type: string) => {
        if (!type) return 'solid';
        if (type.toLowerCase().includes('dash')) return 'dashed';
        if (type.toLowerCase().includes('dot')) return 'dotted';
        return 'solid';
      };

      if (border.bottom) {
        tdEl.style.borderBottom = `${border.bottom.width}px ${getBorderStyle(border.bottom.type)} ${getRenderColor(border.bottom.color)}`;
      }
      if (border.top) {
        tdEl.style.borderTop = `${border.top.width}px ${getBorderStyle(border.top.type)} ${getRenderColor(border.top.color)}`;
      }
      if (border.left) {
        tdEl.style.borderLeft = `${border.left.width}px ${getBorderStyle(border.left.type)} ${getRenderColor(border.left.color)}`;
      }
      if (border.right) {
        tdEl.style.borderRight = `${border.right.width}px ${getBorderStyle(border.right.type)} ${getRenderColor(border.right.color)}`;
      }

      if (tdProps.marT) tdEl.style.paddingTop = tdProps.marT + 'px';
      if (tdProps.marB) tdEl.style.paddingBottom = tdProps.marB + 'px';
      if (tdProps.marL) tdEl.style.paddingLeft = tdProps.marL + 'px';
      if (tdProps.marR) tdEl.style.paddingRight = tdProps.marR + 'px';

      if (tdProps.anchor === 'ctr') tdEl.style.verticalAlign = 'middle';
      else if (tdProps.anchor === 'b') tdEl.style.verticalAlign = 'bottom';

      for (let i = 0; i < paragraphs.length; i++) {
        const para = paragraphs[i];
        if (inheritTcTxStyle) {
          if (inheritTcTxStyle.bold) {
            para.rows?.forEach((row: any) => {
              if (row.props && !row.props.bold) row.props.bold = true;
            });
          }
          if (inheritTcTxStyle.color) {
            para.rows?.forEach((row: any) => {
              if (row.props && !row.props.color) row.props.color = inheritTcTxStyle.color;
            });
          }
        }
        const paraEl = _renderParagraph(para, i + 1, {
          isFirst: i === 0,
          isLast: i === paragraphs.length - 1,
          isTable: true,
        });
        tdEl.appendChild(paraEl);
      }

      trEl.appendChild(tdEl);
    });

    table.appendChild(trEl);
  });

  wrapper.appendChild(table);
  return wrapper;
}
