import { xmlDecl, tag } from '../utils/xml-builder';
import { NS } from '../templates/namespaces';

export function generateSlideMasterXml(layoutRIds: string[]): string {
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

  const cSld = tag('p:cSld', undefined, tag('p:spTree', undefined, spTreeContent));

  const clrMap = tag('p:clrMap', {
    bg1: 'lt1', tx1: 'dk1', bg2: 'lt2', tx2: 'dk2',
    accent1: 'accent1', accent2: 'accent2', accent3: 'accent3',
    accent4: 'accent4', accent5: 'accent5', accent6: 'accent6',
    hlink: 'hlink', folHlink: 'folHlink',
  });

  const sldLayoutIdLst = tag('p:sldLayoutIdLst', undefined,
    layoutRIds.map((rId, i) =>
      tag('p:sldLayoutId', { id: String(2147483649 + i), 'r:id': rId })
    ).join('')
  );

  return (
    xmlDecl() +
    tag(
      'p:sldMaster',
      {
        'xmlns:a': NS.a,
        'xmlns:r': NS.r,
        'xmlns:p': NS.p,
      },
      cSld + clrMap + sldLayoutIdLst
    )
  );
}
