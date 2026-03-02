import { MediaEntry } from '../types/writer-types';
export declare class MediaManager {
    private entries;
    private counter;
    addImage(base64: string, mimeType: string): string;
    getEntries(): MediaEntry[];
}
