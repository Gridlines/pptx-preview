import { RelationshipEntry } from '../types/writer-types';
export declare class RelationshipTracker {
    private counter;
    private relationships;
    addRelationship(type: string, target: string, targetMode?: string): string;
    getRelationships(): RelationshipEntry[];
    getCount(): number;
}
