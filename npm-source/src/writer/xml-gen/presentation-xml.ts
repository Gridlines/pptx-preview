import { xmlDecl, tag } from '../utils/xml-builder';
import { NS } from '../templates/namespaces';
import { px2emu } from '../utils/unit-reverse';

export function generatePresentationXml(
  slideCount: number,
  slideWidth: number,
  slideHeight: number
): string {
  const sldIdLst = Array.from({ length: slideCount }, (_, i) =>
    tag('p:sldId', { id: String(256 + i), 'r:id': `rId${i + 2}` })
  ).join('');

  const sldMasterIdLst = tag(
    'p:sldMasterIdLst',
    undefined,
    tag('p:sldMasterId', { id: '2147483648', 'r:id': 'rId1' })
  );

  const sldSz = tag('p:sldSz', {
    cx: String(px2emu(slideWidth)),
    cy: String(px2emu(slideHeight)),
    type: 'custom',
  });

  const notesSz = tag('p:notesSz', {
    cx: String(px2emu(slideHeight)),
    cy: String(px2emu(slideWidth)),
  });

  return (
    xmlDecl() +
    tag(
      'p:presentation',
      {
        'xmlns:a': NS.a,
        'xmlns:r': NS.r,
        'xmlns:p': NS.p,
      },
      sldMasterIdLst + tag('p:sldIdLst', undefined, sldIdLst) + sldSz + notesSz
    )
  );
}
