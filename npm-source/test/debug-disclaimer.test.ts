import { describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import PPTX from '../src/reader/PPTX';

describe('Debug disclaimer', () => {
  it('should print disclaimer properties', async () => {
    const pptxPath = resolve(__dirname, 'fixtures/Firmex 24-07-23 160604_Due Diligence_Example 1_Project Vortex Credit Highlights  - 2.15.23.pptx');
    const pptxBuffer = readFileSync(pptxPath);
    const uint8 = new Uint8Array(pptxBuffer);
    const pptx = new PPTX();
    await pptx.load(uint8 as any);
    const slide = pptx.slides[1];
    
    for (const node of slide.nodes) {
      const name = node.source?.['p:nvSpPr']?.['p:cNvPr']?.attrs?.name;
      if (name === 'TextBox 4' && node.textBody) {
        const tb = node.textBody;
        console.log('TextBody.props:', JSON.stringify(tb.props, null, 2));
        console.log('TextBody.inheritProps:', JSON.stringify(tb.inheritProps, null, 2));
        
        console.log(`\nParagraphs: ${tb.paragraphs.length}`);
        for (let i = 0; i < 2; i++) {
          const para = tb.paragraphs[i];
          console.log(`\nPara ${i}:`);
          console.log('  props:', JSON.stringify(para.props));
          console.log('  inheritProps:', JSON.stringify(para.inheritProps));
          console.log('  inheritRProps:', JSON.stringify(para.inheritRProps));
          if (para.rows[0]) console.log('  row0.props:', JSON.stringify(para.rows[0].props));
        }
        
        const master = slide.slideLayout.slideMaster;
        console.log('\n=== defaultTextStyle ===');
        for (const [key, val] of Object.entries(master.defaultTextStyle)) {
          const v = val as any;
          console.log(`  ${key}: props=${JSON.stringify(v.props)}, defRPr=${JSON.stringify(v.defRPr)}`);
        }
        console.log('\n=== otherStyle ===');
        for (const [key, val] of Object.entries(master.textStyles.otherStyle)) {
          const v = val as any;
          console.log(`  ${key}: props=${JSON.stringify(v.props)}, defRPr=${JSON.stringify(v.defRPr)}`);
        }
      }
    }
  });
});
