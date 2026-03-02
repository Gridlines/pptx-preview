import { xmlDecl, tag } from '../utils/xml-builder';
import { CONTENT_TYPE } from '../templates/namespaces';

export type PartEntry = {
  partName: string;
  contentType: string;
};

export function generateContentTypesXml(parts: PartEntry[]): string {
  const defaults = [
    tag('Default', { Extension: 'rels', ContentType: CONTENT_TYPE.rels }),
    tag('Default', { Extension: 'xml', ContentType: CONTENT_TYPE.xml }),
    tag('Default', { Extension: 'jpeg', ContentType: CONTENT_TYPE.jpeg }),
    tag('Default', { Extension: 'jpg', ContentType: CONTENT_TYPE.jpeg }),
    tag('Default', { Extension: 'png', ContentType: CONTENT_TYPE.png }),
    tag('Default', { Extension: 'gif', ContentType: CONTENT_TYPE.gif }),
    tag('Default', { Extension: 'bmp', ContentType: CONTENT_TYPE.bmp }),
  ].join('');

  const overrides = parts
    .map((p) => tag('Override', { PartName: p.partName, ContentType: p.contentType }))
    .join('');

  return (
    xmlDecl() +
    tag(
      'Types',
      { xmlns: 'http://schemas.openxmlformats.org/package/2006/content-types' },
      defaults + overrides
    )
  );
}
