import { get } from 'lodash';
import { ParagraphPropsType, RowPropsType } from '../types/text';
import Group from '../reader/Group';
import PPTX from '../reader/PPTX';
import Slide from '../reader/Slide';
import SlideLayout from '../reader/SlideLayout';
import SlideMaster from '../reader/SlideMaster';
import ShapeNode from '../reader/node/ShapeNode';
import PicNode from '../reader/node/PicNode';
import TableNode from '../reader/node/TableNode';
import DiagramNode from '../reader/node/DiagramNode';
import ChartNode from '../reader/node/ChartNode';
import GroupClass from '../reader/Group';
import { getSolidFillColor } from './color';
import { emu2px } from './unit';

export function parseParagraphPr(pPr: any): ParagraphPropsType {
  const result: ParagraphPropsType = {};
  const attrs = get(pPr, 'attrs') || {};

  Object.keys(attrs).forEach((key) => {
    switch (key) {
      case 'algn':
        result.align = attrs[key];
        break;
      case 'marL':
        result.marginLeft = emu2px(parseInt(attrs[key]));
        break;
      case 'indent':
        result.indent = emu2px(parseInt(attrs[key]));
        break;
      case 'lvl':
        result.level = attrs[key];
        break;
    }
  });

  if (get(pPr, ['a:lnSpc', 'a:spcPct', 'attrs', 'val'])) {
    result.lineHeight = parseInt(pPr['a:lnSpc']['a:spcPct'].attrs.val) / 1e5;
  }

  return result;
}

export function parseRowPr(
  rPr: any,
  theme: any,
  node?: { getColorThemeName(name: any): string }
): RowPropsType {
  const result: RowPropsType = {};
  const attrs = get(rPr, 'attrs') || {};

  Object.keys(attrs).forEach((key) => {
    switch (key) {
      case 'sz':
        result.size = parseInt(attrs[key]) / 100;
        break;
      case 'b':
        result.bold = attrs[key] === '1';
        break;
      case 'i':
        result.italic = attrs[key] === '1';
        break;
      case 'u':
        result.underline = attrs[key];
        break;
      case 'strike':
        result.strike = attrs[key];
        break;
      case 'order':
      case 'dirty':
        break;
      default:
        result[key] = attrs[key];
    }
  });

  const solidFill = get(rPr, 'a:solidFill');
  if (solidFill) result.color = getSolidFillColor(solidFill, theme, node);

  return result;
}

export async function parseAndCreateNode(
  nodes: Array<any>,
  nodesConfig: any,
  pptx: PPTX,
  ctx: Slide | SlideLayout | SlideMaster,
  group?: Group
): Promise<void> {
  const keys: string[] = [];
  for (const key in nodesConfig) keys.push(key);

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (!(key in nodesConfig)) continue;

    switch (key) {
      case 'p:sp': {
        const items = Array.isArray(nodesConfig[key]) ? nodesConfig[key] : [nodesConfig[key]];
        for (let k = 0; k < items.length; k++) {
          nodes.push(new ShapeNode(items[k], pptx, ctx, group));
        }
        break;
      }
      case 'p:pic': {
        const items = Array.isArray(nodesConfig[key]) ? nodesConfig[key] : [nodesConfig[key]];
        for (let k = 0; k < items.length; k++) {
          const item = items[k];
          const embedId = item['p:blipFill']['a:blip'].attrs['r:embed'];
          const target = ctx.rels[embedId].target;
          const picNode = new PicNode(target, item, pptx, ctx, group);
          nodes.push(picNode);
        }
        break;
      }
      case 'p:cxnSp': {
        const items = Array.isArray(nodesConfig[key]) ? nodesConfig[key] : [nodesConfig[key]];
        for (let k = 0; k < items.length; k++) {
          nodes.push(new ShapeNode(items[k], pptx, ctx, group));
        }
        break;
      }
      case 'p:graphicFrame': {
        const items = Array.isArray(nodesConfig[key]) ? nodesConfig[key] : [nodesConfig[key]];
        for (let k = 0; k < items.length; k++) {
          const item = items[k];
          const uri = get(item, ['a:graphic', 'a:graphicData', 'attrs', 'uri']);

          switch (uri) {
            case 'http://schemas.openxmlformats.org/drawingml/2006/table':
              nodes.push(new TableNode(item, pptx, ctx, group));
              break;
            case 'http://schemas.openxmlformats.org/drawingml/2006/diagram': {
              const diagramNode = new DiagramNode(item, pptx, ctx, group);
              await diagramNode.parseNode();
              nodes.push(diagramNode);
              break;
            }
            case 'http://schemas.openxmlformats.org/drawingml/2006/chart': {
              const chartNode = new ChartNode(item, pptx, ctx, group);
              await chartNode.parseNode();
              nodes.push(chartNode);
              break;
            }
          }
        }
        break;
      }
      case 'p:grpSp': {
        const items = Array.isArray(nodesConfig[key]) ? nodesConfig[key] : [nodesConfig[key]];
        for (let k = 0; k < items.length; k++) {
          nodes.push(new GroupClass(items[k], pptx, ctx, group));
        }
        break;
      }
    }
  }
}
