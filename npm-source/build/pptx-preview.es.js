import Ae from "jszip";
import { get as c, omit as Me } from "lodash";
import { v4 as Pe } from "uuid";
import * as ke from "echarts";
var tt = 1;
function v(r) {
  const p = `\r
	>/= `;
  let h = 0;
  return tt = 1, $e(
    function f() {
      const u = [];
      for (; r[h]; ) {
        if (r.charCodeAt(h) === 60) {
          if (r.charCodeAt(h + 1) === 47)
            return h = r.indexOf(">", h), u;
          if (r.charCodeAt(h + 1) === 33) {
            if (r.charCodeAt(h + 2) === 45) {
              for (; r.charCodeAt(h) !== 62 || r.charCodeAt(h - 1) !== 45 || r.charCodeAt(h - 2) !== 45 || h === -1; )
                h = r.indexOf(">", h + 1);
              h === -1 && (h = r.length);
            } else
              for (h += 2; r.charCodeAt(h) !== 62; h++) ;
            h++;
            continue;
          }
          if (r.charCodeAt(h + 1) === 63) {
            h = r.indexOf(">", h), h++;
            continue;
          }
          let d = ++h;
          for (; p.indexOf(r[h]) === -1; ) h++;
          const w = r.slice(d, h);
          let L = !1, b = {};
          for (; r.charCodeAt(h) !== 62; ) {
            const x = r.charCodeAt(h);
            if (x > 64 && x < 91 || x > 96 && x < 123) {
              for (d = h; p.indexOf(r[h]) === -1; ) h++;
              const g = r.slice(d, h);
              let j = r.charCodeAt(h);
              for (; j !== 39 && j !== 34; )
                h++, j = r.charCodeAt(h);
              const C = r[h], T = ++h;
              h = r.indexOf(C, T);
              const k = r.slice(T, h);
              L || (b = {}, L = !0), b[g] = k;
            }
            h++;
          }
          let m = [];
          r.charCodeAt(h - 1) !== 47 && (h++, m = f()), u.push({ children: m, tagName: w, attrs: b });
        } else {
          const d = h;
          h = r.indexOf("<", h) - 1, h === -2 && (h = r.length);
          const w = r.slice(d, h + 1);
          w.length > 0 && u.push(w);
        }
        h++;
      }
      return u;
    }()
  );
}
function $e(r) {
  const t = {};
  if (r === void 0) return {};
  if (r.length === 1 && typeof r[0] == "string") return r[0];
  r.forEach((s) => {
    if (t[s.tagName] || (t[s.tagName] = []), typeof s == "object") {
      const e = $e(s.children);
      typeof e == "object" && (s.attrs && (e.attrs = s.attrs), e.attrs === void 0 ? e.attrs = { order: tt } : e.attrs.order = tt), tt++, t[s.tagName].push(e);
    }
  });
  for (const s in t)
    t[s].length === 1 && (t[s] = t[s][0]);
  return t;
}
function W(r) {
  return Math.abs(r) > 2e4 ? "emu" : "point";
}
function P(r) {
  return r / 12700;
}
function E(r) {
  return r / 20;
}
function st(r) {
  return r / 6e4;
}
function G(r) {
  return r / 1e5;
}
function at(r) {
  const t = Math.ceil(r / 26), s = (r % 26 || 26) - 1 + 65;
  return String.fromCharCode(s).repeat(t);
}
const Se = [
  "white",
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "black",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
  "CornflowerBlue",
  "Cornsilk",
  "Crimson",
  "Cyan",
  "DarkBlue",
  "DarkCyan",
  "DarkGoldenRod",
  "DarkGray",
  "DarkGrey",
  "DarkGreen",
  "DarkKhaki",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkOrange",
  "DarkOrchid",
  "DarkRed",
  "DarkSalmon",
  "DarkSeaGreen",
  "DarkSlateBlue",
  "DarkSlateGray",
  "DarkSlateGrey",
  "DarkTurquoise",
  "DarkViolet",
  "DeepPink",
  "DeepSkyBlue",
  "DimGray",
  "DimGrey",
  "DodgerBlue",
  "FireBrick",
  "FloralWhite",
  "ForestGreen",
  "Fuchsia",
  "Gainsboro",
  "GhostWhite",
  "Gold",
  "GoldenRod",
  "Gray",
  "Grey",
  "Green",
  "GreenYellow",
  "HoneyDew",
  "HotPink",
  "IndianRed",
  "Indigo",
  "Ivory",
  "Khaki",
  "Lavender",
  "LavenderBlush",
  "LawnGreen",
  "LemonChiffon",
  "LightBlue",
  "LightCoral",
  "LightCyan",
  "LightGoldenRodYellow",
  "LightGray",
  "LightGrey",
  "LightGreen",
  "LightPink",
  "LightSalmon",
  "LightSeaGreen",
  "LightSkyBlue",
  "LightSlateGray",
  "LightSlateGrey",
  "LightSteelBlue",
  "LightYellow",
  "Lime",
  "LimeGreen",
  "Linen",
  "Magenta",
  "Maroon",
  "MediumAquaMarine",
  "MediumBlue",
  "MediumOrchid",
  "MediumPurple",
  "MediumSeaGreen",
  "MediumSlateBlue",
  "MediumSpringGreen",
  "MediumTurquoise",
  "MediumVioletRed",
  "MidnightBlue",
  "MintCream",
  "MistyRose",
  "Moccasin",
  "NavajoWhite",
  "Navy",
  "OldLace",
  "Olive",
  "OliveDrab",
  "Orange",
  "OrangeRed",
  "Orchid",
  "PaleGoldenRod",
  "PaleGreen",
  "PaleTurquoise",
  "PaleVioletRed",
  "PapayaWhip",
  "PeachPuff",
  "Peru",
  "Pink",
  "Plum",
  "PowderBlue",
  "Purple",
  "RebeccaPurple",
  "Red",
  "RosyBrown",
  "RoyalBlue",
  "SaddleBrown",
  "Salmon",
  "SandyBrown",
  "SeaGreen",
  "SeaShell",
  "Sienna",
  "Silver",
  "SkyBlue",
  "SlateBlue",
  "SlateGray",
  "SlateGrey",
  "Snow",
  "SpringGreen",
  "SteelBlue",
  "Tan",
  "Teal",
  "Thistle",
  "Tomato",
  "Turquoise",
  "Violet",
  "Wheat",
  "White",
  "WhiteSmoke",
  "Yellow",
  "YellowGreen"
], je = [
  "ffffff",
  "f0f8ff",
  "faebd7",
  "00ffff",
  "7fffd4",
  "f0ffff",
  "f5f5dc",
  "ffe4c4",
  "000000",
  "ffebcd",
  "0000ff",
  "8a2be2",
  "a52a2a",
  "deb887",
  "5f9ea0",
  "7fff00",
  "d2691e",
  "ff7f50",
  "6495ed",
  "fff8dc",
  "dc143c",
  "00ffff",
  "00008b",
  "008b8b",
  "b8860b",
  "a9a9a9",
  "a9a9a9",
  "006400",
  "bdb76b",
  "8b008b",
  "556b2f",
  "ff8c00",
  "9932cc",
  "8b0000",
  "e9967a",
  "8fbc8f",
  "483d8b",
  "2f4f4f",
  "2f4f4f",
  "00ced1",
  "9400d3",
  "ff1493",
  "00bfff",
  "696969",
  "696969",
  "1e90ff",
  "b22222",
  "fffaf0",
  "228b22",
  "ff00ff",
  "dcdcdc",
  "f8f8ff",
  "ffd700",
  "daa520",
  "808080",
  "808080",
  "008000",
  "adff2f",
  "f0fff0",
  "ff69b4",
  "cd5c5c",
  "4b0082",
  "fffff0",
  "f0e68c",
  "e6e6fa",
  "fff0f5",
  "7cfc00",
  "fffacd",
  "add8e6",
  "f08080",
  "e0ffff",
  "fafad2",
  "d3d3d3",
  "d3d3d3",
  "90ee90",
  "ffb6c1",
  "ffa07a",
  "20b2aa",
  "87cefa",
  "778899",
  "778899",
  "b0c4de",
  "ffffe0",
  "00ff00",
  "32cd32",
  "faf0e6",
  "ff00ff",
  "800000",
  "66cdaa",
  "0000cd",
  "ba55d3",
  "9370db",
  "3cb371",
  "7b68ee",
  "00fa9a",
  "48d1cc",
  "c71585",
  "191970",
  "f5fffa",
  "ffe4e1",
  "ffe4b5",
  "ffdead",
  "000080",
  "fdf5e6",
  "808000",
  "6b8e23",
  "ffa500",
  "ff4500",
  "da70d6",
  "eee8aa",
  "98fb98",
  "afeeee",
  "db7093",
  "ffefd5",
  "ffdab9",
  "cd853f",
  "ffc0cb",
  "dda0dd",
  "b0e0e6",
  "800080",
  "663399",
  "ff0000",
  "bc8f8f",
  "4169e1",
  "8b4513",
  "fa8072",
  "f4a460",
  "2e8b57",
  "fff5ee",
  "a0522d",
  "c0c0c0",
  "87ceeb",
  "6a5acd",
  "708090",
  "708090",
  "fffafa",
  "00ff7f",
  "4682b4",
  "d2b48c",
  "008080",
  "d8bfd8",
  "ff6347",
  "40e0d0",
  "ee82ee",
  "f5deb3",
  "ffffff",
  "f5f5f5",
  "ffff00",
  "9acd32"
];
function Ce(r) {
  let t;
  const s = Se.indexOf(r);
  return s !== -1 && (t = je[s]), `#${t || "000000"}`;
}
function S(r, t, s) {
  const e = { type: "solidFill" };
  if (r["a:srgbClr"])
    e.color = "#" + r["a:srgbClr"].attrs.val;
  else if (r["a:schemeClr"]) {
    let h = r["a:schemeClr"].attrs.val;
    s && (h = s.getColorThemeName(h)), e.color = t.getColor(h);
  } else if (r["a:sysClr"])
    e.color = "#" + r["a:sysClr"].attrs.lastClr;
  else if (r["a:prstClr"]) {
    const h = c(r["a:prstClr"], ["attrs", "val"]);
    e.color = Ce(h);
  }
  const a = r["a:srgbClr"] || r["a:schemeClr"] || r["a:sysClr"], i = c(a, ["a:alpha", "attrs", "val"], 1e5);
  e.alpha = i / 1e5;
  const o = c(a, ["a:shade", "attrs", "val"]);
  o && (e.shade = o / 1e5);
  const n = c(a, ["a:lumMod", "attrs", "val"]);
  n && (e.lumMod = n / 1e5);
  const l = c(a, ["a:lumOff", "attrs", "val"]);
  l && (e.lumOff = l / 1e5);
  const p = c(a, ["a:tint", "attrs", "val"]);
  return p && (e.tint = p / 1e5), e;
}
function U(r, t, s) {
  var n;
  const e = { type: "blipFill" }, a = c(r, ["a:blip", "attrs", "r:embed"]);
  if (a) {
    const l = (n = s.rels[a]) == null ? void 0 : n.target;
    l && (e.base64 = t.getMedia(l));
  }
  const i = c(r, ["a:blip", "a:alphaModFix", "attrs", "amt"]);
  i && (e.alpha = i / 1e5);
  const o = c(r, ["a:stretch", "a:fillRect", "attrs"]);
  return o && (e.fillRect = {}, o.b && (e.fillRect.b = o.b / 1e5), o.t && (e.fillRect.t = o.t / 1e5), o.r && (e.fillRect.r = o.r / 1e5), o.l && (e.fillRect.l = o.l / 1e5)), e;
}
function V(r, t, s) {
  const e = {
    type: "gradFill",
    tileRect: {},
    lin: {},
    gsList: []
  };
  e.flip = r.attrs.flip, e.path = c(r, ["a:path", "attrs", "path"]) || "linear", e.rotWithShape = r.attrs.rotWithShape === "1", c(r, ["a:lin", "attrs", "ang"]) && (e.lin.ang = st(r["a:lin"].attrs.ang)), c(r, ["a:lin", "attrs", "scaled"]) && (e.lin.scaled = r["a:lin"].attrs.scaled === "1");
  const a = c(r, ["a:gsLst", "a:gs"]) || [];
  return e.gsList = a.map((i) => ({
    color: S(i, t, s),
    pos: G(i.attrs.pos)
  })), c(r, ["a:tileRect", "attrs", "l"]) && (e.tileRect.l = G(r["a:tileRect"].attrs.l)), c(r, ["a:tileRect", "attrs", "t"]) && (e.tileRect.t = G(r["a:tileRect"].attrs.t)), c(r, ["a:tileRect", "attrs", "r"]) && (e.tileRect.r = G(r["a:tileRect"].attrs.r)), c(r, ["a:tileRect", "attrs", "b"]) && (e.tileRect.b = G(r["a:tileRect"].attrs.b)), e;
}
function it(r) {
  return r <= 0.04045 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
}
function ot(r) {
  return r < 31308e-7 ? 12.92 * r : 1.055 * Math.pow(r, 1 / 2.4) - 0.055;
}
function ie(r, t) {
  const s = it(r[0] / 255) * t, e = it(r[1] / 255) * t, a = it(r[2] / 255) * t;
  return [
    Math.round(255 * ot(s)),
    Math.round(255 * ot(e)),
    Math.round(255 * ot(a))
  ];
}
function nt(r, t, s) {
  const e = r / 255, a = t / 255, i = s / 255, o = Math.max(e, a, i), n = Math.min(e, a, i), l = o - n;
  let p = 0;
  const h = (o + n) / 2;
  return l === 0 ? p = 0 : o === e ? p = (a - i) / l % 6 : o === a ? p = (i - e) / l + 2 : o === i && (p = (e - a) / l + 4), p = Math.round(60 * p), p < 0 && (p += 360), {
    h: p,
    s: l === 0 || h === 0 || h === 1 ? 0 : l / (1 - Math.abs(2 * h - 1)),
    l: h
  };
}
function ct(r, t, s) {
  const e = (1 - Math.abs(2 * s - 1)) * t, a = e * (1 - Math.abs(r / 60 % 2 - 1)), i = s - e / 2;
  let o, n, l;
  return r < 60 ? (o = e, n = a, l = 0) : r < 120 ? (o = a, n = e, l = 0) : r < 180 ? (o = 0, n = e, l = a) : r < 240 ? (o = 0, n = a, l = e) : r < 300 ? (o = a, n = 0, l = e) : (o = e, n = 0, l = a), [
    Math.round(255 * (o + i)),
    Math.round(255 * (n + i)),
    Math.round(255 * (l + i))
  ];
}
function M(r, t) {
  if (!r || r.type === "none") return "";
  if (r.type === "solidFill" && /^#[\da-fA-F]{3,6}$/.test(r.color)) {
    let s = parseInt(r.color.substr(1, 2), 16), e = parseInt(r.color.substr(3, 2), 16), a = parseInt(r.color.substr(5, 2), 16);
    if (r.shade) {
      const o = ie([s, e, a], r.shade);
      s = o[0], e = o[1], a = o[2];
    }
    if (r.lumMod) {
      const o = nt(s, e, a);
      let n = o.l * r.lumMod;
      n >= 1 && (n = 1);
      const l = ct(o.h, o.s, n);
      s = l[0], e = l[1], a = l[2];
    }
    if (r.lumOff) {
      const o = nt(s, e, a);
      let n = r.lumOff + o.l;
      n > 1 && (n = 1);
      const l = ct(o.h, o.s, n);
      s = l[0], e = l[1], a = l[2];
    }
    if (r.tint || t != null && t.light) {
      const o = nt(s, e, a);
      let n = r.tint || (t == null ? void 0 : t.light);
      n >= 1 && (n = 1);
      const l = ct(o.h, o.s, o.l * n + (1 - n));
      s = l[0], e = l[1], a = l[2];
    }
    if (t != null && t.dark) {
      const o = ie([s, e, a], t.dark);
      s = o[0], e = o[1], a = o[2];
    }
    const i = r.alpha;
    return `rgba(${s},${e},${a},${i})`;
  }
  return "";
}
class q {
  get theme() {
    return (this.ctx.sliderMaster || this.ctx).theme;
  }
  constructor(t, s, e) {
    var i, o;
    this.uuid = Pe(), this.offset = { x: 0, y: 0 }, this.extend = { w: 0, h: 0 }, this.rotate = 0, this.order = 0, this.flipV = !1, this.flipH = !1, this.source = t, this.ctx = s, this.group = e;
    const a = c(t, ["p:nvSpPr", "p:nvPr"]);
    if (a) {
      const n = c(a, "p:ph");
      n && n.attrs && (this.idx = n.attrs.idx, this.type = n.attrs.type), c(a, ["attrs", "userDrawn"]) && (this.userDrawn = c(a, ["attrs", "userDrawn"]) === "1");
    }
    if (this.order = c(t, "attrs.order", 0), this.source["p:spPr"]) {
      const n = this.getXfrm();
      if (n) {
        const l = this.group && ((i = this.ctx.pptx) != null && i.wps || W(parseInt(n["a:off"].attrs.x)) === "point") ? E : P;
        this.offset = {
          x: Math.round(l(parseInt(n["a:off"].attrs.x))),
          y: Math.round(l(parseInt(n["a:off"].attrs.y)))
        }, this.extend = {
          w: Math.round(l(parseInt(n["a:ext"].attrs.cx))),
          h: Math.round(l(parseInt(n["a:ext"].attrs.cy || "0")))
        }, this.rotate = st(parseInt(c(n, "attrs.rot", 0))), this.flipV = c(n, "attrs.flipV") === "1", this.flipH = c(n, "attrs.flipH") === "1";
      }
    } else if (this.source["p:xfrm"]) {
      const n = this.source["p:xfrm"], l = this.group && ((o = this.ctx.pptx) != null && o.wps || W(parseInt(n["a:off"].attrs.x)) === "point") ? E : P;
      this.offset = {
        x: Math.round(l(parseInt(n["a:off"].attrs.x))),
        y: Math.round(l(parseInt(n["a:off"].attrs.y)))
      }, this.extend = {
        w: Math.round(l(parseInt(n["a:ext"].attrs.cx))),
        h: Math.round(l(parseInt(n["a:ext"].attrs.cy)))
      };
    }
    if (e) {
      const n = e.extend, l = e.chExtend, p = e.chOffset, h = l.w === 0 ? 0 : n.w / l.w, f = l.h === 0 ? 0 : n.h / l.h;
      this.extend.w = this.extend.w * h, this.extend.h = this.extend.h * f, this.offset.x = (this.offset.x - p.x) * h, this.offset.y = (this.offset.y - p.y) * f;
    }
  }
  getColorThemeName(t) {
    return this.ctx.getColorThemeName(t);
  }
  getXfrm() {
    let t = this.source["p:spPr"]["a:xfrm"];
    return t || (this.idx ? t = this.ctx.getNodeInheritAttrsByIdx(this.idx, ["p:spPr", "a:xfrm"]) : this.type && (t = this.ctx.getNodeInheritAttrsByType(this.type, ["p:spPr", "a:xfrm"]))), t;
  }
}
class Re {
  constructor(t, s) {
    this.props = {}, this.inheritProps = {}, this.source = t, this.node = s, this._getInheritBodyProps(), this._parseBodyProps(), this._parseLstStyle(), this._parseText();
  }
  _getInheritBodyProps() {
    let t;
    const s = this.node.ctx, e = this.node.type, a = this.node.idx;
    if (e || a)
      switch (s.slideType) {
        case "slideMaster":
          break;
        case "slideLayout":
          t = e ? s.slideMaster.getNodeByType(e) : s.slideMaster.getNodeByIdx(a), t && (this.inheritProps = c(t, ["textBody", "props"]) || {});
          break;
        case "slide":
          t = e ? s.slideLayout.slideMaster.getNodeByType(e) : s.slideLayout.slideMaster.getNodeByIdx(a), t && Object.assign(this.inheritProps, c(t, ["textBody", "props"]) || {}), t = e ? s.slideLayout.getNodeByType(e) : s.slideLayout.getNodeByIdx(a), t && Object.assign(this.inheritProps, c(t, ["textBody", "props"]) || {});
          break;
      }
  }
  _parseBodyProps() {
    const t = c(this.source, ["a:bodyPr", "attrs"]) || {};
    Object.keys(t).forEach((e) => {
      switch (e) {
        case "anchor":
          this.props.anchor = t[e];
          break;
        case "rtlCol":
          this.props.rtlCol = t[e] === "1";
          break;
        case "lIns":
        case "rIns":
        case "tIns":
        case "bIns":
          this.props[e] = P(parseInt(t[e]));
          break;
        case "order":
          break;
        default:
          this.props[e] = t[e];
      }
    });
    const s = c(this.source, ["a:bodyPr", "a:normAutofit", "attrs"]);
    if (s) {
      this.props.normAutofit = {};
      const e = s.fontScale;
      e && (this.props.normAutofit.fontScale = G(parseInt(e)));
      const a = s.lnSpcReduction;
      a && (this.props.normAutofit.lnSpcReduction = G(parseInt(a)));
    }
  }
  _parseLstStyle() {
    const t = {}, s = c(this.source, "a:lstStyle") || {};
    Object.keys(s).forEach((e) => {
      if (e.startsWith("a:") && e.endsWith("pPr")) {
        const a = e.substr(2, e.length - 5);
        t[a] = { props: this._formatPPr(s[e]) };
        const i = c(s[e], ["a:defRPr"]);
        t[a].defRPr = this._formatRPr(i);
      }
    }), this.lstStyle = t;
  }
  _parseText() {
    let t = c(this.source, ["a:p"]) || [];
    Array.isArray(t) || (t = [t]), this.paragraphs = t.map((s) => this._parseParagraph(s));
  }
  _parseParagraph(t) {
    const s = {
      props: {},
      inheritProps: {},
      inheritRProps: {},
      endParaRProps: {},
      rows: []
    }, e = c(t, ["a:pPr"]) || {};
    s.props = this._formatPPr(e);
    const a = c(t, ["a:endParaRPr"]);
    s.endParaRProps = this._formatRPr(a);
    let i = c(t, ["a:r"]) || [];
    Array.isArray(i) || (i = [i]);
    let o = c(t, ["a:br"]) || [];
    return Array.isArray(o) || (o = [o]), i = i.concat(
      o.map((n) => ({ isBr: !0, ...n }))
    ), i.sort((n, l) => c(n, ["attrs", "order"]) - c(l, ["attrs", "order"])), s.rows = i.map((n) => this._parseRow(n)), s.inheritProps = this._getInheritPProps(s.props.level), s.inheritRProps = this._getInheritRProps(s.props.level), s;
  }
  _getInheritPProps(t = "0") {
    let s;
    const e = {}, a = this.node.ctx, i = this.node.type, o = this.node.idx, n = `lvl${t ? +t + 1 : 1}`;
    switch (a.slideType) {
      case "slideMaster":
        this.node.isTextBox ? Object.assign(e, c(a.defaultTextStyle, [n, "props"]) || {}) : Object.assign(e, c(a, ["textStyles", "otherStyle", n, "props"]) || {});
        break;
      case "slideLayout":
        this.node.isTextBox ? Object.assign(e, c(a.slideMaster.defaultTextStyle, [n, "props"]) || {}) : Object.assign(e, c(a.slideMaster, ["textStyles", "otherStyle", n, "props"]) || {}), (i || o) && (s = i ? a.slideMaster.getNodeByType(i) : a.slideMaster.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "props"]) || {}));
        break;
      case "slide":
        this.node.isTextBox ? Object.assign(e, c(a.slideLayout.slideMaster.defaultTextStyle, [n, "props"]) || {}) : Object.assign(e, c(a.slideLayout.slideMaster, ["textStyles", "otherStyle", n, "props"]) || {}), (i || o) && (["subTitle", "ctrTitle", "title"].includes(i) && Object.assign(e, c(a.slideLayout.slideMaster, ["textStyles", "titleStyle", n, "props"]) || {}), s = i ? a.slideLayout.slideMaster.getNodeByType(i) : a.slideLayout.slideMaster.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "props"]) || {}), s = i ? a.slideLayout.getNodeByType(i) : a.slideLayout.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "props"]) || {}));
        break;
    }
    return e;
  }
  _getInheritRProps(t = "0") {
    let s, e = {};
    const a = this.node.ctx, i = this.node.type, o = this.node.idx, n = `lvl${t ? +t + 1 : 1}`;
    switch (a.slideType) {
      case "slideMaster":
        this.node.isTextBox ? Object.assign(e, c(a.defaultTextStyle, [n, "defRPr"]) || {}) : Object.assign(e, c(a, ["textStyles", "otherStyle", n, "defRPr"]) || {});
        break;
      case "slideLayout":
        this.node.isTextBox ? Object.assign(e, c(a.slideMaster.defaultTextStyle, [n, "defRPr"]) || {}) : Object.assign(e, c(a.slideMaster, ["textStyles", "otherStyle", n, "defRPr"]) || {}), (i || o) && (s = i ? a.slideMaster.getNodeByType(i) : a.slideMaster.getNodeByIdx(o), s && (e = c(s, ["textBody", "lstStyle", n, "defRPr"]) || {}));
        break;
      case "slide":
        this.node.isTextBox ? Object.assign(e, c(a.slideLayout.slideMaster.defaultTextStyle, [n, "defRPr"]) || {}) : Object.assign(e, c(a.slideLayout.slideMaster, ["textStyles", "otherStyle", n, "defRPr"]) || {}), (i || o) && (["subTitle", "ctrTitle", "title"].includes(i) && Object.assign(e, c(a.slideLayout.slideMaster, ["textStyles", "titleStyle", n, "defRPr"]) || {}), s = i ? a.slideLayout.slideMaster.getNodeByType(i) : a.slideLayout.slideMaster.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "defRPr"]) || {}), s = i ? a.slideLayout.getNodeByType(i) : a.slideLayout.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "defRPr"]) || {}));
        break;
    }
    const l = c(this.node.source, ["p:style", "a:fontRef"]);
    return c(l, "a:schemeClr") && (e.color = S(l, this.node.theme, this.node)), c(this.lstStyle, [n, "defRPr"]) && Object.assign(e, c(this.lstStyle, [n, "defRPr"])), e;
  }
  _formatPPr(t) {
    const s = {}, e = c(t, "attrs") || {};
    return Object.keys(e).forEach((a) => {
      switch (a) {
        case "algn":
          s.align = e[a];
          break;
        case "marL":
          s.marginLeft = P(parseInt(e[a]));
          break;
        case "indent":
          s.indent = P(parseInt(e[a]));
          break;
        case "lvl":
          s.level = e[a];
          break;
      }
    }), c(t, ["a:lnSpc", "a:spcPct", "attrs", "val"]) && (s.lineHeight = parseInt(t["a:lnSpc"]["a:spcPct"].attrs.val) / 1e5), c(t, ["a:buAutoNum", "attrs", "type"]) && (s.buAutoNum = t["a:buAutoNum"].attrs.type), c(t, ["a:buChar", "attrs", "char"]) && (s.buChar = t["a:buChar"].attrs.char), c(t, ["a:spcBef", "a:spcPts", "attrs", "val"]) && (s.spaceBefore = parseInt(t["a:spcBef"]["a:spcPts"].attrs.val) / 100), c(t, ["a:spcAft", "a:spcPts", "attrs", "val"]) && (s.spaceAfter = parseInt(t["a:spcAft"]["a:spcPts"].attrs.val) / 100), c(t, ["a:defRPr"]) && (s.defRPr = this._formatRPr(c(t, ["a:defRPr"]))), s;
  }
  _parseRow(t) {
    if (t.isBr) return { isBr: !0 };
    const s = { props: {}, text: "" }, e = c(t, ["a:rPr"]) || {};
    return s.props = this._formatRPr(e), s.text = c(t, "a:t") || "", s;
  }
  _formatRPr(t) {
    const s = {}, e = c(t, "attrs") || {};
    Object.keys(e).forEach((o) => {
      switch (o) {
        case "sz":
          s.size = parseInt(e[o]) / 100;
          break;
        case "b":
          s.bold = e[o] === "1";
          break;
        case "i":
          s.italic = e[o] === "1";
          break;
        case "u":
          s.underline = e[o];
          break;
        case "strike":
          s.strike = e[o];
          break;
        case "order":
        case "dirty":
          break;
        default:
          s[o] = e[o];
      }
    });
    const a = c(t, "a:solidFill");
    a && (s.color = S(a, this.node.theme, this.node));
    const i = c(t, "a:highlight");
    return i && (s.background = S(i, this.node.theme, this.node)), s.typeface = c(t, ["a:ea", "attrs", "typeface"]), s;
  }
}
function X(r, t, s) {
  const e = {};
  if (c(r, "a:noFill")) return e;
  c(r, "attrs.w") && (e.width = P(parseInt(c(r, "attrs.w"))));
  const a = c(r, "a:solidFill");
  a && (e.color = S(a, t, s));
  const i = c(r, "a:prstDash");
  if (i && (e.type = i.attrs.val), c(r, ["a:miter"]) && (e.lineJoin = "miter"), c(r, ["a:bevel"]) && (e.lineJoin = "bevel"), c(r, ["a:round"]) && (e.lineJoin = "round"), c(r, ["a:miter", "attrs", "lim"]) && (e.miterLim = P(parseInt(c(r, ["a:miter", "attrs", "lim"])))), c(r, ["a:headEnd"])) {
    const o = c(r, ["a:headEnd", "attrs"]);
    e.headEnd = { type: o.type, len: o.len, w: o.w };
  }
  if (c(r, ["a:tailEnd"])) {
    const o = c(r, ["a:tailEnd", "attrs"]);
    e.tailEnd = { type: o.type, len: o.len, w: o.w };
  }
  return e;
}
const et = class et extends q {
  constructor(t, s, e, a) {
    super(t, e, a), this.border = {}, this.prstGeom = {}, this.isTextBox = !1, this.pptx = s, this._parseShape(), this._parIsTextBox(), this._parsePrstGeom(), this._parseBackground(), this._parseBorder(), this._parseTxt();
  }
  _parseShape() {
    if (this.shape = c(this.source, ["p:spPr", "a:prstGeom", "attrs", "prst"]), !this.shape && c(this.source, ["p:spPr", "a:custGeom"])) {
      this.shape = "customGeom";
      const t = c(this.source, ["p:spPr", "a:custGeom", "a:pathLst", "a:path"]);
      let s = [];
      const e = (a) => {
        let i;
        switch (a) {
          case "a:moveTo":
          case "a:cubicBezTo":
          case "a:lnTo":
            i = Array.isArray(t[a]) ? t[a] : [t[a]], s = s.concat(
              i.map((o) => ({
                order: o.attrs.order,
                type: a.split(":")[1],
                points: (Array.isArray(o["a:pt"]) ? o["a:pt"] : [o["a:pt"]]).map(
                  (n) => [
                    P(parseInt(c(n, ["attrs", "x"]))),
                    P(parseInt(c(n, ["attrs", "y"])))
                  ]
                )
              }))
            );
            break;
          case "a:close":
            i = Array.isArray(t[a]) ? t[a] : [t[a]], s = s.concat(
              i.map((o) => ({
                order: o.attrs.order,
                type: a.split(":")[1]
              }))
            );
            break;
        }
      };
      for (const a in t) e(a);
      s.sort((a, i) => a.order - i.order), this.prstGeom.pathList = s, c(t, ["attrs", "w"]) && (this.prstGeom.w = P(parseInt(c(t, ["attrs", "w"])))), c(t, ["attrs", "h"]) && (this.prstGeom.h = P(parseInt(c(t, ["attrs", "h"]))));
    }
  }
  _parIsTextBox() {
    this.isTextBox = c(this.source, ["p:nvSpPr", "p:cNvSpPr", "attrs", "txBox"]) === "1";
  }
  _parsePrstGeom() {
    const t = c(this.source, ["p:spPr", "a:prstGeom"]);
    let s = c(t, ["a:avLst", "a:gd"]);
    s && (Array.isArray(s) || (s = [s]), this.prstGeom.gd = s.map((e) => {
      const a = ["pie", "chord", "arc"].includes(this.shape) || ["blockArc"].includes(this.shape) && ["adj1", "adj2"].includes(e.attrs.name) ? st(parseInt(e.attrs.fmla.split(" ")[1])) : G(parseInt(e.attrs.fmla.split(" ")[1]));
      return { name: e.attrs.name, fmla: a };
    }));
  }
  _parseBackground() {
    if (c(this.source, ["p:spPr", "a:noFill"])) return;
    if (c(this.source, ["p:spPr", "a:grpFill"]) && this.group) {
      this.background = this.group.getBackground();
      return;
    }
    const t = c(this.source, ["p:spPr", "a:solidFill"]);
    if (t) {
      this.background = S(t, this.theme, this);
      return;
    }
    const s = c(this.source, ["p:spPr", "a:gradFill"]);
    if (s) {
      this.background = V(s, this.theme, this);
      return;
    }
    const e = c(this.source, ["p:spPr", "a:blipFill"]);
    if (e) {
      this.background = U(e, this.pptx, this.ctx);
      return;
    }
    const a = c(this.source, ["p:style", "a:fillRef"]);
    a && (this.background = S(a, this.theme, this));
  }
  _parseBorder() {
    const t = c(this.source, ["p:style", "a:lnRef"]);
    if (t) {
      const e = parseInt(t.attrs.idx), a = this.theme.getLineStyle(e);
      this.border = { ...a, ...this.border }, (!this.border.color || !this.border.color.color) && (this.border.color = S(t, this.theme, this));
    }
    const s = c(this.source, ["p:spPr", "a:ln"]);
    s && Object.assign(this.border, X(s, this.theme, this)), this.border.color && this.border.color.color && !this.border.width && (this.border.width = et.defaultBorderWidth);
  }
  _parseTxt() {
    this.textBody = new Re(c(this.source, ["p:txBody"]), this);
  }
};
et.defaultBorderWidth = 0.75;
let H = et;
class rt extends q {
  get base64() {
    return this.pptx.getMedia(this.path);
  }
  constructor(t, s, e, a, i) {
    var p, h;
    super(s, a, i), this.userDrawn = !0, this.pptx = e, this.path = t;
    const o = c(this.source, ["p:blipFill", "a:srcRect"]);
    o && (this.clip = {}, o.attrs.b && (this.clip.b = parseInt(o.attrs.b) / 1e5), o.attrs.t && (this.clip.t = parseInt(o.attrs.t) / 1e5), o.attrs.l && (this.clip.l = parseInt(o.attrs.l) / 1e5), o.attrs.r && (this.clip.r = parseInt(o.attrs.r) / 1e5));
    const n = c(s, ["p:nvPicPr", "p:nvPr", "a:audioFile", "attrs", "r:link"]);
    if (n) {
      const f = (p = this.ctx.rels[n]) == null ? void 0 : p.target;
      this.audioFile = this.pptx.getMedia(f);
    }
    const l = c(s, ["p:nvPicPr", "p:nvPr", "a:videoFile", "attrs", "r:link"]);
    if (l) {
      const f = (h = this.ctx.rels[l]) == null ? void 0 : h.target;
      this.videoFile = this.pptx.getMedia(f);
    }
  }
}
class we extends q {
  get slideMaster() {
    return this.ctx.slideMaster || this.ctx;
  }
  get theme() {
    return this.slideMaster.theme;
  }
  constructor(t, s, e, a) {
    super(t, e, a), this.userDrawn = !0, this.props = { tableStyleId: "" }, this.tableGrid = { gridCol: [] }, this.tr = [], this.tableStyles = {}, this.pptx = s, this._parseTableProps(), this._parseTableGrid(), this._parseTr(), this._parseInheritStyles();
  }
  _parseTableProps() {
    const t = c(this.source, ["a:graphic", "a:graphicData", "a:tbl", "a:tblPr"]);
    this.props.tableStyleId = c(t, "a:tableStyleId"), this.tableStyles = c(this.slideMaster.tableStyles, this.props.tableStyleId) || {}, c(t, ["attrs", "bandCol"]) === "1" && (this.props.bandCol = !0), c(t, ["attrs", "bandRow"]) === "1" && (this.props.bandRow = !0), c(t, ["attrs", "firstCol"]) === "1" && (this.props.firstCol = !0), c(t, ["attrs", "firstRow"]) === "1" && (this.props.firstRow = !0), c(t, ["attrs", "lastCol"]) === "1" && (this.props.lastCol = !0), c(t, ["attrs", "lastRow"]) === "1" && (this.props.lastRow = !0);
  }
  _parseTableGrid() {
    const t = c(this.source, ["a:graphic", "a:graphicData", "a:tbl", "a:tblGrid", "a:gridCol"]);
    if (t)
      for (let s = 0; s < t.length; s++) {
        const e = c(t[s], ["attrs", "w"]);
        this.tableGrid.gridCol.push({ width: P(parseInt(e)) });
      }
  }
  _parseTr() {
    const t = [];
    let s = c(this.source, ["a:graphic", "a:graphicData", "a:tbl", "a:tr"]);
    Array.isArray(s) || (s = [s]);
    for (let e = 0; e < s.length; e++) {
      const a = { props: {}, td: [] }, i = s[e];
      a.props.height = P(parseInt(c(i, ["attrs", "h"])));
      let o = c(i, ["a:tc"]);
      Array.isArray(o) || (o = [o]);
      for (let n = 0; n < o.length; n++)
        a.td.push(this._parseTd(o[n]));
      t.push(a);
    }
    this.tr = t;
  }
  _parseTd(t) {
    var l, p, h, f;
    const s = { props: { border: {} }, paragraphs: [] }, e = c(t, ["a:tcPr", "attrs"]);
    e != null && e.marB && (s.props.marB = P(parseInt(e.marB))), e != null && e.marT && (s.props.marT = P(parseInt(e.marT))), e != null && e.marL && (s.props.marL = P(parseInt(e.marL))), e != null && e.marR && (s.props.marR = P(parseInt(e.marR))), e != null && e.anchor && (s.props.anchor = e.anchor);
    const a = c(t, ["a:tcPr"]);
    c(a, ["a:lnR"]) && (s.props.border.right = X(c(a, ["a:lnR"]), this.theme, this.ctx)), c(a, ["a:lnL"]) && (s.props.border.left = X(c(a, ["a:lnL"]), this.theme, this.ctx)), c(a, ["a:lnT"]) && (s.props.border.top = X(c(a, ["a:lnT"]), this.theme, this.ctx)), c(a, ["a:lnB"]) && (s.props.border.bottom = X(c(a, ["a:lnB"]), this.theme, this.ctx)), (l = t == null ? void 0 : t.attrs) != null && l.rowSpan && (s.props.rowSpan = parseInt(t.attrs.rowSpan)), (p = t == null ? void 0 : t.attrs) != null && p.gridSpan && (s.props.gridSpan = parseInt(t.attrs.gridSpan)), (h = t == null ? void 0 : t.attrs) != null && h.vMerge && (s.props.vMerge = t.attrs.vMerge === "1"), (f = t == null ? void 0 : t.attrs) != null && f.hMerge && (s.props.hMerge = t.attrs.hMerge === "1");
    const i = c(t, ["a:tcPr", "a:solidFill"]);
    i && (s.props.background = S(i, this.theme, this.ctx));
    const o = c(t, ["a:txBody"]);
    let n = c(o, ["a:p"]);
    return Array.isArray(n) || (n = [n]), s.paragraphs = n.map((u) => this._parseParagraph(u)), s;
  }
  _parseParagraph(t) {
    const s = {
      props: {},
      inheritProps: {},
      inheritRProps: {},
      endParaRProps: {},
      rows: []
    }, e = c(t, ["a:pPr"]) || {};
    s.props = this._formatPPr(e);
    const a = c(t, ["a:endParaRPr"]);
    s.endParaRProps = this._formatRPr(a);
    let i = c(t, ["a:r"]) || [];
    Array.isArray(i) || (i = [i]);
    let o = c(t, ["a:br"]) || [];
    return Array.isArray(o) || (o = [o]), i = i.concat(o.map((n) => ({ isBr: !0, ...n }))), i.sort((n, l) => c(n, ["attrs", "order"]) - c(l, ["attrs", "order"])), s.rows = i.map((n) => this._parseRow(n)), s;
  }
  _parseRow(t) {
    if (t.isBr) return { isBr: !0 };
    const s = { props: {}, text: "" }, e = c(t, ["a:rPr"]) || {};
    return s.props = this._formatRPr(e), s.text = c(t, "a:t") || "", s;
  }
  _formatPPr(t) {
    const s = {}, e = c(t, "attrs") || {};
    return Object.keys(e).forEach((a) => {
      a === "algn" && (s.align = e[a]);
    }), c(t, ["a:lnSpc", "a:spcPct", "attrs", "val"]) && (s.lineHeight = parseInt(t["a:lnSpc"]["a:spcPct"].attrs.val) / 1e5), c(t, ["a:buAutoNum", "attrs", "type"]) && (s.buAutoNum = t["a:buAutoNum"].attrs.type), c(t, ["a:buChar", "attrs", "char"]) && (s.buChar = t["a:buChar"].attrs.char), c(t, ["a:spcBef", "a:spcPts", "attrs", "val"]) && (s.spaceBefore = parseInt(t["a:spcBef"]["a:spcPts"].attrs.val) / 100), c(t, ["a:spcAft", "a:spcPts", "attrs", "val"]) && (s.spaceAfter = parseInt(t["a:spcAft"]["a:spcPts"].attrs.val) / 100), s;
  }
  _formatRPr(t) {
    const s = {}, e = c(t, "attrs") || {};
    Object.keys(e).forEach((o) => {
      switch (o) {
        case "sz":
          s.size = parseInt(e[o]) / 100;
          break;
        case "b":
          s.bold = e[o] === "1";
          break;
        case "i":
          s.italic = e[o] === "1";
          break;
        case "u":
          s.underline = e[o];
          break;
        case "strike":
          s.strike = e[o];
          break;
        case "order":
        case "dirty":
          break;
        default:
          s[o] = e[o];
      }
    });
    const a = c(t, "a:solidFill");
    a && (s.color = S(a, this.theme, this.ctx));
    const i = c(t, "a:highlight");
    return i && (s.background = S(i, this.theme, this.ctx)), s.typeface = c(t, ["a:ea", "attrs", "typeface"]), s;
  }
  _isLastCol(t, s) {
    var e, a;
    if (s === t.length - 1) return !0;
    for (let i = s + 1; i < t.length; i++)
      if (!((e = t[i].props) != null && e.hMerge) && !((a = t[i].props) != null && a.vMerge)) return !1;
    return !0;
  }
  _isBandRow(t) {
    var s;
    return (s = this.props) != null && s.firstRow ? t % 2 === 1 : t % 2 === 0;
  }
  _isBandCol(t) {
    var s;
    return (s = this.props) != null && s.firstCol ? t % 2 === 1 : t % 2 === 0;
  }
  _parseInheritStyles() {
    var i, o, n, l, p, h, f, u;
    const t = (o = (i = this.tableStyles) == null ? void 0 : i.wholeTbl) == null ? void 0 : o.tcStyle, s = (l = (n = this.tableStyles) == null ? void 0 : n.wholeTbl) == null ? void 0 : l.tcTxStyle, e = (h = (p = this.slideMaster.defaultTextStyle) == null ? void 0 : p.lvl1) == null ? void 0 : h.props, a = (u = (f = this.slideMaster.defaultTextStyle) == null ? void 0 : f.lvl1) == null ? void 0 : u.defRPr;
    this.tr.forEach((d, w) => {
      d.td.forEach((L, b) => {
        var g, j, C, T, k, B, I, R, F, z, ft, ut, $t, wt, mt, bt, yt, xt, gt, Lt, At, Mt, Pt, kt, St, jt, Ct, Rt, vt, Tt, Bt, It, _t, Dt, Et, Ot, Ft, Gt, Zt, zt, Ht, Wt, Xt, Qt, Ut, Vt, qt, Yt, Jt, Kt, Nt, te, ee, se, re, ae;
        let m = { ...e, ...t }, x = { ...a, ...s };
        this.props.firstRow && w === 0 ? (m = {
          ...m,
          ...(j = (g = this.tableStyles) == null ? void 0 : g.firstRow) == null ? void 0 : j.tcStyle,
          border: { ...m == null ? void 0 : m.border, ...(k = (T = (C = this.tableStyles) == null ? void 0 : C.firstRow) == null ? void 0 : T.tcStyle) == null ? void 0 : k.border }
        }, x = { ...x, ...(I = (B = this.tableStyles) == null ? void 0 : B.firstRow) == null ? void 0 : I.tcTxStyle }) : this.props.lastRow && w === this.tr.length - 1 ? (m = {
          ...m,
          ...(F = (R = this.tableStyles) == null ? void 0 : R.lastRow) == null ? void 0 : F.tcStyle,
          border: { ...m == null ? void 0 : m.border, ...(ut = (ft = (z = this.tableStyles) == null ? void 0 : z.lastRow) == null ? void 0 : ft.tcStyle) == null ? void 0 : ut.border }
        }, x = { ...x, ...(wt = ($t = this.tableStyles) == null ? void 0 : $t.lastRow) == null ? void 0 : wt.tcTxStyle }) : this.props.firstCol && b === 0 ? (m = {
          ...m,
          ...(bt = (mt = this.tableStyles) == null ? void 0 : mt.firstCol) == null ? void 0 : bt.tcStyle,
          border: { ...m == null ? void 0 : m.border, ...(gt = (xt = (yt = this.tableStyles) == null ? void 0 : yt.firstCol) == null ? void 0 : xt.tcStyle) == null ? void 0 : gt.border }
        }, x = { ...x, ...(At = (Lt = this.tableStyles) == null ? void 0 : Lt.firstCol) == null ? void 0 : At.tcTxStyle }) : this.props.lastCol && this._isLastCol(d.td, b) ? (m = {
          ...m,
          ...(Pt = (Mt = this.tableStyles) == null ? void 0 : Mt.lastCol) == null ? void 0 : Pt.tcStyle,
          border: { ...m == null ? void 0 : m.border, ...(jt = (St = (kt = this.tableStyles) == null ? void 0 : kt.lastCol) == null ? void 0 : St.tcStyle) == null ? void 0 : jt.border }
        }, x = { ...x, ...(Rt = (Ct = this.tableStyles) == null ? void 0 : Ct.lastCol) == null ? void 0 : Rt.tcTxStyle }) : (this.props.bandRow && (this._isBandRow(w) ? (m = {
          ...m,
          ...(Tt = (vt = this.tableStyles) == null ? void 0 : vt.band1H) == null ? void 0 : Tt.tcStyle,
          border: { ...m == null ? void 0 : m.border, ...(_t = (It = (Bt = this.tableStyles) == null ? void 0 : Bt.band1H) == null ? void 0 : It.tcStyle) == null ? void 0 : _t.border }
        }, x = { ...x, ...(Et = (Dt = this.tableStyles) == null ? void 0 : Dt.band1H) == null ? void 0 : Et.tcTxStyle }) : (m = {
          ...m,
          ...(Ft = (Ot = this.tableStyles) == null ? void 0 : Ot.band2V) == null ? void 0 : Ft.tcStyle,
          border: { ...m == null ? void 0 : m.border, ...(zt = (Zt = (Gt = this.tableStyles) == null ? void 0 : Gt.band2V) == null ? void 0 : Zt.tcStyle) == null ? void 0 : zt.border }
        }, x = { ...x, ...(Wt = (Ht = this.tableStyles) == null ? void 0 : Ht.band2V) == null ? void 0 : Wt.tcTxStyle })), this.props.bandCol && (this._isBandCol(b) ? (m = {
          ...m,
          ...(Qt = (Xt = this.tableStyles) == null ? void 0 : Xt.band1V) == null ? void 0 : Qt.tcStyle,
          border: { ...m == null ? void 0 : m.border, ...(qt = (Vt = (Ut = this.tableStyles) == null ? void 0 : Ut.band1V) == null ? void 0 : Vt.tcStyle) == null ? void 0 : qt.border }
        }, x = { ...x, ...(Jt = (Yt = this.tableStyles) == null ? void 0 : Yt.band1V) == null ? void 0 : Jt.tcTxStyle }) : (m = {
          ...m,
          ...(Nt = (Kt = this.tableStyles) == null ? void 0 : Kt.band2H) == null ? void 0 : Nt.tcStyle,
          border: { ...m == null ? void 0 : m.border, ...(se = (ee = (te = this.tableStyles) == null ? void 0 : te.band2H) == null ? void 0 : ee.tcStyle) == null ? void 0 : se.border }
        }, x = { ...x, ...(ae = (re = this.tableStyles) == null ? void 0 : re.band2H) == null ? void 0 : ae.tcTxStyle }))), L.inheritTcStyle = m, L.inheritTcTxStyle = x;
      });
    });
  }
}
class me extends q {
  constructor(t, s, e, a) {
    super(t, e, a), this.nodes = [], this.pptx = s;
  }
  async parseNode() {
    try {
      const t = c(this.source, [
        "a:graphic",
        "a:graphicData",
        "dgm:relIds",
        "attrs",
        "r:dm"
      ]);
      if (!t || !this.ctx.rels[t]) return;
      const s = this.ctx.rels[t].target, e = await this.pptx.getXmlByPath(s), a = v(e), i = c(a, [
        "dgm:dataModel",
        "dgm:extLst",
        "a:ext",
        "dsp:dataModelExt",
        "attrs",
        "relId"
      ]);
      if (!i || !this.ctx.rels[i]) return;
      const o = this.ctx.rels[i].target;
      let n = await this.pptx.getXmlByPath(o);
      n = n.replace(/dsp:/g, "p:");
      const l = v(n), p = c(l, ["p:drawing", "p:spTree"]);
      await Y(this.nodes, p, this.pptx, this.ctx);
    } catch {
    }
  }
}
class be extends q {
  get slideMaster() {
    return this.ctx.slideMaster || this.ctx;
  }
  get theme() {
    return this.slideMaster.theme;
  }
  constructor(t, s, e, a) {
    super(t, e, a), this.options = {
      title: {},
      tooltip: {},
      legend: {},
      series: [],
      color: []
    }, this.userDrawn = !0, this.pptx = s;
  }
  async parseNode() {
    try {
      const t = c(this.source, [
        "a:graphic",
        "a:graphicData",
        "c:chart",
        "attrs",
        "r:id"
      ]);
      if (!t || !this.ctx.rels[t]) return;
      const s = this.ctx.rels[t].target, e = await this.pptx.getXmlByPath(s), a = v(e), i = c(a, ["c:chartSpace", "c:chart"]), o = c(i, ["c:plotArea"]);
      c(o, ["c:lineChart"]) ? this.parseLine(c(o, ["c:lineChart"]), i) : c(o, ["c:line3DChart"]) ? this.parseLine(c(o, ["c:line3DChart"]), i) : c(o, ["c:areaChart"]) ? this.parseAreaLine(c(o, ["c:areaChart"]), i) : c(o, ["c:area3DChart"]) ? this.parseAreaLine(c(o, ["c:area3DChart"]), i) : c(o, ["c:barChart"]) ? this.parseBar(c(o, ["c:barChart"]), i) : c(o, ["c:bar3DChart"]) ? this.parseBar(c(o, ["c:bar3DChart"]), i) : c(o, ["c:pieChart"]) ? this.parsePie(c(o, ["c:pieChart"])) : c(o, ["c:pie3DChart"]) ? this.parsePie(c(o, ["c:pie3DChart"])) : c(o, ["c:doughnutChart"]) && this.parseDoughnutChart(c(o, ["c:doughnutChart"]));
    } catch {
    }
  }
  parseAreaLine(t, s) {
    this.parseLine(t, s), this.options.series = this.options.series.map((e) => (e.areaStyle = {}, e));
  }
  parseLine(t, s) {
    let e = c(t, ["c:ser"]);
    Array.isArray(e) || (e = [e]), this.options.title = {
      top: "top",
      left: "center",
      text: this.parseChartTitle(c(s, ["c:title"]))
    }, this.options.xAxis = { type: "category", data: this.getCategory(e[0]) }, this.options.yAxis = { type: "value" }, this.options.series = this.parseLineSeries(e, t), this.options.color = this.parseLineColors(e), this.options.legend = { bottom: "bottom", left: "center" }, c(t, ["c:grouping", "attrs", "val"]) === "percentStacked" && (this.options.tooltip.valueFormatter = (a) => (100 * a).toFixed(2) + "%");
  }
  parseBar(t, s) {
    let e = c(t, ["c:ser"]);
    Array.isArray(e) || (e = [e]), this.options.title = {
      top: "top",
      left: "center",
      text: this.parseChartTitle(c(s, ["c:title"]))
    }, c(t, ["c:barDir", "attrs", "val"]) === "bar" ? (this.options.yAxis = { type: "category", data: this.getCategory(e[0]) }, this.options.xAxis = { type: "value" }) : (this.options.xAxis = { type: "category", data: this.getCategory(e[0]) }, this.options.yAxis = { type: "value" }), this.options.series = this.parseBarSeries(e, t), this.options.color = this.parseBarColors(e), this.options.legend = { bottom: "bottom", left: "center" }, c(t, ["c:grouping", "attrs", "val"]) === "percentStacked" && (this.options.tooltip.valueFormatter = (a) => (100 * a).toFixed(2) + "%");
  }
  parsePie(t) {
    const s = c(t, ["c:ser"]);
    this.options.title = { top: "top", left: "center", text: this.parsePieTitle(s) }, this.options.color = this.parsePieColors(s), this.options.series = [this.parsePieSeries(s, t)], this.options.legend = { bottom: "bottom", left: "center" };
  }
  parseDoughnutChart(t) {
    const s = c(t, ["c:ser"]);
    this.options.title.text = this.parsePieTitle(s), this.options.color = this.parsePieColors(s), this.options.series = [this.parsePieSeries(s, t)], this.options.legend = { bottom: "bottom", left: "center" };
  }
  parsePieTitle(t) {
    return c(t, ["c:tx", "c:strRef", "c:strCache", "c:pt", "c:v"]);
  }
  parseChartTitle(t) {
    let s = c(t, ["c:tx", "c:rich", "a:p"]);
    return Array.isArray(s) || (s = [s]), s.map((e) => {
      let a = c(e, ["a:r"]);
      return Array.isArray(a) || (a = [a]), a.map((i) => c(i, ["a:t"]) || "").join("");
    }).join("") || "图表标题";
  }
  parseBarColors(t) {
    return t.map(
      (s) => M(S(c(s, ["c:spPr", "a:solidFill"]), this.theme, this.ctx))
    );
  }
  parseLineColors(t) {
    return t.map(
      (s) => M(
        S(
          c(s, ["c:spPr", "a:ln", "a:solidFill"]) || c(s, ["c:spPr", "a:solidFill"]),
          this.theme,
          this.ctx
        )
      )
    );
  }
  parsePieColors(t) {
    const s = [];
    let e = c(t, ["c:dPt"]);
    return Array.isArray(e) || (e = [e]), e.forEach((a) => {
      s.push(M(S(c(a, ["c:spPr", "a:solidFill"]), this.theme, this.ctx)));
    }), s;
  }
  parsePieSeries(t, s) {
    const e = { type: "pie", radius: "80%", startAngle: 90, data: [] };
    c(s, ["c:holeSize", "attrs", "val"]) && (e.radius = [`${0.8 * c(s, ["c:holeSize", "attrs", "val"])}%`, "80%"]);
    const a = c(s, ["c:firstSliceAng", "attrs", "val"]);
    a && (e.startAngle = 90 - a);
    const i = this.getCategory(t), o = this.getVal(t);
    for (let n = 0; n < i.length; n++)
      e.data.push({ name: i[n], value: o[n] });
    return e;
  }
  parseBarSeries(t, s) {
    let e;
    const a = c(s, ["c:grouping", "attrs", "val"]);
    a === "stacked" ? e = "Ad" : a === "percentStacked" && (e = "total");
    const i = t.map((o) => ({
      type: "bar",
      name: c(o, ["c:tx", "c:strRef", "c:strCache", "c:pt", "c:v"]),
      data: this.getVal(o),
      stack: e
    }));
    if (a === "percentStacked") {
      let o = [];
      i.forEach((n, l) => {
        o = l === 0 ? [...n.data] : o.map((p, h) => p + n.data[h]);
      }), i.forEach((n) => {
        n.data = n.data.map((l, p) => o[p] <= 0 ? 0 : l / o[p]);
      });
    }
    return i;
  }
  parseLineSeries(t, s) {
    let e;
    const a = c(s, ["c:grouping", "attrs", "val"]);
    a === "stacked" ? e = "Ad" : a === "percentStacked" && (e = "total");
    const i = t.map((o) => ({
      type: "line",
      name: c(o, ["c:tx", "c:strRef", "c:strCache", "c:pt", "c:v"]),
      data: this.getVal(o),
      stack: e
    }));
    if (e === "total") {
      let o = [];
      i.forEach((n, l) => {
        o = l === 0 ? [...n.data] : o.map((p, h) => p + n.data[h]);
      }), i.forEach((n) => {
        n.data = n.data.map((l, p) => o[p] <= 0 ? 0 : l / o[p]);
      });
    }
    return i;
  }
  getCategory(t) {
    if (c(t, ["c:cat", "c:strRef"])) {
      let s = c(t, ["c:cat", "c:strRef", "c:strCache", "c:pt"]);
      return Array.isArray(s) || (s = [s]), s.map((e) => c(e, ["c:v"]));
    }
    if (c(t, ["c:cat", "c:numRef"])) {
      let s = c(t, ["c:cat", "c:numRef", "c:numCache", "c:pt"]);
      return Array.isArray(s) || (s = [s]), s.map((e) => c(e, ["c:v"]));
    }
    return [];
  }
  getVal(t) {
    let s = c(t, ["c:val", "c:numRef", "c:numCache", "c:pt"]);
    return Array.isArray(s) || (s = [s]), s.map((e) => +c(e, ["c:v"]));
  }
}
class ht {
  constructor(t, s, e, a) {
    if (this.offset = { x: 0, y: 0 }, this.chOffset = { x: 0, y: 0 }, this.extend = { w: 0, h: 0 }, this.chExtend = { w: 0, h: 0 }, this.rotate = 0, this.nodes = [], this.flipV = !1, this.flipH = !1, this.userDrawn = !0, this.order = c(t, ["attrs", "order"]), this.pptx = s, this.ctx = e, this.source = t, this.group = a, this.source["p:grpSpPr"]) {
      const i = c(this.source, ["p:grpSpPr", "a:xfrm"]);
      if (i) {
        const o = this.group && this.pptx.wps;
        if (this.offset = {
          x: Math.round(o ? E(parseInt(i["a:off"].attrs.x)) : P(parseInt(i["a:off"].attrs.x))),
          y: Math.round(o ? E(parseInt(i["a:off"].attrs.y)) : P(parseInt(i["a:off"].attrs.y)))
        }, this.chOffset = {
          x: Math.round(
            W(i["a:chOff"].attrs.x) === "point" || this.pptx.wps ? E(parseInt(i["a:chOff"].attrs.x)) : P(parseInt(i["a:chOff"].attrs.x))
          ),
          y: Math.round(
            W(i["a:chOff"].attrs.y) === "point" || this.pptx.wps ? E(parseInt(i["a:chOff"].attrs.y)) : P(parseInt(i["a:chOff"].attrs.y))
          )
        }, this.chExtend = {
          w: Math.round(
            W(i["a:chExt"].attrs.cx) === "point" || this.pptx.wps ? E(parseInt(i["a:chExt"].attrs.cx)) : P(parseInt(i["a:chExt"].attrs.cx))
          ),
          h: Math.round(
            W(i["a:chExt"].attrs.cy) === "point" || this.pptx.wps ? E(parseInt(i["a:chExt"].attrs.cy)) : P(parseInt(i["a:chExt"].attrs.cy))
          )
        }, this.extend = {
          w: Math.round(o ? E(parseInt(i["a:ext"].attrs.cx)) : P(parseInt(i["a:ext"].attrs.cx))),
          h: Math.round(o ? E(parseInt(i["a:ext"].attrs.cy)) : P(parseInt(i["a:ext"].attrs.cy)))
        }, this.rotate = st(parseInt(c(i, "attrs.rot", 0))), this.flipV = c(i, "attrs.flipV") === "1", this.flipH = c(i, "attrs.flipH") === "1", a) {
          const n = a.extend, l = a.chExtend, p = a.chOffset, h = n.w / l.w, f = n.h / l.h;
          this.extend.w = this.extend.w * h, this.extend.h = this.extend.h * f, this.offset.x = (this.offset.x - p.x) * h, this.offset.y = (this.offset.y - p.y) * f;
        }
      }
    }
    this._parseBackground(), this._parseNodes();
  }
  getBackground() {
    return this.background && this.background.type !== "none" ? this.background : this.group ? this.group.getBackground() : void 0;
  }
  _parseBackground() {
    const t = c(this.source, ["p:grpSpPr"]);
    t && t["a:solidFill"] ? this.background = S(t["a:solidFill"], this.ctx.theme, this.ctx) : t && t["a:gradFill"] ? this.background = V(t["a:gradFill"], this.ctx.theme, this.ctx) : t && t["a:blipFill"] && (this.background = U(t["a:blipFill"], this.pptx, this.ctx));
  }
  _parseNodes() {
    Y(this.nodes, this.source, this.pptx, this.ctx, this);
  }
}
function oe(r) {
  const t = {}, s = c(r, "attrs") || {};
  return Object.keys(s).forEach((e) => {
    switch (e) {
      case "algn":
        t.align = s[e];
        break;
      case "marL":
        t.marginLeft = P(parseInt(s[e]));
        break;
      case "indent":
        t.indent = P(parseInt(s[e]));
        break;
      case "lvl":
        t.level = s[e];
        break;
    }
  }), c(r, ["a:lnSpc", "a:spcPct", "attrs", "val"]) && (t.lineHeight = parseInt(r["a:lnSpc"]["a:spcPct"].attrs.val) / 1e5), t;
}
function ne(r, t, s) {
  const e = {}, a = c(r, "attrs") || {};
  Object.keys(a).forEach((o) => {
    switch (o) {
      case "sz":
        e.size = parseInt(a[o]) / 100;
        break;
      case "b":
        e.bold = a[o] === "1";
        break;
      case "i":
        e.italic = a[o] === "1";
        break;
      case "u":
        e.underline = a[o];
        break;
      case "strike":
        e.strike = a[o];
        break;
      case "order":
      case "dirty":
        break;
      default:
        e[o] = a[o];
    }
  });
  const i = c(r, "a:solidFill");
  return i && (e.color = S(i, t, s)), e;
}
async function Y(r, t, s, e, a) {
  const i = [];
  for (const o in t) i.push(o);
  for (let o = 0; o < i.length; o++) {
    const n = i[o];
    if (n in t)
      switch (n) {
        case "p:sp": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++)
            r.push(new H(l[p], s, e, a));
          break;
        }
        case "p:pic": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++) {
            const h = l[p], f = h["p:blipFill"]["a:blip"].attrs["r:embed"], u = e.rels[f].target, d = new rt(u, h, s, e, a);
            r.push(d);
          }
          break;
        }
        case "p:cxnSp": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++)
            r.push(new H(l[p], s, e, a));
          break;
        }
        case "p:graphicFrame": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++) {
            const h = l[p];
            switch (c(h, ["a:graphic", "a:graphicData", "attrs", "uri"])) {
              case "http://schemas.openxmlformats.org/drawingml/2006/table":
                r.push(new we(h, s, e, a));
                break;
              case "http://schemas.openxmlformats.org/drawingml/2006/diagram": {
                const u = new me(h, s, e, a);
                await u.parseNode(), r.push(u);
                break;
              }
              case "http://schemas.openxmlformats.org/drawingml/2006/chart": {
                const u = new be(h, s, e, a);
                await u.parseNode(), r.push(u);
                break;
              }
            }
          }
          break;
        }
        case "p:grpSp": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++)
            r.push(new ht(l[p], s, e, a));
          break;
        }
      }
  }
}
class ve {
  get index() {
    if (!this.name) return 0;
    const t = this.name.match(/(\d+)/);
    return t ? parseInt(t[0]) : 1;
  }
  get slideMaster() {
    return this.slideLayout && this.slideLayout.slideMaster;
  }
  get theme() {
    return this.slideMaster.theme;
  }
  get _relsPath() {
    return this.name.replace("slides/slide", "slides/_rels/slide") + ".rels";
  }
  constructor(t, s, e) {
    this.slideType = "slide", this.rels = {}, this.background = { type: "none" }, this.nodes = [], this.name = t, this.source = s, this.pptx = e;
  }
  async load() {
    await this._loadRels(), this._loadBackground(), await this._loadNodes();
  }
  async _loadRels() {
    const t = await this.pptx.getXmlByPath(this._relsPath), s = v(t);
    let e = c(s, ["Relationships", "Relationship"]) || [];
    Array.isArray(e) || (e = [e]), e.forEach((a) => {
      switch (c(a, ["attrs", "Type"])) {
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout": {
          let i = a.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.slideLayout = this.pptx.getSlideLayout(i);
          break;
        }
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio":
        case "http://schemas.microsoft.com/office/2007/relationships/media":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/video":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramLayout":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramData":
        case "http://schemas.microsoft.com/office/2007/relationships/diagramDrawing":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/diagramColors":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart": {
          let i = a.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.rels[a.attrs.Id] = {
            type: a.attrs.Type.split("/").pop(),
            target: i
          };
          break;
        }
      }
    });
  }
  _loadBackground() {
    const t = c(this.source, ["p:sld", "p:cSld", "p:bg", "p:bgPr"]);
    t && t["a:solidFill"] ? this.background = S(t["a:solidFill"], this.theme, this) : t && t["a:gradFill"] ? this.background = V(t["a:gradFill"], this.theme, this) : t && t["a:blipFill"] && (this.background = U(t["a:blipFill"], this.pptx, this));
  }
  async _loadNodes() {
    const t = c(this.source, ["p:sld", "p:cSld", "p:spTree"]);
    await Y(this.nodes, t, this.pptx, this);
  }
  getColorThemeName(t) {
    return this.slideLayout.getColorThemeName(t);
  }
  getNodeInheritAttrsByType(t, s) {
    const e = this.slideLayout.getNodeByType(t);
    return c(e.source, s) || this.slideLayout.getNodeInheritAttrsByType(t, s);
  }
  getNodeInheritAttrsByIdx(t, s) {
    const e = this.slideLayout.getNodeByIdx(t);
    return c(e.source, s) || this.slideLayout.getNodeInheritAttrsByIdx(t, s);
  }
}
class Te {
  get _relsPath() {
    return this.name.replace("slideLayouts/slideLayout", "slideLayouts/_rels/slideLayout") + ".rels";
  }
  get theme() {
    return this.slideMaster.theme;
  }
  constructor(t, s, e) {
    this.slideType = "slideLayout", this.rels = {}, this.background = { type: "none" }, this.nodes = [], this.name = t, this.source = s, this.pptx = e;
  }
  async load() {
    await this._loadRels(), await this._loadBackground(), await this._loadNodes();
  }
  async _loadRels() {
    const t = await this.pptx.getXmlByPath(this._relsPath), s = v(t);
    let e = c(s, ["Relationships", "Relationship"]) || [];
    Array.isArray(e) || (e = [e]), e.forEach((a) => {
      switch (c(a, ["attrs", "Type"])) {
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster": {
          let i = a.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.slideMaster = this.pptx.getSlideMaster(i);
          break;
        }
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio":
        case "http://schemas.microsoft.com/office/2007/relationships/media":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/video": {
          let i = a.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.rels[a.attrs.Id] = {
            type: a.attrs.Type.split("/").pop(),
            target: i
          };
          break;
        }
      }
    });
  }
  async _loadBackground() {
    const t = c(this.source, ["p:sldLayout", "p:cSld", "p:bg", "p:bgPr"]);
    t && t["a:solidFill"] ? this.background = S(t["a:solidFill"], this.theme) : t && t["a:gradFill"] ? this.background = V(t["a:gradFill"], this.theme, this) : t && t["a:blipFill"] && (this.background = U(t["a:blipFill"], this.pptx, this));
  }
  async _loadNodes() {
    const t = c(this.source, ["p:sldLayout", "p:cSld", "p:spTree"]);
    Y(this.nodes, t, this.pptx, this);
  }
  getColorThemeName(t) {
    return this.slideMaster.getColorThemeName(t);
  }
  getNodeByType(t) {
    return this.nodes.find((s) => s.type === t);
  }
  getNodeByIdx(t) {
    return this.nodes.find((s) => s.idx === t);
  }
  getNodeInheritAttrsByType(t, s) {
    const e = this.slideMaster.getNodeByType(t);
    return e && c(e.source, s);
  }
  getNodeInheritAttrsByIdx(t, s) {
    const e = this.slideMaster.getNodeByIdx(t);
    return e && c(e.source, s);
  }
}
class Be {
  get _relsPath() {
    return this.name.replace("slideMasters/slideMaster", "slideMasters/_rels/slideMaster") + ".rels";
  }
  constructor(t, s, e) {
    this.slideType = "slideMaster", this.rels = {}, this.background = { type: "none" }, this.textStyles = { titleStyle: {}, bodyStyle: {}, otherStyle: {} }, this.defaultTextStyle = {}, this.nodes = [], this.tableStyles = {}, this.name = t, this.source = s, this.pptx = e, this.load();
  }
  async load() {
    await this._parseRels(), this._parseColorMap(), this._parseBackground(), this._parseTextStyles(), this._parseTableStyles(), this._parseDefaultTextStyle(), this._loadNodes();
  }
  async _parseRels() {
    const t = await this.pptx.getXmlByPath(this._relsPath), s = v(t);
    let e = c(s, ["Relationships", "Relationship"]) || [];
    Array.isArray(e) || (e = [e]), e.forEach((a) => {
      switch (c(a, ["attrs", "Type"])) {
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme": {
          let i = a.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.theme = this.pptx.getTheme(i);
          break;
        }
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio":
        case "http://schemas.microsoft.com/office/2007/relationships/media":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/video": {
          let i = a.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.rels[a.attrs.Id] = {
            type: a.attrs.Type.split("/").pop(),
            target: i
          };
          break;
        }
      }
    });
  }
  _parseColorMap() {
    this.colorMap = Me(
      c(this.source, ["p:sldMaster", "p:clrMap", "attrs"]) || {},
      ["order"]
    );
  }
  getColorThemeName(t) {
    return this.colorMap[t] || t;
  }
  _parseBackground() {
    const t = c(this.source, ["p:sldMaster", "p:cSld", "p:bg", "p:bgPr"]), s = c(this.source, ["p:sldMaster", "p:cSld", "p:bg", "p:bgRef"]);
    t && t["a:solidFill"] ? this.background = S(t["a:solidFill"], this.theme, this) : t && t["a:gradFill"] ? this.background = V(t["a:gradFill"], this.theme, this) : t && t["a:blipFill"] ? this.background = U(t["a:blipFill"], this.pptx, this) : s && (this.background = S(s, this.theme, this));
  }
  _parseDefaultTextStyle() {
    const t = this.pptx.defaultTextStyleSource;
    Object.keys(t).forEach((s) => {
      if (s.startsWith("a:") && s.endsWith("pPr")) {
        const e = s.substr(2, s.length - 5), a = c(t[s], ["a:defRPr"]);
        this.defaultTextStyle[e] = {
          props: oe(t[s]),
          defRPr: ne(a, this.theme, this)
        };
      }
    });
  }
  _parseTextStyles() {
    const t = c(this.source, ["p:sldMaster", "p:txStyles"]);
    ["titleStyle", "bodyStyle", "otherStyle"].forEach((s) => {
      const e = this.textStyles[s], a = c(t, `p:${s}`) || {};
      Object.keys(a).forEach((i) => {
        if (i.startsWith("a:") && i.endsWith("pPr")) {
          const o = i.substr(2, i.length - 5);
          e[o] = {}, e[o].props = oe(a[i]);
          const n = c(a[i], ["a:defRPr"]);
          e[o].defRPr = ne(n, this.theme, this);
        }
      });
    });
  }
  _parseTableStyles() {
    const t = {};
    let s = c(this.pptx.tableStyles, ["a:tblStyleLst", "a:tblStyle"]) || [];
    Array.isArray(s) || (s = [s]), s.forEach((e) => {
      const a = c(e, ["attrs", "styleId"]);
      t[a] = {}, Object.keys(e).forEach((i) => {
        if (i.startsWith("a:")) {
          const o = i.substr(2);
          t[a][o] = {};
          const n = c(e[i], ["a:tcStyle"]);
          if (n) {
            const p = {};
            c(n, ["a:fill", "a:solidFill"]) && (p.background = S(c(n, ["a:fill", "a:solidFill"]), this.theme, this));
            const h = c(n, "a:tcBdr");
            h && (p.border = {}, Object.keys(h).forEach((f) => {
              if (f.startsWith("a:")) {
                const u = f.substr(2), d = c(h[f], ["a:ln"]);
                p.border[u] = X(d, this.theme, this);
              }
            })), t[a][o].tcStyle = p;
          }
          const l = c(e[i], ["a:tcTxStyle"]);
          if (l) {
            const p = {};
            p.color = S(l, this.theme, this), c(l, ["attrs", "b"]) === "on" && (p.bold = !0), t[a][o].tcTxStyle = p;
          }
        }
      });
    }), this.tableStyles = t;
  }
  async _loadNodes() {
    const t = c(this.source, ["p:sldMaster", "p:cSld", "p:spTree"]);
    Y(this.nodes, t, this.pptx, this);
  }
  getNodeByType(t) {
    return this.nodes.find((s) => s.type === t);
  }
  getNodeByIdx(t) {
    return this.nodes.find((s) => s.idx === t);
  }
  getNodeInheritAttrsByType(t, s) {
  }
  getNodeInheritAttrsByIdx(t, s) {
  }
}
class Ie {
  constructor(t, s, e) {
    this.clrScheme = {}, this.borderScheme = [], this.name = t, this.source = s, this.pptx = e, this._parseClrScheme(), this._parseLineStyleLst();
  }
  _parseClrScheme() {
    const t = c(this.source, ["a:theme", "a:themeElements", "a:clrScheme"]);
    for (const s in t)
      if (s.startsWith("a:")) {
        const e = s.substring(2), a = c(t[s], ["a:sysClr", "attrs", "lastClr"]) || c(t[s], ["a:srgbClr", "attrs", "val"]);
        this.clrScheme[e] = "#" + a;
      }
  }
  _parseLineStyleLst() {
    const t = c(this.source, [
      "a:theme",
      "a:themeElements",
      "a:fmtScheme",
      "a:lnStyleLst",
      "a:ln"
    ]) || [];
    this.borderScheme = t.map((s) => {
      const e = { color: {} };
      return c(s, ["attrs", "w"]) && (e.width = P(parseInt(c(s, ["attrs", "w"])))), c(s, ["attrs", "algn"]) && (e.algn = c(s, ["attrs", "algn"])), c(s, ["attrs", "cap"]) && (e.cap = c(s, ["attrs", "cap"])), c(s, ["attrs", "cmpd"]) && (e.cmpd = c(s, ["attrs", "cmpd"])), c(s, ["a:miter", "attrs", "lim"]) && (e.miterLim = P(parseInt(c(s, ["a:miter", "attrs", "lim"])))), c(s, ["a:prstDash", "attrs", "val"]) && (e.type = c(s, ["a:prstDash", "attrs", "val"])), c(s, ["a:solidFill"]) && (e.color = S(c(s, ["a:solidFill"]), this)), e;
    });
  }
  getColor(t) {
    if (t !== "phClr")
      return this.clrScheme[t] || this.defaultColor;
  }
  getLineStyle(t) {
    return this.borderScheme[t - 1];
  }
}
class ce {
  constructor() {
    this.slides = [], this.slideLayouts = [], this.slideMaster = [], this.themes = [], this.medias = {}, this.wps = !1;
  }
  async load(t) {
    const s = new Ae();
    this._zipContents = await s.loadAsync(t), await this._loadThumbnail(), await this._loadMedia(), await this._loadPresentation(), await this._loadContentTypes();
  }
  async _loadThumbnail() {
    try {
      if (this._zipContents.files["docProps/thumbnail.jpeg"]) {
        const t = await this._zipContents.files["docProps/thumbnail.jpeg"].async("base64");
        this.thumbnail = "data:image/jpeg;base64," + t;
      }
    } catch {
    }
  }
  async _loadPresentation() {
    var t;
    try {
      const s = await this._zipContents.files["ppt/presentation.xml"].async("text"), e = v(s), a = e["p:presentation"]["p:sldSz"].attrs;
      if (this.width = P(parseInt(a.cx)), this.height = P(parseInt(a.cy)), this.defaultTextStyleSource = e["p:presentation"]["p:defaultTextStyle"], this._zipContents.files["docProps/app.xml"]) {
        const i = await this._zipContents.files["docProps/app.xml"].async("text"), o = v(i), n = (t = o == null ? void 0 : o.Properties) == null ? void 0 : t.Application;
        this.wps = (n == null ? void 0 : n.includes("WPS")) || !1;
      }
    } catch {
    }
  }
  async _loadContentTypes() {
    try {
      const t = await this._zipContents.files["[Content_Types].xml"].async("text"), e = v(t).Types.Override, a = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.theme+xml"
      );
      if (a)
        for (const p of a) {
          const h = p.attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), u = v(f);
          this.themes.push(new Ie(h, u, this));
        }
      const i = e.find(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"
      );
      if (i) {
        const p = i.attrs.PartName.substr(1), h = await this._zipContents.files[p].async("text");
        this.tableStyles = v(h);
      }
      const o = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"
      );
      for (let p = 0; p < o.length; p++) {
        const h = o[p].attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), u = v(f);
        this.slideMaster.push(new Be(h, u, this));
      }
      const n = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
      );
      for (let p = 0; p < n.length; p++) {
        const h = n[p].attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), u = v(f), d = new Te(h, u, this);
        await d.load(), this.slideLayouts.push(d);
      }
      const l = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"
      );
      for (let p = 0; p < l.length; p++) {
        const h = l[p].attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), u = v(f), d = new ve(h, u, this);
        await d.load(), this.slides.push(d);
      }
      this.slides.sort((p, h) => p.index - h.index);
    } catch {
    }
  }
  async _loadMedia() {
    const t = Object.keys(this._zipContents.files).filter((e) => e.startsWith("ppt/media/image")).map((e) => this._zipContents.files[e]);
    for (const e of t) {
      const a = e.name.substr(2 + (~-e.name.lastIndexOf(".") >>> 0));
      let i;
      switch (a) {
        case "jpg":
        case "jpeg":
          i = "image/jpeg";
          break;
        case "png":
          i = "image/png";
          break;
        case "gif":
          i = "image/gif";
          break;
        case "emf":
          i = "image/x-emf";
          break;
        case "wmf":
          i = "image/x-wmf";
          break;
        default:
          i = "image/*";
      }
      const o = await e.async("base64");
      this.medias[e.name] = `data:${i};base64,${o}`;
    }
    const s = Object.keys(this._zipContents.files).filter(
      (e) => e.startsWith("ppt/media/media") && ["mp3", "wav", "ogg", "mp4", "webm"].includes(e.split(".").pop().toLowerCase())
    ).map((e) => this._zipContents.files[e]);
    for (const e of s) {
      const a = e.name.split(".").pop().toLowerCase(), i = await e.async("arraybuffer"), o = new Blob([i], {
        type: `${["mp3", "wav"].includes(a) ? "audio" : "video"}/${a}`
      });
      this.medias[e.name] = URL.createObjectURL(o);
    }
  }
  async getXmlByPath(t) {
    if (!this._zipContents.files[t]) throw new Error("文件不存在");
    return await this._zipContents.files[t].async("text");
  }
  getSlideLayout(t) {
    return this.slideLayouts.find((s) => s.name === t);
  }
  getSlideMaster(t) {
    return this.slideMaster.find((s) => s.name === t);
  }
  getTheme(t) {
    return this.themes.find((s) => s.name === t);
  }
  getMedia(t) {
    return this.medias[t];
  }
}
function pt(r) {
  const t = r.extend, s = r.offset, e = r.clip, a = r.base64, i = r.audioFile, o = r.videoFile, n = document.createElement("div");
  n.style.setProperty("position", "absolute"), n.style.setProperty("left", s.x + "px"), n.style.setProperty("top", s.y + "px");
  let l, p, h, f;
  const u = document.createElement("div");
  u.style.setProperty("position", "absolute"), u.style.setProperty("left", "0"), u.style.setProperty("top", "0"), u.style.setProperty("width", t.w + "px"), u.style.setProperty("height", t.h + "px"), u.style.setProperty("overflow", "hidden"), e ? (l = t.w / (1 - (e.l ?? 0) - (e.r ?? 0)), p = t.h / (1 - (e.t ?? 0) - (e.b ?? 0)), h = -1 * l * (e.l ?? 0), f = -1 * p * (e.t ?? 0)) : (l = t.w, p = t.h, h = 0, f = void 0);
  const d = document.createElement("img");
  if (d.src = a, d.width = l, d.height = p, d.style.setProperty("position", "absolute"), d.style.setProperty("left", h + "px"), d.style.setProperty("top", f + "px"), u.append(d), n.append(u), i) {
    const w = document.createElement("audio");
    w.style.position = "absolute", w.style.left = "0", w.style.top = "0", w.src = i, w.controls = !0, w.style.transform = "translate(-50%)", n.append(w);
  }
  if (o) {
    const w = document.createElement("video");
    w.style.position = "absolute", w.style.left = "0", w.style.top = "0", w.width = t.w, w.height = t.h, w.src = o, w.controls = !0, n.append(w);
  }
  return n;
}
const _e = "http://www.w3.org/2000/svg";
function $(r) {
  return document.createElementNS(_e, r);
}
function D(r) {
  const t = r.extend;
  return 0.16667 * Math.min(t.w, t.h);
}
function A(r, t, s) {
  if (t.prstGeom && t.prstGeom.gd) {
    const a = (Array.isArray(t.prstGeom.gd) ? t.prstGeom.gd : [t.prstGeom.gd]).find((i) => i.name === r);
    if (a) return a.fmla;
  }
  return s;
}
function y(r, t, s) {
  const e = A(r, t);
  if (e !== void 0) {
    const a = t.extend;
    return Math.min(a.w, a.h) * e;
  }
  return s !== void 0 ? s : D(t);
}
function ye(r, t, s) {
  const e = A(r, t);
  if (e !== void 0) {
    const a = t.extend;
    return Math.max(a.w, a.h) * e;
  }
  return s !== void 0 ? s : D(t);
}
function _(r, t, s, e, a) {
  const i = r * Math.PI / 180, o = i === 0 || i === 2 * Math.PI ? t + e : i === Math.PI ? t - e : i === Math.PI / 2 || i === 3 * Math.PI / 2 ? t : i > 0 && i < Math.PI / 2 || i > 3 * Math.PI / 2 && i < 2 * Math.PI ? t + Math.sqrt(1 / (1 / Math.pow(e, 2) + Math.pow(Math.tan(i), 2) / Math.pow(a, 2))) : t - Math.sqrt(1 / (1 / Math.pow(e, 2) + Math.pow(Math.tan(i), 2) / Math.pow(a, 2))), n = i === 0 || i === 2 * Math.PI || i === Math.PI ? s : i === Math.PI / 2 ? s + a : i === 3 * Math.PI / 2 ? s - a : i > Math.PI && i < 2 * Math.PI ? s - Math.sqrt(1 / (1 / Math.pow(a, 2) + Math.pow(1 / Math.tan(i), 2) / Math.pow(e, 2))) : s + Math.sqrt(1 / (1 / Math.pow(a, 2) + Math.pow(1 / Math.tan(i), 2) / Math.pow(e, 2)));
  return [o, n];
}
function J(r, t) {
  let s = 0;
  return (t > r && t - r > 180 || t < r && r - t < 180) && (s = 1), s;
}
function K(r) {
  const t = r.extend, s = 0.146 * t.w, e = 0.146 * t.h;
  return {
    top: e,
    bottom: e,
    left: s,
    right: s,
    w: t.w - 2 * s,
    h: t.h - 2 * e
  };
}
function O(r, t) {
  let s = 0;
  switch (r) {
    case "sm":
      s = 1 * t;
      break;
    case "med":
      s = 1.5 * t;
      break;
    case "lg":
      s = 2.5 * t;
      break;
  }
  return Math.max(s, 2);
}
function le(r, t, s, e = !1) {
  const a = r.border || {}, i = r.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = a, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = O(f, n), w = O(u, n), L = $("defs"), b = $("marker"), m = `marker-${i}-${e ? "start" : "end"}`;
  b.setAttribute("id", m), b.setAttribute("viewBox", `0 0 ${2 * d} ${2 * w}`), b.setAttribute("refX", d + "px"), b.setAttribute("refY", w + "px"), b.setAttribute("markerWidth", 2 * d + "px"), b.setAttribute("markerHeight", 2 * w + "px"), b.setAttribute("orient", "auto"), b.setAttribute("markerUnits", "userSpaceOnUse");
  const x = $("ellipse");
  x.setAttribute("cx", d + "px"), x.setAttribute("cy", w + "px"), x.setAttribute("rx", d + "px"), x.setAttribute("ry", w + "px"), x.setAttribute("fill", M(l) || "transparent"), b.appendChild(x), L.appendChild(b), t.appendChild(L), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${m})`);
}
function he(r, t, s, e = !1) {
  const a = r.border || {}, i = r.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = a, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = O(f, n), w = O(u, n), L = $("defs"), b = $("marker"), m = `marker-${i}-${e ? "start" : "end"}`;
  b.setAttribute("id", m), b.setAttribute("viewBox", `0 0 ${2 * d} ${2 * w}`), b.setAttribute("refX", (e ? 0.9 * d : 1.1 * d) + "px"), b.setAttribute("refY", w + "px"), b.setAttribute("markerWidth", 2 * d + "px"), b.setAttribute("markerHeight", 2 * w + "px"), b.setAttribute("orient", "auto"), b.setAttribute("markerUnits", "userSpaceOnUse");
  const x = $("path"), g = e ? [`M ${2 * d},0`, `L 0,${w}`, `L ${2 * d},${2 * w}`, "Z"].join(" ") : ["M 0,0", `L ${2 * d},${w}`, `L 0,${2 * w}`, "Z"].join(" ");
  x.setAttribute("d", g), x.setAttribute("fill", M(l) || "transparent"), b.appendChild(x), L.appendChild(b), t.appendChild(L), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${m})`);
}
function pe(r, t, s, e = !1) {
  const a = r.border || {}, i = r.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = a, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = O(f, n), w = O(u, n), L = $("defs"), b = $("marker"), m = `marker-${i}-${e ? "start" : "end"}`;
  b.setAttribute("id", m), b.setAttribute("viewBox", `0 0 ${2 * d} ${2 * w}`), b.setAttribute("refX", d + "px"), b.setAttribute("refY", w + "px"), b.setAttribute("markerWidth", 2 * d + "px"), b.setAttribute("markerHeight", 2 * w + "px"), b.setAttribute("orient", "auto"), b.setAttribute("markerUnits", "userSpaceOnUse");
  const x = $("path"), g = [
    `M 0,${w}`,
    `L ${d},0`,
    `L ${2 * d},${w}`,
    `L ${d},${2 * w}`,
    "Z"
  ].join(" ");
  x.setAttribute("d", g), x.setAttribute("fill", M(l) || "transparent"), b.appendChild(x), L.appendChild(b), t.appendChild(L), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${m})`);
}
function de(r, t, s, e = !1) {
  const a = r.border || {}, i = r.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = a, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = O(f, n), w = O(u, n), L = $("defs"), b = $("marker"), m = `marker-${i}-${e ? "start" : "end"}`;
  b.setAttribute("id", m), b.setAttribute("viewBox", `0 0 ${2 * d + 2 * n} ${2 * w + 2 * n}`);
  const x = e ? u === "lg" ? 2 * n : 3 * n : u === "lg" ? 2 * d : 2 * d - n;
  b.setAttribute("refX", x + "px"), b.setAttribute("refY", w + n + "px"), b.setAttribute("markerWidth", 2 * d + "px"), b.setAttribute("markerHeight", 2 * w + "px"), b.setAttribute("orient", "auto"), b.setAttribute("markerUnits", "userSpaceOnUse");
  const g = $("path"), j = e ? [
    `M ${2 * d + n}, ${n}`,
    `L ${n},${w + n}`,
    `L ${2 * d + n},${2 * w + n}`
  ].join(" ") : [
    `M ${n}, ${n}`,
    `L ${2 * d + n},${w + n}`,
    `L ${n},${2 * w + n}`
  ].join(" ");
  g.setAttribute("d", j), g.setAttribute("stroke-width", n + "px"), g.setAttribute("stroke", M(l) || "transparent"), g.setAttribute("fill", "transparent"), g.setAttribute("stroke-linecap", "round"), g.setAttribute("stroke-linejoin", "miter"), g.style.overflow = "visible", b.appendChild(g), L.appendChild(b), t.appendChild(L), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${m})`);
}
function fe(r, t, s, e = !1) {
  const a = r.border || {}, i = r.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = a, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = O(f, n), w = O(u, n), L = $("defs"), b = $("marker"), m = `marker-${i}-${e ? "start" : "end"}`;
  b.setAttribute("id", m), b.setAttribute("viewBox", `0 0 ${2 * d} ${2 * w}`);
  const x = e ? u === "sm" ? 1.5 * n : 2 * n : u === "sm" ? 2 * d - 1.5 * n : 2 * d - 2 * n;
  b.setAttribute("refX", x + "px"), b.setAttribute("refY", w + "px"), b.setAttribute("markerWidth", 2 * d + "px"), b.setAttribute("markerHeight", 2 * w + "px"), b.setAttribute("orient", "auto"), b.setAttribute("markerUnits", "userSpaceOnUse");
  const g = $("path"), j = e ? [
    `M 0, ${w}`,
    `L ${2 * d},0`,
    `L ${d},${w}`,
    `L ${2 * d},${2 * w}`,
    "Z"
  ].join(" ") : [
    "M 0,0",
    `L ${2 * d},${w}`,
    `L 0,${2 * w}`,
    `L ${d},${w}`,
    "Z"
  ].join(" ");
  g.setAttribute("d", j), g.setAttribute("fill", M(l) || "transparent"), g.style.overflow = "visible", b.appendChild(g), L.appendChild(b), t.appendChild(L), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${m})`);
}
function Q(r, t, s) {
  const e = r.border || {};
  r.extend;
  const { headEnd: a, tailEnd: i } = e;
  if (a && a.type !== "none")
    switch (a.type) {
      case "triangle":
        he(r, t, s, !0);
        break;
      case "oval":
        le(r, t, s, !0);
        break;
      case "diamond":
        pe(r, t, s, !0);
        break;
      case "arrow":
        de(r, t, s, !0);
        break;
      case "stealth":
        fe(r, t, s, !0);
        break;
    }
  if (i && i.type !== "none")
    switch (i.type) {
      case "triangle":
        he(r, t, s, !1);
        break;
      case "oval":
        le(r, t, s, !1);
        break;
      case "diamond":
        pe(r, t, s, !1);
        break;
      case "arrow":
        de(r, t, s, !1);
        break;
      case "stealth":
        fe(r, t, s, !1);
        break;
    }
}
function De(r, t, s) {
  var l;
  const e = { ...t, ...r.props }, a = document.createElement("span");
  a.innerHTML = typeof r.text == "string" ? r.text : "";
  let i = 18;
  e.size && ((l = s == null ? void 0 : s.normAutofit) != null && l.fontScale ? (i = e.size * s.normAutofit.fontScale, a.style.fontSize = i + "px") : (i = e.size, a.style.fontSize = i + "px"));
  const o = M(e.color);
  o && (a.style.color = o);
  const n = /^[^\u4e00-\u9fff]+$/;
  if (e.typeface)
    switch (a.style.fontFamily = e.typeface, e.typeface) {
      case "DengXian":
        n.test(r.text) && (a.style.letterSpacing = -0.04 * i + "px");
        break;
      case "DengXian Light":
        n.test(r.text) && (a.style.letterSpacing = -0.05 * i + "px");
        break;
      case "STLiti":
      case "SimSun":
      case "NSimSun":
      case "SimHei":
        n.test(r.text) && (a.style.fontSize = 0.85 * parseInt(a.style.fontSize) + "px");
        break;
      case "华文中宋":
      case "Fira Sans Extra Condensed Medium":
        a.style.fontSize = 0.85 * parseInt(a.style.fontSize) + "px";
        break;
      case "FangSong":
        a.style.letterSpacing = -0.08 * i + "px";
        break;
    }
  else
    n.test(r.text) && (a.style.letterSpacing = -0.04 * i + "px");
  return e.bold && (a.style.fontWeight = "bold"), e.italic && (a.style.fontStyle = "italic"), e.underline && e.underline !== "none" && (a.style.textDecoration = "underline"), e.background && (a.style.backgroundColor = M(e.background)), a.style.wordBreak = "break-word", a;
}
function Ee(r, t, s) {
  const e = document.createElement("span"), a = r.firstElementChild;
  switch (e.style.fontSize = a.style.fontSize, e.style.color = a.style.color, e.style.fontWeight = a.style.fontWeight, e.style.fontStyle = a.style.fontStyle, e.style.marginRight = "10px", t.buAutoNum) {
    case "arabicPeriod":
    default:
      e.textContent = s + ".";
      break;
    case "circleNumDbPlain":
      e.textContent = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳"][s - 1] || s + "";
      break;
    case "romanUcPeriod":
      e.textContent = Oe(s) + ".";
      break;
    case "alphaUcPeriod":
      e.textContent = at(s) + ".";
      break;
    case "alphaLcPeriod":
      e.textContent = at(s).toLowerCase() + ".";
      break;
    case "alphaLcParenR":
      e.textContent = at(s).toLowerCase() + ")";
      break;
    case "ea1JpnChsDbPeriod":
      e.textContent = Fe(s) + ".";
      break;
  }
  r.prepend(e);
}
function Oe(r) {
  const t = [
    { value: 1e3, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" }
  ];
  if (typeof r != "number" || r < 1 || r > 3999) throw new Error("Input must be a number between 1 and 3999.");
  let s = "";
  for (let e = 0; e < t.length; e++)
    for (; r >= t[e].value; )
      s += t[e].numeral, r -= t[e].value;
  return s;
}
function Fe(r) {
  const t = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  if (!Number.isInteger(r) || r < 0) return "";
  let s = "";
  const e = r.toString();
  for (let a = 0; a < e.length; a++) s += t[parseInt(e[a], 10)];
  return s;
}
function Ge(r, t) {
  const s = document.createElement("span"), e = r.firstElementChild;
  s.style.color = e.style.color, s.style.fontSize = e.style.fontSize;
  const a = {
    n: "■",
    l: "●",
    u: "◆",
    p: "□",
    ü: "✔",
    Ø: "➢",
    "•": "•"
  };
  s.textContent = a[t.buChar] || "■", s.style.marginRight = "10px", r.prepend(s);
}
function xe(r, t = 0, s = {}) {
  var L, b;
  const e = r.inheritProps, a = r.inheritRProps, i = r.props, o = r.rows, n = { ...e, ...i }, l = () => {
    var g, j;
    let m = 0;
    for (const C of o)
      C.props && C.props.size && (m = Math.max(m, C.props.size));
    const x = ((j = (g = s == null ? void 0 : s.bodyProps) == null ? void 0 : g.normAutofit) == null ? void 0 : j.fontScale) || 1;
    return (m || a.size || 18) * x;
  }, p = document.createElement("div"), h = s.isFirst ? 0 : n.spaceBefore || 0, f = s.isLast ? 0 : n.spaceAfter || 0;
  p.style.margin = `${Math.floor(0.2 * l())}px  0 0 0`, p.style.padding = `${Math.floor(h)}px 0px ${Math.floor(f)}px 0px`;
  const u = document.createElement("p");
  u.style.margin = "0", u.style.padding = "0px", u.style.wordBreak = "break-word";
  const d = { ctr: "center", l: "left", r: "right", dist: "justify" };
  u.style.textAlign = n.align && d[n.align] || "center", n.align === "dist" && (u.style.textAlignLast = "justify");
  let w = n.hasOwnProperty("lineHeight") ? n.lineHeight : 1;
  if ((b = (L = s.bodyProps) == null ? void 0 : L.normAutofit) != null && b.lnSpcReduction && (w *= 1 - s.bodyProps.normAutofit.lnSpcReduction), u.style.lineHeight = w + "", u.style.fontSize = l() + "px", o.length) {
    for (const m of o)
      m.isBr ? u.appendChild(document.createElement("br")) : u.appendChild(De(m, { ...a, marginTop: Math.floor(0.2 * l()) }, s.bodyProps));
    n.buAutoNum ? Ee(u, n, t) : n.buChar && Ge(u, n), u.style.paddingLeft = (n.marginLeft || 0) + (n.indent || 0) + "px";
  } else {
    const m = document.createElement("span");
    m.innerHTML = "&nbsp;", m.style.fontSize = a.size + "px", u.appendChild(m);
  }
  return p.appendChild(u), p;
}
function Ze(r, t, s) {
  const e = { ...r.inheritProps, ...r.props }, a = document.createElement("div");
  a.style.position = "absolute", a.style.top = (t.top || 0) + "px", a.style.bottom = (t.bottom || 0) + "px", a.style.left = (t.left || 0) + "px", a.style.right = (t.right || 0) + "px", a.style.width = t.w + "px", a.style.height = t.h + "px", a.style.overflow = "hidden";
  const i = e.lIns !== void 0 ? e.lIns : 7, o = e.rIns !== void 0 ? e.rIns : 7, n = e.tIns !== void 0 ? e.tIns : 3.5, l = e.bIns !== void 0 ? e.bIns : 3.5;
  a.style.paddingLeft = i + "px", a.style.paddingRight = o + "px", a.style.paddingTop = n + "px", a.style.paddingBottom = l + "px", a.style.boxSizing = "border-box", e.anchor === "ctr" ? (a.style.display = "flex", a.style.flexDirection = "column", a.style.justifyContent = "center") : e.anchor === "b" && (a.style.display = "flex", a.style.flexDirection = "column", a.style.justifyContent = "flex-end");
  let p = 0;
  const h = r.paragraphs || [];
  for (let f = 0; f < h.length; f++) {
    const u = h[f];
    ({ ...u.inheritProps, ...u.props }).buAutoNum ? p++ : p = 0;
    const w = xe(u, p || f + 1, {
      isFirst: f === 0,
      isLast: f === h.length - 1,
      bodyProps: e
    });
    a.appendChild(w);
  }
  return a;
}
function ge(r) {
  const t = r.extend, s = $("rect");
  return s.setAttribute("x", "0"), s.setAttribute("y", "0"), s.setAttribute("width", t.w + "px"), s.setAttribute("height", t.h + "px"), s;
}
function ze(r) {
  const t = ge(r), s = y("adj", r, D(r));
  return t.setAttribute("rx", s + "px"), t.setAttribute("ry", s + "px"), t;
}
function He(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, D(r)), a = [
    "M 0,0",
    `L ${t.w - e},0`,
    `Q ${t.w},0 ${t.w},${e}`,
    `L ${t.w},${t.h}`,
    `L 0,${t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", a), s;
}
function We(r) {
  const t = r.extend, s = $("path"), e = y("adj1", r, D(r)), a = y("adj2", r, 0), i = [
    `M ${e},0`,
    `L ${t.w - e},0`,
    `Q ${t.w},0 ${t.w},${e}`,
    `L ${t.w},${t.h - a}`,
    `Q ${t.w},${t.h} ${t.w - a},${t.h}`,
    `L ${a},${t.h}`,
    `Q 0,${t.h} 0,${t.h - a}`,
    `L 0,${e}`,
    `Q 0,0 ${e},0`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", i), s;
}
function Xe(r) {
  const t = r.extend, s = $("path"), e = y("adj1", r, D(r)), a = y("adj2", r, 0), i = [
    `M ${e},0`,
    `L ${t.w - a},0`,
    `Q ${t.w},0 ${t.w},${a}`,
    `L ${t.w},${t.h - e}`,
    `Q ${t.w},${t.h} ${t.w - e},${t.h}`,
    `L ${a},${t.h}`,
    `Q 0,${t.h} 0,${t.h - a}`,
    `L 0,${e}`,
    `Q 0,0 ${e},0`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", i), s;
}
function Qe(r) {
  const t = r.extend, s = $("polygon"), e = y("adj", r, D(r)), a = [
    "0,0",
    `${t.w - e},0`,
    `${t.w},${e}`,
    `${t.w},${t.h}`,
    `0,${t.h}`
  ].join(" ");
  return s.setAttribute("points", a), s;
}
function Ue(r) {
  const t = r.extend, s = $("polygon"), e = y("adj1", r, D(r)), a = y("adj2", r, 0), i = [
    [e, 0],
    [t.w - e, 0],
    [t.w, e],
    [t.w, t.h - a],
    [t.w - a, t.h],
    [a, t.h],
    [0, t.h - a],
    [0, e]
  ].map((o) => `${o[0]},${o[1]}`).join(" ");
  return s.setAttribute("points", i), s;
}
function Ve(r) {
  const t = r.extend, s = $("polygon"), e = y("adj1", r, 0), a = y("adj2", r, D(r)), i = [
    [e, 0],
    [t.w - a, 0],
    [t.w, a],
    [t.w, t.h - e],
    [t.w - e, t.h],
    [a, t.h],
    [0, t.h - a],
    [0, e]
  ].map((o) => `${o[0]},${o[1]}`).join(" ");
  return s.setAttribute("points", i), s;
}
function qe(r) {
  const t = r.extend, s = $("path"), e = y("adj1", r, D(r)), a = y("adj2", r, D(r)), i = [
    `M ${e},0`,
    `L ${t.w - a},0`,
    `L ${t.w},${a}`,
    `L ${t.w},${t.h}`,
    `L 0,${t.h}`,
    `L 0,${e}`,
    `Q 0,0 ${e},0`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", i), s;
}
function Ye(r) {
  const t = r.extend, s = $("path"), e = ["M 0,0", `L ${t.w},${t.h}`].join(" ");
  return s.setAttribute("d", e), s;
}
function Je(r) {
  const t = r.extend, s = $("path"), e = ["M 0,0", `L ${t.w},${t.h}`].join(" ");
  return s.setAttribute("d", e), s;
}
function Ke(r) {
  const t = r.extend, s = $("path"), e = ye("adj1", r, 0.5 * Math.max(t.w, t.h)), a = [
    "M 0,0",
    `L ${e},0`,
    `L ${e},${t.h}`,
    `L ${t.w},${t.h}`
  ].join(" ");
  return s.setAttribute("d", a), s;
}
function Ne(r) {
  const t = r.extend, s = $("path"), e = ye("adj1", r, 0.5 * Math.max(t.w, t.h)), a = [
    "M0,0",
    `Q${e},0 ${e},${t.h / 2}`,
    `T${t.w},${t.h}`
  ].join(" ");
  return s.setAttribute("d", a), s;
}
function ts(r) {
  const t = r.extend, s = y("adj1", r, 0.5 * Math.min(t.w, t.h)), e = y("adj2", r, 0.5 * Math.min(t.w, t.h)), a = $("path"), i = [
    `M0,${t.h / 2 - s / 2}`,
    `L${t.w - e},${t.h / 2 - s / 2}`,
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L${t.w - e},${t.h / 2 + s / 2}`,
    `L0,${t.h / 2 + s / 2}`,
    "Z"
  ].join(" ");
  a.setAttribute("d", i);
  const o = s * e / t.h;
  return { dom: a, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: 0, right: o, w: t.w - o, h: s } };
}
function es(r) {
  const t = r.extend, s = y("adj1", r, 0.5 * Math.min(t.w, t.h)), e = y("adj2", r, 0.5 * Math.min(t.w, t.h)), a = $("path"), i = [
    `M0,${t.h / 2}`,
    `L${e},0`,
    `L${e},${t.h / 2 - s / 2}`,
    `L${t.w},${t.h / 2 - s / 2}`,
    `L${t.w},${t.h / 2 + s / 2}`,
    `L${e},${t.h / 2 + s / 2}`,
    `L${e},${t.h}`,
    "Z"
  ].join(" ");
  a.setAttribute("d", i);
  const o = s * e / t.h;
  return { dom: a, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: o, right: 0, w: t.w - o, h: s } };
}
function ss(r) {
  const t = r.extend, s = y("adj1", r, 0.5 * Math.min(t.w, t.h)), e = y("adj2", r, 0.5 * Math.min(t.w, t.h)), a = $("path"), i = [
    `M${t.w / 2},0`,
    `L${t.w},${e}`,
    `L${t.w / 2 + s / 2},${e}`,
    `L${t.w / 2 + s / 2},${t.h}`,
    `L${t.w / 2 - s / 2},${t.h}`,
    `L${t.w / 2 - s / 2},${e}`,
    `L0,${e}`,
    "Z"
  ].join(" ");
  a.setAttribute("d", i);
  const o = s * e / t.w;
  return { dom: a, textArea: { top: o, bottom: 0, left: t.w / 2 - s / 2, right: t.w / 2 - s / 2, w: s, h: t.h - o } };
}
function rs(r) {
  const t = r.extend, s = y("adj1", r, 0.5 * Math.min(t.w, t.h)), e = y("adj2", r, 0.5 * Math.min(t.w, t.h)), a = $("path"), i = [
    `M${t.w / 2},${t.h}`,
    `L0,${t.h - e}`,
    `L${t.w / 2 - s / 2},${t.h - e}`,
    `L${t.w / 2 - s / 2},0`,
    `L${t.w / 2 + s / 2},0`,
    `L${t.w / 2 + s / 2},${t.h - e}`,
    `L${t.w},${t.h - e}`,
    "Z"
  ].join(" ");
  a.setAttribute("d", i);
  const o = s * e / t.w;
  return { dom: a, textArea: { top: 0, bottom: o, left: t.w / 2 - s / 2, right: t.w / 2 - s / 2, w: s, h: t.h - o } };
}
function as(r) {
  const t = r.extend, s = y("adj1", r, 0.5 * Math.min(t.w, t.h)), e = y("adj2", r, 0.5 * Math.min(t.w, t.h)), a = $("path"), i = [
    `M0,${t.h / 2}`,
    `L${e},0`,
    `L${e},${t.h / 2 - s / 2}`,
    `L${t.w - e},${t.h / 2 - s / 2}`,
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L${t.w - e},${t.h / 2 + s / 2}`,
    `L${e},${t.h / 2 + s / 2}`,
    `L${e},${t.h}`,
    "Z"
  ].join(" ");
  a.setAttribute("d", i);
  const o = s * e / t.h;
  return { dom: a, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: o, right: o, w: t.w - 2 * o, h: s } };
}
function is(r) {
  const t = r.extend, s = y("adj1", r, 0.5 * Math.min(t.w, t.h)), e = y("adj2", r, 0.5 * Math.min(t.w, t.h)), a = $("path"), i = [
    `M${t.w / 2},${t.h}`,
    `L0,${t.h - e}`,
    `L${t.w / 2 - s / 2},${t.h - e}`,
    `L${t.w / 2 - s / 2},${e}`,
    `L0,${e}`,
    `L${t.w / 2},0`,
    `L${t.w},${e}`,
    `L${t.w / 2 + s / 2},${e}`,
    `L${t.w / 2 + s / 2},${t.h - e}`,
    `L${t.w},${t.h - e}`,
    "Z"
  ].join(" ");
  a.setAttribute("d", i);
  const o = s * e / t.w;
  return { dom: a, textArea: { top: o, bottom: o, left: t.w / 2 - s / 2, right: t.w / 2 - s / 2, w: s, h: t.h - 2 * o } };
}
function os(r) {
  const t = r.extend, s = y("adj1", r, 0.225 * Math.min(t.w, t.h)), e = y("adj2", r, 0.225 * Math.min(t.w, t.h)), a = y("adj3", r, 0.225 * Math.min(t.w, t.h)), i = $("path"), o = [
    `M0,${t.h / 2}`,
    `L${a},${t.h / 2 - e}`,
    `L${a},${t.h / 2 - s / 2}`,
    `L${t.w / 2 - s / 2},${t.h / 2 - s / 2}`,
    `L${t.w / 2 - s / 2},${a}`,
    `L${t.w / 2 - e},${a}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + e},${a}`,
    `L${t.w / 2 + s / 2},${a}`,
    `L${t.w / 2 + s / 2},${t.h / 2 - s / 2}`,
    `L${t.w - a},${t.h / 2 - s / 2}`,
    `L${t.w - a},${t.h / 2 - e}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - a},${t.h / 2 + e}`,
    `L${t.w - a},${t.h / 2 + s / 2}`,
    `L${t.w / 2 + s / 2},${t.h / 2 + s / 2}`,
    `L${t.w / 2 + s / 2},${t.h - a}`,
    `L${t.w / 2 + e},${t.h - a}`,
    `L${t.w / 2},${t.h}`,
    `L${t.w / 2 - e},${t.h - a}`,
    `L${t.w / 2 - s / 2},${t.h - a}`,
    `L${t.w / 2 - s / 2},${t.h / 2 + s / 2}`,
    `L${a},${t.h / 2 + s / 2}`,
    `L${a},${t.h / 2 + e}`,
    "Z"
  ].join(" ");
  i.setAttribute("d", o);
  const n = e === 0 ? 0 : s * a / e / 2;
  return { dom: i, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: n, right: n, w: t.w - 2 * n, h: s } };
}
function ns(r) {
  const t = r.extend, s = y("adj1", r, 0.225 * Math.min(t.w, t.h)), e = y("adj2", r, 0.225 * Math.min(t.w, t.h)), a = y("adj3", r, 0.225 * Math.min(t.w, t.h)), i = $("path"), o = [
    `M0,${t.h - e}`,
    `L${a},${t.h - 2 * e}`,
    `L${a},${t.h - e - s / 2}`,
    `L${t.w / 2 - s / 2},${t.h - e - s / 2}`,
    `L${t.w / 2 - s / 2},${a}`,
    `L${t.w / 2 - e},${a}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + e},${a}`,
    `L${t.w / 2 + s / 2},${a}`,
    `L${t.w / 2 + s / 2},${t.h - e - s / 2}`,
    `L${t.w - a},${t.h - e - s / 2}`,
    `L${t.w - a},${t.h - 2 * e}`,
    `L${t.w},${t.h - e}`,
    `L${t.w - a},${t.h}`,
    `L${t.w - a},${t.h - e + s / 2}`,
    `L${a},${t.h - e + s / 2}`,
    `L${a},${t.h}`,
    "Z"
  ].join(" ");
  i.setAttribute("d", o);
  const n = e === 0 ? 0 : s * a / e / 2;
  return { dom: i, textArea: { top: t.h - e - s / 2, bottom: e - s / 2, left: n, right: n, w: t.w - 2 * n, h: s } };
}
function cs(r) {
  const t = r.extend;
  let s = y("adj1", r, 0.25 * Math.min(t.w, t.h));
  const e = y("adj2", r, 0.25 * Math.min(t.w, t.h)), a = y("adj3", r, 0.25 * Math.min(t.w, t.h)), i = y("adj4", r, 0.4375 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e);
  let o = i - s;
  o < 0 && (o = 0);
  const n = $("path"), l = [
    `M0,${t.h}`,
    `L0,${e - s / 2 + i}`,
    `A${i} ${i} 0 0 1 ${i} ${e - s / 2}`,
    `L${t.w - a},${e - s / 2}`,
    `L${t.w - a},0`,
    `L${t.w},${e}`,
    `L${t.w - a},${2 * e}`,
    `L${t.w - a},${e + s / 2}`,
    `L${s + o},${e + s / 2}`,
    `A${o} ${o}  0 0 0 ${s} ${e + s / 2 + o}`,
    `L${s},${t.h}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n };
}
function ls(r) {
  const t = r.extend;
  let s = y("adj1", r, 0.25 * Math.min(t.w, t.h));
  const e = y("adj2", r, 0.25 * Math.min(t.w, t.h)), a = y("adj3", r, 0.25 * Math.min(t.w, t.h));
  let i = y("adj4", r, 0.4375 * Math.min(t.w, t.h)), o = y("adj5", r, 0.75 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e), o < a && (o = a + s), i > o - a && (i = o - a);
  let n = i - s;
  n > o - a - s && (n = o - a - s), n < 0 && (n = 0);
  const l = e - s / 2, p = $("path"), h = [
    `M0,${t.h}`,
    `L0,${i}`,
    `A${i} ${i} 0 0 1 ${i} 0`,
    `L${t.w - i - l},0`,
    `A${i} ${i} 0 0 1 ${t.w - l} ${i}`,
    `L${t.w - l},${o - a}`,
    `L${t.w},${o - a}`,
    `L${t.w - e},${o}`,
    `L${t.w - 2 * e},${o - a}`,
    `L${t.w - e - s / 2},${o - a}`,
    `L${t.w - e - s / 2},${s + n}`,
    `A${n} ${n}  0 0 0 ${t.w - n - e - s / 2} ${s}`,
    `L${s + n},${s}`,
    `A${n} ${n}  0 0 0 ${s} ${s + n}`,
    `L${s},${t.h}`,
    "Z"
  ].join(" ");
  return p.setAttribute("d", h), { dom: p };
}
function hs(r) {
  const t = r.extend;
  let s = y("adj1", r, 0.25 * Math.min(t.w, t.h));
  const e = y("adj2", r, 0.25 * Math.min(t.w, t.h));
  let a = y("adj3", r, 0.25 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e);
  let i = Math.min(t.w, t.h) - 2 * e;
  a > i && (a = i), a < 0 && (a = 0);
  const o = e - s / 2, n = $("path"), l = [
    `M0,${t.h - e}`,
    `L${a},${t.h - 2 * e}`,
    `L${a},${t.h - e - s / 2}`,
    `L${t.w - e - s / 2},${t.h - e - s / 2}`,
    `L${t.w - e - s / 2},${a}`,
    `L${t.w - 2 * e},${a}`,
    `L${t.w - e},0`,
    `L${t.w},${a}`,
    `L${t.w - o},${a}`,
    `L${t.w - o},${t.h - o}`,
    `L${a},${t.h - o}`,
    `L${a},${t.h}`,
    "Z"
  ].join(" ");
  n.setAttribute("d", l);
  const p = e === 0 ? 0 : s * a / e / 2;
  return { dom: n, textArea: { top: t.h - e - s / 2, bottom: e - s / 2, left: p, right: e, w: t.w - p - e, h: s } };
}
function ps(r) {
  const t = r.extend;
  let s = y("adj1", r, 0.25 * Math.min(t.w, t.h));
  const e = y("adj2", r, 0.25 * Math.min(t.w, t.h));
  let a = y("adj3", r, 0.25 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e);
  const i = e - s / 2, o = $("path"), n = [
    `M0,${t.h}`,
    `L0,${t.h - s}`,
    `L${t.w - e - s / 2},${t.h - s}`,
    `L${t.w - e - s / 2},${a}`,
    `L${t.w - 2 * e},${a}`,
    `L${t.w - e},0`,
    `L${t.w},${a}`,
    `L${t.w - i},${a}`,
    `L${t.w - i},${t.h}`,
    "Z"
  ].join(" ");
  return o.setAttribute("d", n), { dom: o, textArea: { top: t.h - s, bottom: 0, left: 0, right: 0, w: t.w, h: s } };
}
function ds(r) {
  const t = r.extend, s = r.background;
  let e = y("adj1", r, 0.25 * Math.min(t.w, t.h));
  const a = y("adj2", r, 0.5 * Math.min(t.w, t.h)), i = y("adj3", r, 0.25 * Math.min(t.w, t.h));
  e > a && (e = a);
  const o = a / 2 - e / 2, n = (t.h - a / 2 - e / 2) / 2, l = (t.h - o - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M${t.w},0`,
    `A ${t.w} ${n} 0 0 0 0 ${n}`,
    `L0,${l + e}`,
    `A ${t.w} ${l} 0 0 1 ${t.w} ${e}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && h.setAttribute("fill", M(s, { dark: 0.6 }) || "transparent");
  const f = $("path");
  return f.setAttribute("d", [
    `M0,${n}`,
    `A ${t.w} ${n} 0 0 0 ${t.w - i} ${t.h - a / 2 - e / 2}`,
    `L${t.w - i},${t.h - a}`,
    `L${t.w},${t.h - a / 2}`,
    `L${t.w - i},${t.h}`,
    `L${t.w - i},${t.h - o}`,
    `A ${t.w} ${l} 0 0 1 0 ${e + l}`,
    "Z"
  ].join(" ")), p.appendChild(h), p.appendChild(f), { dom: p };
}
function fs(r) {
  const t = r.extend, s = r.background;
  let e = y("adj1", r, 0.25 * Math.min(t.w, t.h));
  const a = y("adj2", r, 0.5 * Math.min(t.w, t.h)), i = y("adj3", r, 0.25 * Math.min(t.w, t.h));
  e > a && (e = a);
  const o = a / 2 - e / 2, n = (t.h - a / 2 - e / 2) / 2, l = (t.h - o - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M0,${t.h - a / 2}`,
    `L${i},${t.h - a}`,
    `L${i},${t.h - a / 2 - e / 2}`,
    `A${t.w} ${n} 0 0 0 ${t.w} ${n}`,
    `L${t.w},${l + e}`,
    `A ${t.w} ${l} 0 0 1 ${i} ${t.h - o}`,
    `L${i},${t.h}`,
    "Z"
  ].join(" "));
  const f = $("path");
  return f.setAttribute("d", [
    "M0,0",
    `A ${t.w} ${n} 0 0 1 ${t.w} ${n}`,
    `L${t.w},${l + e}`,
    `A ${t.w} ${l} 0 0 0 0 ${e}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && f.setAttribute("fill", M(s, { dark: 0.6 }) || "transparent"), p.appendChild(h), p.appendChild(f), { dom: p };
}
function us(r) {
  const t = r.extend, s = r.background;
  let e = y("adj1", r, 0.25 * Math.min(t.w, t.h));
  const a = y("adj2", r, 0.5 * Math.min(t.w, t.h)), i = y("adj3", r, 0.25 * Math.min(t.w, t.h));
  e > a && (e = a);
  const o = a / 2 - e / 2, n = (t.w - a / 2 - e / 2) / 2, l = (t.w - o - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M${t.w - a / 2},0`,
    `L${t.w - a},${i}`,
    `L${t.w - a / 2 - e / 2},${i}`,
    `A${n} ${t.h} 0 0 1 ${n} ${t.h}`,
    `L${n + e},${t.h}`,
    `A${l} ${t.h} 0 0 0 ${t.w - o} ${i}`,
    `L${t.w},${i}`,
    "Z"
  ].join(" "));
  const f = $("path");
  return f.setAttribute("d", [
    `M${e},0`,
    "L0,0",
    `A ${n} ${t.h} 0 0 0 ${n} ${t.h}`,
    `L${n + e},${t.h}`,
    `A ${l} ${t.h} 0 0 1 ${e} 0`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && f.setAttribute("fill", M(s, { dark: 0.6 }) || "transparent"), p.appendChild(h), p.appendChild(f), { dom: p };
}
function $s(r) {
  const t = r.extend, s = r.background;
  let e = y("adj1", r, 0.25 * Math.min(t.w, t.h));
  const a = y("adj2", r, 0.5 * Math.min(t.w, t.h)), i = y("adj3", r, 0.25 * Math.min(t.w, t.h));
  e > a && (e = a);
  const o = a / 2 - e / 2, n = (t.w - a / 2 - e / 2) / 2, l = (t.w - o - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M0,${t.h}`,
    `L${e},${t.h}`,
    `A${l} ${t.h} 0 0 1 ${l + e} 0`,
    `L${n},0`,
    `A${n} ${t.h} 0 0 0 0 ${t.h}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && h.setAttribute("fill", M(s, { dark: 0.6 }) || "transparent");
  const f = $("path");
  return f.setAttribute("d", [
    `M${t.w - a / 2},${t.h}`,
    `L${t.w - a},${t.h - i}`,
    `L${t.w - a / 2 - e / 2},${t.h - i}`,
    `A ${n} ${t.h} 0 0 0 ${n} 0`,
    `L${n + e},0`,
    `A ${l} ${t.h} 0 0 1 ${t.w - o} ${t.h - i}`,
    `L${t.w},${t.h - i}`,
    "Z"
  ].join(" ")), p.appendChild(h), p.appendChild(f), { dom: p };
}
function ws(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj1", r, 0.5) * t.h, a = A("adj2", r, 0.5) * s, i = s / 8, o = s / 16, n = s / 32, l = 5 * s / 32, p = t.h / 2 - e / 2, h = t.h / 2 + e / 2, f = $("g"), u = $("path");
  u.setAttribute("d", [`M0,${p}`, `L${n},${p}`, `L${n},${h}`, `L0,${h}`, "Z"].join(" "));
  const d = $("path");
  d.setAttribute("d", [`M${o},${p}`, `L${i},${p}`, `L${i},${h}`, `L${o},${h}`, "Z"].join(" "));
  const w = $("path");
  w.setAttribute("d", [
    `M${l},${p}`,
    `L${t.w - a},${p}`,
    `L${t.w - a},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - a},${t.h}`,
    `L${t.w - a},${h}`,
    `L${l},${h}`,
    "Z"
  ].join(" ")), f.appendChild(w), f.appendChild(u), f.appendChild(d);
  const L = e * a / t.h;
  return { dom: f, textArea: { top: p, bottom: p, left: 0, right: L, w: t.w - L, h: e } };
}
function ms(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj1", r, 0.5) * t.h, a = A("adj2", r, 0.5) * s, i = e * a / t.h, o = t.h / 2 - e / 2, n = t.h / 2 + e / 2, l = $("path"), p = [
    `M0,${o}`,
    `L${t.w - a},${o}`,
    `L${t.w - a},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - a},${t.h}`,
    `L${t.w - a},${n}`,
    `L0,${n}`,
    `L${i},${t.h / 2}`,
    "Z"
  ].join(" ");
  l.setAttribute("d", p);
  const h = e * a / t.h;
  return { dom: l, textArea: { top: o, bottom: o, left: h, right: h, w: t.w - 2 * h, h: e } };
}
function bs(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj", r, 0.5) * s, a = $("path"), i = ["M0,0", `L${t.w - e},0`, `L${t.w},${t.h / 2}`, `L${t.w - e},${t.h}`, `L0,${t.h}`, "Z"].join(" ");
  return a.setAttribute("d", i), { dom: a, textArea: { top: 0, bottom: 0, left: 0, right: e / 2, w: t.w - e / 2, h: t.h } };
}
function ys(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj", r, 0.5) * s, a = $("path"), i = [
    "M0,0",
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L0,${t.h}`,
    `L${e},${t.h / 2}`,
    "Z"
  ].join(" ");
  return a.setAttribute("d", i), { dom: a, textArea: { top: 0, bottom: 0, left: e, right: e, w: t.w - 2 * e, h: t.h } };
}
function xs(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj1", r, 0.25) * s, a = A("adj2", r, 0.25) * s, i = A("adj3", r, 0.25) * s, o = A("adj4", r, 0.64977) * t.w, n = $("path"), l = [
    "M0,0",
    `L${o},0`,
    `L${o},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - a}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - i},${t.h / 2 + a}`,
    `L${t.w - i},${t.h / 2 + e / 2}`,
    `L${o},${t.h / 2 + e / 2}`,
    `L${o},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: 0, bottom: 0, left: 0, right: t.w - o, w: o, h: t.h } };
}
function gs(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj1", r, 0.25) * s, a = A("adj2", r, 0.25) * s, i = A("adj3", r, 0.25) * s, o = A("adj4", r, 0.64977) * t.w, n = $("path"), l = [
    `M0,${t.h / 2}`,
    `L${i},${t.h / 2 - a}`,
    `L${i},${t.h / 2 - e / 2}`,
    `L${t.w - o},${t.h / 2 - e / 2}`,
    `L${t.w - o},0`,
    `L${t.w},0`,
    `L${t.w},${t.h}`,
    `L${t.w - o},${t.h}`,
    `L${t.w - o},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + a}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: 0, bottom: 0, left: t.w - o, right: 0, w: o, h: t.h } };
}
function Ls(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj1", r, 0.25) * s, a = A("adj2", r, 0.25) * s, i = A("adj3", r, 0.25) * s, o = A("adj4", r, 0.64977) * t.h, n = $("path"), l = [
    `M0,${t.h - o}`,
    `L${t.w / 2 - e / 2},${t.h - o}`,
    `L${t.w / 2 - e / 2},${i}`,
    `L${t.w / 2 - a},${i}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + a},${i}`,
    `L${t.w / 2 + e / 2},${i}`,
    `L${t.w / 2 + e / 2},${t.h - o}`,
    `L${t.w},${t.h - o}`,
    `L${t.w},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: t.h - o, bottom: 0, left: 0, right: 0, w: t.w, h: o } };
}
function As(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj1", r, 0.25) * s, a = A("adj2", r, 0.25) * s, i = A("adj3", r, 0.25) * s, o = A("adj4", r, 0.64977) * t.h, n = $("path"), l = [
    "M0,0",
    `L${t.w},0`,
    `L${t.w},${o}`,
    `L${t.w / 2 + e / 2},${o}`,
    `L${t.w / 2 + e / 2},${t.h - i}`,
    `L${t.w / 2 + a},${t.h - i}`,
    `L${t.w / 2},${t.h}`,
    `L${t.w / 2 - a},${t.h - i}`,
    `L${t.w / 2 - e / 2},${t.h - i}`,
    `L${t.w / 2 - e / 2},${o}`,
    `L0,${o}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: 0, bottom: t.h - o, left: 0, right: 0, w: t.w, h: o } };
}
function Ms(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj1", r, 0.25) * s, a = A("adj2", r, 0.25) * s, i = A("adj3", r, 0.25) * s, o = A("adj4", r, 0.48123) * t.w, n = $("path"), l = [
    `M0,${t.h / 2}`,
    `L${i},${t.h / 2 - a}`,
    `L${i},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - o / 2},0`,
    `L${t.w / 2 + o / 2},0`,
    `L${t.w / 2 + o / 2},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - a}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - i},${t.h / 2 + a}`,
    `L${t.w - i},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + o / 2},${t.h}`,
    `L${t.w / 2 - o / 2},${t.h}`,
    `L${t.w / 2 - o / 2},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + a}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: 0, bottom: 0, left: t.w / 2 - o / 2, right: t.w / 2 - o / 2, w: o, h: t.h } };
}
function Ps(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = A("adj1", r, 0.18515) * s, a = A("adj2", r, 0.18515) * s, i = A("adj3", r, 0.18515) * s, o = A("adj4", r, 0.48123) * t.w, n = A("adj4", r, 0.48123) * t.h, l = $("path"), p = [
    `M0,${t.h / 2}`,
    `L${i},${t.h / 2 - a}`,
    `L${i},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 - n / 2}`,
    `L${t.w / 2 - e / 2},${t.h / 2 - n / 2}`,
    `L${t.w / 2 - e / 2},${i}`,
    `L${t.w / 2 - a},${i}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + a},${i}`,
    `L${t.w / 2 + e / 2},${i}`,
    `L${t.w / 2 + e / 2},${t.h / 2 - n / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 - n / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - a}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - i},${t.h / 2 + a}`,
    `L${t.w - i},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 + n / 2}`,
    `L${t.w / 2 + e / 2},${t.h / 2 + n / 2}`,
    `L${t.w / 2 + e / 2},${t.h - i}`,
    `L${t.w / 2 + a},${t.h - i}`,
    `L${t.w / 2},${t.h}`,
    `L${t.w / 2 - a},${t.h - i}`,
    `L${t.w / 2 - e / 2},${t.h - i}`,
    `L${t.w / 2 - e / 2},${t.h / 2 + n / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 + n / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + a}`,
    "Z"
  ].join(" ");
  return l.setAttribute("d", p), { dom: l, textArea: { top: t.h / 2 - n / 2, bottom: t.h / 2 - n / 2, left: t.w / 2 - o / 2, right: t.w / 2 - o / 2, w: o, h: n } };
}
function ks(r) {
  const t = r.prstGeom || {}, s = r.extend, e = t.pathList, a = t.w, i = t.h, o = $("path"), n = { moveTo: "M", lnTo: "L", cubicBezTo: "C", close: "Z" }, l = s.w / a, p = s.h / i, h = e.map((f) => {
    const u = n[f.type], d = Array.isArray(f.points) ? f.points.map((w) => `${w[0] * l},${w[1] * p}`).join(" ") : "";
    return d ? `${u} ${d}` : `${u}`;
  }).join(" ");
  return o.setAttribute("d", h), o.style.fillRule = "evenodd", { dom: o };
}
function Ss(r) {
  const t = r.extend, s = $("polygon"), e = [`${t.w / 2},0`, `0,${t.h}`, `${t.w},${t.h}`].join(" ");
  return s.setAttribute("points", e), { dom: s };
}
function js(r) {
  const t = r.extend, s = $("polygon"), e = [`0,${t.h}`, "0,0", `${t.w},${t.h}`].join(" ");
  return s.setAttribute("points", e), { dom: s };
}
function Cs(r) {
  const t = r.extend, s = $("ellipse"), e = t.w / 2, a = t.h / 2;
  return s.setAttribute("cx", e + "px"), s.setAttribute("cy", a + "px"), s.setAttribute("rx", e + "px"), s.setAttribute("ry", a + "px"), { dom: s };
}
function Rs(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, 0.5 * Math.min(t.w, t.h)), a = [
    `M${e},0`,
    `L${t.w},0`,
    `L${t.w - e},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  s.setAttribute("d", a);
  const i = 0.84 * (t.w - e), o = 0.08 * t.h + e / t.w * t.h * 0.42;
  return {
    dom: s,
    textArea: {
      top: o,
      bottom: o,
      left: (t.w - i) / 2,
      right: (t.w - i) / 2,
      w: i,
      h: t.h - 2 * o
    }
  };
}
function vs(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, 0.25 * Math.min(t.w, t.h)), a = [
    `M${e},0`,
    `L${t.w - e},0`,
    `L${t.w},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  s.setAttribute("d", a);
  const i = y("adj", r, 0.5 * Math.min(t.w, t.h)), o = i / t.w * 0.66 * t.h, n = 0.66 * i;
  return {
    dom: s,
    textArea: { top: o, bottom: 0, left: n, right: n, w: t.w - 2 * n, h: t.h - o }
  };
}
function Ts(r) {
  const t = r.extend, s = $("path"), e = [
    `M${t.w / 2},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w / 2},${t.h}`,
    `L0,${t.h / 2}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", e), {
    dom: s,
    textArea: { top: 0.25 * t.h, bottom: 0.25 * t.h, left: 0.25 * t.w, right: 0.25 * t.w, w: 0.5 * t.w, h: 0.5 * t.h }
  };
}
function Bs(r) {
  const t = r.extend, s = $("path"), e = [
    `M${t.w / 2},0`,
    `L${t.w},${0.3771 * t.h}`,
    `L${0.808 * t.w},${t.h}`,
    `L${0.192 * t.w},${t.h}`,
    `L0,${0.3771 * t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", e), {
    dom: s,
    textArea: { top: 0.227 * t.h, bottom: 0, left: 0.192 * t.w, right: 0.192 * t.w, w: 0.616 * t.w, h: 0.773 * t.h }
  };
}
function Is(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, 0.25 * Math.min(t.w, t.h)), a = [
    `M${e},0`,
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L${e},${t.h}`,
    `L0,${t.h / 2}`,
    "Z"
  ].join(" ");
  s.setAttribute("d", a);
  const i = 0.098 * t.h + e / t.w * 0.38 * t.h, o = 0.088 * t.w + 0.422 * e;
  return {
    dom: s,
    textArea: { top: i, bottom: i, left: o, right: o, w: t.w - 2 * o, h: t.h - 2 * i }
  };
}
function _s(r) {
  const t = r.extend, s = $("path"), e = [
    `M${t.w / 2},0`,
    `L${0.9 * t.w},${0.2 * t.h}`,
    `L${t.w},${0.642 * t.h}`,
    `L${0.722 * t.w},${t.h}`,
    `L${0.278 * t.w},${t.h}`,
    `L0,${0.642 * t.h}`,
    `L${0.1 * t.w},${0.2 * t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", e), {
    dom: s,
    textArea: { top: 0.2 * t.h, bottom: 0.2 * t.h, left: 0.1 * t.w, right: 0.1 * t.w, w: 0.8 * t.w, h: 0.6 * t.h }
  };
}
function Ds(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, 0.29 * Math.min(t.w, t.h)), a = [
    `M${e},0`,
    `L${t.w - e},0`,
    `L${t.w},${e}`,
    `L${t.w},${t.h - e}`,
    `L${t.w - e},${t.h}`,
    `L${e},${t.h}`,
    `L0,${t.h - e}`,
    `L0,${e}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", a), {
    dom: s,
    textArea: { top: 0.5 * e, bottom: 0.5 * e, left: 0.5 * e, right: 0.5 * e, w: t.w - e, h: t.h - e }
  };
}
function Es(r) {
  const t = r.extend, s = $("path"), e = 0.344, a = 0.117, i = 0.19, o = [
    `M${t.w * e},0`,
    `L${0.656 * t.w},0`,
    `L${0.883 * t.w},${t.h * i}`,
    `L${t.w},${0.5 * t.h}`,
    `L${0.883 * t.w},${0.81 * t.h}`,
    `L${0.656 * t.w},${t.h}`,
    `L${t.w * e},${t.h}`,
    `L${t.w * a},${0.81 * t.h}`,
    `L0,${0.5 * t.h}`,
    `L${t.w * a},${t.h * i}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", o), {
    dom: s,
    textArea: { top: t.h * i, bottom: t.h * i, left: t.w * a, right: t.w * a, w: 0.766 * t.w, h: 0.62 * t.h }
  };
}
function Os(r) {
  const t = r.extend, s = $("path"), e = 0.364, a = 0.133, i = 0.135, o = [
    `M${t.w * e},0`,
    `L${0.636 * t.w},0`,
    `L${0.867 * t.w},${t.h * i}`,
    `L${t.w},${t.h * e}`,
    `L${t.w},${0.636 * t.h}`,
    `L${0.867 * t.w},${0.865 * t.h}`,
    `L${0.636 * t.w},${t.h}`,
    `L${t.w * e},${t.h}`,
    `L${t.w * a},${0.865 * t.h}`,
    `L0,${0.636 * t.h}`,
    `L0,${t.h * e}`,
    `L${t.w * a},${t.h * i}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", o), {
    dom: s,
    textArea: { top: t.h * i, bottom: t.h * i, left: t.w * a, right: t.w * a, w: 0.734 * t.w, h: 0.73 * t.h }
  };
}
function Fs(r) {
  const t = r.extend, s = $("path"), e = A("adj1", r, 360), a = A("adj2", r, 270), i = t.w / 2, o = t.h / 2, n = t.w / 2, l = t.h / 2, [p, h] = _(e, i, o, n, l), [f, u] = _(a, i, o, n, l), d = J(e, a), w = `M${i},${o}, L${p} ${h} A ${n} ${l} 0 ${d} 1 ${f} ${u} Z`;
  return s.setAttribute("d", w), { dom: s, textArea: K(r) };
}
function Gs(r) {
  const t = r.extend, s = $("path"), e = A("adj1", r, 270), a = A("adj2", r, 0), i = t.w / 2, o = t.h / 2, n = t.w / 2, l = t.h / 2, [p, h] = _(e, i, o, n, l), [f, u] = _(a, i, o, n, l), d = J(e, a), w = `M${p},${h} A ${n} ${l} 0 ${d} 1 ${f} ${u}`;
  return s.setAttribute("d", w), { dom: s, hasFill: !1 };
}
function Zs(r) {
  const t = r.extend, s = $("path"), e = A("adj1", r, 45), a = A("adj2", r, 270), i = t.w / 2, o = t.h / 2, n = t.w / 2, l = t.h / 2, [p, h] = _(e, i, o, n, l), [f, u] = _(a, i, o, n, l), d = J(e, a), w = `M${p} ${h} A ${n} ${l} 0 ${d} 1 ${f} ${u} Z`;
  return s.setAttribute("d", w), { dom: s, textArea: K(r) };
}
function zs(r) {
  const t = r.extend, s = $("path"), e = A("adj", r, 1), a = t.w / 2, i = t.h / 2, o = t.w / 2, n = t.h / 2, [l, p] = _(0, a, i, o, n), [h, f] = _(270, a, i, o, n), u = J(0, 270);
  let d = `M${l} ${p} A ${o} ${n} 0 ${u} 1 ${h} ${f}`;
  const w = o * e, L = a + w, b = i - n * w / (t.w / 2), m = (t.w / 2 + L) / 2, x = (t.h / 2 + b) / 2;
  return d += ` Q${m},0 ${L},${b}`, d += ` Q${t.w},${x} ${a + o},${i}`, s.setAttribute("d", d), { dom: s, textArea: K(r) };
}
function Hs(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, 0.16667 * Math.min(t.w, t.h)), a = [
    `M${e},${t.h}`,
    `Q0,${t.h} 0,${t.h - e}`,
    `L0,${e}`,
    `Q0,0 ${e},0`,
    `M${t.w - e},0`,
    `Q${t.w},0 ${t.w},${e}`,
    `L${t.w},${t.h - e}`,
    `Q${t.w},${t.h} ${t.w - e},${t.h}`
  ].join(" ");
  s.setAttribute("d", a);
  const i = 0.285 * e;
  return {
    dom: s,
    hasFill: !1,
    textArea: { top: i, bottom: i, left: i, right: i, w: t.w - 2 * i, h: t.h - 2 * i }
  };
}
function Ws(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, 0.083335 * Math.min(t.w, t.h)), a = [
    `M${2 * e},${t.h}`,
    `Q${e},${t.h} ${e},${t.h - e}`,
    `L${e},${t.h / 2 + e}`,
    `Q${e},${t.h / 2} 0,${t.h / 2}`,
    `Q${e},${t.h / 2} ${e},${t.h / 2 - e}`,
    `L${e},${e}`,
    `Q${e},0 ${2 * e},0`,
    `M${t.w - 2 * e},0`,
    `Q${t.w - e},0 ${t.w - e},${e}`,
    `L${t.w - e},${t.h / 2 - e}`,
    `Q${t.w - e},${t.h / 2} ${t.w},${t.h / 2}`,
    `Q${t.w - e},${t.h / 2} ${t.w - e},${t.h / 2 + e}`,
    `L${t.w - e},${t.h - e}`,
    `Q${t.w - e},${t.h} ${t.w - 2 * e},${t.h}`
  ].join(" ");
  s.setAttribute("d", a);
  const i = 0.285 * y("adj", r, 0.16667 * Math.min(t.w, t.h));
  return {
    dom: s,
    hasFill: !1,
    textArea: { top: i, bottom: i, left: i, right: i, w: t.w - 2 * i, h: t.h - 2 * i }
  };
}
function Xs(r) {
  const t = r.extend, s = $("path"), e = y("adj1", r, 0.12 * Math.min(t.w, t.h)), a = [
    "M0,0",
    `L${t.w},0`,
    `L${t.w},${t.h}`,
    `L0,${t.h}`,
    "Z",
    `M${e},${e}`,
    `L${e},${t.h - e}`,
    `L${t.w - e},${t.h - e}`,
    `L${t.w - e},${e}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", a), {
    dom: s,
    textArea: { top: e, bottom: e, left: e, right: e, w: t.w - 2 * e, h: t.h - 2 * e }
  };
}
function Qs(r) {
  const t = r.extend, s = $("path"), e = y("adj1", r, 0.333 * Math.min(t.w, t.h)), a = Math.min(
    y("adj2", r, 0.333 * Math.min(t.w, t.h)),
    t.w * (1 - e / t.h)
  ), i = [
    "M0,0",
    `L${t.w},0`,
    `L${t.w * (1 - e / t.h)},${e}`,
    `L${a},${e}`,
    `L${a},${t.h * (1 - a / t.w)}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", i), { dom: s };
}
function Us(r) {
  const t = r.extend, s = $("path"), e = y("adj1", r, 0.5 * Math.min(t.w, t.h)), a = y("adj2", r, 0.5 * Math.min(t.w, t.h)), i = [
    "M0,0",
    `L${a},0`,
    `L${a},${t.h - e}`,
    `L${t.w},${t.h - e}`,
    `L${t.w},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", i), {
    dom: s,
    textArea: { top: t.h - e, bottom: 0, left: 0, right: 0, w: t.w, h: e }
  };
}
function Vs(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, 0.5 * Math.min(t.w, t.h)), i = [`M${t.w * e / t.h},0`, `L${t.w},0`, `L0,${t.h}`, `L0,${e}`, "Z"].join(" ");
  s.setAttribute("d", i);
  const o = A("adj", r, 0.5), n = 0.5 * (1 - o) * t.h, l = 0.5 * (1 - o) * t.w;
  return {
    dom: s,
    textArea: { top: 0, bottom: n, left: 0, right: l, w: t.w - l, h: t.h - n }
  };
}
function qs(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, 0.25 * Math.min(t.w, t.h)), a = [
    `M${e},0`,
    `L${t.w - e},0`,
    `L${t.w - e},${e}`,
    `L${t.w},${e}`,
    `L${t.w},${t.h - e}`,
    `L${t.w - e},${t.h - e}`,
    `L${t.w - e},${t.h}`,
    `L${e},${t.h}`,
    `L${e},${t.h - e}`,
    `L0,${t.h - e}`,
    `L0,${e}`,
    `L${e},${e}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", a), {
    dom: s,
    textArea: { top: e, bottom: e, left: 0, right: 0, w: t.w, h: t.h - 2 * e }
  };
}
function Ys(r) {
  const t = r.extend, s = $("path"), e = y("adj", r, 0.16667 * Math.min(t.w, t.h)), a = [
    `M${e},0`,
    `L${t.w - e},0`,
    `Q${t.w - e},${e} ${t.w},${e}`,
    `L${t.w},${t.h - e}`,
    `Q${t.w - e},${t.h - e} ${t.w - e},${t.h}`,
    `L${e},${t.h}`,
    `Q${e},${t.h - e} 0,${t.h - e}`,
    `L0,${e}`,
    `Q${e},${e} ${e},0`,
    "Z"
  ].join(" ");
  s.setAttribute("d", a);
  const i = 0.72 * e;
  return {
    dom: s,
    textArea: { top: i, bottom: i, left: i, right: i, w: t.w - 1.44 * e, h: t.w - 1.44 * e }
  };
}
function Js(r) {
  const t = r.extend, s = r.background, e = $("g"), a = $("path"), i = y("adj", r, 0.25 * Math.min(t.w, t.h)), o = [
    `M0,${i / 2}`,
    `L0,${t.h - i / 2}`,
    `A${t.w / 2},${i / 2} 0 0 0 ${t.w},${t.h - i / 2}`,
    `L${t.w},${i / 2}`,
    `A${t.w / 2},${i / 2} 0 0 1 0,${i / 2}`,
    "Z"
  ].join(" ");
  a.setAttribute("d", o);
  const n = $("ellipse");
  return n.setAttribute("cx", t.w / 2 + "px"), n.setAttribute("cy", i / 2 + "px"), n.setAttribute("rx", t.w / 2 + "px"), n.setAttribute("ry", i / 2 + "px"), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", M(s, { light: 0.5 }) || "transparent"), e.appendChild(a), e.appendChild(n), {
    dom: e,
    textArea: { top: i, bottom: 0, left: 0, right: 0, w: t.w, h: t.h - i }
  };
}
function Ks(r) {
  const t = r.extend, s = r.background, e = y("adj", r, 0.25 * Math.min(t.w, t.h)), a = $("g"), i = $("path");
  i.setAttribute("d", [`M0,${e}`, `L${t.w - e},${e}`, `L${t.w - e},${t.h}`, `L0,${t.h}`, "Z"].join(" "));
  const o = $("path");
  o.setAttribute("d", [`M0,${e}`, `L${e},0`, `L${t.w},0`, `L${t.w - e},${e}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && o.setAttribute("fill", M(s, { light: 0.8 }) || "transparent");
  const n = $("path");
  return n.setAttribute("d", [`M${t.w},0`, `L${t.w - e},${e}`, `L${t.w - e},${t.h}`, `L${t.w},${t.h - e}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", M(s, { dark: 0.6 }) || "transparent"), a.appendChild(i), a.appendChild(o), a.appendChild(n), {
    dom: a,
    textArea: { top: e, bottom: 0, left: 0, right: e, w: t.w - e, h: t.h - e }
  };
}
function Ns(r) {
  const t = r.extend, s = r.background, e = y("adj", r, 0.125 * Math.min(t.w, t.h)), a = $("g"), i = $("path");
  i.setAttribute("d", [`M${e},${e}`, `L${t.w - e},${e}`, `L${t.w - e},${t.h - e}`, `L${e},${t.h - e}`, "Z"].join(" "));
  const o = $("path");
  o.setAttribute("d", ["M0,0", `L${e},${e}`, `L${t.w - e},${e}`, `L${t.w},0`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && o.setAttribute("fill", M(s, { light: 0.8 }) || "transparent");
  const n = $("path");
  n.setAttribute("d", [`M${t.w},0`, `L${t.w - e},${e}`, `L${t.w - e},${t.h - e}`, `L${t.w},${t.h}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", M(s, { dark: 0.6 }) || "transparent");
  const l = $("path");
  l.setAttribute("d", [`M${t.w},${t.h}`, `L${t.w - e},${t.h - e}`, `L${e},${t.h - e}`, `L0,${t.h}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && l.setAttribute("fill", M(s, { dark: 0.625 }) || "transparent");
  const p = $("path");
  return p.setAttribute("d", [`M0,${t.h}`, `L${e},${t.h - e}`, `L${e},${e}`, "L0,0", "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && p.setAttribute("fill", M(s, { light: 0.6 }) || "transparent"), a.appendChild(i), a.appendChild(o), a.appendChild(n), a.appendChild(l), a.appendChild(p), {
    dom: a,
    textArea: { top: e, bottom: e, left: e, right: e, w: t.w - 2 * e, h: t.h - 2 * e }
  };
}
function tr(r) {
  const t = r.extend, s = y("adj", r, 0.25 * Math.min(t.w, t.h)), e = $("path"), a = [
    `M0,${t.h / 2}`,
    `A${t.w / 2},${t.h / 2} 0 1,1 0,${t.h / 2 + 1}`,
    "Z",
    `M${t.w - s},${t.h / 2}`,
    `A${t.w / 2 - s},${t.h / 2 - s} 0 1,0 ${t.w - s},${t.h / 2 + 1}`,
    "Z"
  ].join(" ");
  return e.setAttribute("d", a), { dom: e, textArea: K(r) };
}
function er(r) {
  const t = r.extend, s = y("adj", r, 0.25 * Math.min(t.w, t.h)), e = $("path"), a = Math.atan(t.h / t.w), i = s / 2 / Math.sin(a), o = t.w / 2, n = t.h / 2, l = -1 * t.h / t.w, p = t.h * i / t.w, h = t.w / 2 - s, f = t.h / 2 - s, u = -2 * h * h * l * p, d = Math.sqrt(
    Math.pow(2 * h * h * l * p, 2) - 4 * (f * f + h * h * l * l) * h * h * (p * p - f * f)
  ), w = 2 * (f * f + h * h * l * l), L = (u - d) / w, b = l * L + p, m = (u + d) / w, x = l * m + p, g = -t.h * i / t.w, j = -2 * h * h * l * g, C = Math.sqrt(
    Math.pow(2 * h * h * l * g, 2) - 4 * (f * f + h * h * l * l) * h * h * (g * g - f * f)
  ), T = 2 * (f * f + h * h * l * l), k = (j - C) / T, B = l * k + g, I = (j + C) / T, R = l * I + g, F = [
    `M0,${t.h / 2}`,
    `A${t.w / 2},${t.h / 2} 0 1,1 0,${t.h / 2 + 1}`,
    "Z",
    `M${o + m},${n - x}`,
    `A${h},${f} 0 0 0 ${o + L},${n - b}`,
    "Z",
    `M${o + k},${n - B}`,
    `A${h},${f} 0 0 0 ${o + I},${n - R}`,
    "Z"
  ].join(" ");
  return e.setAttribute("d", F), { dom: e, textArea: K(r) };
}
function sr(r) {
  const t = r.extend, s = Math.min(t.w, t.h), e = $("path"), a = A("adj1", r, 180), i = A("adj2", r, 0), o = y("adj3", r, 0.25 * s), n = t.w / 2, l = t.h / 2, p = t.w / 2, h = t.h / 2, f = t.w / 2 - o, u = t.h / 2 - o, [d, w] = _(a, n, l, p, h), [L, b] = _(i, n, l, p, h), [m, x] = _(a, n, l, f, u), [g, j] = _(i, n, l, f, u), C = J(a, i), T = [
    `M${d},${w}`,
    `A${p} ${h} 0 ${C} 1 ${L} ${b}`,
    `L${g},${j}`,
    `A${f} ${u} 0 ${C} 0 ${m} ${x}`,
    "Z"
  ].join(" ");
  e.setAttribute("d", T);
  const k = [[d, w], [L, b], [m, x], [g, j]];
  a > i && k.push([t.w, t.h / 2]), (i > 180 && i <= 360 && a < 180 || a > i && i >= 0 && i < 180 && a < 180) && k.push([0, t.h / 2]), (a < i && a < 90 && i > 90 || a > i && i > 90 || a > i && a < 90) && k.push([t.w / 2, t.h]), (a < i && a < 270 && i > 270 || a > i && i > 270 || a > i && a < 270) && k.push([t.w / 2, 0]);
  let B = 1 / 0, I = 1 / 0, R = -1 / 0, F = -1 / 0;
  return k.forEach((z) => {
    B = Math.min(z[0], B), I = Math.min(z[1], I), R = Math.max(z[0], R), F = Math.max(z[1], F);
  }), {
    dom: e,
    textArea: { top: I, bottom: t.h - F, left: B, right: t.w - R, w: R - B, h: F - I }
  };
}
function rr(r) {
  const t = r.extend, s = r.background, e = $("g"), a = y("adj", r, 0.16667 * Math.min(t.w, t.h)), i = $("path");
  i.setAttribute("d", [
    "M0,0",
    `L${t.w},0`,
    `L${t.w},${t.h - a}`,
    `L${t.w - a},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" "));
  const o = a * Math.cos(Math.PI / 4) / Math.cos(Math.PI / 6) * Math.cos(75 / 180 * Math.PI), n = $("path");
  return n.setAttribute("d", [
    `M${t.w - a + o}, ${t.h - a + o}`,
    `L${t.w},${t.h - a}`,
    `L${t.w - a},${t.h}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", M(s, { dark: 0.6 }) || "transparent"), e.appendChild(i), e.appendChild(n), {
    dom: e,
    textArea: { top: 0, bottom: a, left: 0, right: 0, w: t.w, h: t.h - a }
  };
}
const ar = "http://www.w3.org/2000/svg";
function ir(r, t, s) {
  const e = r.background || {}, a = r.extend, { base64: i, alpha: o, fillRect: n = {} } = e, { b: l = 0, t: p = 0, l: h = 0, r: f = 0 } = n, u = $("defs"), d = $("pattern");
  d.setAttribute("id", "background_" + r.uuid), d.setAttribute("patternUnits", "userSpaceOnUse"), d.setAttribute("width", a.w + ""), d.setAttribute("height", a.h + "");
  const w = $("image");
  w.setAttribute("href", i), w.setAttribute("preserveAspectRatio", "none");
  const L = a.w * h, b = a.h * p, m = a.w * (1 - h - f), x = a.h * (1 - p - l);
  w.setAttribute("width", m + ""), w.setAttribute("height", x + ""), w.setAttribute("x", L + ""), w.setAttribute("y", b + ""), typeof o == "number" && w.setAttribute("opacity", o + ""), d.appendChild(w), u.appendChild(d), t.appendChild(u), s.setAttribute("fill", `url(#background_${r.uuid})`);
}
function or(r, t, s) {
  const e = r.background || {}, { gsList: a, lin: i, path: o, tileRect: n = {} } = e, l = $("defs"), p = $(o === "circle" ? "radialGradient" : "linearGradient");
  if (p.setAttribute("id", "background_grad_fill_" + r.uuid), (a || []).slice().sort((f, u) => f.pos - u.pos).forEach((f) => {
    const u = $("stop");
    u.setAttribute("offset", `${100 * f.pos}%`), u.setAttribute("stop-color", M(f.color)), p.appendChild(u);
  }), o === "circle") {
    const { r: f, l: u, t: d, b: w } = n;
    f === -1 ? p.setAttribute("cx", "100%") : u === -1 && p.setAttribute("cx", "0%"), d === -1 ? p.setAttribute("cy", "0%") : w === -1 && p.setAttribute("cy", "100%");
  } else i != null && i.ang && p.setAttribute("gradientTransform", `rotate(${i.ang})`);
  l.appendChild(p), t.appendChild(l), s.setAttribute("fill", `url(#background_grad_fill_${r.uuid})`);
}
function nr(r) {
  return !r || !r.type || r.type === "solid" ? "" : ({
    sysDot: [1, 1],
    sysDash: [3, 1],
    dash: [4, 3],
    dashDot: [4, 3, 1, 3],
    lgDash: [8, 3],
    lgDashDot: [8, 3, 1, 3],
    lgDashDotDot: [8, 3, 1, 3, 1, 3]
  }[r.type] || []).map((s) => s * r.width).join(",");
}
function dt(r) {
  const t = r.extend, s = r.offset, e = r.border, a = r.background, i = r.rotate, o = r.flipH, n = r.flipV, l = document.createElement("div");
  l.className = `shape-wrapper shape-${r.shape}`, l.style.setProperty("position", "absolute"), l.style.setProperty("width", (t.w || 1) + "px"), l.style.setProperty("height", (t.h || 1) + "px"), l.style.setProperty("left", s.x + "px"), l.style.setProperty("top", s.y + "px");
  let p;
  const h = document.createElementNS(ar, "svg");
  h.style.setProperty("position", "absolute"), h.setAttribute("width", "100%"), h.setAttribute("height", "100%"), h.style.setProperty("left", "0"), h.style.setProperty("top", "0"), h.style.overflow = "visible";
  let f = { left: 0, top: 0, bottom: 0, right: 0, w: t.w, h: t.h }, u = !0, d;
  switch (r.shape) {
    case "customGeom":
      d = ks(r), Q(r, h, d.dom);
      break;
    case "flowChartProcess":
    case "rect":
      d = { dom: ge(r) };
      break;
    case "snip1Rect":
      d = { dom: Qe(r) };
      break;
    case "snip2SameRect":
      d = { dom: Ue(r) };
      break;
    case "snip2DiagRect":
      d = { dom: Ve(r) };
      break;
    case "snipRoundRect":
      d = { dom: qe(r) };
      break;
    case "roundRect":
      d = { dom: ze(r) };
      break;
    case "round1Rect":
      d = { dom: He(r) };
      break;
    case "round2SameRect":
      d = { dom: We(r) };
      break;
    case "round2DiagRect":
      d = { dom: Xe(r) };
      break;
    case "triangle":
      d = Ss(r);
      break;
    case "rtTriangle":
      d = js(r);
      break;
    case "ellipse":
      d = Cs(r);
      break;
    case "line": {
      const m = Ye(r);
      Q(r, h, m), u = !1, d = { dom: m, hasFill: !1 };
      break;
    }
    case "straightConnector1": {
      const m = Je(r);
      Q(r, h, m), u = !1, d = { dom: m, hasFill: !1 };
      break;
    }
    case "bentConnector3": {
      const m = Ke(r);
      Q(r, h, m), u = !1, d = { dom: m, hasFill: !1 };
      break;
    }
    case "curvedConnector3": {
      const m = Ne(r);
      Q(r, h, m), u = !1, d = { dom: m, hasFill: !1 };
      break;
    }
    case "parallelogram":
      d = Rs(r);
      break;
    case "trapezoid":
      d = vs(r);
      break;
    case "diamond":
      d = Ts(r);
      break;
    case "pentagon":
      d = Bs(r);
      break;
    case "hexagon":
      d = Is(r);
      break;
    case "heptagon":
      d = _s(r);
      break;
    case "octagon":
      d = Ds(r);
      break;
    case "decagon":
      d = Es(r);
      break;
    case "dodecagon":
      d = Os(r);
      break;
    case "pie":
      d = Fs(r);
      break;
    case "arc":
      d = Gs(r);
      break;
    case "bracketPair":
      d = Hs(r);
      break;
    case "bracePair":
      d = Ws(r);
      break;
    case "chord":
      d = Zs(r);
      break;
    case "teardrop":
      d = zs(r);
      break;
    case "frame":
      d = Xs(r);
      break;
    case "halfFrame":
      d = Qs(r);
      break;
    case "corner":
      d = Us(r);
      break;
    case "diagStripe":
      d = Vs(r);
      break;
    case "plus":
      d = qs(r);
      break;
    case "plaque":
      d = Ys(r);
      break;
    case "can":
      d = Js(r);
      break;
    case "cube":
      d = Ks(r);
      break;
    case "bevel":
      d = Ns(r);
      break;
    case "donut":
      d = tr(r);
      break;
    case "noSmoking":
      d = er(r);
      break;
    case "rightArrow":
      d = ts(r);
      break;
    case "leftArrow":
      d = es(r);
      break;
    case "upArrow":
      d = ss(r);
      break;
    case "downArrow":
      d = rs(r);
      break;
    case "leftRightArrow":
      d = as(r);
      break;
    case "upDownArrow":
      d = is(r);
      break;
    case "quadArrow":
      d = os(r);
      break;
    case "leftRightUpArrow":
      d = ns(r);
      break;
    case "bentArrow":
      d = cs(r);
      break;
    case "uturnArrow":
      d = ls(r);
      break;
    case "leftUpArrow":
      d = hs(r);
      break;
    case "bentUpArrow":
      d = ps(r);
      break;
    case "curvedRightArrow":
      d = ds(r);
      break;
    case "curvedLeftArrow":
      d = fs(r);
      break;
    case "curvedUpArrow":
      d = us(r);
      break;
    case "curvedDownArrow":
      d = $s(r);
      break;
    case "stripedRightArrow":
      d = ws(r);
      break;
    case "notchedRightArrow":
      d = ms(r);
      break;
    case "homePlate":
      d = bs(r);
      break;
    case "chevron":
      d = ys(r);
      break;
    case "blockArc":
      d = sr(r);
      break;
    case "foldedCorner":
      d = rr(r);
      break;
    case "rightArrowCallout":
      d = xs(r);
      break;
    case "leftArrowCallout":
      d = gs(r);
      break;
    case "upArrowCallout":
      d = Ls(r);
      break;
    case "downArrowCallout":
      d = As(r);
      break;
    case "leftRightArrowCallout":
      d = Ms(r);
      break;
    case "quadArrowCallout":
      d = Ps(r);
      break;
  }
  if (d && (p = d.dom, d.textArea && (f = d.textArea), d.hasFill === !1 && (u = !1)), p) {
    if (u)
      if (a && a.type === "blipFill")
        ir(r, h, p);
      else if (a && a.type === "gradFill")
        or(r, h, p);
      else {
        const g = M(a);
        p.setAttribute("fill", g || "transparent");
      }
    else
      p.setAttribute("fill", "transparent");
    e.width ? (p.setAttribute("stroke-width", e.width + ""), p.setAttribute("stroke", M(e.color) || "transparent")) : p.setAttribute("stroke-width", "0");
    const m = nr(e);
    if (m && p.setAttribute("stroke-dasharray", m), e.width) {
      let g = "square";
      switch (e.cap) {
        case "sq":
          g = "square";
          break;
        case "rnd":
          g = "round";
          break;
        case "flat":
          g = "butt";
          break;
        default:
          g = "square";
          break;
      }
      p.setAttribute("stroke-linecap", g);
    }
    const x = e.lineJoin || "round";
    p.setAttribute("stroke-linejoin", x), x === "miter" && e.miterLim && p.setAttribute("stroke-miterlimit", e.miterLim + ""), h.appendChild(p);
  }
  const w = [];
  o && w.push("scaleX(-1)"), n && w.push("scaleY(-1)"), w.length > 0 && (h.style.transform = w.join(" ")), l.appendChild(h);
  const L = { left: f.left, top: f.top, right: f.right || 0, bottom: f.bottom, w: f.w, h: f.h }, b = Ze(r.textBody, L, r.isTextBox);
  return b && l.appendChild(b), i && (l.style.transform = `rotate(${i}deg)`), l;
}
function cr(r) {
  const t = r.extend, s = r.offset, e = r.tr, a = r.tableGrid.gridCol, i = document.createElement("div");
  i.style.position = "absolute", i.style.left = s.x + "px", i.style.top = s.y + "px", i.style.width = t.w + "px", i.style.height = t.h + "px";
  const o = document.createElement("table");
  return o.style.borderCollapse = "collapse", e.forEach((n) => {
    const l = n.props.height, p = document.createElement("tr");
    p.style.height = l + "px", n.td.forEach((h, f) => {
      var j, C, T;
      const u = h.props, d = h.inheritTcStyle, w = h.inheritTcTxStyle, L = h.paragraphs;
      if (u.vMerge || u.hMerge) return;
      const b = document.createElement("td");
      b.style.width = (((j = a[f]) == null ? void 0 : j.width) || 30) + "px", u.rowSpan && b.setAttribute("rowspan", u.rowSpan + ""), u.gridSpan && b.setAttribute("colspan", u.gridSpan + "");
      const m = u.background || (d == null ? void 0 : d.background);
      m && (b.style.background = M(m));
      const x = { ...d == null ? void 0 : d.border, ...u.border }, g = (k) => k ? k.toLowerCase().includes("dash") ? "dashed" : k.toLowerCase().includes("dot") ? "dotted" : "solid" : "solid";
      x.bottom && (b.style.borderBottom = `${x.bottom.width}px ${g(x.bottom.type)} ${M(x.bottom.color)}`), x.top && (b.style.borderTop = `${x.top.width}px ${g(x.top.type)} ${M(x.top.color)}`), x.left && (b.style.borderLeft = `${x.left.width}px ${g(x.left.type)} ${M(x.left.color)}`), x.right && (b.style.borderRight = `${x.right.width}px ${g(x.right.type)} ${M(x.right.color)}`), u.marT && (b.style.paddingTop = u.marT + "px"), u.marB && (b.style.paddingBottom = u.marB + "px"), u.marL && (b.style.paddingLeft = u.marL + "px"), u.marR && (b.style.paddingRight = u.marR + "px"), u.anchor === "ctr" ? b.style.verticalAlign = "middle" : u.anchor === "b" && (b.style.verticalAlign = "bottom");
      for (let k = 0; k < L.length; k++) {
        const B = L[k];
        w && (w.bold && ((C = B.rows) == null || C.forEach((R) => {
          R.props && !R.props.bold && (R.props.bold = !0);
        })), w.color && ((T = B.rows) == null || T.forEach((R) => {
          R.props && !R.props.color && (R.props.color = w.color);
        })));
        const I = xe(B, k + 1, {
          isFirst: k === 0,
          isLast: k === L.length - 1
        });
        b.appendChild(I);
      }
      p.appendChild(b);
    }), o.appendChild(p);
  }), i.appendChild(o), i;
}
function Le(r) {
  const t = document.createElement("div"), s = r.extend, e = r.offset;
  t.style.position = "absolute", t.style.left = e.x + "px", t.style.top = e.y + "px", t.style.width = s.w + "px", t.style.height = s.h + "px";
  const a = [];
  r.flipH && a.push("scaleX(-1)"), r.flipV && a.push("scaleY(-1)"), r.rotate && a.push(`rotate(${r.rotate}deg)`), t.style.transformOrigin = "center center", t.style.transform = a.join(" ");
  for (let i = 0; i < r.nodes.length; i++) {
    const o = r.nodes[i];
    let n;
    o instanceof rt ? n = pt(o) : o instanceof H ? n = dt(o) : o instanceof ht && (n = Le(o)), n && t.appendChild(n);
  }
  return t;
}
function lr(r) {
  const t = document.createElement("div"), s = r.extend, e = r.offset, a = r.flipV, i = r.flipH, o = r.rotate;
  t.className = "smart-chart-diagram", t.style.position = "absolute", t.style.left = e.x + "px", t.style.top = e.y + "px", t.style.width = s.w + "px", t.style.height = s.h + "px";
  const n = [];
  i && n.push("scaleX(-1)"), a && n.push("scaleY(-1)"), o && n.push(`rotate(${o}deg)`), t.style.transformOrigin = "center center", t.style.transform = n.join(" ");
  for (let l = 0; l < r.nodes.length; l++) {
    const p = r.nodes[l];
    let h;
    p instanceof rt ? h = pt(p) : p instanceof H && (h = dt(p)), h && t.appendChild(h);
  }
  return t;
}
function hr(r) {
  const t = document.createElement("div"), s = r.extend, e = r.offset;
  if (t.style.position = "absolute", t.style.left = e.x + "px", t.style.top = e.y + "px", t.style.width = s.w + "px", t.style.height = s.h + "px", r.options && r.options.series && r.options.series.length > 0)
    try {
      ke.init(t).setOption(r.options);
    } catch {
    }
  return t;
}
class ue {
  constructor(t, s, e) {
    this.scale = 1, this.wrapper = t, this.pptx = s, this.options = e, this._calcScaleAndRenderPort();
  }
  _calcScaleAndRenderPort() {
    const t = this.options.viewPort.width / this.pptx.width;
    this.scale = t;
    const s = this.options.viewPort.width, e = this.pptx.height * this.scale;
    this.renderPort = { width: s, height: e, left: 0, top: 0 };
  }
  renderSlide(t) {
    const s = this.pptx.slides[t], e = document.createElement("div");
    e.classList.add("pptx-preview-slide-wrapper"), e.classList.add(`pptx-preview-slide-wrapper-${t}`), e.style.setProperty("width", this.renderPort.width + "px"), e.style.setProperty("height", this.renderPort.height + "px"), e.style.setProperty("position", this.options.mode === "slide" ? "absolute" : "relative"), this.options.mode === "slide" && e.style.setProperty("top", (this.options.viewPort.height - this.renderPort.height) / 2 + "px"), e.style.margin = "0 auto 10px", e.style.setProperty("background", "#fff"), e.style.setProperty("overflow", "hidden"), this._renderBackground(s, e), this._renderSlideMaster(s.slideMaster, e), this._renderSlideLayout(s.slideLayout, e), this._renderSlide(s, e), this.wrapper.append(e);
  }
  _renderSlideMaster(t, s) {
    const e = document.createElement("div");
    e.classList.add("slide-master-wrapper"), e.style.setProperty("position", "absolute"), e.style.setProperty("left", "0"), e.style.setProperty("top", "0"), e.style.setProperty("width", this.pptx.width + "px"), e.style.setProperty("height", this.pptx.height + "px"), e.style.setProperty("transform", `scale(${this.scale})`), e.style.setProperty("transform-origin", "0 0");
    const a = [...t.nodes].filter((i) => i.userDrawn);
    a.sort((i, o) => i.order > o.order ? 1 : -1);
    for (const i of a) {
      const o = this._renderNode(i);
      o && e.append(o);
    }
    s.append(e);
  }
  _renderSlideLayout(t, s) {
    const e = document.createElement("div");
    e.classList.add("slide-layout-wrapper"), e.style.setProperty("position", "absolute"), e.style.setProperty("left", "0"), e.style.setProperty("top", "0"), e.style.setProperty("width", this.pptx.width + "px"), e.style.setProperty("height", this.pptx.height + "px"), e.style.setProperty("transform", `scale(${this.scale})`), e.style.setProperty("transform-origin", "0 0");
    const a = [...t.nodes].filter((i) => i.userDrawn);
    a.sort((i, o) => i.order > o.order ? 1 : -1);
    for (const i of a) {
      const o = this._renderNode(i);
      o && e.append(o);
    }
    s.append(e);
  }
  _renderSlide(t, s) {
    const e = document.createElement("div");
    e.classList.add("slide-wrapper"), e.style.setProperty("position", "absolute"), e.style.setProperty("left", "0"), e.style.setProperty("top", "0"), e.style.setProperty("width", this.pptx.width + "px"), e.style.setProperty("height", this.pptx.height + "px"), e.style.setProperty("transform", `scale(${this.scale})`), e.style.setProperty("transform-origin", "0 0");
    const a = [...t.nodes];
    a.sort((i, o) => i.order > o.order ? 1 : -1);
    for (const i of a) {
      const o = this._renderNode(i);
      o && e.append(o);
    }
    s.append(e);
  }
  _renderNode(t) {
    if (t instanceof rt) return pt(t);
    if (t instanceof H) return dt(t);
    if (t instanceof ht) return Le(t);
    if (t instanceof me) return lr(t);
    if (t instanceof we) return cr(t);
    if (t instanceof be) return hr(t);
  }
  _renderBackground(t, s) {
    var i;
    const e = document.createElement("div");
    e.classList.add("slide-background"), e.style.setProperty("position", "absolute"), e.style.setProperty("left", "0"), e.style.setProperty("top", "0"), e.style.setProperty("width", "100%"), e.style.setProperty("height", "100%");
    let a = t.background;
    if (a.type === "none" && (a = t.slideLayout.background), a.type === "none" && (a = t.slideMaster.background), a.type === "blipFill") {
      const { base64: o, alpha: n, fillRect: l = {} } = a, { b: p = 0, t: h = 0, l: f = 0, r: u = 0 } = l, d = this.renderPort.width * f, w = this.renderPort.height * h, L = this.renderPort.width * (1 - f - u), b = this.renderPort.height * (1 - h - p);
      e.style.backgroundImage = `url(${o})`, e.style.backgroundSize = `${L} ${b}`, e.style.backgroundPosition = `${d}px ${w}px`, n && (e.style.opacity = n + ""), e.style.backgroundRepeat = "no-repeat";
    } else if (a.type === "solidFill") {
      const o = M(t.background) || M(t.slideLayout.background) || M(t.slideMaster.background);
      o ? e.style.setProperty("background", o) : e.style.setProperty("background", "#fff");
    } else if (a.type === "gradFill")
      if (a.path === "circle") {
        const o = a.tileRect || {}, { b: n, t: l, l: p, r: h } = o;
        let f = "radial-gradient(circle at ";
        h === -1 ? f += " right" : p === -1 && (f += " left"), l === -1 ? f += " top" : n === -1 && (f += " bottom"), !n && !l && !p && !h && (f += " center"), f += ",", f += a.gsList.map((u) => `${M(u.color)} ${100 * u.pos + "%"}`).join(","), e.style.setProperty("background", f);
      } else {
        let n = `linear-gradient(${(((i = a.lin) == null ? void 0 : i.ang) || 0) + 90}deg,`;
        n += a.gsList.map((l) => `${M(l.color)} ${100 * l.pos + "%"}`).join(","), e.style.setProperty("background", n);
      }
    s.append(e);
  }
}
const Z = {};
function N(r, t) {
  if (Z[r])
    for (let s = 0; s < Z[r].length; s++)
      Z[r][s](t);
}
function lt(r, t) {
  Z ? Z[r] && (Z[r] = Z[r].filter((s) => s !== t)) : Z[r] = [];
}
class pr {
  constructor(t, s) {
    this.currentIndex = -1, this.dom = t, this.options = s, this._renderWrapper();
  }
  get slideCount() {
    var t, s;
    return ((s = (t = this.pptx) == null ? void 0 : t.slides) == null ? void 0 : s.length) ?? 0;
  }
  _renderWrapper() {
    const t = document.createElement("div");
    t.classList.add("pptx-preview-wrapper"), t.setAttribute("position", "relative"), t.style.setProperty("background", "#000"), t.style.setProperty("width", this.options.width + "px"), this.options.height && t.style.setProperty("height", this.options.height + "px"), t.style.setProperty("position", "relative"), t.style.setProperty("margin", "0 auto"), this.options.height && t.style.setProperty("overflow-y", "auto"), this.dom.append(t), this.wrapper = t;
  }
  renderNextButton() {
    const t = document.createElement("div");
    t.classList.add("pptx-preview-wrapper-next"), t.style.setProperty("position", "absolute"), t.style.setProperty("bottom", "20px"), t.style.setProperty("right", "80px"), t.style.setProperty("z-index", "100"), t.style.setProperty("cursor", "pointer"), t.style.setProperty("width", "40px"), t.style.setProperty("height", "40px"), t.style.setProperty("background", "#666666"), t.style.setProperty("border-radius", "100%");
    const s = document.createElement("div");
    return s.style.setProperty("width", "10px"), s.style.setProperty("height", "10px"), s.style.setProperty("border-left", "2px solid #fff"), s.style.setProperty("border-bottom", "2px solid #fff"), s.style.setProperty("transform", "rotate(225deg)"), s.style.setProperty("position", "absolute"), s.style.setProperty("top", "15px"), s.style.setProperty("left", "15px"), t.append(s), t;
  }
  renderPreButton() {
    const t = document.createElement("div");
    t.classList.add("pptx-preview-wrapper-next"), t.style.setProperty("position", "absolute"), t.style.setProperty("bottom", "20px"), t.style.setProperty("right", "140px"), t.style.setProperty("z-index", "100"), t.style.setProperty("cursor", "pointer"), t.style.setProperty("width", "40px"), t.style.setProperty("height", "40px"), t.style.setProperty("background", "#666666"), t.style.setProperty("border-radius", "100%");
    const s = document.createElement("div");
    return s.style.setProperty("width", "10px"), s.style.setProperty("height", "10px"), s.style.setProperty("border-left", "2px solid #fff"), s.style.setProperty("border-bottom", "2px solid #fff"), s.style.setProperty("transform", "rotate(45deg)"), s.style.setProperty("position", "absolute"), s.style.setProperty("top", "15px"), s.style.setProperty("left", "15px"), t.append(s), t;
  }
  updatePagination() {
    const t = this.wrapper.querySelector(".pptx-preview-wrapper-pagination");
    t && (t.innerText = `${this.currentIndex + 1}/${this.slideCount}`);
  }
  renderPagination(t) {
    const s = document.createElement("div");
    s.classList.add("pptx-preview-wrapper-pagination"), s.innerText = `${this.currentIndex + 1}/${this.slideCount}`, s.style.setProperty("position", "absolute"), s.style.setProperty("bottom", "33px"), s.style.setProperty("right", "20px"), s.style.setProperty("color", "#666666"), s.style.setProperty("font-size", "14px"), s.style.setProperty("z-index", "100"), t.append(s);
  }
  removeCurrentSlide() {
    const t = this.wrapper.querySelector(`.pptx-preview-slide-wrapper-${this.currentIndex}`);
    t && this.wrapper.removeChild(t), N("removeSlide");
  }
  renderNextSlide() {
    this.removeCurrentSlide(), this.currentIndex = this.currentIndex < this.slideCount - 1 ? this.currentIndex + 1 : 0, this.htmlRender.renderSlide(this.currentIndex), this.updatePagination();
  }
  renderPreSlide() {
    this.removeCurrentSlide(), this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slideCount - 1, this.htmlRender.renderSlide(this.currentIndex), this.updatePagination();
  }
  _addPre(t) {
  }
  preview(t) {
    return N("destroy"), lt("destroy"), new Promise((s, e) => {
      this.wrapper.innerHTML = "";
      const a = this.pptx = new ce();
      a.load(t).then(() => {
        try {
          const i = this.htmlRender = new ue(this.wrapper, a, {
            viewPort: { width: this.options.width, height: this.options.height || 0 },
            mode: this.options.mode
          });
          if (this.options.mode === "slide") {
            const o = this.renderNextButton();
            o.onclick = () => this.renderNextSlide(), this.wrapper.append(o);
            const n = this.renderPreButton();
            n.onclick = () => this.renderPreSlide(), this.wrapper.append(n), this.renderPagination(this.wrapper), this._addPre(this.wrapper), this.currentIndex = 0, i.renderSlide(0);
          } else
            for (let o = 0; o < a.slides.length; o++)
              i.renderSlide(o);
          s(a);
        } catch (i) {
          e(i);
        }
      }).catch((i) => e(i));
    });
  }
  load(t) {
    return N("destroy"), lt("destroy"), new Promise((s, e) => {
      this.wrapper.innerHTML = "";
      const a = this.pptx = new ce();
      a.load(t).then(() => {
        try {
          this.htmlRender = new ue(this.wrapper, a, {
            viewPort: { width: this.options.width, height: this.options.height || 0 },
            mode: this.options.mode
          }), s(a);
        } catch (i) {
          e(i);
        }
      }).catch((i) => e(i));
    });
  }
  renderSingleSlide(t) {
    this.removeCurrentSlide(), this.currentIndex = t, this.htmlRender.renderSlide(this.currentIndex);
  }
  destroy() {
    N("destroy"), lt("destroy");
  }
}
function $r(r, t) {
  return new pr(r, t);
}
export {
  pr as PPTXPreviewer,
  $r as init
};
