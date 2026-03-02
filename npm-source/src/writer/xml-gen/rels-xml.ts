import { xmlDecl, tag } from '../utils/xml-builder';
import { NS } from '../templates/namespaces';
import { RelationshipEntry } from '../types/writer-types';

export function generateRelsXml(relationships: RelationshipEntry[]): string {
  const rels = relationships
    .map((r) => {
      const attrs: Record<string, string> = {
        Id: r.rId,
        Type: r.type,
        Target: r.target,
      };
      if (r.targetMode) {
        attrs.TargetMode = r.targetMode;
      }
      return tag('Relationship', attrs);
    })
    .join('');

  return xmlDecl() + tag('Relationships', { xmlns: NS.rel }, rels);
}
