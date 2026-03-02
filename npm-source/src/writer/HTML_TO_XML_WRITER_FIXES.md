# HTML -> XML Writer Fixes (Rendered Slide Capture Path)

## Goal
Make the writer reliably convert rendered slide-capture HTML (from `html-render`) into PPTX XML, without changing non-writer folders.

## Why the output was missing content
Two concrete writer issues caused most of the visible breakage:

1. Wrong shape token detection for rectangles  
`shape-wrapper` was being matched as the shape token before `shape-rect`, so non-text rectangles could be dropped.

2. Slide size mismatch (clipping)  
Rendered capture coordinates were in source slide space (`792x612` for the coastal sample), but writer defaulted to `960x540` when creating `presentation.xml`. This clipped bottom/right content even when shapes were present.

## What was changed (writer-only)

### 1) Parse rendered HTML directly
File: `src/writer/parser/rendered-html-parser.ts`

- Added/used a rendered preview parser path for:
  - `.pptx-preview-slide-wrapper`
  - `.slide-master-wrapper`, `.slide-layout-wrapper`, `.slide-wrapper`
  - `.shape-wrapper`
- Extracts absolute positioned boxes from rendered wrappers.
- Parses:
  - text (`<p>`) -> paragraphs
  - tables
  - images
  - SVG geometry (`<path d>`) -> custom geometry segments
- Keeps explicit coordinates by setting `layoutLocked`.

### 2) Fix shape token parsing bug
File: `src/writer/parser/rendered-html-parser.ts`

- `getShapeToken(...)` now ignores `shape-wrapper` and selects real shape classes like `shape-rect`, `shape-ellipse`, `shape-customGeom`.

### 3) Infer source slide size from rendered HTML
Files:
- `src/writer/parser/rendered-html-parser.ts`
- `src/writer/types/writer-types.ts`
- `src/writer/assembler/pptx-assembler.ts`

- Parser now captures rendered source size (usually from `.slide-wrapper` width/height).
- Added `sourceSize?: { width; height }` to `SlideDefinition`.
- Assembler now auto-uses inferred source size when options do not explicitly pass `slideWidth`/`slideHeight`.

Effect: output PPTX now matches rendered source coordinate space by default (for these captures).

### 4) Keep absolute positioned shapes from being relaid out
File: `src/writer/parser/layout-calculator.ts`

- `layoutLocked` shapes are skipped by auto layout logic.

### 5) Support writer-side custom geometry output
Files:
- `src/writer/types/writer-types.ts`
- `src/writer/xml-gen/shape-xml.ts`
- `src/writer/parser/rendered-html-parser.ts`

- Added `customGeom` shape typing and segment model.
- Emits OOXML `<a:custGeom>` with path commands (`moveTo`, `lnTo`, `cubicBezTo`, `close`).
- This preserves many shapes that were previously flattened/dropped.

## Validation done

- `npm run -s typecheck` passed.
- `npm run -s test -- test/writer.test.ts` passed.
- Added assertions in `test/writer.test.ts` for:
  - rendered parse returns expected absolute coordinates
  - rendered parse infers `sourceSize: { width: 792, height: 612 }`
  - generated `presentation.xml` uses inferred size for rendered capture input

## Result on coastal sample

Input:
- `slide-captures/coastal-greenlight-slide1.html`

Output:
- `slide-captures/coastal-greenlight-slide1-writer-output.pptx`

Observed after fixes:
- slide size is `792x612` (not default `960x540`)
- shape count matches rendered wrappers for this sample
- custom geometry is preserved instead of being largely dropped

## Current limits / next hardening areas

- SVG path parser currently supports common commands used in this sample (`M/L/H/V/C/Z` and lowercase variants where implemented).
- If future captures include arcs/quadratic/smooth curves (`A/Q/S/T`), extend parser + OOXML mapping similarly.
- Advanced CSS/flex semantics are not used directly here; the writer relies on already-rendered absolute geometry from `html-render`, which is the stable strategy for fidelity.
