import { xmlDecl, tag } from '../utils/xml-builder';
import { NS } from '../templates/namespaces';
import { SlideDefinition } from '../types/writer-types';
import { ColorType, GradFillType } from '../../types/color';
import { generateShapeXml } from './shape-xml';
import { generateTableShapeXml } from './table-xml';
import { generateImageShapeXml } from './image-xml';
import { generateColorXml } from './color-xml';

export function generateSlideXml(slide?: SlideDefinition): string {
  let bgXml = '';
  if (slide?.background && (slide.background.type === 'solidFill' || slide.background.type === 'gradFill' || slide.background.type === 'none')) {
    bgXml = generateBackgroundXml(slide.background as ColorType | GradFillType);
  }

  let spTreeContent = '';
  spTreeContent += tag('p:nvGrpSpPr', undefined,
    tag('p:cNvPr', { id: '1', name: '' }) +
    tag('p:cNvGrpSpPr') +
    tag('p:nvPr')
  );
  spTreeContent += tag('p:grpSpPr', undefined,
    tag('a:xfrm', undefined,
      tag('a:off', { x: '0', y: '0' }) +
      tag('a:ext', { cx: '0', cy: '0' }) +
      tag('a:chOff', { x: '0', y: '0' }) +
      tag('a:chExt', { cx: '0', cy: '0' })
    )
  );

  if (slide?.shapes) {
    let shapeId = 2;
    for (const shape of slide.shapes) {
      if (shape.type === 'table') {
        spTreeContent += generateTableShapeXml(shape, shapeId);
      } else if (shape.type === 'image') {
        spTreeContent += generateImageShapeXml(shape, shapeId);
      } else {
        spTreeContent += generateShapeXml(shape, shapeId);
      }
      shapeId++;
    }
  }

  const cSld = tag('p:cSld', undefined, bgXml + tag('p:spTree', undefined, spTreeContent));

  return (
    xmlDecl() +
    tag(
      'p:sld',
      {
        'xmlns:a': NS.a,
        'xmlns:r': NS.r,
        'xmlns:p': NS.p,
      },
      cSld + tag('p:clrMapOvr', undefined, tag('a:masterClrMapping'))
    )
  );
}

function generateBackgroundXml(bg: ColorType | GradFillType): string {
  let fillXml = '';

  if (bg.type === 'solidFill') {
    fillXml = tag('a:solidFill', undefined, generateColorXml(bg as ColorType));
  } else if (bg.type === 'gradFill') {
    const grad = bg as GradFillType;
    let gsListXml = '';
    if (grad.gsList) {
      gsListXml = tag('a:gsLst', undefined,
        grad.gsList.map((gs) =>
          tag('a:gs', { pos: String(Math.round(gs.pos * 1000)) },
            generateColorXml(gs.color)
          )
        ).join('')
      );
    }
    let linXml = '';
    if (grad.lin) {
      linXml = tag('a:lin', {
        ang: grad.lin.ang !== undefined ? String(Math.round(grad.lin.ang * 60000)) : undefined,
        scaled: grad.lin.scaled ? '1' : '0',
      });
    }
    fillXml = tag('a:gradFill', undefined, gsListXml + linXml);
  }

  if (!fillXml) return '';

  return tag('p:bg', undefined,
    tag('p:bgPr', undefined, fillXml + tag('a:effectLst'))
  );
}
