import { xmlDecl, tag } from '../utils/xml-builder';
import { NS } from '../templates/namespaces';

export function generateSlideLayoutXml(): string {
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

  return (
    xmlDecl() +
    tag(
      'p:sldLayout',
      {
        'xmlns:a': NS.a,
        'xmlns:r': NS.r,
        'xmlns:p': NS.p,
        type: 'blank',
      },
      cSld + tag('p:clrMapOvr', undefined, tag('a:masterClrMapping'))
    )
  );
}
