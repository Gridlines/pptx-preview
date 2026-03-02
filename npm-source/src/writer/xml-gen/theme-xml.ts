import { xmlDecl, tag } from '../utils/xml-builder';
import { NS } from '../templates/namespaces';

export function generateThemeXml(): string {
  const clrScheme = tag('a:clrScheme', { name: 'Office' },
    tag('a:dk1', undefined, tag('a:sysClr', { val: 'windowText', lastClr: '000000' })) +
    tag('a:lt1', undefined, tag('a:sysClr', { val: 'window', lastClr: 'FFFFFF' })) +
    tag('a:dk2', undefined, tag('a:srgbClr', { val: '44546A' })) +
    tag('a:lt2', undefined, tag('a:srgbClr', { val: 'E7E6E6' })) +
    tag('a:accent1', undefined, tag('a:srgbClr', { val: '4472C4' })) +
    tag('a:accent2', undefined, tag('a:srgbClr', { val: 'ED7D31' })) +
    tag('a:accent3', undefined, tag('a:srgbClr', { val: 'A5A5A5' })) +
    tag('a:accent4', undefined, tag('a:srgbClr', { val: 'FFC000' })) +
    tag('a:accent5', undefined, tag('a:srgbClr', { val: '5B9BD5' })) +
    tag('a:accent6', undefined, tag('a:srgbClr', { val: '70AD47' })) +
    tag('a:hlink', undefined, tag('a:srgbClr', { val: '0563C1' })) +
    tag('a:folHlink', undefined, tag('a:srgbClr', { val: '954F72' }))
  );

  const fontScheme = tag('a:fontScheme', { name: 'Office' },
    tag('a:majorFont', undefined,
      tag('a:latin', { typeface: 'Calibri Light' }) +
      tag('a:ea', { typeface: '' }) +
      tag('a:cs', { typeface: '' })
    ) +
    tag('a:minorFont', undefined,
      tag('a:latin', { typeface: 'Calibri' }) +
      tag('a:ea', { typeface: '' }) +
      tag('a:cs', { typeface: '' })
    )
  );

  const fmtScheme = tag('a:fmtScheme', { name: 'Office' },
    tag('a:fillStyleLst', undefined,
      tag('a:solidFill', undefined, tag('a:schemeClr', { val: 'phClr' })) +
      tag('a:gradFill', { rotWithShape: '1' }, tag('a:gsLst', undefined,
        tag('a:gs', { pos: '0' }, tag('a:schemeClr', { val: 'phClr' })) +
        tag('a:gs', { pos: '100000' }, tag('a:schemeClr', { val: 'phClr' }))
      ) + tag('a:lin', { ang: '5400000', scaled: '0' })) +
      tag('a:gradFill', { rotWithShape: '1' }, tag('a:gsLst', undefined,
        tag('a:gs', { pos: '0' }, tag('a:schemeClr', { val: 'phClr' })) +
        tag('a:gs', { pos: '100000' }, tag('a:schemeClr', { val: 'phClr' }))
      ) + tag('a:lin', { ang: '5400000', scaled: '0' }))
    ) +
    tag('a:lnStyleLst', undefined,
      tag('a:ln', { w: '6350', cap: 'flat', cmpd: 'sng', algn: 'ctr' },
        tag('a:solidFill', undefined, tag('a:schemeClr', { val: 'phClr' })) +
        tag('a:prstDash', { val: 'solid' }) + tag('a:miter', { lim: '800000' })
      ) +
      tag('a:ln', { w: '12700', cap: 'flat', cmpd: 'sng', algn: 'ctr' },
        tag('a:solidFill', undefined, tag('a:schemeClr', { val: 'phClr' })) +
        tag('a:prstDash', { val: 'solid' }) + tag('a:miter', { lim: '800000' })
      ) +
      tag('a:ln', { w: '19050', cap: 'flat', cmpd: 'sng', algn: 'ctr' },
        tag('a:solidFill', undefined, tag('a:schemeClr', { val: 'phClr' })) +
        tag('a:prstDash', { val: 'solid' }) + tag('a:miter', { lim: '800000' })
      )
    ) +
    tag('a:effectStyleLst', undefined,
      tag('a:effectStyle', undefined, tag('a:effectLst')) +
      tag('a:effectStyle', undefined, tag('a:effectLst')) +
      tag('a:effectStyle', undefined, tag('a:effectLst'))
    ) +
    tag('a:bgFillStyleLst', undefined,
      tag('a:solidFill', undefined, tag('a:schemeClr', { val: 'phClr' })) +
      tag('a:solidFill', undefined, tag('a:schemeClr', { val: 'phClr' })) +
      tag('a:solidFill', undefined, tag('a:schemeClr', { val: 'phClr' }))
    )
  );

  const themeElements = tag('a:themeElements', undefined, clrScheme + fontScheme + fmtScheme);

  return (
    xmlDecl() +
    tag('a:theme', { 'xmlns:a': NS.a, name: 'Office Theme' }, themeElements)
  );
}
