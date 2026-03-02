import { RelationshipEntry } from '../types/writer-types';

export class RelationshipTracker {
  private counter: number = 0;
  private relationships: RelationshipEntry[] = [];

  addRelationship(type: string, target: string, targetMode?: string): string {
    this.counter++;
    const rId = `rId${this.counter}`;
    this.relationships.push({ rId, type, target, targetMode });
    return rId;
  }

  getRelationships(): RelationshipEntry[] {
    return this.relationships;
  }

  getCount(): number {
    return this.counter;
  }
}
