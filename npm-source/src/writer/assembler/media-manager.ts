import { MediaEntry } from '../types/writer-types';

export class MediaManager {
  private entries: MediaEntry[] = [];
  private counter: number = 0;

  addImage(base64: string, mimeType: string): string {
    this.counter++;
    const ext = mimeType.split('/')[1] === 'jpeg' ? 'jpg' : mimeType.split('/')[1] || 'png';
    const path = `ppt/media/image${this.counter}.${ext}`;
    const data = base64ToUint8Array(base64);
    this.entries.push({ path, data, mimeType });
    return path;
  }

  getEntries(): MediaEntry[] {
    return this.entries;
  }
}

function base64ToUint8Array(base64: string): Uint8Array {
  // Strip data URI prefix if present
  const raw = base64.includes(',') ? base64.split(',')[1] : base64;
  const binaryString = atob(raw);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
