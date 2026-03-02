import { get } from 'lodash';
import Node from './Node';
import PPTX from '../PPTX';
import Slide from '../Slide';
import SlideLayout from '../SlideLayout';
import SlideMaster from '../SlideMaster';
import Group from '../Group';
import { xmlToJSON } from '../../utils/xml';
import { parseAndCreateNode } from '../../utils/parse';

export default class DiagramNode extends Node {
  pptx: PPTX;
  nodes: any[];

  constructor(source: any, pptx: PPTX, ctx: Slide | SlideLayout | SlideMaster, group?: Group) {
    super(source, ctx, group);
    this.nodes = [];
    this.pptx = pptx;
  }

  async parseNode(): Promise<void> {
    try {
      const dmRelId = get(this.source, [
        'a:graphic', 'a:graphicData', 'dgm:relIds', 'attrs', 'r:dm',
      ]);

      if (!dmRelId || !this.ctx.rels[dmRelId]) return;

      const dmPath = this.ctx.rels[dmRelId].target;
      const dmXml = await this.pptx.getXmlByPath(dmPath);
      const dmJson = xmlToJSON(dmXml);

      const drawingRelId = get(dmJson, [
        'dgm:dataModel', 'dgm:extLst', 'a:ext', 'dsp:dataModelExt', 'attrs', 'relId',
      ]);

      if (!drawingRelId || !this.ctx.rels[drawingRelId]) return;

      const drawingPath = this.ctx.rels[drawingRelId].target;
      let drawingXml = await this.pptx.getXmlByPath(drawingPath);
      drawingXml = drawingXml.replace(/dsp:/g, 'p:');
      const drawingJson = xmlToJSON(drawingXml);
      const spTree = get(drawingJson, ['p:drawing', 'p:spTree']);

      await parseAndCreateNode(this.nodes, spTree, this.pptx, this.ctx);
    } catch (e) {
      // silently ignore diagram parse errors
    }
  }
}
