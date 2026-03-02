import { SlideDefinition, WriterOptions } from '../types/writer-types';
import { MediaManager } from './media-manager';
export declare function assemblePptx(slides: SlideDefinition[], mediaManager: MediaManager, options?: WriterOptions): Promise<ArrayBuffer>;
