# Debugging Process

Repeatable process for diagnosing and fixing rendering bugs in pptx-preview.

## 1. Start from the rendered HTML, not the source code

Don't guess at the code. Open the captured HTML and extract concrete values to understand what's actually being rendered.

**Example commands:**
```bash
# Extract all height values from the HTML
grep -oE 'height: *[0-9.]+px' slide-captures/some-slide.html | sort -t: -k2 -n

# Extract all font-size values from a specific table
python3 -c "
import re
with open('slide-captures/some-slide.html') as f:
    html = f.read()
tables = re.findall(r'<table[^>]*>.*?</table>', html, re.DOTALL)
for i, t in enumerate(tables):
    fonts = set(re.findall(r'font-size: ([^;\"]+)', t))
    margins = set(re.findall(r'margin: ([^;\"]+)', t))
    print(f'Table {i}: fonts={fonts}, margins={margins}')
"
```

## 2. Compare specified vs actual dimensions

In HTML tables, `<tr style="height: Xpx">` is a **minimum** height. If cell content is taller, the row expands silently. Look for mismatches between the specified row height and the content size inside cells.

**What to check in each cell:**
- `font-size` on `<p>` and `<span>` elements
- `margin` on wrapper `<div>` elements
- `padding` on `<td>` elements
- `line-height` on `<p>` elements
- Number of `<p>` / `<div>` elements (extra empty paragraphs add height)

## 3. Isolate the bad cell

Extract one row's full HTML and read it. Look for values that don't match the rest of the table.

**Example: the table row height bug**

Row height was specified as `5.8px`, but cells contained:
- `font-size: 18px` on a `<p>` with just `&nbsp;` (empty cell)
- `margin: 3px 0px 0px` on the wrapper `<div>`

That's ~21px of content in a 5.8px row — the row expands to fit.

```bash
python3 -c "
import re
with open('slide-captures/some-slide.html') as f:
    html = f.read()
tables = re.findall(r'<table[^>]*>.*?</table>', html, re.DOTALL)
t = tables[2]  # whichever table has the issue
trs = re.findall(r'<tr[^>]*>.*?</tr>', t, re.DOTALL)
# Print a specific row's first cell
cells = trs[6].split('<td')
print('<td' + cells[1][:600])
"
```

## 4. Trace the bad value back to the renderer

Once you know what CSS property is wrong (e.g. `font-size: 18px` on an empty cell), search the rendering code for where that value is produced.

**Key rendering files:**
- `src/html-render/node/table-render.ts` — table structure (rows, cells, borders, padding)
- `src/html-render/node/TextRender.ts` — paragraph/text rendering (font size, margins, line height)
- `src/reader/node/TableNode.ts` — PPTX XML parsing (EMU to px conversion)
- `src/utils/unit.ts` — unit conversion (`emu2px` divides by 12700)

**Common default-value traps:**
- `calcFontSize()` in TextRender.ts falls back to `18px` when no size is set — this is the global default for shapes/text boxes but way too large for table cells
- Wrapper div margin is computed as `0.2 * fontSize` — if fontSize is inflated, margin is too
- Empty paragraphs (`rows.length === 0`) set `inheritRProps.size` on a `&nbsp;` span, which may be undefined

## 5. Fix with minimal scope

Add context flags (like `isTable`) to shared rendering functions rather than rewriting them. The rendering pipeline is shared between shapes, text boxes, and tables — changes to defaults affect everything.

**Pattern used:**
```typescript
// In _renderParagraph options:
options: { isFirst?: boolean; isLast?: boolean; bodyProps?: any; isTable?: boolean }

// Conditional defaults:
const defaultSize = options.isTable ? (inheritRProps.size || 8) : 18;
const topMargin = options.isTable ? 0 : Math.floor(0.2 * calcFontSize());
```

## 6. Regenerate and compare

Use the test script to re-render the slide and compare before/after:

```bash
# Regenerate the HTML
npx vitest run test/render-slide4.test.ts

# Compare key metrics
python3 -c "
import re
with open('slide-captures/some-slide.html') as f:
    html = f.read()
tables = re.findall(r'<table[^>]*>.*?</table>', html, re.DOTALL)
for i, t in enumerate(tables):
    fonts = set(re.findall(r'font-size: ([^;\"]+)', t))
    margins = set(re.findall(r'margin: ([^;\"]+)', t))
    trs = len(re.findall(r'<tr', t))
    print(f'Table {i} ({trs} rows): fonts={fonts}, margins={margins}')
"

# Open in browser to visually verify
open slide-captures/some-slide.html
```

## 7. Run existing tests

Always run the full test suite after a fix to make sure nothing else broke:

```bash
npx vitest run
```
