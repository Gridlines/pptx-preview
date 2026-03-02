import { describe, it, expect } from 'vitest';
import JSZip from 'jszip';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createPptx } from '../src/writer';
import { escapeXml, tag, xmlDecl } from '../src/writer/utils/xml-builder';
import { px2emu, fontSize2hundredthPt } from '../src/writer/utils/unit-reverse';
import { generateContentTypesXml } from '../src/writer/xml-gen/content-types-xml';
import { generateRelsXml } from '../src/writer/xml-gen/rels-xml';
import { generatePresentationXml } from '../src/writer/xml-gen/presentation-xml';
import { generateSlideXml } from '../src/writer/xml-gen/slide-xml';
import { generateThemeXml } from '../src/writer/xml-gen/theme-xml';
import { generateSlideMasterXml } from '../src/writer/xml-gen/slide-master-xml';
import { generateSlideLayoutXml } from '../src/writer/xml-gen/slide-layout-xml';
import { generateTxBodyXml } from '../src/writer/xml-gen/text-xml';
import { generateShapeXml } from '../src/writer/xml-gen/shape-xml';
import { generateTableShapeXml } from '../src/writer/xml-gen/table-xml';
import { generateColorXml } from '../src/writer/xml-gen/color-xml';
import { RelationshipTracker } from '../src/writer/assembler/relationship-tracker';
import { MediaManager } from '../src/writer/assembler/media-manager';
import { parseSlideHtml } from '../src/writer/parser/html-parser';
import { SlideDefinition } from '../src/writer/types/writer-types';

// ---------- Utility Tests ----------

describe('xml-builder', () => {
  it('escapes XML special characters', () => {
    expect(escapeXml('a & b < c > d "e" \'f\'')).toBe(
      'a &amp; b &lt; c &gt; d &quot;e&quot; &apos;f&apos;'
    );
  });

  it('generates XML declaration', () => {
    expect(xmlDecl()).toBe('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
  });

  it('generates self-closing tag without children', () => {
    expect(tag('a:br')).toBe('<a:br/>');
  });

  it('generates tag with attributes', () => {
    const result = tag('a:off', { x: '0', y: '100' });
    expect(result).toBe('<a:off x="0" y="100"/>');
  });

  it('generates tag with children', () => {
    const result = tag('p:sp', undefined, '<child/>');
    expect(result).toBe('<p:sp><child/></p:sp>');
  });

  it('skips undefined attributes', () => {
    const result = tag('test', { a: '1', b: undefined, c: '3' });
    expect(result).toBe('<test a="1" c="3"/>');
  });
});

describe('unit-reverse', () => {
  it('converts px to EMU', () => {
    expect(px2emu(1)).toBe(12700);
    expect(px2emu(100)).toBe(1270000);
  });

  it('converts font size to hundredths of point', () => {
    expect(fontSize2hundredthPt(18)).toBe(1800);
    expect(fontSize2hundredthPt(44)).toBe(4400);
  });
});

// ---------- XML Generation Tests ----------

describe('content-types-xml', () => {
  it('generates valid content types XML', () => {
    const xml = generateContentTypesXml([
      { partName: '/ppt/presentation.xml', contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml' },
    ]);
    expect(xml).toContain('<?xml version="1.0"');
    expect(xml).toContain('<Types');
    expect(xml).toContain('Extension="rels"');
    expect(xml).toContain('Extension="xml"');
    expect(xml).toContain('PartName="/ppt/presentation.xml"');
  });
});

describe('rels-xml', () => {
  it('generates valid relationships XML', () => {
    const xml = generateRelsXml([
      { rId: 'rId1', type: 'http://example.com/type', target: 'target.xml' },
    ]);
    expect(xml).toContain('<Relationships');
    expect(xml).toContain('Id="rId1"');
    expect(xml).toContain('Target="target.xml"');
  });

  it('includes TargetMode when set', () => {
    const xml = generateRelsXml([
      { rId: 'rId1', type: 'http://example.com/type', target: 'https://example.com', targetMode: 'External' },
    ]);
    expect(xml).toContain('TargetMode="External"');
  });
});

describe('presentation-xml', () => {
  it('generates presentation with correct slide references', () => {
    const xml = generatePresentationXml(3, 960, 540);
    expect(xml).toContain('<p:presentation');
    expect(xml).toContain('r:id="rId2"');
    expect(xml).toContain('r:id="rId3"');
    expect(xml).toContain('r:id="rId4"');
    expect(xml).toContain(`cx="${px2emu(960)}"`);
    expect(xml).toContain(`cy="${px2emu(540)}"`);
  });
});

describe('slide-xml', () => {
  it('generates empty slide XML', () => {
    const xml = generateSlideXml();
    expect(xml).toContain('<p:sld');
    expect(xml).toContain('<p:spTree');
    expect(xml).toContain('a:masterClrMapping');
  });

  it('generates slide with shapes', () => {
    const slide: SlideDefinition = {
      shapes: [{
        type: 'textbox',
        offset: { x: 100000, y: 200000 },
        extend: { cx: 5000000, cy: 500000 },
        paragraphs: [{
          props: {},
          rows: [{ text: 'Hello', props: { size: 18 } }],
        }],
      }],
    };
    const xml = generateSlideXml(slide);
    expect(xml).toContain('Hello');
    expect(xml).toContain('x="100000"');
    expect(xml).toContain('y="200000"');
  });
});

describe('theme-xml', () => {
  it('generates valid theme', () => {
    const xml = generateThemeXml();
    expect(xml).toContain('<a:theme');
    expect(xml).toContain('<a:clrScheme');
    expect(xml).toContain('<a:fontScheme');
    expect(xml).toContain('<a:fmtScheme');
    expect(xml).toContain('Calibri');
  });
});

describe('slide-master-xml', () => {
  it('generates valid slide master', () => {
    const xml = generateSlideMasterXml(['rId1']);
    expect(xml).toContain('<p:sldMaster');
    expect(xml).toContain('<p:clrMap');
    expect(xml).toContain('<p:sldLayoutIdLst');
    expect(xml).toContain('r:id="rId1"');
  });
});

describe('slide-layout-xml', () => {
  it('generates valid blank slide layout', () => {
    const xml = generateSlideLayoutXml();
    expect(xml).toContain('<p:sldLayout');
    expect(xml).toContain('type="blank"');
  });
});

describe('color-xml', () => {
  it('generates solid fill color', () => {
    const xml = generateColorXml({ type: 'solidFill', color: '#FF0000' });
    expect(xml).toContain('val="FF0000"');
  });

  it('generates color with alpha', () => {
    const xml = generateColorXml({ type: 'solidFill', color: '0000FF', alpha: 0.5 });
    expect(xml).toContain('val="0000FF"');
    expect(xml).toContain('<a:alpha val="50000"');
  });

  it('returns empty string for none type', () => {
    expect(generateColorXml({ type: 'none' })).toBe('');
  });
});

describe('text-xml', () => {
  it('generates txBody with paragraphs', () => {
    const xml = generateTxBodyXml([{
      props: { algn: 'ctr' },
      rows: [
        { text: 'Hello ', props: { size: 24, bold: true } },
        { text: 'World', props: { size: 24, italic: true } },
      ],
    }]);
    expect(xml).toContain('<a:bodyPr');
    expect(xml).toContain('<a:lstStyle');
    expect(xml).toContain('<a:p>');
    expect(xml).toContain('algn="ctr"');
    expect(xml).toContain('b="1"');
    expect(xml).toContain('i="1"');
    expect(xml).toContain('sz="2400"');
    expect(xml).toContain('Hello ');
    expect(xml).toContain('World');
  });

  it('generates paragraph with bullet', () => {
    const xml = generateTxBodyXml([{
      props: { buChar: '\u2022', marL: 36, indent: -18 },
      rows: [{ text: 'Item 1', props: { size: 18 } }],
    }]);
    expect(xml).toContain('<a:buChar');
    expect(xml).toContain('marL=');
    expect(xml).toContain('indent=');
  });

  it('generates paragraph with auto number', () => {
    const xml = generateTxBodyXml([{
      props: { buAutoNum: 'arabicPeriod' },
      rows: [{ text: 'Step 1', props: { size: 18 } }],
    }]);
    expect(xml).toContain('<a:buAutoNum');
    expect(xml).toContain('arabicPeriod');
  });

  it('generates run with font family', () => {
    const xml = generateTxBodyXml([{
      props: {},
      rows: [{ text: 'Code', props: { fontFamily: 'Courier New' } }],
    }]);
    expect(xml).toContain('Courier New');
    expect(xml).toContain('<a:latin');
  });

  it('generates run with color', () => {
    const xml = generateTxBodyXml([{
      props: {},
      rows: [{
        text: 'Red',
        props: { color: { type: 'solidFill' as const, color: 'FF0000' } },
      }],
    }]);
    expect(xml).toContain('<a:solidFill');
    expect(xml).toContain('val="FF0000"');
  });
});

describe('shape-xml', () => {
  it('generates textbox shape', () => {
    const xml = generateShapeXml({
      type: 'textbox',
      offset: { x: 100000, y: 200000 },
      extend: { cx: 5000000, cy: 500000 },
      paragraphs: [{
        props: {},
        rows: [{ text: 'Hello', props: { size: 18 } }],
      }],
    }, 2);
    expect(xml).toContain('<p:sp>');
    expect(xml).toContain('txBox="1"');
    expect(xml).toContain('x="100000"');
    expect(xml).toContain('cx="5000000"');
    expect(xml).toContain('Hello');
  });
});

describe('table-xml', () => {
  it('generates table shape', () => {
    const xml = generateTableShapeXml({
      type: 'table',
      offset: { x: 100000, y: 200000 },
      extend: { cx: 8000000, cy: 2000000 },
      tableGrid: { gridCol: [{ width: 300 }, { width: 300 }] },
      tableRows: [{
        props: { height: 40 },
        td: [
          { props: {}, paragraphs: [{ props: {}, rows: [{ text: 'A', props: {} }] }] },
          { props: {}, paragraphs: [{ props: {}, rows: [{ text: 'B', props: {} }] }] },
        ],
      }],
    }, 3);
    expect(xml).toContain('<p:graphicFrame>');
    expect(xml).toContain('<a:tbl>');
    expect(xml).toContain('<a:gridCol');
    expect(xml).toContain('<a:tr');
    expect(xml).toContain('<a:tc>');
  });
});

// ---------- Assembler Tests ----------

describe('RelationshipTracker', () => {
  it('tracks relationships with incrementing IDs', () => {
    const tracker = new RelationshipTracker();
    expect(tracker.addRelationship('type1', 'target1')).toBe('rId1');
    expect(tracker.addRelationship('type2', 'target2')).toBe('rId2');
    expect(tracker.getRelationships()).toHaveLength(2);
    expect(tracker.getCount()).toBe(2);
  });
});

describe('MediaManager', () => {
  it('adds images and tracks paths', () => {
    const manager = new MediaManager();
    // Small 1x1 red PNG as base64
    const base64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==';
    const path = manager.addImage(base64, 'image/png');
    expect(path).toBe('ppt/media/image1.png');
    expect(manager.getEntries()).toHaveLength(1);
    expect(manager.getEntries()[0].data).toBeInstanceOf(Uint8Array);
  });
});

// ---------- HTML Parser Tests ----------

describe('parseSlideHtml', () => {
  it('parses heading', () => {
    const result = parseSlideHtml('<h1>Title</h1>');
    expect(result.shapes).toHaveLength(1);
    expect(result.shapes[0].paragraphs?.[0].rows[0].text).toBe('Title');
    expect(result.shapes[0].paragraphs?.[0].rows[0].props.bold).toBe(true);
    expect(result.shapes[0].paragraphs?.[0].rows[0].props.size).toBe(44);
  });

  it('parses paragraph with inline formatting', () => {
    const result = parseSlideHtml('<p>Hello <strong>bold</strong> and <em>italic</em></p>');
    expect(result.shapes).toHaveLength(1);
    const rows = result.shapes[0].paragraphs?.[0].rows || [];
    expect(rows.length).toBeGreaterThanOrEqual(3);
    const boldRow = rows.find(r => r.text.includes('bold'));
    const italicRow = rows.find(r => r.text.includes('italic'));
    expect(boldRow?.props.bold).toBe(true);
    expect(italicRow?.props.italic).toBe(true);
  });

  it('parses multiple elements into separate shapes', () => {
    const result = parseSlideHtml('<h1>Title</h1><p>Body text</p>');
    expect(result.shapes).toHaveLength(2);
  });

  it('parses unordered list', () => {
    const result = parseSlideHtml('<ul><li>Item 1</li><li>Item 2</li></ul>');
    expect(result.shapes).toHaveLength(1);
    const paras = result.shapes[0].paragraphs || [];
    expect(paras).toHaveLength(2);
    expect(paras[0].props.buChar).toBe('\u2022');
    expect(paras[1].props.buChar).toBe('\u2022');
  });

  it('parses ordered list', () => {
    const result = parseSlideHtml('<ol><li>Step 1</li><li>Step 2</li></ol>');
    const paras = result.shapes[0].paragraphs || [];
    expect(paras[0].props.buAutoNum).toBe('arabicPeriod');
  });

  it('parses table', () => {
    const result = parseSlideHtml(
      '<table><tr><td>A</td><td>B</td></tr><tr><td>C</td><td>D</td></tr></table>'
    );
    expect(result.shapes).toHaveLength(1);
    expect(result.shapes[0].type).toBe('table');
    expect(result.shapes[0].tableGrid?.gridCol).toHaveLength(2);
    expect(result.shapes[0].tableRows).toHaveLength(2);
  });

  it('parses code blocks', () => {
    const result = parseSlideHtml('<pre><code>const x = 1;</code></pre>');
    expect(result.shapes).toHaveLength(1);
    const rows = result.shapes[0].paragraphs?.[0].rows || [];
    expect(rows[0].props.fontFamily).toBe('Courier New');
  });

  it('assigns layout positions', () => {
    const result = parseSlideHtml('<h1>Title</h1><p>Body</p>');
    for (const shape of result.shapes) {
      expect(shape.offset.x).toBeGreaterThan(0);
      expect(shape.offset.y).toBeGreaterThan(0);
      expect(shape.extend.cx).toBeGreaterThan(0);
      expect(shape.extend.cy).toBeGreaterThan(0);
    }
  });

  it('handles container elements like div', () => {
    const result = parseSlideHtml('<div><p>Inside div</p></div>');
    expect(result.shapes.length).toBeGreaterThanOrEqual(1);
  });

  it('handles links', () => {
    const result = parseSlideHtml('<p><a href="https://example.com">Link</a></p>');
    const rows = result.shapes[0].paragraphs?.[0].rows || [];
    const linkRow = rows.find(r => r.text.includes('Link'));
    expect(linkRow?.link).toBe('https://example.com');
  });

  it('handles blockquote', () => {
    const result = parseSlideHtml('<blockquote>Quoted text</blockquote>');
    expect(result.shapes).toHaveLength(1);
    const para = result.shapes[0].paragraphs?.[0];
    expect(para?.props.marL).toBe(40);
  });

  it('handles empty input', () => {
    const result = parseSlideHtml('');
    expect(result.shapes).toHaveLength(0);
  });

  it('parses rendered slide-capture HTML with absolute shape positions', () => {
    const html = readFileSync(
      resolve(process.cwd(), 'slide-captures/coastal-greenlight-slide1.html'),
      'utf8'
    );
    const result = parseSlideHtml(html);

    expect(result.shapes.length).toBeGreaterThan(0);
    expect(result.sourceSize).toEqual({ width: 792, height: 612 });

    const memoShape = result.shapes.find((shape) =>
      (shape.paragraphs || []).some((para) =>
        para.rows.some((row) => row.text.includes('Greenlight Memorandum'))
      )
    );

    expect(memoShape).toBeTruthy();
    expect(memoShape?.offset.x).toBe(px2emu(45));
    expect(memoShape?.offset.y).toBe(px2emu(471));
  });
});

// ---------- Integration: createPptx ----------

describe('createPptx', () => {
  it('produces a valid ZIP with all required parts', async () => {
    const buffer = await createPptx([{ html: '<h1>Hello World</h1>' }]);
    expect(buffer).toBeInstanceOf(ArrayBuffer);

    const zip = await JSZip.loadAsync(buffer);
    const files = Object.keys(zip.files);

    // All 11 required files for a minimal PPTX
    expect(files).toContain('[Content_Types].xml');
    expect(files).toContain('_rels/.rels');
    expect(files).toContain('ppt/presentation.xml');
    expect(files).toContain('ppt/_rels/presentation.xml.rels');
    expect(files).toContain('ppt/theme/theme1.xml');
    expect(files).toContain('ppt/slideMasters/slideMaster1.xml');
    expect(files).toContain('ppt/slideMasters/_rels/slideMaster1.xml.rels');
    expect(files).toContain('ppt/slideLayouts/slideLayout1.xml');
    expect(files).toContain('ppt/slideLayouts/_rels/slideLayout1.xml.rels');
    expect(files).toContain('ppt/slides/slide1.xml');
    expect(files).toContain('ppt/slides/_rels/slide1.xml.rels');
  });

  it('creates multiple slides', async () => {
    const buffer = await createPptx([
      { html: '<h1>Slide 1</h1>' },
      { html: '<h1>Slide 2</h1>' },
      { html: '<h1>Slide 3</h1>' },
    ]);

    const zip = await JSZip.loadAsync(buffer);
    const files = Object.keys(zip.files);

    expect(files).toContain('ppt/slides/slide1.xml');
    expect(files).toContain('ppt/slides/slide2.xml');
    expect(files).toContain('ppt/slides/slide3.xml');

    const slide1Xml = await zip.file('ppt/slides/slide1.xml')!.async('text');
    expect(slide1Xml).toContain('Slide 1');

    const slide2Xml = await zip.file('ppt/slides/slide2.xml')!.async('text');
    expect(slide2Xml).toContain('Slide 2');
  });

  it('generates valid XML in content types', async () => {
    const buffer = await createPptx([{ html: '<p>Test</p>' }]);
    const zip = await JSZip.loadAsync(buffer);

    const contentTypes = await zip.file('[Content_Types].xml')!.async('text');
    expect(contentTypes).toContain('<?xml version="1.0"');
    expect(contentTypes).toContain('presentation.main+xml');
    expect(contentTypes).toContain('slide+xml');
  });

  it('generates valid slide XML with text content', async () => {
    const buffer = await createPptx([{
      html: '<h1>Title</h1><p>This is <strong>bold</strong> and <em>italic</em> text</p>',
    }]);
    const zip = await JSZip.loadAsync(buffer);

    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');
    expect(slideXml).toContain('<p:sld');
    expect(slideXml).toContain('Title');
    expect(slideXml).toContain('bold');
    expect(slideXml).toContain('b="1"');
    expect(slideXml).toContain('i="1"');
  });

  it('generates PPTX with table', async () => {
    const buffer = await createPptx([{
      html: '<table><tr><td>Cell 1</td><td>Cell 2</td></tr></table>',
    }]);
    const zip = await JSZip.loadAsync(buffer);

    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');
    expect(slideXml).toContain('<a:tbl>');
    expect(slideXml).toContain('Cell 1');
    expect(slideXml).toContain('Cell 2');
  });

  it('generates PPTX with list', async () => {
    const buffer = await createPptx([{
      html: '<ul><li>Bullet 1</li><li>Bullet 2</li></ul>',
    }]);
    const zip = await JSZip.loadAsync(buffer);

    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');
    expect(slideXml).toContain('Bullet 1');
    expect(slideXml).toContain('Bullet 2');
    expect(slideXml).toContain('<a:buChar');
  });

  it('generates PPTX with hyperlinks', async () => {
    const buffer = await createPptx([{
      html: '<p><a href="https://example.com">Click me</a></p>',
    }]);
    const zip = await JSZip.loadAsync(buffer);

    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');
    expect(slideXml).toContain('Click me');
    expect(slideXml).toContain('a:hlinkClick');

    const slideRels = await zip.file('ppt/slides/_rels/slide1.xml.rels')!.async('text');
    expect(slideRels).toContain('https://example.com');
    expect(slideRels).toContain('TargetMode="External"');
  });

  it('respects custom options', async () => {
    const buffer = await createPptx(
      [{ html: '<h1>Custom</h1>' }],
      { slideWidth: 1280, slideHeight: 720 }
    );
    const zip = await JSZip.loadAsync(buffer);

    const presXml = await zip.file('ppt/presentation.xml')!.async('text');
    expect(presXml).toContain(`cx="${px2emu(1280)}"`);
    expect(presXml).toContain(`cy="${px2emu(720)}"`);
  });

  it('generates PPTX with slide background', async () => {
    const buffer = await createPptx([{
      html: '<h1>Background Slide</h1>',
      background: { type: 'solidFill', color: '4472C4' },
    }]);
    const zip = await JSZip.loadAsync(buffer);

    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');
    expect(slideXml).toContain('<p:bg>');
    expect(slideXml).toContain('val="4472C4"');
  });

  it('generates PPTX with underline and strikethrough', async () => {
    const buffer = await createPptx([{
      html: '<p><u>underlined</u> and <s>struck</s></p>',
    }]);
    const zip = await JSZip.loadAsync(buffer);

    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');
    expect(slideXml).toContain('u="sng"');
    expect(slideXml).toContain('strike="sngStrike"');
  });

  it('generates PPTX with line breaks', async () => {
    const buffer = await createPptx([{
      html: '<p>Line one<br>Line two</p>',
    }]);
    const zip = await JSZip.loadAsync(buffer);

    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');
    expect(slideXml).toContain('Line one');
    expect(slideXml).toContain('Line two');
    expect(slideXml).toContain('<a:br/>');
  });

  it('handles complex HTML with mixed elements', async () => {
    const html = `
      <h1>Presentation Title</h1>
      <p>Some introductory text with <strong>bold</strong> and <em>italic</em>.</p>
      <ul>
        <li>First point</li>
        <li>Second point</li>
      </ul>
      <table>
        <tr><th>Header 1</th><th>Header 2</th></tr>
        <tr><td>Data 1</td><td>Data 2</td></tr>
      </table>
    `;
    const buffer = await createPptx([{ html }]);
    expect(buffer.byteLength).toBeGreaterThan(0);

    const zip = await JSZip.loadAsync(buffer);
    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');
    expect(slideXml).toContain('Presentation Title');
    expect(slideXml).toContain('First point');
    expect(slideXml).toContain('Header 1');
  });

  it('creates PPTX from rendered slide-capture HTML', async () => {
    const html = readFileSync(
      resolve(process.cwd(), 'slide-captures/coastal-greenlight-slide1.html'),
      'utf8'
    );

    const buffer = await createPptx([{ html }]);
    const zip = await JSZip.loadAsync(buffer);
    const slideXml = await zip.file('ppt/slides/slide1.xml')!.async('text');

    expect(slideXml).toContain('Greenlight Memorandum');
    expect(slideXml).toContain(`x="${px2emu(45)}"`);
    expect(slideXml).toContain(`y="${px2emu(471)}"`);
  });

  it('infers slide size from rendered slide-capture HTML', async () => {
    const html = readFileSync(
      resolve(process.cwd(), 'slide-captures/coastal-greenlight-slide1.html'),
      'utf8'
    );

    const buffer = await createPptx([{ html }]);
    const zip = await JSZip.loadAsync(buffer);
    const presXml = await zip.file('ppt/presentation.xml')!.async('text');

    expect(presXml).toContain(`cx="${px2emu(792)}"`);
    expect(presXml).toContain(`cy="${px2emu(612)}"`);
  });
});
