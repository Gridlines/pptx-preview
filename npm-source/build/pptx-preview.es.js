import Ae from "jszip";
import { get as c, omit as Me } from "lodash";
import { v4 as Pe } from "uuid";
import * as ke from "echarts";
var tt = 1;
function B(a) {
  const p = `\r
	>/= `;
  let h = 0;
  return tt = 1, $e(
    function f() {
      const u = [];
      for (; a[h]; ) {
        if (a.charCodeAt(h) === 60) {
          if (a.charCodeAt(h + 1) === 47)
            return h = a.indexOf(">", h), u;
          if (a.charCodeAt(h + 1) === 33) {
            if (a.charCodeAt(h + 2) === 45) {
              for (; a.charCodeAt(h) !== 62 || a.charCodeAt(h - 1) !== 45 || a.charCodeAt(h - 2) !== 45 || h === -1; )
                h = a.indexOf(">", h + 1);
              h === -1 && (h = a.length);
            } else
              for (h += 2; a.charCodeAt(h) !== 62; h++) ;
            h++;
            continue;
          }
          if (a.charCodeAt(h + 1) === 63) {
            h = a.indexOf(">", h), h++;
            continue;
          }
          let d = ++h;
          for (; p.indexOf(a[h]) === -1; ) h++;
          const w = a.slice(d, h);
          let g = !1, m = {};
          for (; a.charCodeAt(h) !== 62; ) {
            const x = a.charCodeAt(h);
            if (x > 64 && x < 91 || x > 96 && x < 123) {
              for (d = h; p.indexOf(a[h]) === -1; ) h++;
              const L = a.slice(d, h);
              let M = a.charCodeAt(h);
              for (; M !== 39 && M !== 34; )
                h++, M = a.charCodeAt(h);
              const R = a[h], T = ++h;
              h = a.indexOf(R, T);
              const C = a.slice(T, h);
              g || (m = {}, g = !0), m[L] = C;
            }
            h++;
          }
          let b = [];
          a.charCodeAt(h - 1) !== 47 && (h++, b = f()), u.push({ children: b, tagName: w, attrs: m });
        } else {
          const d = h;
          h = a.indexOf("<", h) - 1, h === -2 && (h = a.length);
          const w = a.slice(d, h + 1);
          w.length > 0 && u.push(w);
        }
        h++;
      }
      return u;
    }()
  );
}
function $e(a) {
  const t = {};
  if (a === void 0) return {};
  if (a.length === 1 && typeof a[0] == "string") return a[0];
  a.forEach((s) => {
    if (t[s.tagName] || (t[s.tagName] = []), typeof s == "object") {
      const e = $e(s.children);
      typeof e == "object" && (s.attrs && (e.attrs = s.attrs), e.attrs === void 0 ? e.attrs = { order: tt } : e.attrs.order = tt), tt++, t[s.tagName].push(e);
    }
  });
  for (const s in t)
    t[s].length === 1 && (t[s] = t[s][0]);
  return t;
}
function W(a) {
  return Math.abs(a) > 2e4 ? "emu" : "point";
}
function k(a) {
  return a / 12700;
}
function F(a) {
  return a / 20;
}
function st(a) {
  return a / 6e4;
}
function Z(a) {
  return a / 1e5;
}
function at(a) {
  const t = Math.ceil(a / 26), s = (a % 26 || 26) - 1 + 65;
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
function Ce(a) {
  let t;
  const s = Se.indexOf(a);
  return s !== -1 && (t = je[s]), `#${t || "000000"}`;
}
function j(a, t, s) {
  const e = { type: "solidFill" };
  if (a["a:srgbClr"])
    e.color = "#" + a["a:srgbClr"].attrs.val;
  else if (a["a:schemeClr"]) {
    let h = a["a:schemeClr"].attrs.val;
    s && (h = s.getColorThemeName(h)), e.color = t.getColor(h);
  } else if (a["a:sysClr"])
    e.color = "#" + a["a:sysClr"].attrs.lastClr;
  else if (a["a:prstClr"]) {
    const h = c(a["a:prstClr"], ["attrs", "val"]);
    e.color = Ce(h);
  }
  const r = a["a:srgbClr"] || a["a:schemeClr"] || a["a:sysClr"], i = c(r, ["a:alpha", "attrs", "val"], 1e5);
  e.alpha = i / 1e5;
  const o = c(r, ["a:shade", "attrs", "val"]);
  o && (e.shade = o / 1e5);
  const n = c(r, ["a:lumMod", "attrs", "val"]);
  n && (e.lumMod = n / 1e5);
  const l = c(r, ["a:lumOff", "attrs", "val"]);
  l && (e.lumOff = l / 1e5);
  const p = c(r, ["a:tint", "attrs", "val"]);
  return p && (e.tint = p / 1e5), e;
}
function U(a, t, s) {
  var n;
  const e = { type: "blipFill" }, r = c(a, ["a:blip", "attrs", "r:embed"]);
  if (r) {
    const l = (n = s.rels[r]) == null ? void 0 : n.target;
    l && (e.base64 = t.getMedia(l));
  }
  const i = c(a, ["a:blip", "a:alphaModFix", "attrs", "amt"]);
  i && (e.alpha = i / 1e5);
  const o = c(a, ["a:stretch", "a:fillRect", "attrs"]);
  return o && (e.fillRect = {}, o.b && (e.fillRect.b = o.b / 1e5), o.t && (e.fillRect.t = o.t / 1e5), o.r && (e.fillRect.r = o.r / 1e5), o.l && (e.fillRect.l = o.l / 1e5)), e;
}
function V(a, t, s) {
  const e = {
    type: "gradFill",
    tileRect: {},
    lin: {},
    gsList: []
  };
  e.flip = a.attrs.flip, e.path = c(a, ["a:path", "attrs", "path"]) || "linear", e.rotWithShape = a.attrs.rotWithShape === "1", c(a, ["a:lin", "attrs", "ang"]) && (e.lin.ang = st(a["a:lin"].attrs.ang)), c(a, ["a:lin", "attrs", "scaled"]) && (e.lin.scaled = a["a:lin"].attrs.scaled === "1");
  const r = c(a, ["a:gsLst", "a:gs"]) || [];
  return e.gsList = r.map((i) => ({
    color: j(i, t, s),
    pos: Z(i.attrs.pos)
  })), c(a, ["a:tileRect", "attrs", "l"]) && (e.tileRect.l = Z(a["a:tileRect"].attrs.l)), c(a, ["a:tileRect", "attrs", "t"]) && (e.tileRect.t = Z(a["a:tileRect"].attrs.t)), c(a, ["a:tileRect", "attrs", "r"]) && (e.tileRect.r = Z(a["a:tileRect"].attrs.r)), c(a, ["a:tileRect", "attrs", "b"]) && (e.tileRect.b = Z(a["a:tileRect"].attrs.b)), e;
}
function it(a) {
  return a <= 0.04045 ? a / 12.92 : Math.pow((a + 0.055) / 1.055, 2.4);
}
function ot(a) {
  return a < 31308e-7 ? 12.92 * a : 1.055 * Math.pow(a, 1 / 2.4) - 0.055;
}
function ie(a, t) {
  const s = it(a[0] / 255) * t, e = it(a[1] / 255) * t, r = it(a[2] / 255) * t;
  return [
    Math.round(255 * ot(s)),
    Math.round(255 * ot(e)),
    Math.round(255 * ot(r))
  ];
}
function nt(a, t, s) {
  const e = a / 255, r = t / 255, i = s / 255, o = Math.max(e, r, i), n = Math.min(e, r, i), l = o - n;
  let p = 0;
  const h = (o + n) / 2;
  return l === 0 ? p = 0 : o === e ? p = (r - i) / l % 6 : o === r ? p = (i - e) / l + 2 : o === i && (p = (e - r) / l + 4), p = Math.round(60 * p), p < 0 && (p += 360), {
    h: p,
    s: l === 0 || h === 0 || h === 1 ? 0 : l / (1 - Math.abs(2 * h - 1)),
    l: h
  };
}
function ct(a, t, s) {
  const e = (1 - Math.abs(2 * s - 1)) * t, r = e * (1 - Math.abs(a / 60 % 2 - 1)), i = s - e / 2;
  let o, n, l;
  return a < 60 ? (o = e, n = r, l = 0) : a < 120 ? (o = r, n = e, l = 0) : a < 180 ? (o = 0, n = e, l = r) : a < 240 ? (o = 0, n = r, l = e) : a < 300 ? (o = r, n = 0, l = e) : (o = e, n = 0, l = r), [
    Math.round(255 * (o + i)),
    Math.round(255 * (n + i)),
    Math.round(255 * (l + i))
  ];
}
function P(a, t) {
  if (!a || a.type === "none") return "";
  if (a.type === "solidFill" && /^#[\da-fA-F]{3,6}$/.test(a.color)) {
    let s = parseInt(a.color.substr(1, 2), 16), e = parseInt(a.color.substr(3, 2), 16), r = parseInt(a.color.substr(5, 2), 16);
    if (a.shade) {
      const o = ie([s, e, r], a.shade);
      s = o[0], e = o[1], r = o[2];
    }
    if (a.lumMod) {
      const o = nt(s, e, r);
      let n = o.l * a.lumMod;
      n >= 1 && (n = 1);
      const l = ct(o.h, o.s, n);
      s = l[0], e = l[1], r = l[2];
    }
    if (a.lumOff) {
      const o = nt(s, e, r);
      let n = a.lumOff + o.l;
      n > 1 && (n = 1);
      const l = ct(o.h, o.s, n);
      s = l[0], e = l[1], r = l[2];
    }
    if (a.tint || t != null && t.light) {
      const o = nt(s, e, r);
      let n = a.tint || (t == null ? void 0 : t.light);
      n >= 1 && (n = 1);
      const l = ct(o.h, o.s, o.l * n + (1 - n));
      s = l[0], e = l[1], r = l[2];
    }
    if (t != null && t.dark) {
      const o = ie([s, e, r], t.dark);
      s = o[0], e = o[1], r = o[2];
    }
    const i = a.alpha;
    return `rgba(${s},${e},${r},${i})`;
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
    const r = c(t, ["p:nvSpPr", "p:nvPr"]);
    if (r) {
      const n = c(r, "p:ph");
      n && n.attrs && (this.idx = n.attrs.idx, this.type = n.attrs.type), c(r, ["attrs", "userDrawn"]) && (this.userDrawn = c(r, ["attrs", "userDrawn"]) === "1");
    }
    if (this.order = c(t, "attrs.order", 0), this.source["p:spPr"]) {
      const n = this.getXfrm();
      if (n) {
        const l = this.group && ((i = this.ctx.pptx) != null && i.wps || W(parseInt(n["a:off"].attrs.x)) === "point") ? F : k;
        this.offset = {
          x: Math.round(l(parseInt(n["a:off"].attrs.x))),
          y: Math.round(l(parseInt(n["a:off"].attrs.y)))
        }, this.extend = {
          w: Math.round(l(parseInt(n["a:ext"].attrs.cx))),
          h: Math.round(l(parseInt(n["a:ext"].attrs.cy || "0")))
        }, this.rotate = st(parseInt(c(n, "attrs.rot", 0))), this.flipV = c(n, "attrs.flipV") === "1", this.flipH = c(n, "attrs.flipH") === "1";
      }
    } else if (this.source["p:xfrm"]) {
      const n = this.source["p:xfrm"], l = this.group && ((o = this.ctx.pptx) != null && o.wps || W(parseInt(n["a:off"].attrs.x)) === "point") ? F : k;
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
    const s = this.node.ctx, e = this.node.type, r = this.node.idx;
    if (e || r)
      switch (s.slideType) {
        case "slideMaster":
          break;
        case "slideLayout":
          t = e ? s.slideMaster.getNodeByType(e) : s.slideMaster.getNodeByIdx(r), t && (this.inheritProps = c(t, ["textBody", "props"]) || {});
          break;
        case "slide":
          t = e ? s.slideLayout.slideMaster.getNodeByType(e) : s.slideLayout.slideMaster.getNodeByIdx(r), t && Object.assign(this.inheritProps, c(t, ["textBody", "props"]) || {}), t = e ? s.slideLayout.getNodeByType(e) : s.slideLayout.getNodeByIdx(r), t && Object.assign(this.inheritProps, c(t, ["textBody", "props"]) || {});
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
          this.props[e] = k(parseInt(t[e]));
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
      e && (this.props.normAutofit.fontScale = Z(parseInt(e)));
      const r = s.lnSpcReduction;
      r && (this.props.normAutofit.lnSpcReduction = Z(parseInt(r)));
    }
  }
  _parseLstStyle() {
    const t = {}, s = c(this.source, "a:lstStyle") || {};
    Object.keys(s).forEach((e) => {
      if (e.startsWith("a:") && e.endsWith("pPr")) {
        const r = e.substr(2, e.length - 5);
        t[r] = { props: this._formatPPr(s[e]) };
        const i = c(s[e], ["a:defRPr"]);
        t[r].defRPr = this._formatRPr(i);
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
    const r = c(t, ["a:endParaRPr"]);
    s.endParaRProps = this._formatRPr(r);
    let i = c(t, ["a:r"]) || [];
    Array.isArray(i) || (i = [i]);
    let o = c(t, ["a:br"]) || [];
    return Array.isArray(o) || (o = [o]), i = i.concat(
      o.map((n) => ({ isBr: !0, ...n }))
    ), i.sort((n, l) => c(n, ["attrs", "order"]) - c(l, ["attrs", "order"])), s.rows = i.map((n) => this._parseRow(n)), s.inheritProps = this._getInheritPProps(s.props.level), s.inheritRProps = this._getInheritRProps(s.props.level), s;
  }
  _getInheritPProps(t = "0") {
    let s;
    const e = {}, r = this.node.ctx, i = this.node.type, o = this.node.idx, n = `lvl${t ? +t + 1 : 1}`;
    switch (r.slideType) {
      case "slideMaster":
        this.node.isTextBox ? Object.assign(e, c(r.defaultTextStyle, [n, "props"]) || {}) : Object.assign(e, c(r, ["textStyles", "otherStyle", n, "props"]) || {});
        break;
      case "slideLayout":
        this.node.isTextBox ? Object.assign(e, c(r.slideMaster.defaultTextStyle, [n, "props"]) || {}) : Object.assign(e, c(r.slideMaster, ["textStyles", "otherStyle", n, "props"]) || {}), (i || o) && (s = i ? r.slideMaster.getNodeByType(i) : r.slideMaster.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "props"]) || {}));
        break;
      case "slide":
        this.node.isTextBox ? Object.assign(e, c(r.slideLayout.slideMaster.defaultTextStyle, [n, "props"]) || {}) : Object.assign(e, c(r.slideLayout.slideMaster, ["textStyles", "otherStyle", n, "props"]) || {}), (i || o) && (["subTitle", "ctrTitle", "title"].includes(i) && Object.assign(e, c(r.slideLayout.slideMaster, ["textStyles", "titleStyle", n, "props"]) || {}), s = i ? r.slideLayout.slideMaster.getNodeByType(i) : r.slideLayout.slideMaster.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "props"]) || {}), s = i ? r.slideLayout.getNodeByType(i) : r.slideLayout.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "props"]) || {}));
        break;
    }
    return c(this.lstStyle, [n, "props"]) && Object.assign(e, c(this.lstStyle, [n, "props"])), e;
  }
  _getInheritRProps(t = "0") {
    let s, e = {};
    const r = this.node.ctx, i = this.node.type, o = this.node.idx, n = `lvl${t ? +t + 1 : 1}`;
    switch (r.slideType) {
      case "slideMaster":
        this.node.isTextBox ? Object.assign(e, c(r.defaultTextStyle, [n, "defRPr"]) || {}) : Object.assign(e, c(r, ["textStyles", "otherStyle", n, "defRPr"]) || {});
        break;
      case "slideLayout":
        this.node.isTextBox ? Object.assign(e, c(r.slideMaster.defaultTextStyle, [n, "defRPr"]) || {}) : Object.assign(e, c(r.slideMaster, ["textStyles", "otherStyle", n, "defRPr"]) || {}), (i || o) && (s = i ? r.slideMaster.getNodeByType(i) : r.slideMaster.getNodeByIdx(o), s && (e = c(s, ["textBody", "lstStyle", n, "defRPr"]) || {}));
        break;
      case "slide":
        this.node.isTextBox ? Object.assign(e, c(r.slideLayout.slideMaster.defaultTextStyle, [n, "defRPr"]) || {}) : Object.assign(e, c(r.slideLayout.slideMaster, ["textStyles", "otherStyle", n, "defRPr"]) || {}), (i || o) && (["subTitle", "ctrTitle", "title"].includes(i) && Object.assign(e, c(r.slideLayout.slideMaster, ["textStyles", "titleStyle", n, "defRPr"]) || {}), s = i ? r.slideLayout.slideMaster.getNodeByType(i) : r.slideLayout.slideMaster.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "defRPr"]) || {}), s = i ? r.slideLayout.getNodeByType(i) : r.slideLayout.getNodeByIdx(o), s && Object.assign(e, c(s, ["textBody", "lstStyle", n, "defRPr"]) || {}));
        break;
    }
    const l = c(this.node.source, ["p:style", "a:fontRef"]);
    return c(l, "a:schemeClr") && (e.color = j(l, this.node.theme, this.node)), c(this.lstStyle, [n, "defRPr"]) && Object.assign(e, c(this.lstStyle, [n, "defRPr"])), e;
  }
  _formatPPr(t) {
    const s = {}, e = c(t, "attrs") || {};
    return Object.keys(e).forEach((r) => {
      switch (r) {
        case "algn":
          s.align = e[r];
          break;
        case "marL":
          s.marginLeft = k(parseInt(e[r]));
          break;
        case "indent":
          s.indent = k(parseInt(e[r]));
          break;
        case "lvl":
          s.level = e[r];
          break;
      }
    }), c(t, ["a:lnSpc", "a:spcPct", "attrs", "val"]) && (s.lineHeight = parseInt(t["a:lnSpc"]["a:spcPct"].attrs.val) / 1e5), c(t, ["a:buAutoNum", "attrs", "type"]) && (s.buAutoNum = t["a:buAutoNum"].attrs.type), c(t, ["a:buChar", "attrs", "char"]) && (s.buChar = t["a:buChar"].attrs.char), c(t, ["a:buNone"]) && (s.buNone = !0), c(t, ["a:spcBef", "a:spcPts", "attrs", "val"]) && (s.spaceBefore = parseInt(t["a:spcBef"]["a:spcPts"].attrs.val) / 100), c(t, ["a:spcAft", "a:spcPts", "attrs", "val"]) && (s.spaceAfter = parseInt(t["a:spcAft"]["a:spcPts"].attrs.val) / 100), c(t, ["a:defRPr"]) && (s.defRPr = this._formatRPr(c(t, ["a:defRPr"]))), s;
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
    const r = c(t, "a:solidFill");
    r && (s.color = j(r, this.node.theme, this.node));
    const i = c(t, "a:highlight");
    return i && (s.background = j(i, this.node.theme, this.node)), s.typeface = c(t, ["a:ea", "attrs", "typeface"]), s;
  }
}
function X(a, t, s) {
  const e = {};
  if (c(a, "a:noFill")) return e;
  c(a, "attrs.w") && (e.width = k(parseInt(c(a, "attrs.w"))));
  const r = c(a, "a:solidFill");
  r && (e.color = j(r, t, s));
  const i = c(a, "a:prstDash");
  if (i && (e.type = i.attrs.val), c(a, ["a:miter"]) && (e.lineJoin = "miter"), c(a, ["a:bevel"]) && (e.lineJoin = "bevel"), c(a, ["a:round"]) && (e.lineJoin = "round"), c(a, ["a:miter", "attrs", "lim"]) && (e.miterLim = k(parseInt(c(a, ["a:miter", "attrs", "lim"])))), c(a, ["a:headEnd"])) {
    const o = c(a, ["a:headEnd", "attrs"]);
    e.headEnd = { type: o.type, len: o.len, w: o.w };
  }
  if (c(a, ["a:tailEnd"])) {
    const o = c(a, ["a:tailEnd", "attrs"]);
    e.tailEnd = { type: o.type, len: o.len, w: o.w };
  }
  return e;
}
const et = class et extends q {
  constructor(t, s, e, r) {
    super(t, e, r), this.border = {}, this.prstGeom = {}, this.isTextBox = !1, this.pptx = s, this._parseShape(), this._parIsTextBox(), this._parsePrstGeom(), this._parseBackground(), this._parseBorder(), this._parseTxt();
  }
  _parseShape() {
    if (this.shape = c(this.source, ["p:spPr", "a:prstGeom", "attrs", "prst"]), !this.shape && c(this.source, ["p:spPr", "a:custGeom"])) {
      this.shape = "customGeom";
      const t = c(this.source, ["p:spPr", "a:custGeom", "a:pathLst", "a:path"]);
      let s = [];
      const e = (r) => {
        let i;
        switch (r) {
          case "a:moveTo":
          case "a:cubicBezTo":
          case "a:lnTo":
            i = Array.isArray(t[r]) ? t[r] : [t[r]], s = s.concat(
              i.map((o) => ({
                order: o.attrs.order,
                type: r.split(":")[1],
                points: (Array.isArray(o["a:pt"]) ? o["a:pt"] : [o["a:pt"]]).map(
                  (n) => [
                    k(parseInt(c(n, ["attrs", "x"]))),
                    k(parseInt(c(n, ["attrs", "y"])))
                  ]
                )
              }))
            );
            break;
          case "a:close":
            i = Array.isArray(t[r]) ? t[r] : [t[r]], s = s.concat(
              i.map((o) => ({
                order: o.attrs.order,
                type: r.split(":")[1]
              }))
            );
            break;
        }
      };
      for (const r in t) e(r);
      s.sort((r, i) => r.order - i.order), this.prstGeom.pathList = s, c(t, ["attrs", "w"]) && (this.prstGeom.w = k(parseInt(c(t, ["attrs", "w"])))), c(t, ["attrs", "h"]) && (this.prstGeom.h = k(parseInt(c(t, ["attrs", "h"]))));
    }
  }
  _parIsTextBox() {
    this.isTextBox = c(this.source, ["p:nvSpPr", "p:cNvSpPr", "attrs", "txBox"]) === "1";
  }
  _parsePrstGeom() {
    const t = c(this.source, ["p:spPr", "a:prstGeom"]);
    let s = c(t, ["a:avLst", "a:gd"]);
    s && (Array.isArray(s) || (s = [s]), this.prstGeom.gd = s.map((e) => {
      const r = ["pie", "chord", "arc"].includes(this.shape) || ["blockArc"].includes(this.shape) && ["adj1", "adj2"].includes(e.attrs.name) ? st(parseInt(e.attrs.fmla.split(" ")[1])) : Z(parseInt(e.attrs.fmla.split(" ")[1]));
      return { name: e.attrs.name, fmla: r };
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
      this.background = j(t, this.theme, this);
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
    const r = c(this.source, ["p:style", "a:fillRef"]);
    r && (this.background = j(r, this.theme, this));
  }
  _parseBorder() {
    const t = c(this.source, ["p:style", "a:lnRef"]);
    if (t) {
      const e = parseInt(t.attrs.idx), r = this.theme.getLineStyle(e);
      this.border = { ...r, ...this.border }, (!this.border.color || !this.border.color.color) && (this.border.color = j(t, this.theme, this));
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
  constructor(t, s, e, r, i) {
    var p, h;
    super(s, r, i), this.userDrawn = !0, this.pptx = e, this.path = t;
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
  constructor(t, s, e, r) {
    super(t, e, r), this.userDrawn = !0, this.props = { tableStyleId: "" }, this.tableGrid = { gridCol: [] }, this.tr = [], this.tableStyles = {}, this.pptx = s, this._parseTableProps(), this._parseTableGrid(), this._parseTr(), this._parseInheritStyles();
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
        this.tableGrid.gridCol.push({ width: k(parseInt(e)) });
      }
  }
  _parseTr() {
    const t = [];
    let s = c(this.source, ["a:graphic", "a:graphicData", "a:tbl", "a:tr"]);
    Array.isArray(s) || (s = [s]);
    for (let e = 0; e < s.length; e++) {
      const r = { props: {}, td: [] }, i = s[e];
      r.props.height = k(parseInt(c(i, ["attrs", "h"])));
      let o = c(i, ["a:tc"]);
      Array.isArray(o) || (o = [o]);
      for (let n = 0; n < o.length; n++)
        r.td.push(this._parseTd(o[n]));
      t.push(r);
    }
    this.tr = t;
  }
  _parseTd(t) {
    var l, p, h, f;
    const s = { props: { border: {} }, paragraphs: [] }, e = c(t, ["a:tcPr", "attrs"]);
    e != null && e.marB && (s.props.marB = k(parseInt(e.marB))), e != null && e.marT && (s.props.marT = k(parseInt(e.marT))), e != null && e.marL && (s.props.marL = k(parseInt(e.marL))), e != null && e.marR && (s.props.marR = k(parseInt(e.marR))), e != null && e.anchor && (s.props.anchor = e.anchor);
    const r = c(t, ["a:tcPr"]);
    c(r, ["a:lnR"]) && (s.props.border.right = X(c(r, ["a:lnR"]), this.theme, this.ctx)), c(r, ["a:lnL"]) && (s.props.border.left = X(c(r, ["a:lnL"]), this.theme, this.ctx)), c(r, ["a:lnT"]) && (s.props.border.top = X(c(r, ["a:lnT"]), this.theme, this.ctx)), c(r, ["a:lnB"]) && (s.props.border.bottom = X(c(r, ["a:lnB"]), this.theme, this.ctx)), (l = t == null ? void 0 : t.attrs) != null && l.rowSpan && (s.props.rowSpan = parseInt(t.attrs.rowSpan)), (p = t == null ? void 0 : t.attrs) != null && p.gridSpan && (s.props.gridSpan = parseInt(t.attrs.gridSpan)), (h = t == null ? void 0 : t.attrs) != null && h.vMerge && (s.props.vMerge = t.attrs.vMerge === "1"), (f = t == null ? void 0 : t.attrs) != null && f.hMerge && (s.props.hMerge = t.attrs.hMerge === "1");
    const i = c(t, ["a:tcPr", "a:solidFill"]);
    i && (s.props.background = j(i, this.theme, this.ctx));
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
    const r = c(t, ["a:endParaRPr"]);
    s.endParaRProps = this._formatRPr(r);
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
    return Object.keys(e).forEach((r) => {
      r === "algn" && (s.align = e[r]);
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
    const r = c(t, "a:solidFill");
    r && (s.color = j(r, this.theme, this.ctx));
    const i = c(t, "a:highlight");
    return i && (s.background = j(i, this.theme, this.ctx)), s.typeface = c(t, ["a:ea", "attrs", "typeface"]), s;
  }
  _isLastCol(t, s) {
    var e, r;
    if (s === t.length - 1) return !0;
    for (let i = s + 1; i < t.length; i++)
      if (!((e = t[i].props) != null && e.hMerge) && !((r = t[i].props) != null && r.vMerge)) return !1;
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
    const t = (o = (i = this.tableStyles) == null ? void 0 : i.wholeTbl) == null ? void 0 : o.tcStyle, s = (l = (n = this.tableStyles) == null ? void 0 : n.wholeTbl) == null ? void 0 : l.tcTxStyle, e = (h = (p = this.slideMaster.defaultTextStyle) == null ? void 0 : p.lvl1) == null ? void 0 : h.props, r = (u = (f = this.slideMaster.defaultTextStyle) == null ? void 0 : f.lvl1) == null ? void 0 : u.defRPr;
    this.tr.forEach((d, w) => {
      d.td.forEach((g, m) => {
        var L, M, R, T, C, _, S, I, E, v, ft, ut, $t, wt, mt, bt, yt, xt, gt, Lt, At, Mt, Pt, kt, St, jt, Ct, Rt, Tt, vt, Bt, It, _t, Dt, Et, Ot, Ft, Gt, Zt, zt, Ht, Wt, Xt, Qt, Ut, Vt, qt, Yt, Jt, Kt, Nt, te, ee, se, re, ae;
        let b = { ...e, ...t }, x = { ...r, ...s };
        this.props.firstRow && w === 0 ? (b = {
          ...b,
          ...(M = (L = this.tableStyles) == null ? void 0 : L.firstRow) == null ? void 0 : M.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(C = (T = (R = this.tableStyles) == null ? void 0 : R.firstRow) == null ? void 0 : T.tcStyle) == null ? void 0 : C.border }
        }, x = { ...x, ...(S = (_ = this.tableStyles) == null ? void 0 : _.firstRow) == null ? void 0 : S.tcTxStyle }) : this.props.lastRow && w === this.tr.length - 1 ? (b = {
          ...b,
          ...(E = (I = this.tableStyles) == null ? void 0 : I.lastRow) == null ? void 0 : E.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(ut = (ft = (v = this.tableStyles) == null ? void 0 : v.lastRow) == null ? void 0 : ft.tcStyle) == null ? void 0 : ut.border }
        }, x = { ...x, ...(wt = ($t = this.tableStyles) == null ? void 0 : $t.lastRow) == null ? void 0 : wt.tcTxStyle }) : this.props.firstCol && m === 0 ? (b = {
          ...b,
          ...(bt = (mt = this.tableStyles) == null ? void 0 : mt.firstCol) == null ? void 0 : bt.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(gt = (xt = (yt = this.tableStyles) == null ? void 0 : yt.firstCol) == null ? void 0 : xt.tcStyle) == null ? void 0 : gt.border }
        }, x = { ...x, ...(At = (Lt = this.tableStyles) == null ? void 0 : Lt.firstCol) == null ? void 0 : At.tcTxStyle }) : this.props.lastCol && this._isLastCol(d.td, m) ? (b = {
          ...b,
          ...(Pt = (Mt = this.tableStyles) == null ? void 0 : Mt.lastCol) == null ? void 0 : Pt.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(jt = (St = (kt = this.tableStyles) == null ? void 0 : kt.lastCol) == null ? void 0 : St.tcStyle) == null ? void 0 : jt.border }
        }, x = { ...x, ...(Rt = (Ct = this.tableStyles) == null ? void 0 : Ct.lastCol) == null ? void 0 : Rt.tcTxStyle }) : (this.props.bandRow && (this._isBandRow(w) ? (b = {
          ...b,
          ...(vt = (Tt = this.tableStyles) == null ? void 0 : Tt.band1H) == null ? void 0 : vt.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(_t = (It = (Bt = this.tableStyles) == null ? void 0 : Bt.band1H) == null ? void 0 : It.tcStyle) == null ? void 0 : _t.border }
        }, x = { ...x, ...(Et = (Dt = this.tableStyles) == null ? void 0 : Dt.band1H) == null ? void 0 : Et.tcTxStyle }) : (b = {
          ...b,
          ...(Ft = (Ot = this.tableStyles) == null ? void 0 : Ot.band2V) == null ? void 0 : Ft.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(zt = (Zt = (Gt = this.tableStyles) == null ? void 0 : Gt.band2V) == null ? void 0 : Zt.tcStyle) == null ? void 0 : zt.border }
        }, x = { ...x, ...(Wt = (Ht = this.tableStyles) == null ? void 0 : Ht.band2V) == null ? void 0 : Wt.tcTxStyle })), this.props.bandCol && (this._isBandCol(m) ? (b = {
          ...b,
          ...(Qt = (Xt = this.tableStyles) == null ? void 0 : Xt.band1V) == null ? void 0 : Qt.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(qt = (Vt = (Ut = this.tableStyles) == null ? void 0 : Ut.band1V) == null ? void 0 : Vt.tcStyle) == null ? void 0 : qt.border }
        }, x = { ...x, ...(Jt = (Yt = this.tableStyles) == null ? void 0 : Yt.band1V) == null ? void 0 : Jt.tcTxStyle }) : (b = {
          ...b,
          ...(Nt = (Kt = this.tableStyles) == null ? void 0 : Kt.band2H) == null ? void 0 : Nt.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(se = (ee = (te = this.tableStyles) == null ? void 0 : te.band2H) == null ? void 0 : ee.tcStyle) == null ? void 0 : se.border }
        }, x = { ...x, ...(ae = (re = this.tableStyles) == null ? void 0 : re.band2H) == null ? void 0 : ae.tcTxStyle }))), g.inheritTcStyle = b, g.inheritTcTxStyle = x;
      });
    });
  }
}
class me extends q {
  constructor(t, s, e, r) {
    super(t, e, r), this.nodes = [], this.pptx = s;
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
      const s = this.ctx.rels[t].target, e = await this.pptx.getXmlByPath(s), r = B(e), i = c(r, [
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
      const l = B(n), p = c(l, ["p:drawing", "p:spTree"]);
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
  constructor(t, s, e, r) {
    super(t, e, r), this.options = {
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
      const s = this.ctx.rels[t].target, e = await this.pptx.getXmlByPath(s), r = B(e), i = c(r, ["c:chartSpace", "c:chart"]), o = c(i, ["c:plotArea"]);
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
    }, this.options.xAxis = { type: "category", data: this.getCategory(e[0]) }, this.options.yAxis = { type: "value" }, this.options.series = this.parseLineSeries(e, t), this.options.color = this.parseLineColors(e), this.options.legend = { bottom: "bottom", left: "center" }, c(t, ["c:grouping", "attrs", "val"]) === "percentStacked" && (this.options.tooltip.valueFormatter = (r) => (100 * r).toFixed(2) + "%");
  }
  parseBar(t, s) {
    let e = c(t, ["c:ser"]);
    Array.isArray(e) || (e = [e]), this.options.title = {
      top: "top",
      left: "center",
      text: this.parseChartTitle(c(s, ["c:title"]))
    }, c(t, ["c:barDir", "attrs", "val"]) === "bar" ? (this.options.yAxis = { type: "category", data: this.getCategory(e[0]) }, this.options.xAxis = { type: "value" }) : (this.options.xAxis = { type: "category", data: this.getCategory(e[0]) }, this.options.yAxis = { type: "value" }), this.options.series = this.parseBarSeries(e, t), this.options.color = this.parseBarColors(e), this.options.legend = { bottom: "bottom", left: "center" }, c(t, ["c:grouping", "attrs", "val"]) === "percentStacked" && (this.options.tooltip.valueFormatter = (r) => (100 * r).toFixed(2) + "%");
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
      let r = c(e, ["a:r"]);
      return Array.isArray(r) || (r = [r]), r.map((i) => c(i, ["a:t"]) || "").join("");
    }).join("") || "图表标题";
  }
  parseBarColors(t) {
    return t.map(
      (s) => P(j(c(s, ["c:spPr", "a:solidFill"]), this.theme, this.ctx))
    );
  }
  parseLineColors(t) {
    return t.map(
      (s) => P(
        j(
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
    return Array.isArray(e) || (e = [e]), e.forEach((r) => {
      s.push(P(j(c(r, ["c:spPr", "a:solidFill"]), this.theme, this.ctx)));
    }), s;
  }
  parsePieSeries(t, s) {
    const e = { type: "pie", radius: "80%", startAngle: 90, data: [] };
    c(s, ["c:holeSize", "attrs", "val"]) && (e.radius = [`${0.8 * c(s, ["c:holeSize", "attrs", "val"])}%`, "80%"]);
    const r = c(s, ["c:firstSliceAng", "attrs", "val"]);
    r && (e.startAngle = 90 - r);
    const i = this.getCategory(t), o = this.getVal(t);
    for (let n = 0; n < i.length; n++)
      e.data.push({ name: i[n], value: o[n] });
    return e;
  }
  parseBarSeries(t, s) {
    let e;
    const r = c(s, ["c:grouping", "attrs", "val"]);
    r === "stacked" ? e = "Ad" : r === "percentStacked" && (e = "total");
    const i = t.map((o) => ({
      type: "bar",
      name: c(o, ["c:tx", "c:strRef", "c:strCache", "c:pt", "c:v"]),
      data: this.getVal(o),
      stack: e
    }));
    if (r === "percentStacked") {
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
    const r = c(s, ["c:grouping", "attrs", "val"]);
    r === "stacked" ? e = "Ad" : r === "percentStacked" && (e = "total");
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
  constructor(t, s, e, r) {
    if (this.offset = { x: 0, y: 0 }, this.chOffset = { x: 0, y: 0 }, this.extend = { w: 0, h: 0 }, this.chExtend = { w: 0, h: 0 }, this.rotate = 0, this.nodes = [], this.flipV = !1, this.flipH = !1, this.userDrawn = !0, this.order = c(t, ["attrs", "order"]), this.pptx = s, this.ctx = e, this.source = t, this.group = r, this.source["p:grpSpPr"]) {
      const i = c(this.source, ["p:grpSpPr", "a:xfrm"]);
      if (i) {
        const o = this.group && this.pptx.wps;
        if (this.offset = {
          x: Math.round(o ? F(parseInt(i["a:off"].attrs.x)) : k(parseInt(i["a:off"].attrs.x))),
          y: Math.round(o ? F(parseInt(i["a:off"].attrs.y)) : k(parseInt(i["a:off"].attrs.y)))
        }, this.chOffset = {
          x: Math.round(
            W(i["a:chOff"].attrs.x) === "point" || this.pptx.wps ? F(parseInt(i["a:chOff"].attrs.x)) : k(parseInt(i["a:chOff"].attrs.x))
          ),
          y: Math.round(
            W(i["a:chOff"].attrs.y) === "point" || this.pptx.wps ? F(parseInt(i["a:chOff"].attrs.y)) : k(parseInt(i["a:chOff"].attrs.y))
          )
        }, this.chExtend = {
          w: Math.round(
            W(i["a:chExt"].attrs.cx) === "point" || this.pptx.wps ? F(parseInt(i["a:chExt"].attrs.cx)) : k(parseInt(i["a:chExt"].attrs.cx))
          ),
          h: Math.round(
            W(i["a:chExt"].attrs.cy) === "point" || this.pptx.wps ? F(parseInt(i["a:chExt"].attrs.cy)) : k(parseInt(i["a:chExt"].attrs.cy))
          )
        }, this.extend = {
          w: Math.round(o ? F(parseInt(i["a:ext"].attrs.cx)) : k(parseInt(i["a:ext"].attrs.cx))),
          h: Math.round(o ? F(parseInt(i["a:ext"].attrs.cy)) : k(parseInt(i["a:ext"].attrs.cy)))
        }, this.rotate = st(parseInt(c(i, "attrs.rot", 0))), this.flipV = c(i, "attrs.flipV") === "1", this.flipH = c(i, "attrs.flipH") === "1", r) {
          const n = r.extend, l = r.chExtend, p = r.chOffset, h = n.w / l.w, f = n.h / l.h;
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
    t && t["a:solidFill"] ? this.background = j(t["a:solidFill"], this.ctx.theme, this.ctx) : t && t["a:gradFill"] ? this.background = V(t["a:gradFill"], this.ctx.theme, this.ctx) : t && t["a:blipFill"] && (this.background = U(t["a:blipFill"], this.pptx, this.ctx));
  }
  _parseNodes() {
    Y(this.nodes, this.source, this.pptx, this.ctx, this);
  }
}
function oe(a) {
  const t = {}, s = c(a, "attrs") || {};
  return Object.keys(s).forEach((e) => {
    switch (e) {
      case "algn":
        t.align = s[e];
        break;
      case "marL":
        t.marginLeft = k(parseInt(s[e]));
        break;
      case "indent":
        t.indent = k(parseInt(s[e]));
        break;
      case "lvl":
        t.level = s[e];
        break;
    }
  }), c(a, ["a:lnSpc", "a:spcPct", "attrs", "val"]) && (t.lineHeight = parseInt(a["a:lnSpc"]["a:spcPct"].attrs.val) / 1e5), t;
}
function ne(a, t, s) {
  const e = {}, r = c(a, "attrs") || {};
  Object.keys(r).forEach((o) => {
    switch (o) {
      case "sz":
        e.size = parseInt(r[o]) / 100;
        break;
      case "b":
        e.bold = r[o] === "1";
        break;
      case "i":
        e.italic = r[o] === "1";
        break;
      case "u":
        e.underline = r[o];
        break;
      case "strike":
        e.strike = r[o];
        break;
      case "order":
      case "dirty":
        break;
      default:
        e[o] = r[o];
    }
  });
  const i = c(a, "a:solidFill");
  return i && (e.color = j(i, t, s)), e;
}
async function Y(a, t, s, e, r) {
  const i = [];
  for (const o in t) i.push(o);
  for (let o = 0; o < i.length; o++) {
    const n = i[o];
    if (n in t)
      switch (n) {
        case "p:sp": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++)
            a.push(new H(l[p], s, e, r));
          break;
        }
        case "p:pic": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++) {
            const h = l[p], f = h["p:blipFill"]["a:blip"].attrs["r:embed"], u = e.rels[f].target, d = new rt(u, h, s, e, r);
            a.push(d);
          }
          break;
        }
        case "p:cxnSp": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++)
            a.push(new H(l[p], s, e, r));
          break;
        }
        case "p:graphicFrame": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++) {
            const h = l[p];
            switch (c(h, ["a:graphic", "a:graphicData", "attrs", "uri"])) {
              case "http://schemas.openxmlformats.org/drawingml/2006/table":
                a.push(new we(h, s, e, r));
                break;
              case "http://schemas.openxmlformats.org/drawingml/2006/diagram": {
                const u = new me(h, s, e, r);
                await u.parseNode(), a.push(u);
                break;
              }
              case "http://schemas.openxmlformats.org/drawingml/2006/chart": {
                const u = new be(h, s, e, r);
                await u.parseNode(), a.push(u);
                break;
              }
            }
          }
          break;
        }
        case "p:grpSp": {
          const l = Array.isArray(t[n]) ? t[n] : [t[n]];
          for (let p = 0; p < l.length; p++)
            a.push(new ht(l[p], s, e, r));
          break;
        }
      }
  }
}
class Te {
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
    const t = await this.pptx.getXmlByPath(this._relsPath), s = B(t);
    let e = c(s, ["Relationships", "Relationship"]) || [];
    Array.isArray(e) || (e = [e]), e.forEach((r) => {
      switch (c(r, ["attrs", "Type"])) {
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout": {
          let i = r.attrs.Target.replace("../", "ppt/");
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
          let i = r.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.rels[r.attrs.Id] = {
            type: r.attrs.Type.split("/").pop(),
            target: i
          };
          break;
        }
      }
    });
  }
  _loadBackground() {
    const t = c(this.source, ["p:sld", "p:cSld", "p:bg", "p:bgPr"]);
    t && t["a:solidFill"] ? this.background = j(t["a:solidFill"], this.theme, this) : t && t["a:gradFill"] ? this.background = V(t["a:gradFill"], this.theme, this) : t && t["a:blipFill"] && (this.background = U(t["a:blipFill"], this.pptx, this));
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
class ve {
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
    const t = await this.pptx.getXmlByPath(this._relsPath), s = B(t);
    let e = c(s, ["Relationships", "Relationship"]) || [];
    Array.isArray(e) || (e = [e]), e.forEach((r) => {
      switch (c(r, ["attrs", "Type"])) {
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster": {
          let i = r.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.slideMaster = this.pptx.getSlideMaster(i);
          break;
        }
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio":
        case "http://schemas.microsoft.com/office/2007/relationships/media":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/video": {
          let i = r.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.rels[r.attrs.Id] = {
            type: r.attrs.Type.split("/").pop(),
            target: i
          };
          break;
        }
      }
    });
  }
  async _loadBackground() {
    const t = c(this.source, ["p:sldLayout", "p:cSld", "p:bg", "p:bgPr"]);
    t && t["a:solidFill"] ? this.background = j(t["a:solidFill"], this.theme) : t && t["a:gradFill"] ? this.background = V(t["a:gradFill"], this.theme, this) : t && t["a:blipFill"] && (this.background = U(t["a:blipFill"], this.pptx, this));
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
    const t = await this.pptx.getXmlByPath(this._relsPath), s = B(t);
    let e = c(s, ["Relationships", "Relationship"]) || [];
    Array.isArray(e) || (e = [e]), e.forEach((r) => {
      switch (c(r, ["attrs", "Type"])) {
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme": {
          let i = r.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.theme = this.pptx.getTheme(i);
          break;
        }
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio":
        case "http://schemas.microsoft.com/office/2007/relationships/media":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/video": {
          let i = r.attrs.Target.replace("../", "ppt/");
          i.startsWith("/ppt") && (i = i.substr(1)), this.rels[r.attrs.Id] = {
            type: r.attrs.Type.split("/").pop(),
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
    t && t["a:solidFill"] ? this.background = j(t["a:solidFill"], this.theme, this) : t && t["a:gradFill"] ? this.background = V(t["a:gradFill"], this.theme, this) : t && t["a:blipFill"] ? this.background = U(t["a:blipFill"], this.pptx, this) : s && (this.background = j(s, this.theme, this));
  }
  _parseDefaultTextStyle() {
    const t = this.pptx.defaultTextStyleSource;
    Object.keys(t).forEach((s) => {
      if (s.startsWith("a:") && s.endsWith("pPr")) {
        const e = s.substr(2, s.length - 5), r = c(t[s], ["a:defRPr"]);
        this.defaultTextStyle[e] = {
          props: oe(t[s]),
          defRPr: ne(r, this.theme, this)
        };
      }
    });
  }
  _parseTextStyles() {
    const t = c(this.source, ["p:sldMaster", "p:txStyles"]);
    ["titleStyle", "bodyStyle", "otherStyle"].forEach((s) => {
      const e = this.textStyles[s], r = c(t, `p:${s}`) || {};
      Object.keys(r).forEach((i) => {
        if (i.startsWith("a:") && i.endsWith("pPr")) {
          const o = i.substr(2, i.length - 5);
          e[o] = {}, e[o].props = oe(r[i]);
          const n = c(r[i], ["a:defRPr"]);
          e[o].defRPr = ne(n, this.theme, this);
        }
      });
    });
  }
  _parseTableStyles() {
    const t = {};
    let s = c(this.pptx.tableStyles, ["a:tblStyleLst", "a:tblStyle"]) || [];
    Array.isArray(s) || (s = [s]), s.forEach((e) => {
      const r = c(e, ["attrs", "styleId"]);
      t[r] = {}, Object.keys(e).forEach((i) => {
        if (i.startsWith("a:")) {
          const o = i.substr(2);
          t[r][o] = {};
          const n = c(e[i], ["a:tcStyle"]);
          if (n) {
            const p = {};
            c(n, ["a:fill", "a:solidFill"]) && (p.background = j(c(n, ["a:fill", "a:solidFill"]), this.theme, this));
            const h = c(n, "a:tcBdr");
            h && (p.border = {}, Object.keys(h).forEach((f) => {
              if (f.startsWith("a:")) {
                const u = f.substr(2), d = c(h[f], ["a:ln"]);
                p.border[u] = X(d, this.theme, this);
              }
            })), t[r][o].tcStyle = p;
          }
          const l = c(e[i], ["a:tcTxStyle"]);
          if (l) {
            const p = {};
            p.color = j(l, this.theme, this), c(l, ["attrs", "b"]) === "on" && (p.bold = !0), t[r][o].tcTxStyle = p;
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
        const e = s.substring(2), r = c(t[s], ["a:sysClr", "attrs", "lastClr"]) || c(t[s], ["a:srgbClr", "attrs", "val"]);
        this.clrScheme[e] = "#" + r;
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
      return c(s, ["attrs", "w"]) && (e.width = k(parseInt(c(s, ["attrs", "w"])))), c(s, ["attrs", "algn"]) && (e.algn = c(s, ["attrs", "algn"])), c(s, ["attrs", "cap"]) && (e.cap = c(s, ["attrs", "cap"])), c(s, ["attrs", "cmpd"]) && (e.cmpd = c(s, ["attrs", "cmpd"])), c(s, ["a:miter", "attrs", "lim"]) && (e.miterLim = k(parseInt(c(s, ["a:miter", "attrs", "lim"])))), c(s, ["a:prstDash", "attrs", "val"]) && (e.type = c(s, ["a:prstDash", "attrs", "val"])), c(s, ["a:solidFill"]) && (e.color = j(c(s, ["a:solidFill"]), this)), e;
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
      const s = await this._zipContents.files["ppt/presentation.xml"].async("text"), e = B(s), r = e["p:presentation"]["p:sldSz"].attrs;
      if (this.width = k(parseInt(r.cx)), this.height = k(parseInt(r.cy)), this.defaultTextStyleSource = e["p:presentation"]["p:defaultTextStyle"], this._zipContents.files["docProps/app.xml"]) {
        const i = await this._zipContents.files["docProps/app.xml"].async("text"), o = B(i), n = (t = o == null ? void 0 : o.Properties) == null ? void 0 : t.Application;
        this.wps = (n == null ? void 0 : n.includes("WPS")) || !1;
      }
    } catch {
    }
  }
  async _loadContentTypes() {
    try {
      const t = await this._zipContents.files["[Content_Types].xml"].async("text"), e = B(t).Types.Override, r = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.theme+xml"
      );
      if (r)
        for (const p of r) {
          const h = p.attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), u = B(f);
          this.themes.push(new Ie(h, u, this));
        }
      const i = e.find(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"
      );
      if (i) {
        const p = i.attrs.PartName.substr(1), h = await this._zipContents.files[p].async("text");
        this.tableStyles = B(h);
      }
      const o = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"
      );
      for (let p = 0; p < o.length; p++) {
        const h = o[p].attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), u = B(f);
        this.slideMaster.push(new Be(h, u, this));
      }
      const n = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
      );
      for (let p = 0; p < n.length; p++) {
        const h = n[p].attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), u = B(f), d = new ve(h, u, this);
        await d.load(), this.slideLayouts.push(d);
      }
      const l = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"
      );
      for (let p = 0; p < l.length; p++) {
        const h = l[p].attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), u = B(f), d = new Te(h, u, this);
        await d.load(), this.slides.push(d);
      }
      this.slides.sort((p, h) => p.index - h.index);
    } catch {
    }
  }
  async _loadMedia() {
    const t = Object.keys(this._zipContents.files).filter((e) => e.startsWith("ppt/media/image")).map((e) => this._zipContents.files[e]);
    for (const e of t) {
      const r = e.name.substr(2 + (~-e.name.lastIndexOf(".") >>> 0));
      let i;
      switch (r) {
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
      const r = e.name.split(".").pop().toLowerCase(), i = await e.async("arraybuffer"), o = new Blob([i], {
        type: `${["mp3", "wav"].includes(r) ? "audio" : "video"}/${r}`
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
function pt(a) {
  const t = a.extend, s = a.offset, e = a.clip, r = a.base64, i = a.audioFile, o = a.videoFile, n = document.createElement("div");
  n.style.setProperty("position", "absolute"), n.style.setProperty("left", s.x + "px"), n.style.setProperty("top", s.y + "px");
  let l, p, h, f;
  const u = document.createElement("div");
  u.style.setProperty("position", "absolute"), u.style.setProperty("left", "0"), u.style.setProperty("top", "0"), u.style.setProperty("width", t.w + "px"), u.style.setProperty("height", t.h + "px"), u.style.setProperty("overflow", "hidden"), e ? (l = t.w / (1 - (e.l ?? 0) - (e.r ?? 0)), p = t.h / (1 - (e.t ?? 0) - (e.b ?? 0)), h = -1 * l * (e.l ?? 0), f = -1 * p * (e.t ?? 0)) : (l = t.w, p = t.h, h = 0, f = void 0);
  const d = document.createElement("img");
  if (d.src = r, d.width = l, d.height = p, d.style.setProperty("position", "absolute"), d.style.setProperty("left", h + "px"), d.style.setProperty("top", f + "px"), u.append(d), n.append(u), i) {
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
function $(a) {
  return document.createElementNS(_e, a);
}
function O(a) {
  const t = a.extend;
  return 0.16667 * Math.min(t.w, t.h);
}
function A(a, t, s) {
  if (t.prstGeom && t.prstGeom.gd) {
    const r = (Array.isArray(t.prstGeom.gd) ? t.prstGeom.gd : [t.prstGeom.gd]).find((i) => i.name === a);
    if (r) return r.fmla;
  }
  return s;
}
function y(a, t, s) {
  const e = A(a, t);
  if (e !== void 0) {
    const r = t.extend;
    return Math.min(r.w, r.h) * e;
  }
  return s !== void 0 ? s : O(t);
}
function ye(a, t, s) {
  const e = A(a, t);
  if (e !== void 0) {
    const r = t.extend;
    return Math.max(r.w, r.h) * e;
  }
  return s !== void 0 ? s : O(t);
}
function D(a, t, s, e, r) {
  const i = a * Math.PI / 180, o = i === 0 || i === 2 * Math.PI ? t + e : i === Math.PI ? t - e : i === Math.PI / 2 || i === 3 * Math.PI / 2 ? t : i > 0 && i < Math.PI / 2 || i > 3 * Math.PI / 2 && i < 2 * Math.PI ? t + Math.sqrt(1 / (1 / Math.pow(e, 2) + Math.pow(Math.tan(i), 2) / Math.pow(r, 2))) : t - Math.sqrt(1 / (1 / Math.pow(e, 2) + Math.pow(Math.tan(i), 2) / Math.pow(r, 2))), n = i === 0 || i === 2 * Math.PI || i === Math.PI ? s : i === Math.PI / 2 ? s + r : i === 3 * Math.PI / 2 ? s - r : i > Math.PI && i < 2 * Math.PI ? s - Math.sqrt(1 / (1 / Math.pow(r, 2) + Math.pow(1 / Math.tan(i), 2) / Math.pow(e, 2))) : s + Math.sqrt(1 / (1 / Math.pow(r, 2) + Math.pow(1 / Math.tan(i), 2) / Math.pow(e, 2)));
  return [o, n];
}
function J(a, t) {
  let s = 0;
  return (t > a && t - a > 180 || t < a && a - t < 180) && (s = 1), s;
}
function K(a) {
  const t = a.extend, s = 0.146 * t.w, e = 0.146 * t.h;
  return {
    top: e,
    bottom: e,
    left: s,
    right: s,
    w: t.w - 2 * s,
    h: t.h - 2 * e
  };
}
function G(a, t) {
  let s = 0;
  switch (a) {
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
function le(a, t, s, e = !1) {
  const r = a.border || {}, i = a.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = r, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = G(f, n), w = G(u, n), g = $("defs"), m = $("marker"), b = `marker-${i}-${e ? "start" : "end"}`;
  m.setAttribute("id", b), m.setAttribute("viewBox", `0 0 ${2 * d} ${2 * w}`), m.setAttribute("refX", d + "px"), m.setAttribute("refY", w + "px"), m.setAttribute("markerWidth", 2 * d + "px"), m.setAttribute("markerHeight", 2 * w + "px"), m.setAttribute("orient", "auto"), m.setAttribute("markerUnits", "userSpaceOnUse");
  const x = $("ellipse");
  x.setAttribute("cx", d + "px"), x.setAttribute("cy", w + "px"), x.setAttribute("rx", d + "px"), x.setAttribute("ry", w + "px"), x.setAttribute("fill", P(l) || "transparent"), m.appendChild(x), g.appendChild(m), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function he(a, t, s, e = !1) {
  const r = a.border || {}, i = a.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = r, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = G(f, n), w = G(u, n), g = $("defs"), m = $("marker"), b = `marker-${i}-${e ? "start" : "end"}`;
  m.setAttribute("id", b), m.setAttribute("viewBox", `0 0 ${2 * d} ${2 * w}`), m.setAttribute("refX", (e ? 0.9 * d : 1.1 * d) + "px"), m.setAttribute("refY", w + "px"), m.setAttribute("markerWidth", 2 * d + "px"), m.setAttribute("markerHeight", 2 * w + "px"), m.setAttribute("orient", "auto"), m.setAttribute("markerUnits", "userSpaceOnUse");
  const x = $("path"), L = e ? [`M ${2 * d},0`, `L 0,${w}`, `L ${2 * d},${2 * w}`, "Z"].join(" ") : ["M 0,0", `L ${2 * d},${w}`, `L 0,${2 * w}`, "Z"].join(" ");
  x.setAttribute("d", L), x.setAttribute("fill", P(l) || "transparent"), m.appendChild(x), g.appendChild(m), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function pe(a, t, s, e = !1) {
  const r = a.border || {}, i = a.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = r, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = G(f, n), w = G(u, n), g = $("defs"), m = $("marker"), b = `marker-${i}-${e ? "start" : "end"}`;
  m.setAttribute("id", b), m.setAttribute("viewBox", `0 0 ${2 * d} ${2 * w}`), m.setAttribute("refX", d + "px"), m.setAttribute("refY", w + "px"), m.setAttribute("markerWidth", 2 * d + "px"), m.setAttribute("markerHeight", 2 * w + "px"), m.setAttribute("orient", "auto"), m.setAttribute("markerUnits", "userSpaceOnUse");
  const x = $("path"), L = [
    `M 0,${w}`,
    `L ${d},0`,
    `L ${2 * d},${w}`,
    `L ${d},${2 * w}`,
    "Z"
  ].join(" ");
  x.setAttribute("d", L), x.setAttribute("fill", P(l) || "transparent"), m.appendChild(x), g.appendChild(m), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function de(a, t, s, e = !1) {
  const r = a.border || {}, i = a.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = r, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = G(f, n), w = G(u, n), g = $("defs"), m = $("marker"), b = `marker-${i}-${e ? "start" : "end"}`;
  m.setAttribute("id", b), m.setAttribute("viewBox", `0 0 ${2 * d + 2 * n} ${2 * w + 2 * n}`);
  const x = e ? u === "lg" ? 2 * n : 3 * n : u === "lg" ? 2 * d : 2 * d - n;
  m.setAttribute("refX", x + "px"), m.setAttribute("refY", w + n + "px"), m.setAttribute("markerWidth", 2 * d + "px"), m.setAttribute("markerHeight", 2 * w + "px"), m.setAttribute("orient", "auto"), m.setAttribute("markerUnits", "userSpaceOnUse");
  const L = $("path"), M = e ? [
    `M ${2 * d + n}, ${n}`,
    `L ${n},${w + n}`,
    `L ${2 * d + n},${2 * w + n}`
  ].join(" ") : [
    `M ${n}, ${n}`,
    `L ${2 * d + n},${w + n}`,
    `L ${n},${2 * w + n}`
  ].join(" ");
  L.setAttribute("d", M), L.setAttribute("stroke-width", n + "px"), L.setAttribute("stroke", P(l) || "transparent"), L.setAttribute("fill", "transparent"), L.setAttribute("stroke-linecap", "round"), L.setAttribute("stroke-linejoin", "miter"), L.style.overflow = "visible", m.appendChild(L), g.appendChild(m), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function fe(a, t, s, e = !1) {
  const r = a.border || {}, i = a.uuid, { headEnd: o, width: n, color: l, tailEnd: p } = r, h = e ? o : p, f = h.len ?? "med", u = h.w ?? "med", d = G(f, n), w = G(u, n), g = $("defs"), m = $("marker"), b = `marker-${i}-${e ? "start" : "end"}`;
  m.setAttribute("id", b), m.setAttribute("viewBox", `0 0 ${2 * d} ${2 * w}`);
  const x = e ? u === "sm" ? 1.5 * n : 2 * n : u === "sm" ? 2 * d - 1.5 * n : 2 * d - 2 * n;
  m.setAttribute("refX", x + "px"), m.setAttribute("refY", w + "px"), m.setAttribute("markerWidth", 2 * d + "px"), m.setAttribute("markerHeight", 2 * w + "px"), m.setAttribute("orient", "auto"), m.setAttribute("markerUnits", "userSpaceOnUse");
  const L = $("path"), M = e ? [
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
  L.setAttribute("d", M), L.setAttribute("fill", P(l) || "transparent"), L.style.overflow = "visible", m.appendChild(L), g.appendChild(m), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function Q(a, t, s) {
  const e = a.border || {};
  a.extend;
  const { headEnd: r, tailEnd: i } = e;
  if (r && r.type !== "none")
    switch (r.type) {
      case "triangle":
        he(a, t, s, !0);
        break;
      case "oval":
        le(a, t, s, !0);
        break;
      case "diamond":
        pe(a, t, s, !0);
        break;
      case "arrow":
        de(a, t, s, !0);
        break;
      case "stealth":
        fe(a, t, s, !0);
        break;
    }
  if (i && i.type !== "none")
    switch (i.type) {
      case "triangle":
        he(a, t, s, !1);
        break;
      case "oval":
        le(a, t, s, !1);
        break;
      case "diamond":
        pe(a, t, s, !1);
        break;
      case "arrow":
        de(a, t, s, !1);
        break;
      case "stealth":
        fe(a, t, s, !1);
        break;
    }
}
function De(a, t, s) {
  var l;
  const e = { ...t, ...a.props }, r = document.createElement("span");
  r.innerHTML = typeof a.text == "string" ? a.text : "";
  let i = 18;
  e.size && ((l = s == null ? void 0 : s.normAutofit) != null && l.fontScale ? (i = e.size * s.normAutofit.fontScale, r.style.fontSize = i + "px") : (i = e.size, r.style.fontSize = i + "px"));
  const o = P(e.color);
  o && (r.style.color = o);
  const n = /^[^\u4e00-\u9fff]+$/;
  if (e.typeface)
    switch (r.style.fontFamily = e.typeface, e.typeface) {
      case "DengXian":
        n.test(a.text) && (r.style.letterSpacing = -0.04 * i + "px");
        break;
      case "DengXian Light":
        n.test(a.text) && (r.style.letterSpacing = -0.05 * i + "px");
        break;
      case "STLiti":
      case "SimSun":
      case "NSimSun":
      case "SimHei":
        n.test(a.text) && (r.style.fontSize = 0.85 * parseInt(r.style.fontSize) + "px");
        break;
      case "华文中宋":
      case "Fira Sans Extra Condensed Medium":
        r.style.fontSize = 0.85 * parseInt(r.style.fontSize) + "px";
        break;
      case "FangSong":
        r.style.letterSpacing = -0.08 * i + "px";
        break;
    }
  else
    n.test(a.text) && (r.style.letterSpacing = -0.04 * i + "px");
  return e.bold && (r.style.fontWeight = "bold"), e.italic && (r.style.fontStyle = "italic"), e.underline && e.underline !== "none" && (r.style.textDecoration = "underline"), e.background && (r.style.backgroundColor = P(e.background)), r.style.wordBreak = "break-word", r;
}
function Ee(a, t, s) {
  const e = document.createElement("span"), r = a.firstElementChild;
  switch (e.style.fontSize = r.style.fontSize, e.style.color = r.style.color, e.style.fontWeight = r.style.fontWeight, e.style.fontStyle = r.style.fontStyle, e.style.marginRight = "10px", t.buAutoNum) {
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
  a.prepend(e);
}
function Oe(a) {
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
  if (typeof a != "number" || a < 1 || a > 3999) throw new Error("Input must be a number between 1 and 3999.");
  let s = "";
  for (let e = 0; e < t.length; e++)
    for (; a >= t[e].value; )
      s += t[e].numeral, a -= t[e].value;
  return s;
}
function Fe(a) {
  const t = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  if (!Number.isInteger(a) || a < 0) return "";
  let s = "";
  const e = a.toString();
  for (let r = 0; r < e.length; r++) s += t[parseInt(e[r], 10)];
  return s;
}
function Ge(a, t) {
  const s = document.createElement("span"), e = a.firstElementChild;
  s.style.color = e.style.color, s.style.fontSize = e.style.fontSize;
  const r = {
    n: "■",
    l: "●",
    u: "◆",
    p: "□",
    ü: "✔",
    Ø: "➢",
    "•": "•",
    "§": "■"
  };
  s.textContent = r[t.buChar] || "■", s.style.marginRight = "10px", a.prepend(s);
}
function xe(a, t = 0, s = {}) {
  var m, b;
  const e = a.inheritProps, r = a.inheritRProps, i = a.props, o = a.rows, n = { ...e, ...i }, l = () => {
    var R, T;
    let x = 0;
    for (const C of o)
      C.props && C.props.size && (x = Math.max(x, C.props.size));
    const L = ((T = (R = s == null ? void 0 : s.bodyProps) == null ? void 0 : R.normAutofit) == null ? void 0 : T.fontScale) || 1, M = s.isTable ? r.size || 8 : 18;
    return (x || r.size || M) * L;
  }, p = document.createElement("div"), h = s.isFirst ? 0 : n.spaceBefore || 0, f = s.isLast ? 0 : n.spaceAfter || 0, u = s.isTable ? 0 : Math.floor(0.2 * l());
  p.style.margin = `${u}px  0 0 0`, p.style.padding = `${Math.floor(h)}px 0px ${Math.floor(f)}px 0px`;
  const d = document.createElement("p");
  d.style.margin = "0", d.style.padding = "0px", d.style.wordBreak = "break-word";
  const w = { ctr: "center", l: "left", r: "right", dist: "justify" };
  d.style.textAlign = n.align && w[n.align] || "center", n.align === "dist" && (d.style.textAlignLast = "justify");
  let g = n.hasOwnProperty("lineHeight") ? n.lineHeight : 1;
  if ((b = (m = s.bodyProps) == null ? void 0 : m.normAutofit) != null && b.lnSpcReduction && (g *= 1 - s.bodyProps.normAutofit.lnSpcReduction), d.style.lineHeight = g + "", d.style.fontSize = l() + "px", o.length) {
    for (const x of o)
      x.isBr ? d.appendChild(document.createElement("br")) : d.appendChild(De(x, { ...r, marginTop: Math.floor(0.2 * l()) }, s.bodyProps));
    n.buNone || (n.buAutoNum ? Ee(d, n, t) : n.buChar && Ge(d, n)), d.style.paddingLeft = (n.marginLeft || 0) + (n.indent || 0) + "px";
  } else {
    const x = document.createElement("span");
    x.innerHTML = "&nbsp;", x.style.fontSize = r.size + "px", d.appendChild(x);
  }
  return p.appendChild(d), p;
}
function Ze(a, t, s) {
  const e = { ...a.inheritProps, ...a.props }, r = document.createElement("div");
  r.style.position = "absolute", r.style.top = (t.top || 0) + "px", r.style.bottom = (t.bottom || 0) + "px", r.style.left = (t.left || 0) + "px", r.style.right = (t.right || 0) + "px", r.style.width = t.w + "px", r.style.height = t.h + "px", r.style.overflow = "hidden";
  const i = e.lIns !== void 0 ? e.lIns : 7, o = e.rIns !== void 0 ? e.rIns : 7, n = e.tIns !== void 0 ? e.tIns : 3.5, l = e.bIns !== void 0 ? e.bIns : 3.5;
  r.style.paddingLeft = i + "px", r.style.paddingRight = o + "px", r.style.paddingTop = n + "px", r.style.paddingBottom = l + "px", r.style.boxSizing = "border-box", e.anchor === "ctr" ? (r.style.display = "flex", r.style.flexDirection = "column", r.style.justifyContent = "center") : e.anchor === "b" && (r.style.display = "flex", r.style.flexDirection = "column", r.style.justifyContent = "flex-end");
  let p = 0;
  const h = a.paragraphs || [];
  for (let f = 0; f < h.length; f++) {
    const u = h[f];
    ({ ...u.inheritProps, ...u.props }).buAutoNum ? p++ : p = 0;
    const w = xe(u, p || f + 1, {
      isFirst: f === 0,
      isLast: f === h.length - 1,
      bodyProps: e
    });
    r.appendChild(w);
  }
  return r;
}
function ge(a) {
  const t = a.extend, s = $("rect");
  return s.setAttribute("x", "0"), s.setAttribute("y", "0"), s.setAttribute("width", t.w + "px"), s.setAttribute("height", t.h + "px"), s;
}
function ze(a) {
  const t = ge(a), s = y("adj", a, O(a));
  return t.setAttribute("rx", s + "px"), t.setAttribute("ry", s + "px"), t;
}
function He(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, O(a)), r = [
    "M 0,0",
    `L ${t.w - e},0`,
    `Q ${t.w},0 ${t.w},${e}`,
    `L ${t.w},${t.h}`,
    `L 0,${t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", r), s;
}
function We(a) {
  const t = a.extend, s = $("path"), e = y("adj1", a, O(a)), r = y("adj2", a, 0), i = [
    `M ${e},0`,
    `L ${t.w - e},0`,
    `Q ${t.w},0 ${t.w},${e}`,
    `L ${t.w},${t.h - r}`,
    `Q ${t.w},${t.h} ${t.w - r},${t.h}`,
    `L ${r},${t.h}`,
    `Q 0,${t.h} 0,${t.h - r}`,
    `L 0,${e}`,
    `Q 0,0 ${e},0`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", i), s;
}
function Xe(a) {
  const t = a.extend, s = $("path"), e = y("adj1", a, O(a)), r = y("adj2", a, 0), i = [
    `M ${e},0`,
    `L ${t.w - r},0`,
    `Q ${t.w},0 ${t.w},${r}`,
    `L ${t.w},${t.h - e}`,
    `Q ${t.w},${t.h} ${t.w - e},${t.h}`,
    `L ${r},${t.h}`,
    `Q 0,${t.h} 0,${t.h - r}`,
    `L 0,${e}`,
    `Q 0,0 ${e},0`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", i), s;
}
function Qe(a) {
  const t = a.extend, s = $("polygon"), e = y("adj", a, O(a)), r = [
    "0,0",
    `${t.w - e},0`,
    `${t.w},${e}`,
    `${t.w},${t.h}`,
    `0,${t.h}`
  ].join(" ");
  return s.setAttribute("points", r), s;
}
function Ue(a) {
  const t = a.extend, s = $("polygon"), e = y("adj1", a, O(a)), r = y("adj2", a, 0), i = [
    [e, 0],
    [t.w - e, 0],
    [t.w, e],
    [t.w, t.h - r],
    [t.w - r, t.h],
    [r, t.h],
    [0, t.h - r],
    [0, e]
  ].map((o) => `${o[0]},${o[1]}`).join(" ");
  return s.setAttribute("points", i), s;
}
function Ve(a) {
  const t = a.extend, s = $("polygon"), e = y("adj1", a, 0), r = y("adj2", a, O(a)), i = [
    [e, 0],
    [t.w - r, 0],
    [t.w, r],
    [t.w, t.h - e],
    [t.w - e, t.h],
    [r, t.h],
    [0, t.h - r],
    [0, e]
  ].map((o) => `${o[0]},${o[1]}`).join(" ");
  return s.setAttribute("points", i), s;
}
function qe(a) {
  const t = a.extend, s = $("path"), e = y("adj1", a, O(a)), r = y("adj2", a, O(a)), i = [
    `M ${e},0`,
    `L ${t.w - r},0`,
    `L ${t.w},${r}`,
    `L ${t.w},${t.h}`,
    `L 0,${t.h}`,
    `L 0,${e}`,
    `Q 0,0 ${e},0`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", i), s;
}
function Ye(a) {
  const t = a.extend, s = $("path"), e = ["M 0,0", `L ${t.w},${t.h}`].join(" ");
  return s.setAttribute("d", e), s;
}
function Je(a) {
  const t = a.extend, s = $("path"), e = ["M 0,0", `L ${t.w},${t.h}`].join(" ");
  return s.setAttribute("d", e), s;
}
function Ke(a) {
  const t = a.extend, s = $("path"), e = ye("adj1", a, 0.5 * Math.max(t.w, t.h)), r = [
    "M 0,0",
    `L ${e},0`,
    `L ${e},${t.h}`,
    `L ${t.w},${t.h}`
  ].join(" ");
  return s.setAttribute("d", r), s;
}
function Ne(a) {
  const t = a.extend, s = $("path"), e = ye("adj1", a, 0.5 * Math.max(t.w, t.h)), r = [
    "M0,0",
    `Q${e},0 ${e},${t.h / 2}`,
    `T${t.w},${t.h}`
  ].join(" ");
  return s.setAttribute("d", r), s;
}
function ts(a) {
  const t = a.extend, s = y("adj1", a, 0.5 * Math.min(t.w, t.h)), e = y("adj2", a, 0.5 * Math.min(t.w, t.h)), r = $("path"), i = [
    `M0,${t.h / 2 - s / 2}`,
    `L${t.w - e},${t.h / 2 - s / 2}`,
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L${t.w - e},${t.h / 2 + s / 2}`,
    `L0,${t.h / 2 + s / 2}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", i);
  const o = s * e / t.h;
  return { dom: r, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: 0, right: o, w: t.w - o, h: s } };
}
function es(a) {
  const t = a.extend, s = y("adj1", a, 0.5 * Math.min(t.w, t.h)), e = y("adj2", a, 0.5 * Math.min(t.w, t.h)), r = $("path"), i = [
    `M0,${t.h / 2}`,
    `L${e},0`,
    `L${e},${t.h / 2 - s / 2}`,
    `L${t.w},${t.h / 2 - s / 2}`,
    `L${t.w},${t.h / 2 + s / 2}`,
    `L${e},${t.h / 2 + s / 2}`,
    `L${e},${t.h}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", i);
  const o = s * e / t.h;
  return { dom: r, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: o, right: 0, w: t.w - o, h: s } };
}
function ss(a) {
  const t = a.extend, s = y("adj1", a, 0.5 * Math.min(t.w, t.h)), e = y("adj2", a, 0.5 * Math.min(t.w, t.h)), r = $("path"), i = [
    `M${t.w / 2},0`,
    `L${t.w},${e}`,
    `L${t.w / 2 + s / 2},${e}`,
    `L${t.w / 2 + s / 2},${t.h}`,
    `L${t.w / 2 - s / 2},${t.h}`,
    `L${t.w / 2 - s / 2},${e}`,
    `L0,${e}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", i);
  const o = s * e / t.w;
  return { dom: r, textArea: { top: o, bottom: 0, left: t.w / 2 - s / 2, right: t.w / 2 - s / 2, w: s, h: t.h - o } };
}
function rs(a) {
  const t = a.extend, s = y("adj1", a, 0.5 * Math.min(t.w, t.h)), e = y("adj2", a, 0.5 * Math.min(t.w, t.h)), r = $("path"), i = [
    `M${t.w / 2},${t.h}`,
    `L0,${t.h - e}`,
    `L${t.w / 2 - s / 2},${t.h - e}`,
    `L${t.w / 2 - s / 2},0`,
    `L${t.w / 2 + s / 2},0`,
    `L${t.w / 2 + s / 2},${t.h - e}`,
    `L${t.w},${t.h - e}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", i);
  const o = s * e / t.w;
  return { dom: r, textArea: { top: 0, bottom: o, left: t.w / 2 - s / 2, right: t.w / 2 - s / 2, w: s, h: t.h - o } };
}
function as(a) {
  const t = a.extend, s = y("adj1", a, 0.5 * Math.min(t.w, t.h)), e = y("adj2", a, 0.5 * Math.min(t.w, t.h)), r = $("path"), i = [
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
  r.setAttribute("d", i);
  const o = s * e / t.h;
  return { dom: r, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: o, right: o, w: t.w - 2 * o, h: s } };
}
function is(a) {
  const t = a.extend, s = y("adj1", a, 0.5 * Math.min(t.w, t.h)), e = y("adj2", a, 0.5 * Math.min(t.w, t.h)), r = $("path"), i = [
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
  r.setAttribute("d", i);
  const o = s * e / t.w;
  return { dom: r, textArea: { top: o, bottom: o, left: t.w / 2 - s / 2, right: t.w / 2 - s / 2, w: s, h: t.h - 2 * o } };
}
function os(a) {
  const t = a.extend, s = y("adj1", a, 0.225 * Math.min(t.w, t.h)), e = y("adj2", a, 0.225 * Math.min(t.w, t.h)), r = y("adj3", a, 0.225 * Math.min(t.w, t.h)), i = $("path"), o = [
    `M0,${t.h / 2}`,
    `L${r},${t.h / 2 - e}`,
    `L${r},${t.h / 2 - s / 2}`,
    `L${t.w / 2 - s / 2},${t.h / 2 - s / 2}`,
    `L${t.w / 2 - s / 2},${r}`,
    `L${t.w / 2 - e},${r}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + e},${r}`,
    `L${t.w / 2 + s / 2},${r}`,
    `L${t.w / 2 + s / 2},${t.h / 2 - s / 2}`,
    `L${t.w - r},${t.h / 2 - s / 2}`,
    `L${t.w - r},${t.h / 2 - e}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - r},${t.h / 2 + e}`,
    `L${t.w - r},${t.h / 2 + s / 2}`,
    `L${t.w / 2 + s / 2},${t.h / 2 + s / 2}`,
    `L${t.w / 2 + s / 2},${t.h - r}`,
    `L${t.w / 2 + e},${t.h - r}`,
    `L${t.w / 2},${t.h}`,
    `L${t.w / 2 - e},${t.h - r}`,
    `L${t.w / 2 - s / 2},${t.h - r}`,
    `L${t.w / 2 - s / 2},${t.h / 2 + s / 2}`,
    `L${r},${t.h / 2 + s / 2}`,
    `L${r},${t.h / 2 + e}`,
    "Z"
  ].join(" ");
  i.setAttribute("d", o);
  const n = e === 0 ? 0 : s * r / e / 2;
  return { dom: i, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: n, right: n, w: t.w - 2 * n, h: s } };
}
function ns(a) {
  const t = a.extend, s = y("adj1", a, 0.225 * Math.min(t.w, t.h)), e = y("adj2", a, 0.225 * Math.min(t.w, t.h)), r = y("adj3", a, 0.225 * Math.min(t.w, t.h)), i = $("path"), o = [
    `M0,${t.h - e}`,
    `L${r},${t.h - 2 * e}`,
    `L${r},${t.h - e - s / 2}`,
    `L${t.w / 2 - s / 2},${t.h - e - s / 2}`,
    `L${t.w / 2 - s / 2},${r}`,
    `L${t.w / 2 - e},${r}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + e},${r}`,
    `L${t.w / 2 + s / 2},${r}`,
    `L${t.w / 2 + s / 2},${t.h - e - s / 2}`,
    `L${t.w - r},${t.h - e - s / 2}`,
    `L${t.w - r},${t.h - 2 * e}`,
    `L${t.w},${t.h - e}`,
    `L${t.w - r},${t.h}`,
    `L${t.w - r},${t.h - e + s / 2}`,
    `L${r},${t.h - e + s / 2}`,
    `L${r},${t.h}`,
    "Z"
  ].join(" ");
  i.setAttribute("d", o);
  const n = e === 0 ? 0 : s * r / e / 2;
  return { dom: i, textArea: { top: t.h - e - s / 2, bottom: e - s / 2, left: n, right: n, w: t.w - 2 * n, h: s } };
}
function cs(a) {
  const t = a.extend;
  let s = y("adj1", a, 0.25 * Math.min(t.w, t.h));
  const e = y("adj2", a, 0.25 * Math.min(t.w, t.h)), r = y("adj3", a, 0.25 * Math.min(t.w, t.h)), i = y("adj4", a, 0.4375 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e);
  let o = i - s;
  o < 0 && (o = 0);
  const n = $("path"), l = [
    `M0,${t.h}`,
    `L0,${e - s / 2 + i}`,
    `A${i} ${i} 0 0 1 ${i} ${e - s / 2}`,
    `L${t.w - r},${e - s / 2}`,
    `L${t.w - r},0`,
    `L${t.w},${e}`,
    `L${t.w - r},${2 * e}`,
    `L${t.w - r},${e + s / 2}`,
    `L${s + o},${e + s / 2}`,
    `A${o} ${o}  0 0 0 ${s} ${e + s / 2 + o}`,
    `L${s},${t.h}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n };
}
function ls(a) {
  const t = a.extend;
  let s = y("adj1", a, 0.25 * Math.min(t.w, t.h));
  const e = y("adj2", a, 0.25 * Math.min(t.w, t.h)), r = y("adj3", a, 0.25 * Math.min(t.w, t.h));
  let i = y("adj4", a, 0.4375 * Math.min(t.w, t.h)), o = y("adj5", a, 0.75 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e), o < r && (o = r + s), i > o - r && (i = o - r);
  let n = i - s;
  n > o - r - s && (n = o - r - s), n < 0 && (n = 0);
  const l = e - s / 2, p = $("path"), h = [
    `M0,${t.h}`,
    `L0,${i}`,
    `A${i} ${i} 0 0 1 ${i} 0`,
    `L${t.w - i - l},0`,
    `A${i} ${i} 0 0 1 ${t.w - l} ${i}`,
    `L${t.w - l},${o - r}`,
    `L${t.w},${o - r}`,
    `L${t.w - e},${o}`,
    `L${t.w - 2 * e},${o - r}`,
    `L${t.w - e - s / 2},${o - r}`,
    `L${t.w - e - s / 2},${s + n}`,
    `A${n} ${n}  0 0 0 ${t.w - n - e - s / 2} ${s}`,
    `L${s + n},${s}`,
    `A${n} ${n}  0 0 0 ${s} ${s + n}`,
    `L${s},${t.h}`,
    "Z"
  ].join(" ");
  return p.setAttribute("d", h), { dom: p };
}
function hs(a) {
  const t = a.extend;
  let s = y("adj1", a, 0.25 * Math.min(t.w, t.h));
  const e = y("adj2", a, 0.25 * Math.min(t.w, t.h));
  let r = y("adj3", a, 0.25 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e);
  let i = Math.min(t.w, t.h) - 2 * e;
  r > i && (r = i), r < 0 && (r = 0);
  const o = e - s / 2, n = $("path"), l = [
    `M0,${t.h - e}`,
    `L${r},${t.h - 2 * e}`,
    `L${r},${t.h - e - s / 2}`,
    `L${t.w - e - s / 2},${t.h - e - s / 2}`,
    `L${t.w - e - s / 2},${r}`,
    `L${t.w - 2 * e},${r}`,
    `L${t.w - e},0`,
    `L${t.w},${r}`,
    `L${t.w - o},${r}`,
    `L${t.w - o},${t.h - o}`,
    `L${r},${t.h - o}`,
    `L${r},${t.h}`,
    "Z"
  ].join(" ");
  n.setAttribute("d", l);
  const p = e === 0 ? 0 : s * r / e / 2;
  return { dom: n, textArea: { top: t.h - e - s / 2, bottom: e - s / 2, left: p, right: e, w: t.w - p - e, h: s } };
}
function ps(a) {
  const t = a.extend;
  let s = y("adj1", a, 0.25 * Math.min(t.w, t.h));
  const e = y("adj2", a, 0.25 * Math.min(t.w, t.h));
  let r = y("adj3", a, 0.25 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e);
  const i = e - s / 2, o = $("path"), n = [
    `M0,${t.h}`,
    `L0,${t.h - s}`,
    `L${t.w - e - s / 2},${t.h - s}`,
    `L${t.w - e - s / 2},${r}`,
    `L${t.w - 2 * e},${r}`,
    `L${t.w - e},0`,
    `L${t.w},${r}`,
    `L${t.w - i},${r}`,
    `L${t.w - i},${t.h}`,
    "Z"
  ].join(" ");
  return o.setAttribute("d", n), { dom: o, textArea: { top: t.h - s, bottom: 0, left: 0, right: 0, w: t.w, h: s } };
}
function ds(a) {
  const t = a.extend, s = a.background;
  let e = y("adj1", a, 0.25 * Math.min(t.w, t.h));
  const r = y("adj2", a, 0.5 * Math.min(t.w, t.h)), i = y("adj3", a, 0.25 * Math.min(t.w, t.h));
  e > r && (e = r);
  const o = r / 2 - e / 2, n = (t.h - r / 2 - e / 2) / 2, l = (t.h - o - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M${t.w},0`,
    `A ${t.w} ${n} 0 0 0 0 ${n}`,
    `L0,${l + e}`,
    `A ${t.w} ${l} 0 0 1 ${t.w} ${e}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && h.setAttribute("fill", P(s, { dark: 0.6 }) || "transparent");
  const f = $("path");
  return f.setAttribute("d", [
    `M0,${n}`,
    `A ${t.w} ${n} 0 0 0 ${t.w - i} ${t.h - r / 2 - e / 2}`,
    `L${t.w - i},${t.h - r}`,
    `L${t.w},${t.h - r / 2}`,
    `L${t.w - i},${t.h}`,
    `L${t.w - i},${t.h - o}`,
    `A ${t.w} ${l} 0 0 1 0 ${e + l}`,
    "Z"
  ].join(" ")), p.appendChild(h), p.appendChild(f), { dom: p };
}
function fs(a) {
  const t = a.extend, s = a.background;
  let e = y("adj1", a, 0.25 * Math.min(t.w, t.h));
  const r = y("adj2", a, 0.5 * Math.min(t.w, t.h)), i = y("adj3", a, 0.25 * Math.min(t.w, t.h));
  e > r && (e = r);
  const o = r / 2 - e / 2, n = (t.h - r / 2 - e / 2) / 2, l = (t.h - o - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M0,${t.h - r / 2}`,
    `L${i},${t.h - r}`,
    `L${i},${t.h - r / 2 - e / 2}`,
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
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && f.setAttribute("fill", P(s, { dark: 0.6 }) || "transparent"), p.appendChild(h), p.appendChild(f), { dom: p };
}
function us(a) {
  const t = a.extend, s = a.background;
  let e = y("adj1", a, 0.25 * Math.min(t.w, t.h));
  const r = y("adj2", a, 0.5 * Math.min(t.w, t.h)), i = y("adj3", a, 0.25 * Math.min(t.w, t.h));
  e > r && (e = r);
  const o = r / 2 - e / 2, n = (t.w - r / 2 - e / 2) / 2, l = (t.w - o - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M${t.w - r / 2},0`,
    `L${t.w - r},${i}`,
    `L${t.w - r / 2 - e / 2},${i}`,
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
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && f.setAttribute("fill", P(s, { dark: 0.6 }) || "transparent"), p.appendChild(h), p.appendChild(f), { dom: p };
}
function $s(a) {
  const t = a.extend, s = a.background;
  let e = y("adj1", a, 0.25 * Math.min(t.w, t.h));
  const r = y("adj2", a, 0.5 * Math.min(t.w, t.h)), i = y("adj3", a, 0.25 * Math.min(t.w, t.h));
  e > r && (e = r);
  const o = r / 2 - e / 2, n = (t.w - r / 2 - e / 2) / 2, l = (t.w - o - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M0,${t.h}`,
    `L${e},${t.h}`,
    `A${l} ${t.h} 0 0 1 ${l + e} 0`,
    `L${n},0`,
    `A${n} ${t.h} 0 0 0 0 ${t.h}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && h.setAttribute("fill", P(s, { dark: 0.6 }) || "transparent");
  const f = $("path");
  return f.setAttribute("d", [
    `M${t.w - r / 2},${t.h}`,
    `L${t.w - r},${t.h - i}`,
    `L${t.w - r / 2 - e / 2},${t.h - i}`,
    `A ${n} ${t.h} 0 0 0 ${n} 0`,
    `L${n + e},0`,
    `A ${l} ${t.h} 0 0 1 ${t.w - o} ${t.h - i}`,
    `L${t.w},${t.h - i}`,
    "Z"
  ].join(" ")), p.appendChild(h), p.appendChild(f), { dom: p };
}
function ws(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj1", a, 0.5) * t.h, r = A("adj2", a, 0.5) * s, i = s / 8, o = s / 16, n = s / 32, l = 5 * s / 32, p = t.h / 2 - e / 2, h = t.h / 2 + e / 2, f = $("g"), u = $("path");
  u.setAttribute("d", [`M0,${p}`, `L${n},${p}`, `L${n},${h}`, `L0,${h}`, "Z"].join(" "));
  const d = $("path");
  d.setAttribute("d", [`M${o},${p}`, `L${i},${p}`, `L${i},${h}`, `L${o},${h}`, "Z"].join(" "));
  const w = $("path");
  w.setAttribute("d", [
    `M${l},${p}`,
    `L${t.w - r},${p}`,
    `L${t.w - r},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - r},${t.h}`,
    `L${t.w - r},${h}`,
    `L${l},${h}`,
    "Z"
  ].join(" ")), f.appendChild(w), f.appendChild(u), f.appendChild(d);
  const g = e * r / t.h;
  return { dom: f, textArea: { top: p, bottom: p, left: 0, right: g, w: t.w - g, h: e } };
}
function ms(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj1", a, 0.5) * t.h, r = A("adj2", a, 0.5) * s, i = e * r / t.h, o = t.h / 2 - e / 2, n = t.h / 2 + e / 2, l = $("path"), p = [
    `M0,${o}`,
    `L${t.w - r},${o}`,
    `L${t.w - r},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - r},${t.h}`,
    `L${t.w - r},${n}`,
    `L0,${n}`,
    `L${i},${t.h / 2}`,
    "Z"
  ].join(" ");
  l.setAttribute("d", p);
  const h = e * r / t.h;
  return { dom: l, textArea: { top: o, bottom: o, left: h, right: h, w: t.w - 2 * h, h: e } };
}
function bs(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj", a, 0.5) * s, r = $("path"), i = ["M0,0", `L${t.w - e},0`, `L${t.w},${t.h / 2}`, `L${t.w - e},${t.h}`, `L0,${t.h}`, "Z"].join(" ");
  return r.setAttribute("d", i), { dom: r, textArea: { top: 0, bottom: 0, left: 0, right: e / 2, w: t.w - e / 2, h: t.h } };
}
function ys(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj", a, 0.5) * s, r = $("path"), i = [
    "M0,0",
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L0,${t.h}`,
    `L${e},${t.h / 2}`,
    "Z"
  ].join(" ");
  return r.setAttribute("d", i), { dom: r, textArea: { top: 0, bottom: 0, left: e, right: e, w: t.w - 2 * e, h: t.h } };
}
function xs(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj1", a, 0.25) * s, r = A("adj2", a, 0.25) * s, i = A("adj3", a, 0.25) * s, o = A("adj4", a, 0.64977) * t.w, n = $("path"), l = [
    "M0,0",
    `L${o},0`,
    `L${o},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - r}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - i},${t.h / 2 + r}`,
    `L${t.w - i},${t.h / 2 + e / 2}`,
    `L${o},${t.h / 2 + e / 2}`,
    `L${o},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: 0, bottom: 0, left: 0, right: t.w - o, w: o, h: t.h } };
}
function gs(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj1", a, 0.25) * s, r = A("adj2", a, 0.25) * s, i = A("adj3", a, 0.25) * s, o = A("adj4", a, 0.64977) * t.w, n = $("path"), l = [
    `M0,${t.h / 2}`,
    `L${i},${t.h / 2 - r}`,
    `L${i},${t.h / 2 - e / 2}`,
    `L${t.w - o},${t.h / 2 - e / 2}`,
    `L${t.w - o},0`,
    `L${t.w},0`,
    `L${t.w},${t.h}`,
    `L${t.w - o},${t.h}`,
    `L${t.w - o},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + r}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: 0, bottom: 0, left: t.w - o, right: 0, w: o, h: t.h } };
}
function Ls(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj1", a, 0.25) * s, r = A("adj2", a, 0.25) * s, i = A("adj3", a, 0.25) * s, o = A("adj4", a, 0.64977) * t.h, n = $("path"), l = [
    `M0,${t.h - o}`,
    `L${t.w / 2 - e / 2},${t.h - o}`,
    `L${t.w / 2 - e / 2},${i}`,
    `L${t.w / 2 - r},${i}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + r},${i}`,
    `L${t.w / 2 + e / 2},${i}`,
    `L${t.w / 2 + e / 2},${t.h - o}`,
    `L${t.w},${t.h - o}`,
    `L${t.w},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: t.h - o, bottom: 0, left: 0, right: 0, w: t.w, h: o } };
}
function As(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj1", a, 0.25) * s, r = A("adj2", a, 0.25) * s, i = A("adj3", a, 0.25) * s, o = A("adj4", a, 0.64977) * t.h, n = $("path"), l = [
    "M0,0",
    `L${t.w},0`,
    `L${t.w},${o}`,
    `L${t.w / 2 + e / 2},${o}`,
    `L${t.w / 2 + e / 2},${t.h - i}`,
    `L${t.w / 2 + r},${t.h - i}`,
    `L${t.w / 2},${t.h}`,
    `L${t.w / 2 - r},${t.h - i}`,
    `L${t.w / 2 - e / 2},${t.h - i}`,
    `L${t.w / 2 - e / 2},${o}`,
    `L0,${o}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: 0, bottom: t.h - o, left: 0, right: 0, w: t.w, h: o } };
}
function Ms(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj1", a, 0.25) * s, r = A("adj2", a, 0.25) * s, i = A("adj3", a, 0.25) * s, o = A("adj4", a, 0.48123) * t.w, n = $("path"), l = [
    `M0,${t.h / 2}`,
    `L${i},${t.h / 2 - r}`,
    `L${i},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - o / 2},0`,
    `L${t.w / 2 + o / 2},0`,
    `L${t.w / 2 + o / 2},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - r}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - i},${t.h / 2 + r}`,
    `L${t.w - i},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + o / 2},${t.h}`,
    `L${t.w / 2 - o / 2},${t.h}`,
    `L${t.w / 2 - o / 2},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + r}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", l), { dom: n, textArea: { top: 0, bottom: 0, left: t.w / 2 - o / 2, right: t.w / 2 - o / 2, w: o, h: t.h } };
}
function Ps(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = A("adj1", a, 0.18515) * s, r = A("adj2", a, 0.18515) * s, i = A("adj3", a, 0.18515) * s, o = A("adj4", a, 0.48123) * t.w, n = A("adj4", a, 0.48123) * t.h, l = $("path"), p = [
    `M0,${t.h / 2}`,
    `L${i},${t.h / 2 - r}`,
    `L${i},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 - n / 2}`,
    `L${t.w / 2 - e / 2},${t.h / 2 - n / 2}`,
    `L${t.w / 2 - e / 2},${i}`,
    `L${t.w / 2 - r},${i}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + r},${i}`,
    `L${t.w / 2 + e / 2},${i}`,
    `L${t.w / 2 + e / 2},${t.h / 2 - n / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 - n / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - e / 2}`,
    `L${t.w - i},${t.h / 2 - r}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - i},${t.h / 2 + r}`,
    `L${t.w - i},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + o / 2},${t.h / 2 + n / 2}`,
    `L${t.w / 2 + e / 2},${t.h / 2 + n / 2}`,
    `L${t.w / 2 + e / 2},${t.h - i}`,
    `L${t.w / 2 + r},${t.h - i}`,
    `L${t.w / 2},${t.h}`,
    `L${t.w / 2 - r},${t.h - i}`,
    `L${t.w / 2 - e / 2},${t.h - i}`,
    `L${t.w / 2 - e / 2},${t.h / 2 + n / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 + n / 2}`,
    `L${t.w / 2 - o / 2},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + e / 2}`,
    `L${i},${t.h / 2 + r}`,
    "Z"
  ].join(" ");
  return l.setAttribute("d", p), { dom: l, textArea: { top: t.h / 2 - n / 2, bottom: t.h / 2 - n / 2, left: t.w / 2 - o / 2, right: t.w / 2 - o / 2, w: o, h: n } };
}
function ks(a) {
  const t = a.prstGeom || {}, s = a.extend, e = t.pathList, r = t.w, i = t.h, o = $("path"), n = { moveTo: "M", lnTo: "L", cubicBezTo: "C", close: "Z" }, l = s.w / r, p = s.h / i, h = e.map((f) => {
    const u = n[f.type], d = Array.isArray(f.points) ? f.points.map((w) => `${w[0] * l},${w[1] * p}`).join(" ") : "";
    return d ? `${u} ${d}` : `${u}`;
  }).join(" ");
  return o.setAttribute("d", h), o.style.fillRule = "evenodd", { dom: o };
}
function Ss(a) {
  const t = a.extend, s = $("polygon"), e = [`${t.w / 2},0`, `0,${t.h}`, `${t.w},${t.h}`].join(" ");
  return s.setAttribute("points", e), { dom: s };
}
function js(a) {
  const t = a.extend, s = $("polygon"), e = [`0,${t.h}`, "0,0", `${t.w},${t.h}`].join(" ");
  return s.setAttribute("points", e), { dom: s };
}
function Cs(a) {
  const t = a.extend, s = $("ellipse"), e = t.w / 2, r = t.h / 2;
  return s.setAttribute("cx", e + "px"), s.setAttribute("cy", r + "px"), s.setAttribute("rx", e + "px"), s.setAttribute("ry", r + "px"), { dom: s };
}
function Rs(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, 0.5 * Math.min(t.w, t.h)), r = [
    `M${e},0`,
    `L${t.w},0`,
    `L${t.w - e},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  s.setAttribute("d", r);
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
function Ts(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, 0.25 * Math.min(t.w, t.h)), r = [
    `M${e},0`,
    `L${t.w - e},0`,
    `L${t.w},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  s.setAttribute("d", r);
  const i = y("adj", a, 0.5 * Math.min(t.w, t.h)), o = i / t.w * 0.66 * t.h, n = 0.66 * i;
  return {
    dom: s,
    textArea: { top: o, bottom: 0, left: n, right: n, w: t.w - 2 * n, h: t.h - o }
  };
}
function vs(a) {
  const t = a.extend, s = $("path"), e = [
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
function Bs(a) {
  const t = a.extend, s = $("path"), e = [
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
function Is(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, 0.25 * Math.min(t.w, t.h)), r = [
    `M${e},0`,
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L${e},${t.h}`,
    `L0,${t.h / 2}`,
    "Z"
  ].join(" ");
  s.setAttribute("d", r);
  const i = 0.098 * t.h + e / t.w * 0.38 * t.h, o = 0.088 * t.w + 0.422 * e;
  return {
    dom: s,
    textArea: { top: i, bottom: i, left: o, right: o, w: t.w - 2 * o, h: t.h - 2 * i }
  };
}
function _s(a) {
  const t = a.extend, s = $("path"), e = [
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
function Ds(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, 0.29 * Math.min(t.w, t.h)), r = [
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
  return s.setAttribute("d", r), {
    dom: s,
    textArea: { top: 0.5 * e, bottom: 0.5 * e, left: 0.5 * e, right: 0.5 * e, w: t.w - e, h: t.h - e }
  };
}
function Es(a) {
  const t = a.extend, s = $("path"), e = 0.344, r = 0.117, i = 0.19, o = [
    `M${t.w * e},0`,
    `L${0.656 * t.w},0`,
    `L${0.883 * t.w},${t.h * i}`,
    `L${t.w},${0.5 * t.h}`,
    `L${0.883 * t.w},${0.81 * t.h}`,
    `L${0.656 * t.w},${t.h}`,
    `L${t.w * e},${t.h}`,
    `L${t.w * r},${0.81 * t.h}`,
    `L0,${0.5 * t.h}`,
    `L${t.w * r},${t.h * i}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", o), {
    dom: s,
    textArea: { top: t.h * i, bottom: t.h * i, left: t.w * r, right: t.w * r, w: 0.766 * t.w, h: 0.62 * t.h }
  };
}
function Os(a) {
  const t = a.extend, s = $("path"), e = 0.364, r = 0.133, i = 0.135, o = [
    `M${t.w * e},0`,
    `L${0.636 * t.w},0`,
    `L${0.867 * t.w},${t.h * i}`,
    `L${t.w},${t.h * e}`,
    `L${t.w},${0.636 * t.h}`,
    `L${0.867 * t.w},${0.865 * t.h}`,
    `L${0.636 * t.w},${t.h}`,
    `L${t.w * e},${t.h}`,
    `L${t.w * r},${0.865 * t.h}`,
    `L0,${0.636 * t.h}`,
    `L0,${t.h * e}`,
    `L${t.w * r},${t.h * i}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", o), {
    dom: s,
    textArea: { top: t.h * i, bottom: t.h * i, left: t.w * r, right: t.w * r, w: 0.734 * t.w, h: 0.73 * t.h }
  };
}
function Fs(a) {
  const t = a.extend, s = $("path"), e = A("adj1", a, 360), r = A("adj2", a, 270), i = t.w / 2, o = t.h / 2, n = t.w / 2, l = t.h / 2, [p, h] = D(e, i, o, n, l), [f, u] = D(r, i, o, n, l), d = J(e, r), w = `M${i},${o}, L${p} ${h} A ${n} ${l} 0 ${d} 1 ${f} ${u} Z`;
  return s.setAttribute("d", w), { dom: s, textArea: K(a) };
}
function Gs(a) {
  const t = a.extend, s = $("path"), e = A("adj1", a, 270), r = A("adj2", a, 0), i = t.w / 2, o = t.h / 2, n = t.w / 2, l = t.h / 2, [p, h] = D(e, i, o, n, l), [f, u] = D(r, i, o, n, l), d = J(e, r), w = `M${p},${h} A ${n} ${l} 0 ${d} 1 ${f} ${u}`;
  return s.setAttribute("d", w), { dom: s, hasFill: !1 };
}
function Zs(a) {
  const t = a.extend, s = $("path"), e = A("adj1", a, 45), r = A("adj2", a, 270), i = t.w / 2, o = t.h / 2, n = t.w / 2, l = t.h / 2, [p, h] = D(e, i, o, n, l), [f, u] = D(r, i, o, n, l), d = J(e, r), w = `M${p} ${h} A ${n} ${l} 0 ${d} 1 ${f} ${u} Z`;
  return s.setAttribute("d", w), { dom: s, textArea: K(a) };
}
function zs(a) {
  const t = a.extend, s = $("path"), e = A("adj", a, 1), r = t.w / 2, i = t.h / 2, o = t.w / 2, n = t.h / 2, [l, p] = D(0, r, i, o, n), [h, f] = D(270, r, i, o, n), u = J(0, 270);
  let d = `M${l} ${p} A ${o} ${n} 0 ${u} 1 ${h} ${f}`;
  const w = o * e, g = r + w, m = i - n * w / (t.w / 2), b = (t.w / 2 + g) / 2, x = (t.h / 2 + m) / 2;
  return d += ` Q${b},0 ${g},${m}`, d += ` Q${t.w},${x} ${r + o},${i}`, s.setAttribute("d", d), { dom: s, textArea: K(a) };
}
function Hs(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, 0.16667 * Math.min(t.w, t.h)), r = [
    `M${e},${t.h}`,
    `Q0,${t.h} 0,${t.h - e}`,
    `L0,${e}`,
    `Q0,0 ${e},0`,
    `M${t.w - e},0`,
    `Q${t.w},0 ${t.w},${e}`,
    `L${t.w},${t.h - e}`,
    `Q${t.w},${t.h} ${t.w - e},${t.h}`
  ].join(" ");
  s.setAttribute("d", r);
  const i = 0.285 * e;
  return {
    dom: s,
    hasFill: !1,
    textArea: { top: i, bottom: i, left: i, right: i, w: t.w - 2 * i, h: t.h - 2 * i }
  };
}
function Ws(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, 0.083335 * Math.min(t.w, t.h)), r = [
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
  s.setAttribute("d", r);
  const i = 0.285 * y("adj", a, 0.16667 * Math.min(t.w, t.h));
  return {
    dom: s,
    hasFill: !1,
    textArea: { top: i, bottom: i, left: i, right: i, w: t.w - 2 * i, h: t.h - 2 * i }
  };
}
function Xs(a) {
  const t = a.extend, s = $("path"), e = y("adj1", a, 0.12 * Math.min(t.w, t.h)), r = [
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
  return s.setAttribute("d", r), {
    dom: s,
    textArea: { top: e, bottom: e, left: e, right: e, w: t.w - 2 * e, h: t.h - 2 * e }
  };
}
function Qs(a) {
  const t = a.extend, s = $("path"), e = y("adj1", a, 0.333 * Math.min(t.w, t.h)), r = Math.min(
    y("adj2", a, 0.333 * Math.min(t.w, t.h)),
    t.w * (1 - e / t.h)
  ), i = [
    "M0,0",
    `L${t.w},0`,
    `L${t.w * (1 - e / t.h)},${e}`,
    `L${r},${e}`,
    `L${r},${t.h * (1 - r / t.w)}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", i), { dom: s };
}
function Us(a) {
  const t = a.extend, s = $("path"), e = y("adj1", a, 0.5 * Math.min(t.w, t.h)), r = y("adj2", a, 0.5 * Math.min(t.w, t.h)), i = [
    "M0,0",
    `L${r},0`,
    `L${r},${t.h - e}`,
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
function Vs(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, 0.5 * Math.min(t.w, t.h)), i = [`M${t.w * e / t.h},0`, `L${t.w},0`, `L0,${t.h}`, `L0,${e}`, "Z"].join(" ");
  s.setAttribute("d", i);
  const o = A("adj", a, 0.5), n = 0.5 * (1 - o) * t.h, l = 0.5 * (1 - o) * t.w;
  return {
    dom: s,
    textArea: { top: 0, bottom: n, left: 0, right: l, w: t.w - l, h: t.h - n }
  };
}
function qs(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, 0.25 * Math.min(t.w, t.h)), r = [
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
  return s.setAttribute("d", r), {
    dom: s,
    textArea: { top: e, bottom: e, left: 0, right: 0, w: t.w, h: t.h - 2 * e }
  };
}
function Ys(a) {
  const t = a.extend, s = $("path"), e = y("adj", a, 0.16667 * Math.min(t.w, t.h)), r = [
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
  s.setAttribute("d", r);
  const i = 0.72 * e;
  return {
    dom: s,
    textArea: { top: i, bottom: i, left: i, right: i, w: t.w - 1.44 * e, h: t.w - 1.44 * e }
  };
}
function Js(a) {
  const t = a.extend, s = a.background, e = $("g"), r = $("path"), i = y("adj", a, 0.25 * Math.min(t.w, t.h)), o = [
    `M0,${i / 2}`,
    `L0,${t.h - i / 2}`,
    `A${t.w / 2},${i / 2} 0 0 0 ${t.w},${t.h - i / 2}`,
    `L${t.w},${i / 2}`,
    `A${t.w / 2},${i / 2} 0 0 1 0,${i / 2}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", o);
  const n = $("ellipse");
  return n.setAttribute("cx", t.w / 2 + "px"), n.setAttribute("cy", i / 2 + "px"), n.setAttribute("rx", t.w / 2 + "px"), n.setAttribute("ry", i / 2 + "px"), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", P(s, { light: 0.5 }) || "transparent"), e.appendChild(r), e.appendChild(n), {
    dom: e,
    textArea: { top: i, bottom: 0, left: 0, right: 0, w: t.w, h: t.h - i }
  };
}
function Ks(a) {
  const t = a.extend, s = a.background, e = y("adj", a, 0.25 * Math.min(t.w, t.h)), r = $("g"), i = $("path");
  i.setAttribute("d", [`M0,${e}`, `L${t.w - e},${e}`, `L${t.w - e},${t.h}`, `L0,${t.h}`, "Z"].join(" "));
  const o = $("path");
  o.setAttribute("d", [`M0,${e}`, `L${e},0`, `L${t.w},0`, `L${t.w - e},${e}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && o.setAttribute("fill", P(s, { light: 0.8 }) || "transparent");
  const n = $("path");
  return n.setAttribute("d", [`M${t.w},0`, `L${t.w - e},${e}`, `L${t.w - e},${t.h}`, `L${t.w},${t.h - e}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", P(s, { dark: 0.6 }) || "transparent"), r.appendChild(i), r.appendChild(o), r.appendChild(n), {
    dom: r,
    textArea: { top: e, bottom: 0, left: 0, right: e, w: t.w - e, h: t.h - e }
  };
}
function Ns(a) {
  const t = a.extend, s = a.background, e = y("adj", a, 0.125 * Math.min(t.w, t.h)), r = $("g"), i = $("path");
  i.setAttribute("d", [`M${e},${e}`, `L${t.w - e},${e}`, `L${t.w - e},${t.h - e}`, `L${e},${t.h - e}`, "Z"].join(" "));
  const o = $("path");
  o.setAttribute("d", ["M0,0", `L${e},${e}`, `L${t.w - e},${e}`, `L${t.w},0`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && o.setAttribute("fill", P(s, { light: 0.8 }) || "transparent");
  const n = $("path");
  n.setAttribute("d", [`M${t.w},0`, `L${t.w - e},${e}`, `L${t.w - e},${t.h - e}`, `L${t.w},${t.h}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", P(s, { dark: 0.6 }) || "transparent");
  const l = $("path");
  l.setAttribute("d", [`M${t.w},${t.h}`, `L${t.w - e},${t.h - e}`, `L${e},${t.h - e}`, `L0,${t.h}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && l.setAttribute("fill", P(s, { dark: 0.625 }) || "transparent");
  const p = $("path");
  return p.setAttribute("d", [`M0,${t.h}`, `L${e},${t.h - e}`, `L${e},${e}`, "L0,0", "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && p.setAttribute("fill", P(s, { light: 0.6 }) || "transparent"), r.appendChild(i), r.appendChild(o), r.appendChild(n), r.appendChild(l), r.appendChild(p), {
    dom: r,
    textArea: { top: e, bottom: e, left: e, right: e, w: t.w - 2 * e, h: t.h - 2 * e }
  };
}
function tr(a) {
  const t = a.extend, s = y("adj", a, 0.25 * Math.min(t.w, t.h)), e = $("path"), r = [
    `M0,${t.h / 2}`,
    `A${t.w / 2},${t.h / 2} 0 1,1 0,${t.h / 2 + 1}`,
    "Z",
    `M${t.w - s},${t.h / 2}`,
    `A${t.w / 2 - s},${t.h / 2 - s} 0 1,0 ${t.w - s},${t.h / 2 + 1}`,
    "Z"
  ].join(" ");
  return e.setAttribute("d", r), { dom: e, textArea: K(a) };
}
function er(a) {
  const t = a.extend, s = y("adj", a, 0.25 * Math.min(t.w, t.h)), e = $("path"), r = Math.atan(t.h / t.w), i = s / 2 / Math.sin(r), o = t.w / 2, n = t.h / 2, l = -1 * t.h / t.w, p = t.h * i / t.w, h = t.w / 2 - s, f = t.h / 2 - s, u = -2 * h * h * l * p, d = Math.sqrt(
    Math.pow(2 * h * h * l * p, 2) - 4 * (f * f + h * h * l * l) * h * h * (p * p - f * f)
  ), w = 2 * (f * f + h * h * l * l), g = (u - d) / w, m = l * g + p, b = (u + d) / w, x = l * b + p, L = -t.h * i / t.w, M = -2 * h * h * l * L, R = Math.sqrt(
    Math.pow(2 * h * h * l * L, 2) - 4 * (f * f + h * h * l * l) * h * h * (L * L - f * f)
  ), T = 2 * (f * f + h * h * l * l), C = (M - R) / T, _ = l * C + L, S = (M + R) / T, I = l * S + L, E = [
    `M0,${t.h / 2}`,
    `A${t.w / 2},${t.h / 2} 0 1,1 0,${t.h / 2 + 1}`,
    "Z",
    `M${o + b},${n - x}`,
    `A${h},${f} 0 0 0 ${o + g},${n - m}`,
    "Z",
    `M${o + C},${n - _}`,
    `A${h},${f} 0 0 0 ${o + S},${n - I}`,
    "Z"
  ].join(" ");
  return e.setAttribute("d", E), { dom: e, textArea: K(a) };
}
function sr(a) {
  const t = a.extend, s = Math.min(t.w, t.h), e = $("path"), r = A("adj1", a, 180), i = A("adj2", a, 0), o = y("adj3", a, 0.25 * s), n = t.w / 2, l = t.h / 2, p = t.w / 2, h = t.h / 2, f = t.w / 2 - o, u = t.h / 2 - o, [d, w] = D(r, n, l, p, h), [g, m] = D(i, n, l, p, h), [b, x] = D(r, n, l, f, u), [L, M] = D(i, n, l, f, u), R = J(r, i), T = [
    `M${d},${w}`,
    `A${p} ${h} 0 ${R} 1 ${g} ${m}`,
    `L${L},${M}`,
    `A${f} ${u} 0 ${R} 0 ${b} ${x}`,
    "Z"
  ].join(" ");
  e.setAttribute("d", T);
  const C = [[d, w], [g, m], [b, x], [L, M]];
  r > i && C.push([t.w, t.h / 2]), (i > 180 && i <= 360 && r < 180 || r > i && i >= 0 && i < 180 && r < 180) && C.push([0, t.h / 2]), (r < i && r < 90 && i > 90 || r > i && i > 90 || r > i && r < 90) && C.push([t.w / 2, t.h]), (r < i && r < 270 && i > 270 || r > i && i > 270 || r > i && r < 270) && C.push([t.w / 2, 0]);
  let _ = 1 / 0, S = 1 / 0, I = -1 / 0, E = -1 / 0;
  return C.forEach((v) => {
    _ = Math.min(v[0], _), S = Math.min(v[1], S), I = Math.max(v[0], I), E = Math.max(v[1], E);
  }), {
    dom: e,
    textArea: { top: S, bottom: t.h - E, left: _, right: t.w - I, w: I - _, h: E - S }
  };
}
function rr(a) {
  const t = a.extend, s = a.background, e = $("g"), r = y("adj", a, 0.16667 * Math.min(t.w, t.h)), i = $("path");
  i.setAttribute("d", [
    "M0,0",
    `L${t.w},0`,
    `L${t.w},${t.h - r}`,
    `L${t.w - r},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" "));
  const o = r * Math.cos(Math.PI / 4) / Math.cos(Math.PI / 6) * Math.cos(75 / 180 * Math.PI), n = $("path");
  return n.setAttribute("d", [
    `M${t.w - r + o}, ${t.h - r + o}`,
    `L${t.w},${t.h - r}`,
    `L${t.w - r},${t.h}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", P(s, { dark: 0.6 }) || "transparent"), e.appendChild(i), e.appendChild(n), {
    dom: e,
    textArea: { top: 0, bottom: r, left: 0, right: 0, w: t.w, h: t.h - r }
  };
}
const ar = "http://www.w3.org/2000/svg";
function ir(a, t, s) {
  const e = a.background || {}, r = a.extend, { base64: i, alpha: o, fillRect: n = {} } = e, { b: l = 0, t: p = 0, l: h = 0, r: f = 0 } = n, u = $("defs"), d = $("pattern");
  d.setAttribute("id", "background_" + a.uuid), d.setAttribute("patternUnits", "userSpaceOnUse"), d.setAttribute("width", r.w + ""), d.setAttribute("height", r.h + "");
  const w = $("image");
  w.setAttribute("href", i), w.setAttribute("preserveAspectRatio", "none");
  const g = r.w * h, m = r.h * p, b = r.w * (1 - h - f), x = r.h * (1 - p - l);
  w.setAttribute("width", b + ""), w.setAttribute("height", x + ""), w.setAttribute("x", g + ""), w.setAttribute("y", m + ""), typeof o == "number" && w.setAttribute("opacity", o + ""), d.appendChild(w), u.appendChild(d), t.appendChild(u), s.setAttribute("fill", `url(#background_${a.uuid})`);
}
function or(a, t, s) {
  const e = a.background || {}, { gsList: r, lin: i, path: o, tileRect: n = {} } = e, l = $("defs"), p = $(o === "circle" ? "radialGradient" : "linearGradient");
  if (p.setAttribute("id", "background_grad_fill_" + a.uuid), (r || []).slice().sort((f, u) => f.pos - u.pos).forEach((f) => {
    const u = $("stop");
    u.setAttribute("offset", `${100 * f.pos}%`), u.setAttribute("stop-color", P(f.color)), p.appendChild(u);
  }), o === "circle") {
    const { r: f, l: u, t: d, b: w } = n;
    f === -1 ? p.setAttribute("cx", "100%") : u === -1 && p.setAttribute("cx", "0%"), d === -1 ? p.setAttribute("cy", "0%") : w === -1 && p.setAttribute("cy", "100%");
  } else i != null && i.ang && p.setAttribute("gradientTransform", `rotate(${i.ang})`);
  l.appendChild(p), t.appendChild(l), s.setAttribute("fill", `url(#background_grad_fill_${a.uuid})`);
}
function nr(a) {
  return !a || !a.type || a.type === "solid" ? "" : ({
    sysDot: [1, 1],
    sysDash: [3, 1],
    dash: [4, 3],
    dashDot: [4, 3, 1, 3],
    lgDash: [8, 3],
    lgDashDot: [8, 3, 1, 3],
    lgDashDotDot: [8, 3, 1, 3, 1, 3]
  }[a.type] || []).map((s) => s * a.width).join(",");
}
function dt(a) {
  const t = a.extend, s = a.offset, e = a.border, r = a.background, i = a.rotate, o = a.flipH, n = a.flipV, l = document.createElement("div");
  l.className = `shape-wrapper shape-${a.shape}`, l.style.setProperty("position", "absolute"), l.style.setProperty("width", (t.w || 1) + "px"), l.style.setProperty("height", (t.h || 1) + "px"), l.style.setProperty("left", s.x + "px"), l.style.setProperty("top", s.y + "px");
  let p;
  const h = document.createElementNS(ar, "svg");
  h.style.setProperty("position", "absolute"), h.setAttribute("width", "100%"), h.setAttribute("height", "100%"), h.style.setProperty("left", "0"), h.style.setProperty("top", "0"), h.style.overflow = "visible";
  let f = { left: 0, top: 0, bottom: 0, right: 0, w: t.w, h: t.h }, u = !0, d;
  switch (a.shape) {
    case "customGeom":
      d = ks(a), Q(a, h, d.dom);
      break;
    case "flowChartProcess":
    case "rect":
      d = { dom: ge(a) };
      break;
    case "snip1Rect":
      d = { dom: Qe(a) };
      break;
    case "snip2SameRect":
      d = { dom: Ue(a) };
      break;
    case "snip2DiagRect":
      d = { dom: Ve(a) };
      break;
    case "snipRoundRect":
      d = { dom: qe(a) };
      break;
    case "roundRect":
      d = { dom: ze(a) };
      break;
    case "round1Rect":
      d = { dom: He(a) };
      break;
    case "round2SameRect":
      d = { dom: We(a) };
      break;
    case "round2DiagRect":
      d = { dom: Xe(a) };
      break;
    case "triangle":
      d = Ss(a);
      break;
    case "rtTriangle":
      d = js(a);
      break;
    case "ellipse":
      d = Cs(a);
      break;
    case "line": {
      const b = Ye(a);
      Q(a, h, b), u = !1, d = { dom: b, hasFill: !1 };
      break;
    }
    case "straightConnector1": {
      const b = Je(a);
      Q(a, h, b), u = !1, d = { dom: b, hasFill: !1 };
      break;
    }
    case "bentConnector3": {
      const b = Ke(a);
      Q(a, h, b), u = !1, d = { dom: b, hasFill: !1 };
      break;
    }
    case "curvedConnector3": {
      const b = Ne(a);
      Q(a, h, b), u = !1, d = { dom: b, hasFill: !1 };
      break;
    }
    case "parallelogram":
      d = Rs(a);
      break;
    case "trapezoid":
      d = Ts(a);
      break;
    case "diamond":
      d = vs(a);
      break;
    case "pentagon":
      d = Bs(a);
      break;
    case "hexagon":
      d = Is(a);
      break;
    case "heptagon":
      d = _s(a);
      break;
    case "octagon":
      d = Ds(a);
      break;
    case "decagon":
      d = Es(a);
      break;
    case "dodecagon":
      d = Os(a);
      break;
    case "pie":
      d = Fs(a);
      break;
    case "arc":
      d = Gs(a);
      break;
    case "bracketPair":
      d = Hs(a);
      break;
    case "bracePair":
      d = Ws(a);
      break;
    case "chord":
      d = Zs(a);
      break;
    case "teardrop":
      d = zs(a);
      break;
    case "frame":
      d = Xs(a);
      break;
    case "halfFrame":
      d = Qs(a);
      break;
    case "corner":
      d = Us(a);
      break;
    case "diagStripe":
      d = Vs(a);
      break;
    case "plus":
      d = qs(a);
      break;
    case "plaque":
      d = Ys(a);
      break;
    case "can":
      d = Js(a);
      break;
    case "cube":
      d = Ks(a);
      break;
    case "bevel":
      d = Ns(a);
      break;
    case "donut":
      d = tr(a);
      break;
    case "noSmoking":
      d = er(a);
      break;
    case "rightArrow":
      d = ts(a);
      break;
    case "leftArrow":
      d = es(a);
      break;
    case "upArrow":
      d = ss(a);
      break;
    case "downArrow":
      d = rs(a);
      break;
    case "leftRightArrow":
      d = as(a);
      break;
    case "upDownArrow":
      d = is(a);
      break;
    case "quadArrow":
      d = os(a);
      break;
    case "leftRightUpArrow":
      d = ns(a);
      break;
    case "bentArrow":
      d = cs(a);
      break;
    case "uturnArrow":
      d = ls(a);
      break;
    case "leftUpArrow":
      d = hs(a);
      break;
    case "bentUpArrow":
      d = ps(a);
      break;
    case "curvedRightArrow":
      d = ds(a);
      break;
    case "curvedLeftArrow":
      d = fs(a);
      break;
    case "curvedUpArrow":
      d = us(a);
      break;
    case "curvedDownArrow":
      d = $s(a);
      break;
    case "stripedRightArrow":
      d = ws(a);
      break;
    case "notchedRightArrow":
      d = ms(a);
      break;
    case "homePlate":
      d = bs(a);
      break;
    case "chevron":
      d = ys(a);
      break;
    case "blockArc":
      d = sr(a);
      break;
    case "foldedCorner":
      d = rr(a);
      break;
    case "rightArrowCallout":
      d = xs(a);
      break;
    case "leftArrowCallout":
      d = gs(a);
      break;
    case "upArrowCallout":
      d = Ls(a);
      break;
    case "downArrowCallout":
      d = As(a);
      break;
    case "leftRightArrowCallout":
      d = Ms(a);
      break;
    case "quadArrowCallout":
      d = Ps(a);
      break;
  }
  if (d && (p = d.dom, d.textArea && (f = d.textArea), d.hasFill === !1 && (u = !1)), p) {
    if (u)
      if (r && r.type === "blipFill")
        ir(a, h, p);
      else if (r && r.type === "gradFill")
        or(a, h, p);
      else {
        const L = P(r);
        p.setAttribute("fill", L || "transparent");
      }
    else
      p.setAttribute("fill", "transparent");
    e.width ? (p.setAttribute("stroke-width", e.width + ""), p.setAttribute("stroke", P(e.color) || "transparent")) : p.setAttribute("stroke-width", "0");
    const b = nr(e);
    if (b && p.setAttribute("stroke-dasharray", b), e.width) {
      let L = "square";
      switch (e.cap) {
        case "sq":
          L = "square";
          break;
        case "rnd":
          L = "round";
          break;
        case "flat":
          L = "butt";
          break;
        default:
          L = "square";
          break;
      }
      p.setAttribute("stroke-linecap", L);
    }
    const x = e.lineJoin || "round";
    p.setAttribute("stroke-linejoin", x), x === "miter" && e.miterLim && p.setAttribute("stroke-miterlimit", e.miterLim + ""), h.appendChild(p);
  }
  const w = [];
  o && w.push("scaleX(-1)"), n && w.push("scaleY(-1)"), w.length > 0 && (h.style.transform = w.join(" ")), l.appendChild(h);
  const g = { left: f.left, top: f.top, right: f.right || 0, bottom: f.bottom, w: f.w, h: f.h }, m = Ze(a.textBody, g, a.isTextBox);
  return m && l.appendChild(m), i && (l.style.transform = `rotate(${i}deg)`), l;
}
function cr(a) {
  const t = a.extend, s = a.offset, e = a.tr, r = a.tableGrid.gridCol, i = document.createElement("div");
  i.style.position = "absolute", i.style.left = s.x + "px", i.style.top = s.y + "px", i.style.width = t.w + "px", i.style.height = t.h + "px", i.style.overflow = "hidden";
  const o = document.createElement("table");
  return o.style.borderCollapse = "collapse", o.style.tableLayout = "fixed", o.style.width = "100%", e.forEach((n) => {
    const l = n.props.height, p = document.createElement("tr");
    p.style.height = l + "px", n.td.forEach((h, f) => {
      var T, C, _;
      const u = h.props, d = h.inheritTcStyle, w = h.inheritTcTxStyle, g = h.paragraphs;
      if (u.vMerge || u.hMerge) return;
      const m = document.createElement("td");
      let b = 0;
      const x = u.gridSpan || 1;
      for (let S = f; S < f + x && S < r.length; S++)
        b += ((T = r[S]) == null ? void 0 : T.width) || 0;
      m.style.width = (b || 30) + "px", m.style.wordBreak = "break-word", m.style.overflowWrap = "break-word", u.rowSpan && m.setAttribute("rowspan", u.rowSpan + ""), u.gridSpan && m.setAttribute("colspan", u.gridSpan + "");
      const L = u.background || (d == null ? void 0 : d.background);
      L && (m.style.background = P(L));
      const M = { ...d == null ? void 0 : d.border, ...u.border }, R = (S) => S ? S.toLowerCase().includes("dash") ? "dashed" : S.toLowerCase().includes("dot") ? "dotted" : "solid" : "solid";
      M.bottom && (m.style.borderBottom = `${M.bottom.width}px ${R(M.bottom.type)} ${P(M.bottom.color)}`), M.top && (m.style.borderTop = `${M.top.width}px ${R(M.top.type)} ${P(M.top.color)}`), M.left && (m.style.borderLeft = `${M.left.width}px ${R(M.left.type)} ${P(M.left.color)}`), M.right && (m.style.borderRight = `${M.right.width}px ${R(M.right.type)} ${P(M.right.color)}`), u.marT && (m.style.paddingTop = u.marT + "px"), u.marB && (m.style.paddingBottom = u.marB + "px"), u.marL && (m.style.paddingLeft = u.marL + "px"), u.marR && (m.style.paddingRight = u.marR + "px"), u.anchor === "ctr" ? m.style.verticalAlign = "middle" : u.anchor === "b" && (m.style.verticalAlign = "bottom");
      for (let S = 0; S < g.length; S++) {
        const I = g[S];
        w && (w.bold && ((C = I.rows) == null || C.forEach((v) => {
          v.props && !v.props.bold && (v.props.bold = !0);
        })), w.color && ((_ = I.rows) == null || _.forEach((v) => {
          v.props && !v.props.color && (v.props.color = w.color);
        })));
        const E = xe(I, S + 1, {
          isFirst: S === 0,
          isLast: S === g.length - 1,
          isTable: !0
        });
        m.appendChild(E);
      }
      p.appendChild(m);
    }), o.appendChild(p);
  }), i.appendChild(o), i;
}
function Le(a) {
  const t = document.createElement("div"), s = a.extend, e = a.offset;
  t.style.position = "absolute", t.style.left = e.x + "px", t.style.top = e.y + "px", t.style.width = s.w + "px", t.style.height = s.h + "px";
  const r = [];
  a.flipH && r.push("scaleX(-1)"), a.flipV && r.push("scaleY(-1)"), a.rotate && r.push(`rotate(${a.rotate}deg)`), t.style.transformOrigin = "center center", t.style.transform = r.join(" ");
  for (let i = 0; i < a.nodes.length; i++) {
    const o = a.nodes[i];
    let n;
    o instanceof rt ? n = pt(o) : o instanceof H ? n = dt(o) : o instanceof ht && (n = Le(o)), n && t.appendChild(n);
  }
  return t;
}
function lr(a) {
  const t = document.createElement("div"), s = a.extend, e = a.offset, r = a.flipV, i = a.flipH, o = a.rotate;
  t.className = "smart-chart-diagram", t.style.position = "absolute", t.style.left = e.x + "px", t.style.top = e.y + "px", t.style.width = s.w + "px", t.style.height = s.h + "px";
  const n = [];
  i && n.push("scaleX(-1)"), r && n.push("scaleY(-1)"), o && n.push(`rotate(${o}deg)`), t.style.transformOrigin = "center center", t.style.transform = n.join(" ");
  for (let l = 0; l < a.nodes.length; l++) {
    const p = a.nodes[l];
    let h;
    p instanceof rt ? h = pt(p) : p instanceof H && (h = dt(p)), h && t.appendChild(h);
  }
  return t;
}
function hr(a) {
  const t = document.createElement("div"), s = a.extend, e = a.offset;
  if (t.style.position = "absolute", t.style.left = e.x + "px", t.style.top = e.y + "px", t.style.width = s.w + "px", t.style.height = s.h + "px", a.options && a.options.series && a.options.series.length > 0)
    try {
      ke.init(t).setOption(a.options);
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
    const r = [...t.nodes].filter((i) => i.userDrawn);
    r.sort((i, o) => i.order > o.order ? 1 : -1);
    for (const i of r) {
      const o = this._renderNode(i);
      o && e.append(o);
    }
    s.append(e);
  }
  _renderSlideLayout(t, s) {
    const e = document.createElement("div");
    e.classList.add("slide-layout-wrapper"), e.style.setProperty("position", "absolute"), e.style.setProperty("left", "0"), e.style.setProperty("top", "0"), e.style.setProperty("width", this.pptx.width + "px"), e.style.setProperty("height", this.pptx.height + "px"), e.style.setProperty("transform", `scale(${this.scale})`), e.style.setProperty("transform-origin", "0 0");
    const r = [...t.nodes].filter((i) => i.userDrawn);
    r.sort((i, o) => i.order > o.order ? 1 : -1);
    for (const i of r) {
      const o = this._renderNode(i);
      o && e.append(o);
    }
    s.append(e);
  }
  _renderSlide(t, s) {
    const e = document.createElement("div");
    e.classList.add("slide-wrapper"), e.style.setProperty("position", "absolute"), e.style.setProperty("left", "0"), e.style.setProperty("top", "0"), e.style.setProperty("width", this.pptx.width + "px"), e.style.setProperty("height", this.pptx.height + "px"), e.style.setProperty("transform", `scale(${this.scale})`), e.style.setProperty("transform-origin", "0 0");
    const r = [...t.nodes];
    r.sort((i, o) => i.order > o.order ? 1 : -1);
    for (const i of r) {
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
    let r = t.background;
    if (r.type === "none" && (r = t.slideLayout.background), r.type === "none" && (r = t.slideMaster.background), r.type === "blipFill") {
      const { base64: o, alpha: n, fillRect: l = {} } = r, { b: p = 0, t: h = 0, l: f = 0, r: u = 0 } = l, d = this.renderPort.width * f, w = this.renderPort.height * h, g = this.renderPort.width * (1 - f - u), m = this.renderPort.height * (1 - h - p);
      e.style.backgroundImage = `url(${o})`, e.style.backgroundSize = `${g} ${m}`, e.style.backgroundPosition = `${d}px ${w}px`, n && (e.style.opacity = n + ""), e.style.backgroundRepeat = "no-repeat";
    } else if (r.type === "solidFill") {
      const o = P(t.background) || P(t.slideLayout.background) || P(t.slideMaster.background);
      o ? e.style.setProperty("background", o) : e.style.setProperty("background", "#fff");
    } else if (r.type === "gradFill")
      if (r.path === "circle") {
        const o = r.tileRect || {}, { b: n, t: l, l: p, r: h } = o;
        let f = "radial-gradient(circle at ";
        h === -1 ? f += " right" : p === -1 && (f += " left"), l === -1 ? f += " top" : n === -1 && (f += " bottom"), !n && !l && !p && !h && (f += " center"), f += ",", f += r.gsList.map((u) => `${P(u.color)} ${100 * u.pos + "%"}`).join(","), e.style.setProperty("background", f);
      } else {
        let n = `linear-gradient(${(((i = r.lin) == null ? void 0 : i.ang) || 0) + 90}deg,`;
        n += r.gsList.map((l) => `${P(l.color)} ${100 * l.pos + "%"}`).join(","), e.style.setProperty("background", n);
      }
    s.append(e);
  }
}
const z = {};
function N(a, t) {
  if (z[a])
    for (let s = 0; s < z[a].length; s++)
      z[a][s](t);
}
function lt(a, t) {
  z ? z[a] && (z[a] = z[a].filter((s) => s !== t)) : z[a] = [];
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
      const r = this.pptx = new ce();
      r.load(t).then(() => {
        try {
          const i = this.htmlRender = new ue(this.wrapper, r, {
            viewPort: { width: this.options.width, height: this.options.height || 0 },
            mode: this.options.mode
          });
          if (this.options.mode === "slide") {
            const o = this.renderNextButton();
            o.onclick = () => this.renderNextSlide(), this.wrapper.append(o);
            const n = this.renderPreButton();
            n.onclick = () => this.renderPreSlide(), this.wrapper.append(n), this.renderPagination(this.wrapper), this._addPre(this.wrapper), this.currentIndex = 0, i.renderSlide(0);
          } else
            for (let o = 0; o < r.slides.length; o++)
              i.renderSlide(o);
          s(r);
        } catch (i) {
          e(i);
        }
      }).catch((i) => e(i));
    });
  }
  load(t) {
    return N("destroy"), lt("destroy"), new Promise((s, e) => {
      this.wrapper.innerHTML = "";
      const r = this.pptx = new ce();
      r.load(t).then(() => {
        try {
          this.htmlRender = new ue(this.wrapper, r, {
            viewPort: { width: this.options.width, height: this.options.height || 0 },
            mode: this.options.mode
          }), s(r);
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
function $r(a, t) {
  return new pr(a, t);
}
export {
  pr as PPTXPreviewer,
  $r as init
};
