import { SlideInput, SlideDefinition, WriterOptions } from './types/writer-types';
import { assemblePptx } from './assembler/pptx-assembler';
import { MediaManager } from './assembler/media-manager';
import { parseSlideHtml } from './parser/html-parser';
export { setJSDOM } from './parser/html-parser';

export type { SlideInput, WriterOptions, SlideDefinition, ShapeDefinition } from './types/writer-types';

export async function createPptx(
  slides: SlideInput[],
  options?: WriterOptions
): Promise<ArrayBuffer> {
  const mediaManager = new MediaManager();

  const slideDefinitions: SlideDefinition[] = slides.map((input) => {
    const slideDef = parseSlideHtml(input.html, options);
    if (input.background) {
      slideDef.background = input.background;
    }
    return slideDef;
  });

  return assemblePptx(slideDefinitions, mediaManager, options);
}
