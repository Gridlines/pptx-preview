import ke from "jszip";
import { get as c, omit as Ce } from "lodash";
import { v4 as ve } from "uuid";
import * as je from "echarts";
var st = 1;
function B(i) {
  const p = `\r
	>/= `;
  let h = 0;
  return st = 1, be(
    function f() {
      const m = [];
      for (; i[h]; ) {
        if (i.charCodeAt(h) === 60) {
          if (i.charCodeAt(h + 1) === 47)
            return h = i.indexOf(">", h), m;
          if (i.charCodeAt(h + 1) === 33) {
            if (i.charCodeAt(h + 2) === 45) {
              for (; i.charCodeAt(h) !== 62 || i.charCodeAt(h - 1) !== 45 || i.charCodeAt(h - 2) !== 45 || h === -1; )
                h = i.indexOf(">", h + 1);
              h === -1 && (h = i.length);
            } else
              for (h += 2; i.charCodeAt(h) !== 62; h++) ;
            h++;
            continue;
          }
          if (i.charCodeAt(h + 1) === 63) {
            h = i.indexOf(">", h), h++;
            continue;
          }
          let u = ++h;
          for (; p.indexOf(i[h]) === -1; ) h++;
          const d = i.slice(u, h);
          let g = !1, y = {};
          for (; i.charCodeAt(h) !== 62; ) {
            const w = i.charCodeAt(h);
            if (w > 64 && w < 91 || w > 96 && w < 123) {
              for (u = h; p.indexOf(i[h]) === -1; ) h++;
              const L = i.slice(u, h);
              let P = i.charCodeAt(h);
              for (; P !== 39 && P !== 34; )
                h++, P = i.charCodeAt(h);
              const k = i[h], M = ++h;
              h = i.indexOf(k, M);
              const v = i.slice(M, h);
              g || (y = {}, g = !0), y[L] = v;
            }
            h++;
          }
          let b = [];
          i.charCodeAt(h - 1) !== 47 && (h++, b = f()), m.push({ children: b, tagName: d, attrs: y });
        } else {
          const u = h;
          h = i.indexOf("<", h) - 1, h === -2 && (h = i.length);
          const d = i.slice(u, h + 1);
          d.length > 0 && m.push(d);
        }
        h++;
      }
      return m;
    }()
  );
}
function be(i) {
  const t = {};
  if (i === void 0) return {};
  if (i.length === 1 && typeof i[0] == "string") return i[0];
  i.forEach((s) => {
    if (t[s.tagName] || (t[s.tagName] = []), typeof s == "object") {
      const e = be(s.children);
      typeof e == "object" && (s.attrs && (e.attrs = s.attrs), e.attrs === void 0 ? e.attrs = { order: st } : e.attrs.order = st), st++, t[s.tagName].push(e);
    }
  });
  for (const s in t)
    t[s].length === 1 && (t[s] = t[s][0]);
  return t;
}
function X(i) {
  return Math.abs(i) > 2e4 ? "emu" : "point";
}
function C(i) {
  return i / 12700;
}
function z(i) {
  return i / 20;
}
function it(i) {
  return i / 6e4;
}
function Z(i) {
  return i / 1e5;
}
function ot(i) {
  const t = Math.ceil(i / 26), s = (i % 26 || 26) - 1 + 65;
  return String.fromCharCode(s).repeat(t);
}
const Re = [
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
], Te = [
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
function Ie(i) {
  let t;
  const s = Re.indexOf(i);
  return s !== -1 && (t = Te[s]), `#${t || "000000"}`;
}
function R(i, t, s) {
  const e = { type: "solidFill" };
  if (i["a:srgbClr"])
    e.color = "#" + i["a:srgbClr"].attrs.val;
  else if (i["a:schemeClr"]) {
    let h = i["a:schemeClr"].attrs.val;
    s && (h = s.getColorThemeName(h)), e.color = t.getColor(h);
  } else if (i["a:sysClr"])
    e.color = "#" + i["a:sysClr"].attrs.lastClr;
  else if (i["a:prstClr"]) {
    const h = c(i["a:prstClr"], ["attrs", "val"]);
    e.color = Ie(h);
  }
  const r = i["a:srgbClr"] || i["a:schemeClr"] || i["a:sysClr"], a = c(r, ["a:alpha", "attrs", "val"], 1e5);
  e.alpha = a / 1e5;
  const n = c(r, ["a:shade", "attrs", "val"]);
  n && (e.shade = n / 1e5);
  const o = c(r, ["a:lumMod", "attrs", "val"]);
  o && (e.lumMod = o / 1e5);
  const l = c(r, ["a:lumOff", "attrs", "val"]);
  l && (e.lumOff = l / 1e5);
  const p = c(r, ["a:tint", "attrs", "val"]);
  return p && (e.tint = p / 1e5), e;
}
function Q(i, t, s) {
  var o;
  const e = { type: "blipFill" }, r = c(i, ["a:blip", "attrs", "r:embed"]);
  if (r) {
    const l = (o = s.rels[r]) == null ? void 0 : o.target;
    l && (e.base64 = t.getMedia(l));
  }
  const a = c(i, ["a:blip", "a:alphaModFix", "attrs", "amt"]);
  a && (e.alpha = a / 1e5);
  const n = c(i, ["a:stretch", "a:fillRect", "attrs"]);
  return n && (e.fillRect = {}, n.b && (e.fillRect.b = n.b / 1e5), n.t && (e.fillRect.t = n.t / 1e5), n.r && (e.fillRect.r = n.r / 1e5), n.l && (e.fillRect.l = n.l / 1e5)), e;
}
function q(i, t, s) {
  const e = {
    type: "gradFill",
    tileRect: {},
    lin: {},
    gsList: []
  };
  e.flip = i.attrs.flip, e.path = c(i, ["a:path", "attrs", "path"]) || "linear", e.rotWithShape = i.attrs.rotWithShape === "1", c(i, ["a:lin", "attrs", "ang"]) && (e.lin.ang = it(i["a:lin"].attrs.ang)), c(i, ["a:lin", "attrs", "scaled"]) && (e.lin.scaled = i["a:lin"].attrs.scaled === "1");
  const r = c(i, ["a:gsLst", "a:gs"]) || [];
  return e.gsList = r.map((a) => ({
    color: R(a, t, s),
    pos: Z(a.attrs.pos)
  })), c(i, ["a:tileRect", "attrs", "l"]) && (e.tileRect.l = Z(i["a:tileRect"].attrs.l)), c(i, ["a:tileRect", "attrs", "t"]) && (e.tileRect.t = Z(i["a:tileRect"].attrs.t)), c(i, ["a:tileRect", "attrs", "r"]) && (e.tileRect.r = Z(i["a:tileRect"].attrs.r)), c(i, ["a:tileRect", "attrs", "b"]) && (e.tileRect.b = Z(i["a:tileRect"].attrs.b)), e;
}
function nt(i) {
  return i <= 0.04045 ? i / 12.92 : Math.pow((i + 0.055) / 1.055, 2.4);
}
function ct(i) {
  return i < 31308e-7 ? 12.92 * i : 1.055 * Math.pow(i, 1 / 2.4) - 0.055;
}
function ce(i, t) {
  const s = nt(i[0] / 255) * t, e = nt(i[1] / 255) * t, r = nt(i[2] / 255) * t;
  return [
    Math.round(255 * ct(s)),
    Math.round(255 * ct(e)),
    Math.round(255 * ct(r))
  ];
}
function lt(i, t, s) {
  const e = i / 255, r = t / 255, a = s / 255, n = Math.max(e, r, a), o = Math.min(e, r, a), l = n - o;
  let p = 0;
  const h = (n + o) / 2;
  return l === 0 ? p = 0 : n === e ? p = (r - a) / l % 6 : n === r ? p = (a - e) / l + 2 : n === a && (p = (e - r) / l + 4), p = Math.round(60 * p), p < 0 && (p += 360), {
    h: p,
    s: l === 0 || h === 0 || h === 1 ? 0 : l / (1 - Math.abs(2 * h - 1)),
    l: h
  };
}
function ht(i, t, s) {
  const e = (1 - Math.abs(2 * s - 1)) * t, r = e * (1 - Math.abs(i / 60 % 2 - 1)), a = s - e / 2;
  let n, o, l;
  return i < 60 ? (n = e, o = r, l = 0) : i < 120 ? (n = r, o = e, l = 0) : i < 180 ? (n = 0, o = e, l = r) : i < 240 ? (n = 0, o = r, l = e) : i < 300 ? (n = r, o = 0, l = e) : (n = e, o = 0, l = r), [
    Math.round(255 * (n + a)),
    Math.round(255 * (o + a)),
    Math.round(255 * (l + a))
  ];
}
function S(i, t) {
  if (!i || i.type === "none") return "";
  if (i.type === "solidFill" && /^#[\da-fA-F]{3,6}$/.test(i.color)) {
    let s = parseInt(i.color.substr(1, 2), 16), e = parseInt(i.color.substr(3, 2), 16), r = parseInt(i.color.substr(5, 2), 16);
    if (i.shade) {
      const n = ce([s, e, r], i.shade);
      s = n[0], e = n[1], r = n[2];
    }
    if (i.lumMod) {
      const n = lt(s, e, r);
      let o = n.l * i.lumMod;
      o >= 1 && (o = 1);
      const l = ht(n.h, n.s, o);
      s = l[0], e = l[1], r = l[2];
    }
    if (i.lumOff) {
      const n = lt(s, e, r);
      let o = i.lumOff + n.l;
      o > 1 && (o = 1);
      const l = ht(n.h, n.s, o);
      s = l[0], e = l[1], r = l[2];
    }
    if (i.tint || t != null && t.light) {
      const n = lt(s, e, r);
      let o = i.tint || (t == null ? void 0 : t.light);
      o >= 1 && (o = 1);
      const l = ht(n.h, n.s, n.l * o + (1 - o));
      s = l[0], e = l[1], r = l[2];
    }
    if (t != null && t.dark) {
      const n = ce([s, e, r], t.dark);
      s = n[0], e = n[1], r = n[2];
    }
    const a = i.alpha;
    return `rgba(${s},${e},${r},${a})`;
  }
  return "";
}
class Y {
  get theme() {
    return (this.ctx.sliderMaster || this.ctx).theme;
  }
  constructor(t, s, e) {
    var a, n;
    this.uuid = ve(), this.offset = { x: 0, y: 0 }, this.extend = { w: 0, h: 0 }, this.rotate = 0, this.order = 0, this.flipV = !1, this.flipH = !1, this.source = t, this.ctx = s, this.group = e;
    const r = c(t, ["p:nvSpPr", "p:nvPr"]);
    if (r) {
      const o = c(r, "p:ph");
      o && o.attrs && (this.idx = o.attrs.idx, this.type = o.attrs.type), c(r, ["attrs", "userDrawn"]) && (this.userDrawn = c(r, ["attrs", "userDrawn"]) === "1");
    }
    if (this.order = c(t, "attrs.order", 0), this.source["p:spPr"]) {
      const o = this.getXfrm();
      if (o) {
        const l = this.group && ((a = this.ctx.pptx) != null && a.wps || X(parseInt(o["a:off"].attrs.x)) === "point") ? z : C;
        this.offset = {
          x: Math.round(l(parseInt(o["a:off"].attrs.x))),
          y: Math.round(l(parseInt(o["a:off"].attrs.y)))
        }, this.extend = {
          w: Math.round(l(parseInt(o["a:ext"].attrs.cx))),
          h: Math.round(l(parseInt(o["a:ext"].attrs.cy || "0")))
        }, this.rotate = it(parseInt(c(o, "attrs.rot", 0))), this.flipV = c(o, "attrs.flipV") === "1", this.flipH = c(o, "attrs.flipH") === "1";
      }
    } else if (this.source["p:xfrm"]) {
      const o = this.source["p:xfrm"], l = this.group && ((n = this.ctx.pptx) != null && n.wps || X(parseInt(o["a:off"].attrs.x)) === "point") ? z : C;
      this.offset = {
        x: Math.round(l(parseInt(o["a:off"].attrs.x))),
        y: Math.round(l(parseInt(o["a:off"].attrs.y)))
      }, this.extend = {
        w: Math.round(l(parseInt(o["a:ext"].attrs.cx))),
        h: Math.round(l(parseInt(o["a:ext"].attrs.cy)))
      };
    }
    if (e) {
      const o = e.extend, l = e.chExtend, p = e.chOffset, h = l.w === 0 ? 0 : o.w / l.w, f = l.h === 0 ? 0 : o.h / l.h;
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
class Be {
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
          this.props[e] = C(parseInt(t[e]));
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
        const a = c(s[e], ["a:defRPr"]);
        t[r].defRPr = this._formatRPr(a);
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
    let a = c(t, ["a:r"]) || [];
    Array.isArray(a) || (a = [a]);
    let n = c(t, ["a:fld"]) || [];
    Array.isArray(n) || (n = [n]), a = a.concat(
      n.filter((l) => l).map((l) => ({ ...l, _fieldType: c(l, ["attrs", "type"]) }))
    );
    let o = c(t, ["a:br"]) || [];
    return Array.isArray(o) || (o = [o]), a = a.concat(
      o.map((l) => ({ isBr: !0, ...l }))
    ), a.sort((l, p) => c(l, ["attrs", "order"]) - c(p, ["attrs", "order"])), s.rows = a.map((l) => this._parseRow(l)), s.inheritProps = this._getInheritPProps(s.props.level), s.inheritRProps = this._getInheritRProps(s.props.level), s;
  }
  _getInheritPProps(t = "0") {
    let s;
    const e = {}, r = this.node.ctx, a = this.node.type, n = this.node.idx, o = `lvl${t ? +t + 1 : 1}`;
    switch (r.slideType) {
      case "slideMaster":
        this.node.isTextBox ? Object.assign(e, c(r.defaultTextStyle, [o, "props"]) || {}) : Object.assign(e, c(r, ["textStyles", "otherStyle", o, "props"]) || {});
        break;
      case "slideLayout":
        this.node.isTextBox ? Object.assign(e, c(r.slideMaster.defaultTextStyle, [o, "props"]) || {}) : Object.assign(e, c(r.slideMaster, ["textStyles", "otherStyle", o, "props"]) || {}), (a || n) && (s = a ? r.slideMaster.getNodeByType(a) : r.slideMaster.getNodeByIdx(n), s && Object.assign(e, c(s, ["textBody", "lstStyle", o, "props"]) || {}));
        break;
      case "slide":
        this.node.isTextBox ? Object.assign(e, c(r.slideLayout.slideMaster.defaultTextStyle, [o, "props"]) || {}) : Object.assign(e, c(r.slideLayout.slideMaster, ["textStyles", "otherStyle", o, "props"]) || {}), (a || n) && (["subTitle", "ctrTitle", "title"].includes(a) && Object.assign(e, c(r.slideLayout.slideMaster, ["textStyles", "titleStyle", o, "props"]) || {}), s = a ? r.slideLayout.slideMaster.getNodeByType(a) : r.slideLayout.slideMaster.getNodeByIdx(n), s && Object.assign(e, c(s, ["textBody", "lstStyle", o, "props"]) || {}), s = a ? r.slideLayout.getNodeByType(a) : r.slideLayout.getNodeByIdx(n), s && Object.assign(e, c(s, ["textBody", "lstStyle", o, "props"]) || {}));
        break;
    }
    return c(this.lstStyle, [o, "props"]) && Object.assign(e, c(this.lstStyle, [o, "props"])), e;
  }
  _getInheritRProps(t = "0") {
    let s, e = {};
    const r = this.node.ctx, a = this.node.type, n = this.node.idx, o = `lvl${t ? +t + 1 : 1}`;
    switch (r.slideType) {
      case "slideMaster":
        this.node.isTextBox ? Object.assign(e, c(r.defaultTextStyle, [o, "defRPr"]) || {}) : Object.assign(e, c(r, ["textStyles", "otherStyle", o, "defRPr"]) || {});
        break;
      case "slideLayout":
        this.node.isTextBox ? Object.assign(e, c(r.slideMaster.defaultTextStyle, [o, "defRPr"]) || {}) : Object.assign(e, c(r.slideMaster, ["textStyles", "otherStyle", o, "defRPr"]) || {}), (a || n) && (s = a ? r.slideMaster.getNodeByType(a) : r.slideMaster.getNodeByIdx(n), s && (e = c(s, ["textBody", "lstStyle", o, "defRPr"]) || {}));
        break;
      case "slide":
        this.node.isTextBox ? Object.assign(e, c(r.slideLayout.slideMaster.defaultTextStyle, [o, "defRPr"]) || {}) : Object.assign(e, c(r.slideLayout.slideMaster, ["textStyles", "otherStyle", o, "defRPr"]) || {}), (a || n) && (["subTitle", "ctrTitle", "title"].includes(a) && Object.assign(e, c(r.slideLayout.slideMaster, ["textStyles", "titleStyle", o, "defRPr"]) || {}), s = a ? r.slideLayout.slideMaster.getNodeByType(a) : r.slideLayout.slideMaster.getNodeByIdx(n), s && Object.assign(e, c(s, ["textBody", "lstStyle", o, "defRPr"]) || {}), s = a ? r.slideLayout.getNodeByType(a) : r.slideLayout.getNodeByIdx(n), s && Object.assign(e, c(s, ["textBody", "lstStyle", o, "defRPr"]) || {}));
        break;
    }
    const l = c(this.node.source, ["p:style", "a:fontRef"]);
    return c(l, "a:schemeClr") && (e.color = R(l, this.node.theme, this.node)), c(this.lstStyle, [o, "defRPr"]) && Object.assign(e, c(this.lstStyle, [o, "defRPr"])), e;
  }
  _formatPPr(t) {
    const s = {}, e = c(t, "attrs") || {};
    return Object.keys(e).forEach((r) => {
      switch (r) {
        case "algn":
          s.align = e[r];
          break;
        case "marL":
          s.marginLeft = C(parseInt(e[r]));
          break;
        case "indent":
          s.indent = C(parseInt(e[r]));
          break;
        case "lvl":
          s.level = e[r];
          break;
      }
    }), c(t, ["a:lnSpc", "a:spcPct", "attrs", "val"]) && (s.lineHeight = parseInt(t["a:lnSpc"]["a:spcPct"].attrs.val) / 1e5), c(t, ["a:lnSpc", "a:spcPts", "attrs", "val"]) && (s.lineHeightPts = parseInt(t["a:lnSpc"]["a:spcPts"].attrs.val) / 100), c(t, ["a:buAutoNum", "attrs", "type"]) && (s.buAutoNum = t["a:buAutoNum"].attrs.type), c(t, ["a:buChar", "attrs", "char"]) && (s.buChar = t["a:buChar"].attrs.char), c(t, ["a:buFont", "attrs", "typeface"]) && (s.buFont = t["a:buFont"].attrs.typeface), c(t, ["a:buSzPct", "attrs", "val"]) && (s.buSzPct = parseInt(t["a:buSzPct"].attrs.val) / 1e5), c(t, ["a:buSzPts", "attrs", "val"]) && (s.buSzPts = parseInt(t["a:buSzPts"].attrs.val) / 100), c(t, ["a:buSzTx"]) && (s.buSzTx = !0), c(t, ["a:buNone"]) && (s.buNone = !0), c(t, ["a:spcBef", "a:spcPts", "attrs", "val"]) && (s.spaceBefore = parseInt(t["a:spcBef"]["a:spcPts"].attrs.val) / 100), c(t, ["a:spcBef", "a:spcPct", "attrs", "val"]) && (s.spaceBeforePct = parseInt(t["a:spcBef"]["a:spcPct"].attrs.val) / 1e5), c(t, ["a:spcAft", "a:spcPts", "attrs", "val"]) && (s.spaceAfter = parseInt(t["a:spcAft"]["a:spcPts"].attrs.val) / 100), c(t, ["a:spcAft", "a:spcPct", "attrs", "val"]) && (s.spaceAfterPct = parseInt(t["a:spcAft"]["a:spcPct"].attrs.val) / 1e5), c(t, ["a:defRPr"]) && (s.defRPr = this._formatRPr(c(t, ["a:defRPr"]))), s;
  }
  _parseRow(t) {
    if (t.isBr) return { isBr: !0 };
    const s = { props: {}, text: "" }, e = c(t, ["a:rPr"]) || {};
    return s.props = this._formatRPr(e), s.text = c(t, "a:t") || "", t._fieldType && (s.fieldType = t._fieldType), s;
  }
  _formatRPr(t) {
    const s = {}, e = c(t, "attrs") || {};
    Object.keys(e).forEach((n) => {
      switch (n) {
        case "sz":
          s.size = parseInt(e[n]) / 100;
          break;
        case "b":
          s.bold = e[n] === "1";
          break;
        case "i":
          s.italic = e[n] === "1";
          break;
        case "u":
          s.underline = e[n];
          break;
        case "strike":
          s.strike = e[n];
          break;
        case "order":
        case "dirty":
          break;
        default:
          s[n] = e[n];
      }
    });
    const r = c(t, "a:solidFill");
    r && (s.color = R(r, this.node.theme, this.node));
    const a = c(t, "a:highlight");
    return a && (s.background = R(a, this.node.theme, this.node)), s.typeface = c(t, ["a:ea", "attrs", "typeface"]), s;
  }
}
function V(i, t, s) {
  const e = {};
  if (c(i, "a:noFill")) return e;
  c(i, "attrs.w") && (e.width = C(parseInt(c(i, "attrs.w"))));
  const r = c(i, "a:solidFill");
  r && (e.color = R(r, t, s));
  const a = c(i, "a:prstDash");
  if (a && (e.type = a.attrs.val), c(i, ["a:miter"]) && (e.lineJoin = "miter"), c(i, ["a:bevel"]) && (e.lineJoin = "bevel"), c(i, ["a:round"]) && (e.lineJoin = "round"), c(i, ["a:miter", "attrs", "lim"]) && (e.miterLim = C(parseInt(c(i, ["a:miter", "attrs", "lim"])))), c(i, ["a:headEnd"])) {
    const n = c(i, ["a:headEnd", "attrs"]);
    e.headEnd = { type: n.type, len: n.len, w: n.w };
  }
  if (c(i, ["a:tailEnd"])) {
    const n = c(i, ["a:tailEnd", "attrs"]);
    e.tailEnd = { type: n.type, len: n.len, w: n.w };
  }
  return e;
}
const rt = class rt extends Y {
  constructor(t, s, e, r) {
    super(t, e, r), this.border = {}, this.prstGeom = {}, this.isTextBox = !1, this.pptx = s, this._parseShape(), this._parIsTextBox(), this._parsePrstGeom(), this._parseBackground(), this._parseBorder(), this._parseTxt();
  }
  _parseShape() {
    if (this.shape = c(this.source, ["p:spPr", "a:prstGeom", "attrs", "prst"]), !this.shape && c(this.source, ["p:spPr", "a:custGeom"])) {
      this.shape = "customGeom";
      const t = c(this.source, ["p:spPr", "a:custGeom", "a:pathLst", "a:path"]);
      let s = [];
      const e = (r) => {
        let a;
        switch (r) {
          case "a:moveTo":
          case "a:cubicBezTo":
          case "a:lnTo":
            a = Array.isArray(t[r]) ? t[r] : [t[r]], s = s.concat(
              a.map((n) => ({
                order: n.attrs.order,
                type: r.split(":")[1],
                points: (Array.isArray(n["a:pt"]) ? n["a:pt"] : [n["a:pt"]]).map(
                  (o) => [
                    C(parseInt(c(o, ["attrs", "x"]))),
                    C(parseInt(c(o, ["attrs", "y"])))
                  ]
                )
              }))
            );
            break;
          case "a:close":
            a = Array.isArray(t[r]) ? t[r] : [t[r]], s = s.concat(
              a.map((n) => ({
                order: n.attrs.order,
                type: r.split(":")[1]
              }))
            );
            break;
        }
      };
      for (const r in t) e(r);
      s.sort((r, a) => r.order - a.order), this.prstGeom.pathList = s, c(t, ["attrs", "w"]) && (this.prstGeom.w = C(parseInt(c(t, ["attrs", "w"])))), c(t, ["attrs", "h"]) && (this.prstGeom.h = C(parseInt(c(t, ["attrs", "h"]))));
    }
  }
  _parIsTextBox() {
    this.isTextBox = c(this.source, ["p:nvSpPr", "p:cNvSpPr", "attrs", "txBox"]) === "1";
  }
  _parsePrstGeom() {
    const t = c(this.source, ["p:spPr", "a:prstGeom"]);
    let s = c(t, ["a:avLst", "a:gd"]);
    s && (Array.isArray(s) || (s = [s]), this.prstGeom.gd = s.map((e) => {
      const r = ["pie", "chord", "arc"].includes(this.shape) || ["blockArc"].includes(this.shape) && ["adj1", "adj2"].includes(e.attrs.name) ? it(parseInt(e.attrs.fmla.split(" ")[1])) : Z(parseInt(e.attrs.fmla.split(" ")[1]));
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
      this.background = R(t, this.theme, this);
      return;
    }
    const s = c(this.source, ["p:spPr", "a:gradFill"]);
    if (s) {
      this.background = q(s, this.theme, this);
      return;
    }
    const e = c(this.source, ["p:spPr", "a:blipFill"]);
    if (e) {
      this.background = Q(e, this.pptx, this.ctx);
      return;
    }
    const r = c(this.source, ["p:style", "a:fillRef"]);
    r && (this.background = R(r, this.theme, this));
  }
  _parseBorder() {
    const t = c(this.source, ["p:style", "a:lnRef"]);
    if (t) {
      const e = parseInt(t.attrs.idx), r = this.theme.getLineStyle(e);
      this.border = { ...r, ...this.border }, (!this.border.color || !this.border.color.color) && (this.border.color = R(t, this.theme, this));
    }
    const s = c(this.source, ["p:spPr", "a:ln"]);
    s && (c(s, "a:noFill") ? this.border = {} : Object.assign(this.border, V(s, this.theme, this))), this.border.color && this.border.color.color && !this.border.width && (this.border.width = rt.defaultBorderWidth);
  }
  _parseTxt() {
    this.textBody = new Be(c(this.source, ["p:txBody"]), this);
  }
};
rt.defaultBorderWidth = 0.75;
let W = rt;
class at extends Y {
  get base64() {
    return this.pptx.getMedia(this.path);
  }
  constructor(t, s, e, r, a) {
    var p, h;
    super(s, r, a), this.userDrawn = !0, this.pptx = e, this.path = t;
    const n = c(this.source, ["p:blipFill", "a:srcRect"]);
    n && (this.clip = {}, n.attrs.b && (this.clip.b = parseInt(n.attrs.b) / 1e5), n.attrs.t && (this.clip.t = parseInt(n.attrs.t) / 1e5), n.attrs.l && (this.clip.l = parseInt(n.attrs.l) / 1e5), n.attrs.r && (this.clip.r = parseInt(n.attrs.r) / 1e5));
    const o = c(s, ["p:nvPicPr", "p:nvPr", "a:audioFile", "attrs", "r:link"]);
    if (o) {
      const f = (p = this.ctx.rels[o]) == null ? void 0 : p.target;
      this.audioFile = this.pptx.getMedia(f);
    }
    const l = c(s, ["p:nvPicPr", "p:nvPr", "a:videoFile", "attrs", "r:link"]);
    if (l) {
      const f = (h = this.ctx.rels[l]) == null ? void 0 : h.target;
      this.videoFile = this.pptx.getMedia(f);
    }
  }
}
class dt extends Y {
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
        this.tableGrid.gridCol.push({ width: C(parseInt(e)) });
      }
  }
  _parseTr() {
    const t = [];
    let s = c(this.source, ["a:graphic", "a:graphicData", "a:tbl", "a:tr"]);
    Array.isArray(s) || (s = [s]);
    for (let e = 0; e < s.length; e++) {
      const r = { props: {}, td: [] }, a = s[e];
      r.props.height = C(parseInt(c(a, ["attrs", "h"])));
      let n = c(a, ["a:tc"]);
      Array.isArray(n) || (n = [n]);
      for (let o = 0; o < n.length; o++)
        r.td.push(this._parseTd(n[o]));
      t.push(r);
    }
    this.tr = t;
  }
  _parseTd(t) {
    var l, p, h, f;
    const s = { props: { border: {} }, paragraphs: [] }, e = c(t, ["a:tcPr", "attrs"]);
    e != null && e.marB && (s.props.marB = C(parseInt(e.marB))), e != null && e.marT && (s.props.marT = C(parseInt(e.marT))), e != null && e.marL && (s.props.marL = C(parseInt(e.marL))), e != null && e.marR && (s.props.marR = C(parseInt(e.marR))), e != null && e.anchor && (s.props.anchor = e.anchor);
    const r = c(t, ["a:tcPr"]);
    c(r, ["a:lnR"]) && (s.props.border.right = V(c(r, ["a:lnR"]), this.theme, this.ctx)), c(r, ["a:lnL"]) && (s.props.border.left = V(c(r, ["a:lnL"]), this.theme, this.ctx)), c(r, ["a:lnT"]) && (s.props.border.top = V(c(r, ["a:lnT"]), this.theme, this.ctx)), c(r, ["a:lnB"]) && (s.props.border.bottom = V(c(r, ["a:lnB"]), this.theme, this.ctx)), (l = t == null ? void 0 : t.attrs) != null && l.rowSpan && (s.props.rowSpan = parseInt(t.attrs.rowSpan)), (p = t == null ? void 0 : t.attrs) != null && p.gridSpan && (s.props.gridSpan = parseInt(t.attrs.gridSpan)), (h = t == null ? void 0 : t.attrs) != null && h.vMerge && (s.props.vMerge = t.attrs.vMerge === "1"), (f = t == null ? void 0 : t.attrs) != null && f.hMerge && (s.props.hMerge = t.attrs.hMerge === "1");
    const a = c(t, ["a:tcPr", "a:solidFill"]);
    a && (s.props.background = R(a, this.theme, this.ctx)), c(t, ["a:tcPr", "a:noFill"]) !== void 0 && (s.props.noFill = !0);
    const n = c(t, ["a:txBody"]);
    let o = c(n, ["a:p"]);
    return Array.isArray(o) || (o = [o]), s.paragraphs = o.map((m) => this._parseParagraph(m)), s;
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
    let a = c(t, ["a:r"]) || [];
    Array.isArray(a) || (a = [a]);
    let n = c(t, ["a:br"]) || [];
    return Array.isArray(n) || (n = [n]), a = a.concat(n.map((o) => ({ isBr: !0, ...o }))), a.sort((o, l) => c(o, ["attrs", "order"]) - c(l, ["attrs", "order"])), s.rows = a.map((o) => this._parseRow(o)), s;
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
    Object.keys(e).forEach((n) => {
      switch (n) {
        case "sz":
          s.size = parseInt(e[n]) / 100;
          break;
        case "b":
          s.bold = e[n] === "1";
          break;
        case "i":
          s.italic = e[n] === "1";
          break;
        case "u":
          s.underline = e[n];
          break;
        case "strike":
          s.strike = e[n];
          break;
        case "order":
        case "dirty":
          break;
        default:
          s[n] = e[n];
      }
    });
    const r = c(t, "a:solidFill");
    r && (s.color = R(r, this.theme, this.ctx));
    const a = c(t, "a:highlight");
    return a && (s.background = R(a, this.theme, this.ctx)), s.typeface = c(t, ["a:ea", "attrs", "typeface"]), s;
  }
  _isLastCol(t, s) {
    var e, r;
    if (s === t.length - 1) return !0;
    for (let a = s + 1; a < t.length; a++)
      if (!((e = t[a].props) != null && e.hMerge) && !((r = t[a].props) != null && r.vMerge)) return !1;
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
    var a, n, o, l, p, h, f, m;
    const t = (n = (a = this.tableStyles) == null ? void 0 : a.wholeTbl) == null ? void 0 : n.tcStyle, s = (l = (o = this.tableStyles) == null ? void 0 : o.wholeTbl) == null ? void 0 : l.tcTxStyle, e = (h = (p = this.slideMaster.defaultTextStyle) == null ? void 0 : p.lvl1) == null ? void 0 : h.props, r = (m = (f = this.slideMaster.defaultTextStyle) == null ? void 0 : f.lvl1) == null ? void 0 : m.defRPr;
    this.tr.forEach((u, d) => {
      u.td.forEach((g, y) => {
        var L, P, k, M, v, _, T, I, j, F, tt, O, bt, yt, xt, gt, Lt, At, Pt, Mt, St, kt, Ct, vt, jt, Rt, Tt, It, Bt, _t, Et, Ft, Dt, Ot, zt, Gt, Zt, Ht, Wt, Xt, Vt, Ut, Qt, qt, Yt, Jt, Kt, Nt, te, ee, se, re, ie, ae, oe, ne;
        let b = { ...e, ...t }, w = { ...r, ...s };
        this.props.firstRow && d === 0 ? (b = {
          ...b,
          ...(P = (L = this.tableStyles) == null ? void 0 : L.firstRow) == null ? void 0 : P.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(v = (M = (k = this.tableStyles) == null ? void 0 : k.firstRow) == null ? void 0 : M.tcStyle) == null ? void 0 : v.border }
        }, w = { ...w, ...(T = (_ = this.tableStyles) == null ? void 0 : _.firstRow) == null ? void 0 : T.tcTxStyle }) : this.props.lastRow && d === this.tr.length - 1 ? (b = {
          ...b,
          ...(j = (I = this.tableStyles) == null ? void 0 : I.lastRow) == null ? void 0 : j.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(O = (tt = (F = this.tableStyles) == null ? void 0 : F.lastRow) == null ? void 0 : tt.tcStyle) == null ? void 0 : O.border }
        }, w = { ...w, ...(yt = (bt = this.tableStyles) == null ? void 0 : bt.lastRow) == null ? void 0 : yt.tcTxStyle }) : this.props.firstCol && y === 0 ? (b = {
          ...b,
          ...(gt = (xt = this.tableStyles) == null ? void 0 : xt.firstCol) == null ? void 0 : gt.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(Pt = (At = (Lt = this.tableStyles) == null ? void 0 : Lt.firstCol) == null ? void 0 : At.tcStyle) == null ? void 0 : Pt.border }
        }, w = { ...w, ...(St = (Mt = this.tableStyles) == null ? void 0 : Mt.firstCol) == null ? void 0 : St.tcTxStyle }) : this.props.lastCol && this._isLastCol(u.td, y) ? (b = {
          ...b,
          ...(Ct = (kt = this.tableStyles) == null ? void 0 : kt.lastCol) == null ? void 0 : Ct.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(Rt = (jt = (vt = this.tableStyles) == null ? void 0 : vt.lastCol) == null ? void 0 : jt.tcStyle) == null ? void 0 : Rt.border }
        }, w = { ...w, ...(It = (Tt = this.tableStyles) == null ? void 0 : Tt.lastCol) == null ? void 0 : It.tcTxStyle }) : (this.props.bandRow && (this._isBandRow(d) ? (b = {
          ...b,
          ...(_t = (Bt = this.tableStyles) == null ? void 0 : Bt.band1H) == null ? void 0 : _t.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(Dt = (Ft = (Et = this.tableStyles) == null ? void 0 : Et.band1H) == null ? void 0 : Ft.tcStyle) == null ? void 0 : Dt.border }
        }, w = { ...w, ...(zt = (Ot = this.tableStyles) == null ? void 0 : Ot.band1H) == null ? void 0 : zt.tcTxStyle }) : (b = {
          ...b,
          ...(Zt = (Gt = this.tableStyles) == null ? void 0 : Gt.band2V) == null ? void 0 : Zt.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(Xt = (Wt = (Ht = this.tableStyles) == null ? void 0 : Ht.band2V) == null ? void 0 : Wt.tcStyle) == null ? void 0 : Xt.border }
        }, w = { ...w, ...(Ut = (Vt = this.tableStyles) == null ? void 0 : Vt.band2V) == null ? void 0 : Ut.tcTxStyle })), this.props.bandCol && (this._isBandCol(y) ? (b = {
          ...b,
          ...(qt = (Qt = this.tableStyles) == null ? void 0 : Qt.band1V) == null ? void 0 : qt.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(Kt = (Jt = (Yt = this.tableStyles) == null ? void 0 : Yt.band1V) == null ? void 0 : Jt.tcStyle) == null ? void 0 : Kt.border }
        }, w = { ...w, ...(te = (Nt = this.tableStyles) == null ? void 0 : Nt.band1V) == null ? void 0 : te.tcTxStyle }) : (b = {
          ...b,
          ...(se = (ee = this.tableStyles) == null ? void 0 : ee.band2H) == null ? void 0 : se.tcStyle,
          border: { ...b == null ? void 0 : b.border, ...(ae = (ie = (re = this.tableStyles) == null ? void 0 : re.band2H) == null ? void 0 : ie.tcStyle) == null ? void 0 : ae.border }
        }, w = { ...w, ...(ne = (oe = this.tableStyles) == null ? void 0 : oe.band2H) == null ? void 0 : ne.tcTxStyle }))), g.inheritTcStyle = b, g.inheritTcTxStyle = w;
      });
    });
  }
}
class ft extends Y {
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
      const s = this.ctx.rels[t].target, e = await this.pptx.getXmlByPath(s), r = B(e), a = c(r, [
        "dgm:dataModel",
        "dgm:extLst",
        "a:ext",
        "dsp:dataModelExt",
        "attrs",
        "relId"
      ]);
      if (!a || !this.ctx.rels[a]) return;
      const n = this.ctx.rels[a].target;
      let o = await this.pptx.getXmlByPath(n);
      o = o.replace(/dsp:/g, "p:");
      const l = B(o), p = c(l, ["p:drawing", "p:spTree"]);
      await J(this.nodes, p, this.pptx, this.ctx);
    } catch {
    }
  }
}
class ye {
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
      return c(s, ["attrs", "w"]) && (e.width = C(parseInt(c(s, ["attrs", "w"])))), c(s, ["attrs", "algn"]) && (e.algn = c(s, ["attrs", "algn"])), c(s, ["attrs", "cap"]) && (e.cap = c(s, ["attrs", "cap"])), c(s, ["attrs", "cmpd"]) && (e.cmpd = c(s, ["attrs", "cmpd"])), c(s, ["a:miter", "attrs", "lim"]) && (e.miterLim = C(parseInt(c(s, ["a:miter", "attrs", "lim"])))), c(s, ["a:prstDash", "attrs", "val"]) && (e.type = c(s, ["a:prstDash", "attrs", "val"])), c(s, ["a:solidFill"]) && (e.color = R(c(s, ["a:solidFill"]), this)), e;
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
class ut extends Y {
  get slideMaster() {
    return this.ctx.slideMaster || this.ctx;
  }
  get theme() {
    return this.chartThemeOverride || this.slideMaster.theme;
  }
  constructor(t, s, e, r) {
    super(t, e, r), this.options = {
      title: {},
      tooltip: {},
      legend: {},
      series: [],
      color: []
    }, this.userDrawn = !0, this.pptx = s, this.plotAreaValueAxisIds = /* @__PURE__ */ new Set();
  }
  getColorThemeName(t) {
    return t && this.chartColorMap && this.chartColorMap[t] ? this.chartColorMap[t] : super.getColorThemeName(t);
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
      const s = this.ctx.rels[t].target, e = await this.pptx.getXmlByPath(s), r = B(e), a = c(r, ["c:chartSpace"]);
      this.chartColorMap = c(a, ["c:clrMapOvr", "attrs"]), this.chartStyleId = this.parseChartStyleId(e), await this.loadChartThemeOverride(s);
      const n = c(a, ["c:chart"]), o = c(n, ["c:plotArea"]);
      this.plotAreaValueAxisIds = new Set(this.getValueAxisIds(o)), this.plotAreaLayout = this.parseManualLayout(c(o, ["c:layout", "c:manualLayout"]));
      const l = c(n, ["c:legend"]);
      if (l && (this.legendLayout = this.parseManualLayout(c(l, ["c:layout", "c:manualLayout"]))), c(o, ["c:barChart"]) ? this.parseBar(c(o, ["c:barChart"]), n) : c(o, ["c:bar3DChart"]) ? this.parseBar(c(o, ["c:bar3DChart"]), n) : c(o, ["c:lineChart"]) ? this.parseLine(c(o, ["c:lineChart"]), n) : c(o, ["c:line3DChart"]) ? this.parseLine(c(o, ["c:line3DChart"]), n) : c(o, ["c:areaChart"]) ? this.parseAreaLine(c(o, ["c:areaChart"]), n) : c(o, ["c:area3DChart"]) ? this.parseAreaLine(c(o, ["c:area3DChart"]), n) : c(o, ["c:pieChart"]) ? this.parsePie(c(o, ["c:pieChart"])) : c(o, ["c:pie3DChart"]) ? this.parsePie(c(o, ["c:pie3DChart"])) : c(o, ["c:doughnutChart"]) && this.parseDoughnutChart(c(o, ["c:doughnutChart"])), c(o, ["c:barChart"]) || c(o, ["c:bar3DChart"])) {
        const p = c(o, ["c:lineChart"]) || c(o, ["c:line3DChart"]);
        if (p) {
          let h = c(p, ["c:ser"]);
          Array.isArray(h) || (h = [h]);
          const f = this.getChartValueAxisId(p), m = this.parseLineSeries(h, p, f), u = this.parseLineColors(h), d = this.parseSeriesIndexes(h), g = u.map(
            (y, b) => y || this.getDefaultSeriesColorByIndex(d[b], "line")
          );
          this.options.series.push(...m), this.options.color.push(...g);
        }
      }
      this.parseAxes(o);
    } catch {
    }
  }
  async loadChartThemeOverride(t) {
    this.chartThemeOverride = void 0;
    try {
      const s = this.getPartRelsPath(t), e = await this.pptx.getXmlByPath(s), r = B(e);
      let a = c(r, ["Relationships", "Relationship"]) || [];
      Array.isArray(a) || (a = [a]);
      const n = a.find(
        (u) => c(u, ["attrs", "Type"]) === "http://schemas.openxmlformats.org/officeDocument/2006/relationships/themeOverride"
      );
      if (!n) return;
      const o = c(n, ["attrs", "Target"]);
      if (!o) return;
      const l = this.resolveRelativePartPath(t, o), p = await this.pptx.getXmlByPath(l), h = B(p), f = c(h, ["a:themeOverride"]);
      if (!f) return;
      const m = {
        "a:theme": {
          "a:themeElements": {
            "a:clrScheme": c(f, ["a:clrScheme"]) || {},
            "a:fontScheme": c(f, ["a:fontScheme"]) || {},
            "a:fmtScheme": c(f, ["a:fmtScheme"]) || {}
          }
        }
      };
      this.chartThemeOverride = new ye(l, m, this.pptx);
    } catch {
    }
  }
  getPartRelsPath(t) {
    const s = t.split("/"), e = s.pop();
    return `${s.join("/")}/_rels/${e}.rels`;
  }
  resolveRelativePartPath(t, s) {
    if (!s) return t;
    if (s.startsWith("/")) return s.replace(/^\//, "");
    const e = t.split("/");
    e.pop();
    for (const r of s.split("/"))
      if (!(!r || r === ".")) {
        if (r === "..") {
          e.length > 0 && e.pop();
          continue;
        }
        e.push(r);
      }
    return e.join("/");
  }
  parseChartStyleId(t) {
    const s = t.match(/<c14:style[^>]*\bval="(\d+)"/);
    if (s) return Number(s[1]);
    const e = t.match(/<c:style[^>]*\bval="(\d+)"/);
    if (e) return Number(e[1]);
  }
  getValueAxisIds(t) {
    let s = c(t, ["c:valAx"]) || [];
    return Array.isArray(s) || (s = [s]), s.map((e) => c(e, ["c:axId", "attrs", "val"])).filter((e) => e != null).map((e) => String(e));
  }
  getChartValueAxisId(t) {
    let s = c(t, ["c:axId"]) || [];
    return Array.isArray(s) || (s = [s]), s.map((r) => c(r, ["attrs", "val"])).filter((r) => r != null).map((r) => String(r)).find((r) => this.plotAreaValueAxisIds.has(r));
  }
  parseAreaLine(t, s) {
    this.parseLine(t, s), this.options.series = this.options.series.map((e) => (e.areaStyle = {}, e));
  }
  parseLine(t, s) {
    let e = c(t, ["c:ser"]);
    Array.isArray(e) || (e = [e]);
    const r = this.getChartValueAxisId(t), a = this.parseChartTitle(c(s, ["c:title"]));
    this.options.title = a ? { top: "top", left: "center", text: a } : { show: !1 }, this.options.xAxis = { type: "category", data: this.getCategory(e[0]) }, this.options.yAxis = { type: "value" }, this.options.series = this.parseLineSeries(e, t, r);
    const n = this.parseSeriesIndexes(e);
    this.options.color = this.parseLineColors(e).map(
      (o, l) => o || this.getDefaultSeriesColorByIndex(n[l], "line")
    ), this.options.legend = { bottom: "bottom", left: "center" }, c(t, ["c:grouping", "attrs", "val"]) === "percentStacked" && (this.options.tooltip.valueFormatter = (o) => (100 * o).toFixed(2) + "%");
  }
  parseBar(t, s) {
    let e = c(t, ["c:ser"]);
    Array.isArray(e) || (e = [e]);
    const r = this.getChartValueAxisId(t), a = this.parseChartTitle(c(s, ["c:title"]));
    this.options.title = a ? { top: "top", left: "center", text: a } : { show: !1 }, c(t, ["c:barDir", "attrs", "val"]) === "bar" ? (this.options.yAxis = { type: "category", data: this.getCategory(e[0]) }, this.options.xAxis = { type: "value" }) : (this.options.xAxis = { type: "category", data: this.getCategory(e[0]) }, this.options.yAxis = { type: "value" }), this.options.series = this.parseBarSeries(e, t, r);
    const n = this.parseSeriesIndexes(e);
    this.options.color = this.parseBarColors(e).map(
      (p, h) => p || this.getDefaultSeriesColorByIndex(n[h], "bar")
    ), this.options.legend = { bottom: "bottom", left: "center" };
    const o = c(t, ["c:overlap", "attrs", "val"]), l = c(t, ["c:gapWidth", "attrs", "val"]);
    o && this.options.series.forEach((p) => {
      p.type === "bar" && (p.barGap = `-${o}%`);
    }), l !== void 0 && this.options.series.forEach((p) => {
      p.type === "bar" && (p.barCategoryGap = `${l}%`);
    }), c(t, ["c:grouping", "attrs", "val"]) === "percentStacked" && (this.options.tooltip.valueFormatter = (p) => (100 * p).toFixed(2) + "%");
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
    if (!t) return "";
    let s = c(t, ["c:tx", "c:rich", "a:p"]);
    return s ? (Array.isArray(s) || (s = [s]), s.map((e) => {
      let r = c(e, ["a:r"]);
      return r ? (Array.isArray(r) || (r = [r]), r.map((a) => c(a, ["a:t"]) || "").join("")) : "";
    }).join("")) : "";
  }
  getSeriesColor(t) {
    return t && S(R(t, this.theme, this)) || "";
  }
  parseBarColors(t) {
    return t.map((s) => c(s, ["c:spPr", "a:noFill"]) !== void 0 ? "transparent" : this.getSeriesColor(c(s, ["c:spPr", "a:solidFill"])));
  }
  parseLineColors(t) {
    return t.map((s) => c(s, ["c:spPr", "a:ln", "a:noFill"]) !== void 0 ? "transparent" : this.getSeriesColor(
      c(s, ["c:spPr", "a:ln", "a:solidFill"]) || c(s, ["c:spPr", "a:solidFill"])
    ));
  }
  parseSeriesIndexes(t) {
    return t.map((s, e) => {
      const r = Number(c(s, ["c:idx", "attrs", "val"]));
      return Number.isFinite(r) ? r : e;
    });
  }
  getDefaultSeriesColorByIndex(t, s) {
    const e = [
      this.theme.getColor("accent1"),
      this.theme.getColor("accent2"),
      this.theme.getColor("accent3"),
      this.theme.getColor("accent4"),
      this.theme.getColor("accent5"),
      this.theme.getColor("accent6")
    ].filter(Boolean);
    if (e.length === 0) return "#6E7079";
    const r = (t % e.length + e.length) % e.length, a = e[r];
    if (this.chartStyleId === 102 && s === "bar" && r === 2) {
      const n = S({
        type: "solidFill",
        color: a,
        alpha: 1,
        lumMod: 0.6,
        lumOff: 0.4
      });
      if (n) return n;
    }
    return a;
  }
  parsePieColors(t) {
    let s = c(t, ["c:dPt"]);
    return s ? (Array.isArray(s) || (s = [s]), s.map(
      (e) => this.getSeriesColor(c(e, ["c:spPr", "a:solidFill"]))
    )) : [];
  }
  parsePieSeries(t, s) {
    const e = { type: "pie", radius: "80%", startAngle: 90, data: [] };
    c(s, ["c:holeSize", "attrs", "val"]) && (e.radius = [`${0.8 * c(s, ["c:holeSize", "attrs", "val"])}%`, "80%"]);
    const r = c(s, ["c:firstSliceAng", "attrs", "val"]);
    r && (e.startAngle = 90 - r);
    const a = this.getCategory(t), n = this.getVal(t);
    for (let o = 0; o < a.length; o++)
      e.data.push({ name: a[o], value: n[o] });
    return e;
  }
  parseBarSeries(t, s, e) {
    let r;
    const a = c(s, ["c:grouping", "attrs", "val"]);
    a === "stacked" ? r = "Ad" : a === "percentStacked" && (r = "total");
    const n = t.map((o) => {
      const l = {
        type: "bar",
        name: c(o, ["c:tx", "c:strRef", "c:strCache", "c:pt", "c:v"]),
        data: this.getVal(o),
        stack: r,
        __valAxisId: e
      }, p = this.parseSeriesLabel(o, s, "bar");
      return p && (l.label = p, l.labelLayout = { hideOverlap: !1 }), l;
    });
    if (a === "percentStacked") {
      let o = [];
      n.forEach((l, p) => {
        o = p === 0 ? [...l.data] : o.map((h, f) => h + l.data[f]);
      }), n.forEach((l) => {
        l.data = l.data.map((p, h) => o[h] <= 0 ? 0 : p / o[h]);
      });
    }
    return n;
  }
  parseLineSeries(t, s, e) {
    let r;
    const a = c(s, ["c:grouping", "attrs", "val"]);
    a === "stacked" ? r = "Ad" : a === "percentStacked" && (r = "total");
    const n = t.map((o) => {
      const l = {
        type: "line",
        name: c(o, ["c:tx", "c:strRef", "c:strCache", "c:pt", "c:v"]),
        data: this.getVal(o),
        stack: r,
        __valAxisId: e
      }, p = this.parseSeriesLabel(o, s, "line");
      return p && (l.label = p, l.labelLayout = { hideOverlap: !1 }), l;
    });
    if (r === "total") {
      let o = [];
      n.forEach((l, p) => {
        o = p === 0 ? [...l.data] : o.map((h, f) => h + l.data[f]);
      }), n.forEach((l) => {
        l.data = l.data.map((p, h) => o[h] <= 0 ? 0 : p / o[h]);
      });
    }
    return n;
  }
  parseSeriesLabel(t, s, e) {
    const r = c(t, ["c:dLbls"]) || c(s, ["c:dLbls"]);
    if (!r) return;
    const a = this.parseLabelBool(c(r, ["c:showVal", "attrs", "val"])), n = this.parseLabelBool(c(r, ["c:showCatName", "attrs", "val"])), o = this.parseLabelBool(c(r, ["c:showSerName", "attrs", "val"])), l = this.parseLabelBool(c(r, ["c:showPercent", "attrs", "val"]));
    if (!(a || n || o || l)) return;
    const p = c(r, ["c:numFmt", "attrs", "formatCode"]) || c(t, ["c:numFmt", "attrs", "formatCode"]), h = { show: !0 };
    h.formatter = (d) => {
      const g = [];
      if (o && g.push((d == null ? void 0 : d.seriesName) ?? ""), n && g.push((d == null ? void 0 : d.name) ?? ""), a && g.push(this.formatDataLabelValue(d == null ? void 0 : d.value, p)), l) {
        const y = typeof (d == null ? void 0 : d.percent) == "number" ? d.percent.toFixed(0) : "";
        g.push(y ? `${y}%` : "");
      }
      return g.filter((y) => y !== "").join(`
`);
    };
    const f = c(r, ["c:dLblPos", "attrs", "val"]), m = this.mapDataLabelPosition(f, e);
    m && (h.position = m);
    const u = this.getDataLabelDefRPr(r);
    if (u) {
      const d = c(u, ["attrs", "sz"]);
      d !== void 0 && (h.fontSize = parseInt(d) / 100);
      const g = this.getSeriesColor(c(u, ["a:solidFill"]));
      g && (h.color = g), c(u, ["attrs", "b"]) === "1" && (h.fontWeight = "bold"), c(u, ["attrs", "i"]) === "1" && (h.fontStyle = "italic");
    }
    return h;
  }
  parseLabelBool(t) {
    return t === "1" || t === 1 || t === !0 || t === "true";
  }
  mapDataLabelPosition(t, s) {
    switch (t) {
      case "ctr":
        return s === "bar" ? "inside" : "middle";
      case "inBase":
        return s === "bar" ? "insideBottom" : "bottom";
      case "inEnd":
        return s === "bar" ? "insideTop" : "top";
      case "outEnd":
        return "top";
      case "t":
        return "top";
      case "b":
        return "bottom";
      case "l":
        return "left";
      case "r":
        return "right";
      case "bestFit":
        return s === "bar" ? "inside" : "top";
      default:
        return;
    }
  }
  getDataLabelDefRPr(t) {
    let s = c(t, ["c:txPr", "a:p"]);
    if (s) {
      Array.isArray(s) || (s = [s]);
      for (const e of s) {
        const r = c(e, ["a:pPr", "a:defRPr"]);
        if (r) return r;
      }
      return c(s[0], ["a:endParaRPr"]);
    }
  }
  formatDataLabelValue(t, s) {
    const e = typeof t == "number" ? t : Number(t);
    if (!isFinite(e)) return `${t ?? ""}`;
    if (!s) return `${t}`;
    const r = this.decodeFormatEntities(s).split(";");
    let a = r[0] || "";
    e < 0 && r[1] ? a = r[1] : e === 0 && r[2] && (a = r[2]);
    const n = this.cleanNumberFormatSection(a), o = n.match(/[0#?,.%-]+/);
    if (!o)
      return this.normalizeFormatLiteral(n) || `${e}`;
    const l = o[0], p = o.index ?? 0, h = this.normalizeFormatLiteral(n.slice(0, p)), f = this.normalizeFormatLiteral(n.slice(p + l.length)), u = ((l.includes(".") ? l.split(".")[1] : "").match(/[0#]/g) || []).length, d = l.includes(","), g = l.includes("%"), y = Math.abs(g ? e * 100 : e), b = new Intl.NumberFormat("en-US", {
      useGrouping: d,
      minimumFractionDigits: u,
      maximumFractionDigits: u
    }).format(y), w = r.length > 1 && r[1] !== "";
    return `${e < 0 && !w ? "-" : ""}${h}${b}${f}`;
  }
  decodeFormatEntities(t) {
    return t.replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
  }
  cleanNumberFormatSection(t) {
    return t.replace(/\[[^\]]*]/g, "").replace(/_.?/g, "").replace(/\*./g, "").replace(/\\(.)/g, "$1");
  }
  normalizeFormatLiteral(t) {
    return t.replace(/"([^"]*)"/g, "$1").replace(/\?/g, " ").trim();
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
  parseManualLayout(t) {
    if (!t) return;
    const s = parseFloat(c(t, ["c:x", "attrs", "val"]) ?? c(t, ["c:x"])), e = parseFloat(c(t, ["c:y", "attrs", "val"]) ?? c(t, ["c:y"])), r = parseFloat(c(t, ["c:w", "attrs", "val"]) ?? c(t, ["c:w"])), a = parseFloat(c(t, ["c:h", "attrs", "val"]) ?? c(t, ["c:h"]));
    if (![s, e, r, a].some((n) => !isFinite(n)))
      return { x: s, y: e, w: r, h: a };
  }
  parseAxes(t) {
    var y;
    let s = c(t, ["c:valAx"]) || [];
    Array.isArray(s) || (s = [s]);
    const e = c(t, ["c:catAx"]) || c(t, ["c:dateAx"]) || [], a = (Array.isArray(e) ? e : [e])[0], n = ((y = this.options.yAxis) == null ? void 0 : y.type) === "category", o = n ? "xAxis" : "yAxis", l = n ? "yAxis" : "xAxis", p = this.options[o], h = Array.isArray(p) ? p[0] : p, f = s.map((b) => {
      const w = { ...h || { type: "value" } };
      c(b, ["c:delete", "attrs", "val"]) === "1" && (w.show = !1);
      const P = c(b, ["c:scaling", "c:min", "attrs", "val"]), k = c(b, ["c:scaling", "c:max", "attrs", "val"]);
      return P !== void 0 && (w.min = +P), k !== void 0 && (w.max = +k), w;
    });
    if (f.length > 1 ? this.options[o] = f : f.length === 1 && (this.options[o] = f[0]), Array.isArray(this.options.series)) {
      const b = /* @__PURE__ */ new Map();
      s.forEach((w, L) => {
        const P = c(w, ["c:axId", "attrs", "val"]);
        P != null && b.set(String(P), L);
      }), this.options.series.forEach((w) => {
        const L = w.__valAxisId ? String(w.__valAxisId) : void 0, P = L ? b.get(L) ?? 0 : 0;
        f.length > 1 && (o === "yAxis" ? w.yAxisIndex = P : w.xAxisIndex = P), delete w.__valAxisId;
      });
    }
    if (a && this.options[l]) {
      const b = Array.isArray(this.options[l]) ? this.options[l][0] : this.options[l];
      c(a, ["c:delete", "attrs", "val"]) === "1" && b && (b.show = !1);
    }
    const m = s[0], u = m && c(m, ["c:delete", "attrs", "val"]) !== "1";
    if (this.plotAreaLayout) {
      const { x: b, y: w, w: L, h: P } = this.plotAreaLayout;
      this.options.grid = {
        top: `${(w * 100).toFixed(1)}%`,
        left: `${(b * 100).toFixed(1)}%`,
        right: `${((1 - b - L) * 100).toFixed(1)}%`,
        bottom: `${((1 - w - P) * 100).toFixed(1)}%`,
        containLabel: !1
      };
    } else
      this.options.grid = {
        top: 5,
        bottom: 5,
        left: u ? 5 : 0,
        right: 5,
        containLabel: !0
      };
    if ((Array.isArray(this.options.xAxis) ? this.options.xAxis : [this.options.xAxis]).filter(Boolean).forEach((b) => {
      b.axisLabel = { ...b.axisLabel, fontSize: 8 };
    }), (Array.isArray(this.options.yAxis) ? this.options.yAxis : [this.options.yAxis]).filter(Boolean).forEach((b) => {
      b.show !== !1 && (b.axisLabel = { ...b.axisLabel, fontSize: 8 });
    }), this.options.legend) {
      if (this.legendLayout) {
        const { x: b, y: w, w: L } = this.legendLayout;
        this.options.legend.left = `${(b * 100).toFixed(1)}%`, this.options.legend.top = `${(w * 100).toFixed(1)}%`, this.options.legend.width = `${(L * 100).toFixed(1)}%`, delete this.options.legend.bottom;
      }
      this.options.legend.textStyle = { fontSize: 8 }, this.options.legend.itemWidth = 10, this.options.legend.itemHeight = 8, this.options.legend.itemGap = 5, this.options.legend.padding = [0, 0];
    }
  }
}
class mt {
  constructor(t, s, e, r) {
    if (this.offset = { x: 0, y: 0 }, this.chOffset = { x: 0, y: 0 }, this.extend = { w: 0, h: 0 }, this.chExtend = { w: 0, h: 0 }, this.rotate = 0, this.nodes = [], this.flipV = !1, this.flipH = !1, this.userDrawn = !0, this.order = c(t, ["attrs", "order"]), this.pptx = s, this.ctx = e, this.source = t, this.group = r, this.source["p:grpSpPr"]) {
      const a = c(this.source, ["p:grpSpPr", "a:xfrm"]);
      if (a) {
        const n = this.group && this.pptx.wps;
        if (this.offset = {
          x: Math.round(n ? z(parseInt(a["a:off"].attrs.x)) : C(parseInt(a["a:off"].attrs.x))),
          y: Math.round(n ? z(parseInt(a["a:off"].attrs.y)) : C(parseInt(a["a:off"].attrs.y)))
        }, this.chOffset = {
          x: Math.round(
            X(a["a:chOff"].attrs.x) === "point" || this.pptx.wps ? z(parseInt(a["a:chOff"].attrs.x)) : C(parseInt(a["a:chOff"].attrs.x))
          ),
          y: Math.round(
            X(a["a:chOff"].attrs.y) === "point" || this.pptx.wps ? z(parseInt(a["a:chOff"].attrs.y)) : C(parseInt(a["a:chOff"].attrs.y))
          )
        }, this.chExtend = {
          w: Math.round(
            X(a["a:chExt"].attrs.cx) === "point" || this.pptx.wps ? z(parseInt(a["a:chExt"].attrs.cx)) : C(parseInt(a["a:chExt"].attrs.cx))
          ),
          h: Math.round(
            X(a["a:chExt"].attrs.cy) === "point" || this.pptx.wps ? z(parseInt(a["a:chExt"].attrs.cy)) : C(parseInt(a["a:chExt"].attrs.cy))
          )
        }, this.extend = {
          w: Math.round(n ? z(parseInt(a["a:ext"].attrs.cx)) : C(parseInt(a["a:ext"].attrs.cx))),
          h: Math.round(n ? z(parseInt(a["a:ext"].attrs.cy)) : C(parseInt(a["a:ext"].attrs.cy)))
        }, this.rotate = it(parseInt(c(a, "attrs.rot", 0))), this.flipV = c(a, "attrs.flipV") === "1", this.flipH = c(a, "attrs.flipH") === "1", r) {
          const o = r.extend, l = r.chExtend, p = r.chOffset, h = o.w / l.w, f = o.h / l.h;
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
    t && t["a:solidFill"] ? this.background = R(t["a:solidFill"], this.ctx.theme, this.ctx) : t && t["a:gradFill"] ? this.background = q(t["a:gradFill"], this.ctx.theme, this.ctx) : t && t["a:blipFill"] && (this.background = Q(t["a:blipFill"], this.pptx, this.ctx));
  }
  _parseNodes() {
    J(this.nodes, this.source, this.pptx, this.ctx, this);
  }
}
function le(i) {
  const t = {}, s = c(i, "attrs") || {};
  return Object.keys(s).forEach((e) => {
    switch (e) {
      case "algn":
        t.align = s[e];
        break;
      case "marL":
        t.marginLeft = C(parseInt(s[e]));
        break;
      case "indent":
        t.indent = C(parseInt(s[e]));
        break;
      case "lvl":
        t.level = s[e];
        break;
    }
  }), c(i, ["a:lnSpc", "a:spcPct", "attrs", "val"]) && (t.lineHeight = parseInt(i["a:lnSpc"]["a:spcPct"].attrs.val) / 1e5), t;
}
function he(i, t, s) {
  const e = {}, r = c(i, "attrs") || {};
  Object.keys(r).forEach((n) => {
    switch (n) {
      case "sz":
        e.size = parseInt(r[n]) / 100;
        break;
      case "b":
        e.bold = r[n] === "1";
        break;
      case "i":
        e.italic = r[n] === "1";
        break;
      case "u":
        e.underline = r[n];
        break;
      case "strike":
        e.strike = r[n];
        break;
      case "order":
      case "dirty":
        break;
      default:
        e[n] = r[n];
    }
  });
  const a = c(i, "a:solidFill");
  return a && (e.color = R(a, t, s)), e;
}
async function J(i, t, s, e, r) {
  const a = [];
  for (const n in t) a.push(n);
  for (let n = 0; n < a.length; n++) {
    const o = a[n];
    if (o in t)
      switch (o) {
        case "p:sp": {
          const l = Array.isArray(t[o]) ? t[o] : [t[o]];
          for (let p = 0; p < l.length; p++)
            i.push(new W(l[p], s, e, r));
          break;
        }
        case "p:pic": {
          const l = Array.isArray(t[o]) ? t[o] : [t[o]];
          for (let p = 0; p < l.length; p++) {
            const h = l[p], f = h["p:blipFill"]["a:blip"].attrs["r:embed"], m = e.rels[f].target, u = new at(m, h, s, e, r);
            i.push(u);
          }
          break;
        }
        case "p:cxnSp": {
          const l = Array.isArray(t[o]) ? t[o] : [t[o]];
          for (let p = 0; p < l.length; p++)
            i.push(new W(l[p], s, e, r));
          break;
        }
        case "p:graphicFrame": {
          const l = Array.isArray(t[o]) ? t[o] : [t[o]];
          for (let p = 0; p < l.length; p++) {
            const h = l[p];
            switch (c(h, ["a:graphic", "a:graphicData", "attrs", "uri"])) {
              case "http://schemas.openxmlformats.org/drawingml/2006/table":
                i.push(new dt(h, s, e, r));
                break;
              case "http://schemas.openxmlformats.org/drawingml/2006/diagram": {
                const m = new ft(h, s, e, r);
                await m.parseNode(), i.push(m);
                break;
              }
              case "http://schemas.openxmlformats.org/drawingml/2006/chart": {
                const m = new ut(h, s, e, r);
                await m.parseNode(), i.push(m);
                break;
              }
            }
          }
          break;
        }
        case "p:grpSp": {
          const l = Array.isArray(t[o]) ? t[o] : [t[o]];
          for (let p = 0; p < l.length; p++)
            i.push(new mt(l[p], s, e, r));
          break;
        }
      }
  }
}
class _e {
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
          let a = r.attrs.Target.replace("../", "ppt/");
          a.startsWith("/ppt") && (a = a.substr(1)), this.slideLayout = this.pptx.getSlideLayout(a);
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
          let a = r.attrs.Target.replace("../", "ppt/");
          a.startsWith("/ppt") && (a = a.substr(1)), this.rels[r.attrs.Id] = {
            type: r.attrs.Type.split("/").pop(),
            target: a
          };
          break;
        }
      }
    });
  }
  _loadBackground() {
    const t = c(this.source, ["p:sld", "p:cSld", "p:bg", "p:bgPr"]);
    t && t["a:solidFill"] ? this.background = R(t["a:solidFill"], this.theme, this) : t && t["a:gradFill"] ? this.background = q(t["a:gradFill"], this.theme, this) : t && t["a:blipFill"] && (this.background = Q(t["a:blipFill"], this.pptx, this));
  }
  async _loadNodes() {
    const t = c(this.source, ["p:sld", "p:cSld", "p:spTree"]);
    await J(this.nodes, t, this.pptx, this);
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
class Ee {
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
          let a = r.attrs.Target.replace("../", "ppt/");
          a.startsWith("/ppt") && (a = a.substr(1)), this.slideMaster = this.pptx.getSlideMaster(a);
          break;
        }
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio":
        case "http://schemas.microsoft.com/office/2007/relationships/media":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/video": {
          let a = r.attrs.Target.replace("../", "ppt/");
          a.startsWith("/ppt") && (a = a.substr(1)), this.rels[r.attrs.Id] = {
            type: r.attrs.Type.split("/").pop(),
            target: a
          };
          break;
        }
      }
    });
  }
  async _loadBackground() {
    const t = c(this.source, ["p:sldLayout", "p:cSld", "p:bg", "p:bgPr"]);
    t && t["a:solidFill"] ? this.background = R(t["a:solidFill"], this.theme) : t && t["a:gradFill"] ? this.background = q(t["a:gradFill"], this.theme, this) : t && t["a:blipFill"] && (this.background = Q(t["a:blipFill"], this.pptx, this));
  }
  async _loadNodes() {
    const t = c(this.source, ["p:sldLayout", "p:cSld", "p:spTree"]);
    J(this.nodes, t, this.pptx, this);
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
class Fe {
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
          let a = r.attrs.Target.replace("../", "ppt/");
          a.startsWith("/ppt") && (a = a.substr(1)), this.theme = this.pptx.getTheme(a);
          break;
        }
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/image":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/audio":
        case "http://schemas.microsoft.com/office/2007/relationships/media":
        case "http://schemas.openxmlformats.org/officeDocument/2006/relationships/video": {
          let a = r.attrs.Target.replace("../", "ppt/");
          a.startsWith("/ppt") && (a = a.substr(1)), this.rels[r.attrs.Id] = {
            type: r.attrs.Type.split("/").pop(),
            target: a
          };
          break;
        }
      }
    });
  }
  _parseColorMap() {
    this.colorMap = Ce(
      c(this.source, ["p:sldMaster", "p:clrMap", "attrs"]) || {},
      ["order"]
    );
  }
  getColorThemeName(t) {
    return this.colorMap[t] || t;
  }
  _parseBackground() {
    const t = c(this.source, ["p:sldMaster", "p:cSld", "p:bg", "p:bgPr"]), s = c(this.source, ["p:sldMaster", "p:cSld", "p:bg", "p:bgRef"]);
    t && t["a:solidFill"] ? this.background = R(t["a:solidFill"], this.theme, this) : t && t["a:gradFill"] ? this.background = q(t["a:gradFill"], this.theme, this) : t && t["a:blipFill"] ? this.background = Q(t["a:blipFill"], this.pptx, this) : s && (this.background = R(s, this.theme, this));
  }
  _parseDefaultTextStyle() {
    const t = this.pptx.defaultTextStyleSource;
    Object.keys(t).forEach((s) => {
      if (s.startsWith("a:") && s.endsWith("pPr")) {
        const e = s.substr(2, s.length - 5), r = c(t[s], ["a:defRPr"]);
        this.defaultTextStyle[e] = {
          props: le(t[s]),
          defRPr: he(r, this.theme, this)
        };
      }
    });
  }
  _parseTextStyles() {
    const t = c(this.source, ["p:sldMaster", "p:txStyles"]);
    ["titleStyle", "bodyStyle", "otherStyle"].forEach((s) => {
      const e = this.textStyles[s], r = c(t, `p:${s}`) || {};
      Object.keys(r).forEach((a) => {
        if (a.startsWith("a:") && a.endsWith("pPr")) {
          const n = a.substr(2, a.length - 5);
          e[n] = {}, e[n].props = le(r[a]);
          const o = c(r[a], ["a:defRPr"]);
          e[n].defRPr = he(o, this.theme, this);
        }
      });
    });
  }
  _parseTableStyles() {
    const t = {};
    let s = c(this.pptx.tableStyles, ["a:tblStyleLst", "a:tblStyle"]) || [];
    Array.isArray(s) || (s = [s]), s.forEach((e) => {
      const r = c(e, ["attrs", "styleId"]);
      t[r] = {}, Object.keys(e).forEach((a) => {
        if (a.startsWith("a:")) {
          const n = a.substr(2);
          t[r][n] = {};
          const o = c(e[a], ["a:tcStyle"]);
          if (o) {
            const p = {};
            c(o, ["a:fill", "a:solidFill"]) && (p.background = R(c(o, ["a:fill", "a:solidFill"]), this.theme, this));
            const h = c(o, "a:tcBdr");
            h && (p.border = {}, Object.keys(h).forEach((f) => {
              if (f.startsWith("a:")) {
                const m = f.substr(2), u = c(h[f], ["a:ln"]);
                p.border[m] = V(u, this.theme, this);
              }
            })), t[r][n].tcStyle = p;
          }
          const l = c(e[a], ["a:tcTxStyle"]);
          if (l) {
            const p = {};
            p.color = R(l, this.theme, this), c(l, ["attrs", "b"]) === "on" && (p.bold = !0), t[r][n].tcTxStyle = p;
          }
        }
      });
    }), this.tableStyles = t;
  }
  async _loadNodes() {
    const t = c(this.source, ["p:sldMaster", "p:cSld", "p:spTree"]);
    J(this.nodes, t, this.pptx, this);
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
class pe {
  constructor() {
    this.slides = [], this.slideLayouts = [], this.slideMaster = [], this.themes = [], this.medias = {}, this.wps = !1;
  }
  async load(t) {
    const s = new ke();
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
      if (this.width = C(parseInt(r.cx)), this.height = C(parseInt(r.cy)), this.defaultTextStyleSource = e["p:presentation"]["p:defaultTextStyle"], this._zipContents.files["docProps/app.xml"]) {
        const a = await this._zipContents.files["docProps/app.xml"].async("text"), n = B(a), o = (t = n == null ? void 0 : n.Properties) == null ? void 0 : t.Application;
        this.wps = (o == null ? void 0 : o.includes("WPS")) || !1;
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
          const h = p.attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), m = B(f);
          this.themes.push(new ye(h, m, this));
        }
      const a = e.find(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml"
      );
      if (a) {
        const p = a.attrs.PartName.substr(1), h = await this._zipContents.files[p].async("text");
        this.tableStyles = B(h);
      }
      const n = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"
      );
      for (let p = 0; p < n.length; p++) {
        const h = n[p].attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), m = B(f);
        this.slideMaster.push(new Fe(h, m, this));
      }
      const o = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"
      );
      for (let p = 0; p < o.length; p++) {
        const h = o[p].attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), m = B(f), u = new Ee(h, m, this);
        await u.load(), this.slideLayouts.push(u);
      }
      const l = e.filter(
        (p) => p.attrs.ContentType === "application/vnd.openxmlformats-officedocument.presentationml.slide+xml"
      );
      for (let p = 0; p < l.length; p++) {
        const h = l[p].attrs.PartName.substr(1), f = await this._zipContents.files[h].async("text"), m = B(f), u = new _e(h, m, this);
        await u.load(), this.slides.push(u);
      }
      this.slides.sort((p, h) => p.index - h.index);
    } catch {
    }
  }
  async _loadMedia() {
    const t = Object.keys(this._zipContents.files).filter((e) => e.startsWith("ppt/media/image")).map((e) => this._zipContents.files[e]);
    for (const e of t) {
      const r = e.name.substr(2 + (~-e.name.lastIndexOf(".") >>> 0));
      let a;
      switch (r) {
        case "jpg":
        case "jpeg":
          a = "image/jpeg";
          break;
        case "png":
          a = "image/png";
          break;
        case "gif":
          a = "image/gif";
          break;
        case "emf":
          a = "image/x-emf";
          break;
        case "wmf":
          a = "image/x-wmf";
          break;
        default:
          a = "image/*";
      }
      const n = await e.async("base64");
      this.medias[e.name] = `data:${a};base64,${n}`;
    }
    const s = Object.keys(this._zipContents.files).filter(
      (e) => e.startsWith("ppt/media/media") && ["mp3", "wav", "ogg", "mp4", "webm"].includes(e.split(".").pop().toLowerCase())
    ).map((e) => this._zipContents.files[e]);
    for (const e of s) {
      const r = e.name.split(".").pop().toLowerCase(), a = await e.async("arraybuffer"), n = new Blob([a], {
        type: `${["mp3", "wav"].includes(r) ? "audio" : "video"}/${r}`
      });
      this.medias[e.name] = URL.createObjectURL(n);
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
const De = ["image/x-emf", "image/x-wmf"];
function $t(i) {
  const t = i.extend, s = i.offset, e = i.clip, r = i.base64, a = i.audioFile, n = i.videoFile;
  if (r) {
    const d = r.match(/^data:([^;]+);/);
    if (d && De.includes(d[1]))
      return;
  }
  const o = document.createElement("div");
  o.style.setProperty("position", "absolute"), o.style.setProperty("left", s.x + "px"), o.style.setProperty("top", s.y + "px");
  let l, p, h, f;
  const m = document.createElement("div");
  m.style.setProperty("position", "absolute"), m.style.setProperty("left", "0"), m.style.setProperty("top", "0"), m.style.setProperty("width", t.w + "px"), m.style.setProperty("height", t.h + "px"), m.style.setProperty("overflow", "hidden"), e ? (l = t.w / (1 - (e.l ?? 0) - (e.r ?? 0)), p = t.h / (1 - (e.t ?? 0) - (e.b ?? 0)), h = -1 * l * (e.l ?? 0), f = -1 * p * (e.t ?? 0)) : (l = t.w, p = t.h, h = 0, f = void 0);
  const u = document.createElement("img");
  if (u.src = r, u.width = l, u.height = p, u.style.setProperty("position", "absolute"), u.style.setProperty("left", h + "px"), u.style.setProperty("top", f + "px"), m.append(u), o.append(m), a) {
    const d = document.createElement("audio");
    d.style.position = "absolute", d.style.left = "0", d.style.top = "0", d.src = a, d.controls = !0, d.style.transform = "translate(-50%)", o.append(d);
  }
  if (n) {
    const d = document.createElement("video");
    d.style.position = "absolute", d.style.left = "0", d.style.top = "0", d.width = t.w, d.height = t.h, d.src = n, d.controls = !0, o.append(d);
  }
  return o;
}
const Oe = "http://www.w3.org/2000/svg";
function $(i) {
  return document.createElementNS(Oe, i);
}
function D(i) {
  const t = i.extend;
  return 0.16667 * Math.min(t.w, t.h);
}
function A(i, t, s) {
  if (t.prstGeom && t.prstGeom.gd) {
    const r = (Array.isArray(t.prstGeom.gd) ? t.prstGeom.gd : [t.prstGeom.gd]).find((a) => a.name === i);
    if (r) return r.fmla;
  }
  return s;
}
function x(i, t, s) {
  const e = A(i, t);
  if (e !== void 0) {
    const r = t.extend;
    return Math.min(r.w, r.h) * e;
  }
  return s !== void 0 ? s : D(t);
}
function xe(i, t, s) {
  const e = A(i, t);
  if (e !== void 0) {
    const r = t.extend;
    return Math.max(r.w, r.h) * e;
  }
  return s !== void 0 ? s : D(t);
}
function E(i, t, s, e, r) {
  const a = i * Math.PI / 180, n = a === 0 || a === 2 * Math.PI ? t + e : a === Math.PI ? t - e : a === Math.PI / 2 || a === 3 * Math.PI / 2 ? t : a > 0 && a < Math.PI / 2 || a > 3 * Math.PI / 2 && a < 2 * Math.PI ? t + Math.sqrt(1 / (1 / Math.pow(e, 2) + Math.pow(Math.tan(a), 2) / Math.pow(r, 2))) : t - Math.sqrt(1 / (1 / Math.pow(e, 2) + Math.pow(Math.tan(a), 2) / Math.pow(r, 2))), o = a === 0 || a === 2 * Math.PI || a === Math.PI ? s : a === Math.PI / 2 ? s + r : a === 3 * Math.PI / 2 ? s - r : a > Math.PI && a < 2 * Math.PI ? s - Math.sqrt(1 / (1 / Math.pow(r, 2) + Math.pow(1 / Math.tan(a), 2) / Math.pow(e, 2))) : s + Math.sqrt(1 / (1 / Math.pow(r, 2) + Math.pow(1 / Math.tan(a), 2) / Math.pow(e, 2)));
  return [n, o];
}
function K(i, t) {
  let s = 0;
  return (t > i && t - i > 180 || t < i && i - t < 180) && (s = 1), s;
}
function N(i) {
  const t = i.extend, s = 0.146 * t.w, e = 0.146 * t.h;
  return {
    top: e,
    bottom: e,
    left: s,
    right: s,
    w: t.w - 2 * s,
    h: t.h - 2 * e
  };
}
function G(i, t) {
  let s = 0;
  switch (i) {
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
function de(i, t, s, e = !1) {
  const r = i.border || {}, a = i.uuid, { headEnd: n, width: o, color: l, tailEnd: p } = r, h = e ? n : p, f = h.len ?? "med", m = h.w ?? "med", u = G(f, o), d = G(m, o), g = $("defs"), y = $("marker"), b = `marker-${a}-${e ? "start" : "end"}`;
  y.setAttribute("id", b), y.setAttribute("viewBox", `0 0 ${2 * u} ${2 * d}`), y.setAttribute("refX", u + "px"), y.setAttribute("refY", d + "px"), y.setAttribute("markerWidth", 2 * u + "px"), y.setAttribute("markerHeight", 2 * d + "px"), y.setAttribute("orient", "auto"), y.setAttribute("markerUnits", "userSpaceOnUse");
  const w = $("ellipse");
  w.setAttribute("cx", u + "px"), w.setAttribute("cy", d + "px"), w.setAttribute("rx", u + "px"), w.setAttribute("ry", d + "px"), w.setAttribute("fill", S(l) || "transparent"), y.appendChild(w), g.appendChild(y), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function fe(i, t, s, e = !1) {
  const r = i.border || {}, a = i.uuid, { headEnd: n, width: o, color: l, tailEnd: p } = r, h = e ? n : p, f = h.len ?? "med", m = h.w ?? "med", u = G(f, o), d = G(m, o), g = $("defs"), y = $("marker"), b = `marker-${a}-${e ? "start" : "end"}`;
  y.setAttribute("id", b), y.setAttribute("viewBox", `0 0 ${2 * u} ${2 * d}`), y.setAttribute("refX", (e ? 0.9 * u : 1.1 * u) + "px"), y.setAttribute("refY", d + "px"), y.setAttribute("markerWidth", 2 * u + "px"), y.setAttribute("markerHeight", 2 * d + "px"), y.setAttribute("orient", "auto"), y.setAttribute("markerUnits", "userSpaceOnUse");
  const w = $("path"), L = e ? [`M ${2 * u},0`, `L 0,${d}`, `L ${2 * u},${2 * d}`, "Z"].join(" ") : ["M 0,0", `L ${2 * u},${d}`, `L 0,${2 * d}`, "Z"].join(" ");
  w.setAttribute("d", L), w.setAttribute("fill", S(l) || "transparent"), y.appendChild(w), g.appendChild(y), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function ue(i, t, s, e = !1) {
  const r = i.border || {}, a = i.uuid, { headEnd: n, width: o, color: l, tailEnd: p } = r, h = e ? n : p, f = h.len ?? "med", m = h.w ?? "med", u = G(f, o), d = G(m, o), g = $("defs"), y = $("marker"), b = `marker-${a}-${e ? "start" : "end"}`;
  y.setAttribute("id", b), y.setAttribute("viewBox", `0 0 ${2 * u} ${2 * d}`), y.setAttribute("refX", u + "px"), y.setAttribute("refY", d + "px"), y.setAttribute("markerWidth", 2 * u + "px"), y.setAttribute("markerHeight", 2 * d + "px"), y.setAttribute("orient", "auto"), y.setAttribute("markerUnits", "userSpaceOnUse");
  const w = $("path"), L = [
    `M 0,${d}`,
    `L ${u},0`,
    `L ${2 * u},${d}`,
    `L ${u},${2 * d}`,
    "Z"
  ].join(" ");
  w.setAttribute("d", L), w.setAttribute("fill", S(l) || "transparent"), y.appendChild(w), g.appendChild(y), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function me(i, t, s, e = !1) {
  const r = i.border || {}, a = i.uuid, { headEnd: n, width: o, color: l, tailEnd: p } = r, h = e ? n : p, f = h.len ?? "med", m = h.w ?? "med", u = G(f, o), d = G(m, o), g = $("defs"), y = $("marker"), b = `marker-${a}-${e ? "start" : "end"}`;
  y.setAttribute("id", b), y.setAttribute("viewBox", `0 0 ${2 * u + 2 * o} ${2 * d + 2 * o}`);
  const w = e ? m === "lg" ? 2 * o : 3 * o : m === "lg" ? 2 * u : 2 * u - o;
  y.setAttribute("refX", w + "px"), y.setAttribute("refY", d + o + "px"), y.setAttribute("markerWidth", 2 * u + "px"), y.setAttribute("markerHeight", 2 * d + "px"), y.setAttribute("orient", "auto"), y.setAttribute("markerUnits", "userSpaceOnUse");
  const L = $("path"), P = e ? [
    `M ${2 * u + o}, ${o}`,
    `L ${o},${d + o}`,
    `L ${2 * u + o},${2 * d + o}`
  ].join(" ") : [
    `M ${o}, ${o}`,
    `L ${2 * u + o},${d + o}`,
    `L ${o},${2 * d + o}`
  ].join(" ");
  L.setAttribute("d", P), L.setAttribute("stroke-width", o + "px"), L.setAttribute("stroke", S(l) || "transparent"), L.setAttribute("fill", "transparent"), L.setAttribute("stroke-linecap", "round"), L.setAttribute("stroke-linejoin", "miter"), L.style.overflow = "visible", y.appendChild(L), g.appendChild(y), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function $e(i, t, s, e = !1) {
  const r = i.border || {}, a = i.uuid, { headEnd: n, width: o, color: l, tailEnd: p } = r, h = e ? n : p, f = h.len ?? "med", m = h.w ?? "med", u = G(f, o), d = G(m, o), g = $("defs"), y = $("marker"), b = `marker-${a}-${e ? "start" : "end"}`;
  y.setAttribute("id", b), y.setAttribute("viewBox", `0 0 ${2 * u} ${2 * d}`);
  const w = e ? m === "sm" ? 1.5 * o : 2 * o : m === "sm" ? 2 * u - 1.5 * o : 2 * u - 2 * o;
  y.setAttribute("refX", w + "px"), y.setAttribute("refY", d + "px"), y.setAttribute("markerWidth", 2 * u + "px"), y.setAttribute("markerHeight", 2 * d + "px"), y.setAttribute("orient", "auto"), y.setAttribute("markerUnits", "userSpaceOnUse");
  const L = $("path"), P = e ? [
    `M 0, ${d}`,
    `L ${2 * u},0`,
    `L ${u},${d}`,
    `L ${2 * u},${2 * d}`,
    "Z"
  ].join(" ") : [
    "M 0,0",
    `L ${2 * u},${d}`,
    `L 0,${2 * d}`,
    `L ${u},${d}`,
    "Z"
  ].join(" ");
  L.setAttribute("d", P), L.setAttribute("fill", S(l) || "transparent"), L.style.overflow = "visible", y.appendChild(L), g.appendChild(y), t.appendChild(g), s.setAttribute(e ? "marker-start" : "marker-end", `url(#${b})`);
}
function U(i, t, s) {
  const e = i.border || {};
  i.extend;
  const { headEnd: r, tailEnd: a } = e;
  if (r && r.type !== "none")
    switch (r.type) {
      case "triangle":
        fe(i, t, s, !0);
        break;
      case "oval":
        de(i, t, s, !0);
        break;
      case "diamond":
        ue(i, t, s, !0);
        break;
      case "arrow":
        me(i, t, s, !0);
        break;
      case "stealth":
        $e(i, t, s, !0);
        break;
    }
  if (a && a.type !== "none")
    switch (a.type) {
      case "triangle":
        fe(i, t, s, !1);
        break;
      case "oval":
        de(i, t, s, !1);
        break;
      case "diamond":
        ue(i, t, s, !1);
        break;
      case "arrow":
        me(i, t, s, !1);
        break;
      case "stealth":
        $e(i, t, s, !1);
        break;
    }
}
function ze(i, t, s, e) {
  var h;
  const r = { ...t, ...i.props }, a = document.createElement("span");
  let n = typeof i.text == "string" ? i.text : "";
  i.fieldType === "slidenum" && e !== void 0 && (n = String(e)), a.innerHTML = n;
  let o = 18;
  r.size && ((h = s == null ? void 0 : s.normAutofit) != null && h.fontScale ? (o = r.size * s.normAutofit.fontScale, a.style.fontSize = o + "px") : (o = r.size, a.style.fontSize = o + "px"));
  const l = S(r.color);
  l && (a.style.color = l);
  const p = /^[^\u4e00-\u9fff]+$/;
  if (r.typeface)
    switch (a.style.fontFamily = r.typeface, r.typeface) {
      case "DengXian":
        p.test(i.text) && (a.style.letterSpacing = -0.04 * o + "px");
        break;
      case "DengXian Light":
        p.test(i.text) && (a.style.letterSpacing = -0.05 * o + "px");
        break;
      case "STLiti":
      case "SimSun":
      case "NSimSun":
      case "SimHei":
        p.test(i.text) && (a.style.fontSize = 0.85 * parseInt(a.style.fontSize) + "px");
        break;
      case "华文中宋":
      case "Fira Sans Extra Condensed Medium":
        a.style.fontSize = 0.85 * parseInt(a.style.fontSize) + "px";
        break;
      case "FangSong":
        a.style.letterSpacing = -0.08 * o + "px";
        break;
    }
  else
    p.test(i.text) && (a.style.letterSpacing = -0.04 * o + "px");
  if (r.bold && (a.style.fontWeight = "bold"), r.italic && (a.style.fontStyle = "italic"), r.underline && r.underline !== "none" && (a.style.textDecoration = "underline"), r.background && (a.style.backgroundColor = S(r.background)), r.baseline) {
    const f = parseInt(r.baseline);
    f > 0 ? a.style.verticalAlign = "super" : f < 0 && (a.style.verticalAlign = "sub"), a.style.fontSize = Math.round(o * 0.65) + "px";
  }
  return a.style.wordBreak = "break-word", a;
}
function Ge(i, t, s) {
  const e = document.createElement("span"), r = i.firstElementChild;
  e.style.fontSize = r.style.fontSize, e.style.color = r.style.color, e.style.fontWeight = r.style.fontWeight, e.style.fontStyle = r.style.fontStyle;
  const a = Math.abs(t.indent || 0);
  switch (a > 0 ? (e.style.display = "inline-block", e.style.width = a + "px", e.style.marginLeft = -a + "px") : e.style.marginRight = "10px", t.buAutoNum) {
    case "arabicPeriod":
    default:
      e.textContent = s + ".";
      break;
    case "circleNumDbPlain":
      e.textContent = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩", "⑪", "⑫", "⑬", "⑭", "⑮", "⑯", "⑰", "⑱", "⑲", "⑳"][s - 1] || s + "";
      break;
    case "romanUcPeriod":
      e.textContent = Ze(s) + ".";
      break;
    case "alphaUcPeriod":
      e.textContent = ot(s) + ".";
      break;
    case "alphaLcPeriod":
      e.textContent = ot(s).toLowerCase() + ".";
      break;
    case "alphaLcParenR":
      e.textContent = ot(s).toLowerCase() + ")";
      break;
    case "ea1JpnChsDbPeriod":
      e.textContent = He(s) + ".";
      break;
  }
  i.prepend(e);
}
function Ze(i) {
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
  if (typeof i != "number" || i < 1 || i > 3999) throw new Error("Input must be a number between 1 and 3999.");
  let s = "";
  for (let e = 0; e < t.length; e++)
    for (; i >= t[e].value; )
      s += t[e].numeral, i -= t[e].value;
  return s;
}
function He(i) {
  const t = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  if (!Number.isInteger(i) || i < 0) return "";
  let s = "";
  const e = i.toString();
  for (let r = 0; r < e.length; r++) s += t[parseInt(e[r], 10)];
  return s;
}
function We(i, t) {
  const s = document.createElement("span"), e = i.firstElementChild;
  s.style.color = e.style.color, s.style.fontSize = e.style.fontSize, t.buFont && (s.style.fontFamily = t.buFont);
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
  s.textContent = r[t.buChar] || "■";
  const a = parseFloat(e.style.fontSize) || 10;
  let n = a;
  typeof t.buSzPts == "number" ? n = t.buSzPts : typeof t.buSzPct == "number" ? n = a * t.buSzPct : t.buSzTx && (n = a), s.style.fontSize = n + "px", s.style.verticalAlign = "middle";
  const o = Math.abs(t.indent || 0);
  o > 0 ? (s.style.display = "inline-block", s.style.width = o + "px", s.style.marginLeft = -o + "px") : s.style.marginRight = "10px", i.prepend(s);
}
function ge(i, t = 0, s = {}) {
  var L, P;
  const e = i.inheritProps, r = i.inheritRProps, a = i.props, n = i.rows, o = { ...e, ...a }, l = () => {
    var _, T;
    let k = 0;
    for (const I of n)
      I.props && I.props.size && (k = Math.max(k, I.props.size));
    const M = ((T = (_ = s == null ? void 0 : s.bodyProps) == null ? void 0 : _.normAutofit) == null ? void 0 : T.fontScale) || 1, v = s.isTable ? r.size || 8 : 18;
    return (k || r.size || v) * M;
  }, p = (k) => {
    const M = k === "Before" ? "spaceBefore" : "spaceAfter", v = k === "Before" ? "spaceBeforePct" : "spaceAfterPct";
    return a[M] !== void 0 ? a[M] : a[v] !== void 0 ? a[v] * l() : e[M] !== void 0 ? e[M] : e[v] !== void 0 ? e[v] * l() : 0;
  }, h = () => a.lineHeight !== void 0 ? a.lineHeight * 1.2 : a.lineHeightPts !== void 0 ? a.lineHeightPts / l() : e.lineHeight !== void 0 ? e.lineHeight * 1.2 : e.lineHeightPts !== void 0 ? e.lineHeightPts / l() : 1, f = document.createElement("div"), m = s.isFirst ? 0 : p("Before"), u = s.isLast ? 0 : p("After"), d = s.isTable ? 0 : s.isFirst ? Math.floor(0.2 * l()) : 0;
  f.style.margin = `${d}px  0 0 0`, f.style.padding = `${Math.floor(m)}px 0px ${Math.floor(u)}px 0px`;
  const g = document.createElement("p");
  g.style.margin = "0", g.style.padding = "0px", g.style.wordBreak = "break-word";
  const y = { ctr: "center", l: "left", r: "right", dist: "justify" }, b = s.isTable ? "left" : "center";
  g.style.textAlign = o.align && y[o.align] || b, o.align === "dist" && (g.style.textAlignLast = "justify");
  let w = h();
  if ((P = (L = s.bodyProps) == null ? void 0 : L.normAutofit) != null && P.lnSpcReduction && (w *= 1 - s.bodyProps.normAutofit.lnSpcReduction), g.style.lineHeight = w + "", g.style.fontSize = l() + "px", n.length) {
    for (const k of n)
      k.isBr ? g.appendChild(document.createElement("br")) : g.appendChild(ze(k, { ...r, marginTop: Math.floor(0.2 * l()) }, s.bodyProps, s.slideNumber));
    o.buNone || (o.buAutoNum ? Ge(g, o, t) : o.buChar && We(g, o)), g.style.paddingLeft = (o.marginLeft || 0) + "px";
  } else {
    const k = document.createElement("span");
    k.innerHTML = "&nbsp;", k.style.fontSize = r.size + "px", g.appendChild(k);
  }
  return f.appendChild(g), f;
}
function Xe(i, t, s, e) {
  const r = { ...i.inheritProps, ...i.props }, a = document.createElement("div");
  a.style.position = "absolute", a.style.top = (t.top || 0) + "px", a.style.bottom = (t.bottom || 0) + "px", a.style.left = (t.left || 0) + "px", a.style.right = (t.right || 0) + "px", a.style.width = t.w + "px", a.style.height = t.h + "px", a.style.overflow = "hidden";
  const n = r.lIns !== void 0 ? r.lIns : 7, o = r.rIns !== void 0 ? r.rIns : 7, l = r.tIns !== void 0 ? r.tIns : 3.5, p = r.bIns !== void 0 ? r.bIns : 3.5;
  a.style.paddingLeft = n + "px", a.style.paddingRight = o + "px", a.style.paddingTop = l + "px", a.style.paddingBottom = p + "px", a.style.boxSizing = "border-box", r.anchor === "ctr" ? (a.style.display = "flex", a.style.flexDirection = "column", a.style.justifyContent = "center") : r.anchor === "b" && (a.style.display = "flex", a.style.flexDirection = "column", a.style.justifyContent = "flex-end");
  let h = 0;
  const f = i.paragraphs || [];
  for (let m = 0; m < f.length; m++) {
    const u = f[m];
    ({ ...u.inheritProps, ...u.props }).buAutoNum ? h++ : h = 0;
    const g = ge(u, h || m + 1, {
      isFirst: m === 0,
      isLast: m === f.length - 1,
      bodyProps: r,
      slideNumber: e
    });
    a.appendChild(g);
  }
  return a;
}
function Le(i) {
  const t = i.extend, s = $("rect");
  return s.setAttribute("x", "0"), s.setAttribute("y", "0"), s.setAttribute("width", t.w + "px"), s.setAttribute("height", t.h + "px"), s;
}
function Ve(i) {
  const t = Le(i), s = x("adj", i, D(i));
  return t.setAttribute("rx", s + "px"), t.setAttribute("ry", s + "px"), t;
}
function Ue(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, D(i)), r = [
    "M 0,0",
    `L ${t.w - e},0`,
    `Q ${t.w},0 ${t.w},${e}`,
    `L ${t.w},${t.h}`,
    `L 0,${t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", r), s;
}
function Qe(i) {
  const t = i.extend, s = $("path"), e = x("adj1", i, D(i)), r = x("adj2", i, 0), a = [
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
  return s.setAttribute("d", a), s;
}
function qe(i) {
  const t = i.extend, s = $("path"), e = x("adj1", i, D(i)), r = x("adj2", i, 0), a = [
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
  return s.setAttribute("d", a), s;
}
function Ye(i) {
  const t = i.extend, s = $("polygon"), e = x("adj", i, D(i)), r = [
    "0,0",
    `${t.w - e},0`,
    `${t.w},${e}`,
    `${t.w},${t.h}`,
    `0,${t.h}`
  ].join(" ");
  return s.setAttribute("points", r), s;
}
function Je(i) {
  const t = i.extend, s = $("polygon"), e = x("adj1", i, D(i)), r = x("adj2", i, 0), a = [
    [e, 0],
    [t.w - e, 0],
    [t.w, e],
    [t.w, t.h - r],
    [t.w - r, t.h],
    [r, t.h],
    [0, t.h - r],
    [0, e]
  ].map((n) => `${n[0]},${n[1]}`).join(" ");
  return s.setAttribute("points", a), s;
}
function Ke(i) {
  const t = i.extend, s = $("polygon"), e = x("adj1", i, 0), r = x("adj2", i, D(i)), a = [
    [e, 0],
    [t.w - r, 0],
    [t.w, r],
    [t.w, t.h - e],
    [t.w - e, t.h],
    [r, t.h],
    [0, t.h - r],
    [0, e]
  ].map((n) => `${n[0]},${n[1]}`).join(" ");
  return s.setAttribute("points", a), s;
}
function Ne(i) {
  const t = i.extend, s = $("path"), e = x("adj1", i, D(i)), r = x("adj2", i, D(i)), a = [
    `M ${e},0`,
    `L ${t.w - r},0`,
    `L ${t.w},${r}`,
    `L ${t.w},${t.h}`,
    `L 0,${t.h}`,
    `L 0,${e}`,
    `Q 0,0 ${e},0`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", a), s;
}
function ts(i) {
  const t = i.extend, s = $("path"), e = ["M 0,0", `L ${t.w},${t.h}`].join(" ");
  return s.setAttribute("d", e), s;
}
function es(i) {
  const t = i.extend, s = $("path"), e = ["M 0,0", `L ${t.w},${t.h}`].join(" ");
  return s.setAttribute("d", e), s;
}
function ss(i) {
  const t = i.extend, s = $("path"), e = xe("adj1", i, 0.5 * Math.max(t.w, t.h)), r = [
    "M 0,0",
    `L ${e},0`,
    `L ${e},${t.h}`,
    `L ${t.w},${t.h}`
  ].join(" ");
  return s.setAttribute("d", r), s;
}
function rs(i) {
  const t = i.extend, s = $("path"), e = xe("adj1", i, 0.5 * Math.max(t.w, t.h)), r = [
    "M0,0",
    `Q${e},0 ${e},${t.h / 2}`,
    `T${t.w},${t.h}`
  ].join(" ");
  return s.setAttribute("d", r), s;
}
function is(i) {
  const t = i.extend, s = x("adj1", i, 0.5 * Math.min(t.w, t.h)), e = x("adj2", i, 0.5 * Math.min(t.w, t.h)), r = $("path"), a = [
    `M0,${t.h / 2 - s / 2}`,
    `L${t.w - e},${t.h / 2 - s / 2}`,
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L${t.w - e},${t.h / 2 + s / 2}`,
    `L0,${t.h / 2 + s / 2}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", a);
  const n = s * e / t.h;
  return { dom: r, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: 0, right: n, w: t.w - n, h: s } };
}
function as(i) {
  const t = i.extend, s = x("adj1", i, 0.5 * Math.min(t.w, t.h)), e = x("adj2", i, 0.5 * Math.min(t.w, t.h)), r = $("path"), a = [
    `M0,${t.h / 2}`,
    `L${e},0`,
    `L${e},${t.h / 2 - s / 2}`,
    `L${t.w},${t.h / 2 - s / 2}`,
    `L${t.w},${t.h / 2 + s / 2}`,
    `L${e},${t.h / 2 + s / 2}`,
    `L${e},${t.h}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", a);
  const n = s * e / t.h;
  return { dom: r, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: n, right: 0, w: t.w - n, h: s } };
}
function os(i) {
  const t = i.extend, s = x("adj1", i, 0.5 * Math.min(t.w, t.h)), e = x("adj2", i, 0.5 * Math.min(t.w, t.h)), r = $("path"), a = [
    `M${t.w / 2},0`,
    `L${t.w},${e}`,
    `L${t.w / 2 + s / 2},${e}`,
    `L${t.w / 2 + s / 2},${t.h}`,
    `L${t.w / 2 - s / 2},${t.h}`,
    `L${t.w / 2 - s / 2},${e}`,
    `L0,${e}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", a);
  const n = s * e / t.w;
  return { dom: r, textArea: { top: n, bottom: 0, left: t.w / 2 - s / 2, right: t.w / 2 - s / 2, w: s, h: t.h - n } };
}
function ns(i) {
  const t = i.extend, s = x("adj1", i, 0.5 * Math.min(t.w, t.h)), e = x("adj2", i, 0.5 * Math.min(t.w, t.h)), r = $("path"), a = [
    `M${t.w / 2},${t.h}`,
    `L0,${t.h - e}`,
    `L${t.w / 2 - s / 2},${t.h - e}`,
    `L${t.w / 2 - s / 2},0`,
    `L${t.w / 2 + s / 2},0`,
    `L${t.w / 2 + s / 2},${t.h - e}`,
    `L${t.w},${t.h - e}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", a);
  const n = s * e / t.w;
  return { dom: r, textArea: { top: 0, bottom: n, left: t.w / 2 - s / 2, right: t.w / 2 - s / 2, w: s, h: t.h - n } };
}
function cs(i) {
  const t = i.extend, s = x("adj1", i, 0.5 * Math.min(t.w, t.h)), e = x("adj2", i, 0.5 * Math.min(t.w, t.h)), r = $("path"), a = [
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
  r.setAttribute("d", a);
  const n = s * e / t.h;
  return { dom: r, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: n, right: n, w: t.w - 2 * n, h: s } };
}
function ls(i) {
  const t = i.extend, s = x("adj1", i, 0.5 * Math.min(t.w, t.h)), e = x("adj2", i, 0.5 * Math.min(t.w, t.h)), r = $("path"), a = [
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
  r.setAttribute("d", a);
  const n = s * e / t.w;
  return { dom: r, textArea: { top: n, bottom: n, left: t.w / 2 - s / 2, right: t.w / 2 - s / 2, w: s, h: t.h - 2 * n } };
}
function hs(i) {
  const t = i.extend, s = x("adj1", i, 0.225 * Math.min(t.w, t.h)), e = x("adj2", i, 0.225 * Math.min(t.w, t.h)), r = x("adj3", i, 0.225 * Math.min(t.w, t.h)), a = $("path"), n = [
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
  a.setAttribute("d", n);
  const o = e === 0 ? 0 : s * r / e / 2;
  return { dom: a, textArea: { top: t.h / 2 - s / 2, bottom: t.h / 2 - s / 2, left: o, right: o, w: t.w - 2 * o, h: s } };
}
function ps(i) {
  const t = i.extend, s = x("adj1", i, 0.225 * Math.min(t.w, t.h)), e = x("adj2", i, 0.225 * Math.min(t.w, t.h)), r = x("adj3", i, 0.225 * Math.min(t.w, t.h)), a = $("path"), n = [
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
  a.setAttribute("d", n);
  const o = e === 0 ? 0 : s * r / e / 2;
  return { dom: a, textArea: { top: t.h - e - s / 2, bottom: e - s / 2, left: o, right: o, w: t.w - 2 * o, h: s } };
}
function ds(i) {
  const t = i.extend;
  let s = x("adj1", i, 0.25 * Math.min(t.w, t.h));
  const e = x("adj2", i, 0.25 * Math.min(t.w, t.h)), r = x("adj3", i, 0.25 * Math.min(t.w, t.h)), a = x("adj4", i, 0.4375 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e);
  let n = a - s;
  n < 0 && (n = 0);
  const o = $("path"), l = [
    `M0,${t.h}`,
    `L0,${e - s / 2 + a}`,
    `A${a} ${a} 0 0 1 ${a} ${e - s / 2}`,
    `L${t.w - r},${e - s / 2}`,
    `L${t.w - r},0`,
    `L${t.w},${e}`,
    `L${t.w - r},${2 * e}`,
    `L${t.w - r},${e + s / 2}`,
    `L${s + n},${e + s / 2}`,
    `A${n} ${n}  0 0 0 ${s} ${e + s / 2 + n}`,
    `L${s},${t.h}`,
    "Z"
  ].join(" ");
  return o.setAttribute("d", l), { dom: o };
}
function fs(i) {
  const t = i.extend;
  let s = x("adj1", i, 0.25 * Math.min(t.w, t.h));
  const e = x("adj2", i, 0.25 * Math.min(t.w, t.h)), r = x("adj3", i, 0.25 * Math.min(t.w, t.h));
  let a = x("adj4", i, 0.4375 * Math.min(t.w, t.h)), n = x("adj5", i, 0.75 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e), n < r && (n = r + s), a > n - r && (a = n - r);
  let o = a - s;
  o > n - r - s && (o = n - r - s), o < 0 && (o = 0);
  const l = e - s / 2, p = $("path"), h = [
    `M0,${t.h}`,
    `L0,${a}`,
    `A${a} ${a} 0 0 1 ${a} 0`,
    `L${t.w - a - l},0`,
    `A${a} ${a} 0 0 1 ${t.w - l} ${a}`,
    `L${t.w - l},${n - r}`,
    `L${t.w},${n - r}`,
    `L${t.w - e},${n}`,
    `L${t.w - 2 * e},${n - r}`,
    `L${t.w - e - s / 2},${n - r}`,
    `L${t.w - e - s / 2},${s + o}`,
    `A${o} ${o}  0 0 0 ${t.w - o - e - s / 2} ${s}`,
    `L${s + o},${s}`,
    `A${o} ${o}  0 0 0 ${s} ${s + o}`,
    `L${s},${t.h}`,
    "Z"
  ].join(" ");
  return p.setAttribute("d", h), { dom: p };
}
function us(i) {
  const t = i.extend;
  let s = x("adj1", i, 0.25 * Math.min(t.w, t.h));
  const e = x("adj2", i, 0.25 * Math.min(t.w, t.h));
  let r = x("adj3", i, 0.25 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e);
  let a = Math.min(t.w, t.h) - 2 * e;
  r > a && (r = a), r < 0 && (r = 0);
  const n = e - s / 2, o = $("path"), l = [
    `M0,${t.h - e}`,
    `L${r},${t.h - 2 * e}`,
    `L${r},${t.h - e - s / 2}`,
    `L${t.w - e - s / 2},${t.h - e - s / 2}`,
    `L${t.w - e - s / 2},${r}`,
    `L${t.w - 2 * e},${r}`,
    `L${t.w - e},0`,
    `L${t.w},${r}`,
    `L${t.w - n},${r}`,
    `L${t.w - n},${t.h - n}`,
    `L${r},${t.h - n}`,
    `L${r},${t.h}`,
    "Z"
  ].join(" ");
  o.setAttribute("d", l);
  const p = e === 0 ? 0 : s * r / e / 2;
  return { dom: o, textArea: { top: t.h - e - s / 2, bottom: e - s / 2, left: p, right: e, w: t.w - p - e, h: s } };
}
function ms(i) {
  const t = i.extend;
  let s = x("adj1", i, 0.25 * Math.min(t.w, t.h));
  const e = x("adj2", i, 0.25 * Math.min(t.w, t.h));
  let r = x("adj3", i, 0.25 * Math.min(t.w, t.h));
  s > 2 * e && (s = 2 * e);
  const a = e - s / 2, n = $("path"), o = [
    `M0,${t.h}`,
    `L0,${t.h - s}`,
    `L${t.w - e - s / 2},${t.h - s}`,
    `L${t.w - e - s / 2},${r}`,
    `L${t.w - 2 * e},${r}`,
    `L${t.w - e},0`,
    `L${t.w},${r}`,
    `L${t.w - a},${r}`,
    `L${t.w - a},${t.h}`,
    "Z"
  ].join(" ");
  return n.setAttribute("d", o), { dom: n, textArea: { top: t.h - s, bottom: 0, left: 0, right: 0, w: t.w, h: s } };
}
function $s(i) {
  const t = i.extend, s = i.background;
  let e = x("adj1", i, 0.25 * Math.min(t.w, t.h));
  const r = x("adj2", i, 0.5 * Math.min(t.w, t.h)), a = x("adj3", i, 0.25 * Math.min(t.w, t.h));
  e > r && (e = r);
  const n = r / 2 - e / 2, o = (t.h - r / 2 - e / 2) / 2, l = (t.h - n - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M${t.w},0`,
    `A ${t.w} ${o} 0 0 0 0 ${o}`,
    `L0,${l + e}`,
    `A ${t.w} ${l} 0 0 1 ${t.w} ${e}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && h.setAttribute("fill", S(s, { dark: 0.6 }) || "transparent");
  const f = $("path");
  return f.setAttribute("d", [
    `M0,${o}`,
    `A ${t.w} ${o} 0 0 0 ${t.w - a} ${t.h - r / 2 - e / 2}`,
    `L${t.w - a},${t.h - r}`,
    `L${t.w},${t.h - r / 2}`,
    `L${t.w - a},${t.h}`,
    `L${t.w - a},${t.h - n}`,
    `A ${t.w} ${l} 0 0 1 0 ${e + l}`,
    "Z"
  ].join(" ")), p.appendChild(h), p.appendChild(f), { dom: p };
}
function ws(i) {
  const t = i.extend, s = i.background;
  let e = x("adj1", i, 0.25 * Math.min(t.w, t.h));
  const r = x("adj2", i, 0.5 * Math.min(t.w, t.h)), a = x("adj3", i, 0.25 * Math.min(t.w, t.h));
  e > r && (e = r);
  const n = r / 2 - e / 2, o = (t.h - r / 2 - e / 2) / 2, l = (t.h - n - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M0,${t.h - r / 2}`,
    `L${a},${t.h - r}`,
    `L${a},${t.h - r / 2 - e / 2}`,
    `A${t.w} ${o} 0 0 0 ${t.w} ${o}`,
    `L${t.w},${l + e}`,
    `A ${t.w} ${l} 0 0 1 ${a} ${t.h - n}`,
    `L${a},${t.h}`,
    "Z"
  ].join(" "));
  const f = $("path");
  return f.setAttribute("d", [
    "M0,0",
    `A ${t.w} ${o} 0 0 1 ${t.w} ${o}`,
    `L${t.w},${l + e}`,
    `A ${t.w} ${l} 0 0 0 0 ${e}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && f.setAttribute("fill", S(s, { dark: 0.6 }) || "transparent"), p.appendChild(h), p.appendChild(f), { dom: p };
}
function bs(i) {
  const t = i.extend, s = i.background;
  let e = x("adj1", i, 0.25 * Math.min(t.w, t.h));
  const r = x("adj2", i, 0.5 * Math.min(t.w, t.h)), a = x("adj3", i, 0.25 * Math.min(t.w, t.h));
  e > r && (e = r);
  const n = r / 2 - e / 2, o = (t.w - r / 2 - e / 2) / 2, l = (t.w - n - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M${t.w - r / 2},0`,
    `L${t.w - r},${a}`,
    `L${t.w - r / 2 - e / 2},${a}`,
    `A${o} ${t.h} 0 0 1 ${o} ${t.h}`,
    `L${o + e},${t.h}`,
    `A${l} ${t.h} 0 0 0 ${t.w - n} ${a}`,
    `L${t.w},${a}`,
    "Z"
  ].join(" "));
  const f = $("path");
  return f.setAttribute("d", [
    `M${e},0`,
    "L0,0",
    `A ${o} ${t.h} 0 0 0 ${o} ${t.h}`,
    `L${o + e},${t.h}`,
    `A ${l} ${t.h} 0 0 1 ${e} 0`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && f.setAttribute("fill", S(s, { dark: 0.6 }) || "transparent"), p.appendChild(h), p.appendChild(f), { dom: p };
}
function ys(i) {
  const t = i.extend, s = i.background;
  let e = x("adj1", i, 0.25 * Math.min(t.w, t.h));
  const r = x("adj2", i, 0.5 * Math.min(t.w, t.h)), a = x("adj3", i, 0.25 * Math.min(t.w, t.h));
  e > r && (e = r);
  const n = r / 2 - e / 2, o = (t.w - r / 2 - e / 2) / 2, l = (t.w - n - e) / 2, p = $("g"), h = $("path");
  h.setAttribute("d", [
    `M0,${t.h}`,
    `L${e},${t.h}`,
    `A${l} ${t.h} 0 0 1 ${l + e} 0`,
    `L${o},0`,
    `A${o} ${t.h} 0 0 0 0 ${t.h}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && h.setAttribute("fill", S(s, { dark: 0.6 }) || "transparent");
  const f = $("path");
  return f.setAttribute("d", [
    `M${t.w - r / 2},${t.h}`,
    `L${t.w - r},${t.h - a}`,
    `L${t.w - r / 2 - e / 2},${t.h - a}`,
    `A ${o} ${t.h} 0 0 0 ${o} 0`,
    `L${o + e},0`,
    `A ${l} ${t.h} 0 0 1 ${t.w - n} ${t.h - a}`,
    `L${t.w},${t.h - a}`,
    "Z"
  ].join(" ")), p.appendChild(h), p.appendChild(f), { dom: p };
}
function xs(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj1", i, 0.5) * t.h, r = A("adj2", i, 0.5) * s, a = s / 8, n = s / 16, o = s / 32, l = 5 * s / 32, p = t.h / 2 - e / 2, h = t.h / 2 + e / 2, f = $("g"), m = $("path");
  m.setAttribute("d", [`M0,${p}`, `L${o},${p}`, `L${o},${h}`, `L0,${h}`, "Z"].join(" "));
  const u = $("path");
  u.setAttribute("d", [`M${n},${p}`, `L${a},${p}`, `L${a},${h}`, `L${n},${h}`, "Z"].join(" "));
  const d = $("path");
  d.setAttribute("d", [
    `M${l},${p}`,
    `L${t.w - r},${p}`,
    `L${t.w - r},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - r},${t.h}`,
    `L${t.w - r},${h}`,
    `L${l},${h}`,
    "Z"
  ].join(" ")), f.appendChild(d), f.appendChild(m), f.appendChild(u);
  const g = e * r / t.h;
  return { dom: f, textArea: { top: p, bottom: p, left: 0, right: g, w: t.w - g, h: e } };
}
function gs(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj1", i, 0.5) * t.h, r = A("adj2", i, 0.5) * s, a = e * r / t.h, n = t.h / 2 - e / 2, o = t.h / 2 + e / 2, l = $("path"), p = [
    `M0,${n}`,
    `L${t.w - r},${n}`,
    `L${t.w - r},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - r},${t.h}`,
    `L${t.w - r},${o}`,
    `L0,${o}`,
    `L${a},${t.h / 2}`,
    "Z"
  ].join(" ");
  l.setAttribute("d", p);
  const h = e * r / t.h;
  return { dom: l, textArea: { top: n, bottom: n, left: h, right: h, w: t.w - 2 * h, h: e } };
}
function Ls(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj", i, 0.5) * s, r = $("path"), a = ["M0,0", `L${t.w - e},0`, `L${t.w},${t.h / 2}`, `L${t.w - e},${t.h}`, `L0,${t.h}`, "Z"].join(" ");
  return r.setAttribute("d", a), { dom: r, textArea: { top: 0, bottom: 0, left: 0, right: e / 2, w: t.w - e / 2, h: t.h } };
}
function As(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj", i, 0.5) * s, r = $("path"), a = [
    "M0,0",
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L0,${t.h}`,
    `L${e},${t.h / 2}`,
    "Z"
  ].join(" ");
  return r.setAttribute("d", a), { dom: r, textArea: { top: 0, bottom: 0, left: e, right: e, w: t.w - 2 * e, h: t.h } };
}
function Ps(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj1", i, 0.25) * s, r = A("adj2", i, 0.25) * s, a = A("adj3", i, 0.25) * s, n = A("adj4", i, 0.64977) * t.w, o = $("path"), l = [
    "M0,0",
    `L${n},0`,
    `L${n},${t.h / 2 - e / 2}`,
    `L${t.w - a},${t.h / 2 - e / 2}`,
    `L${t.w - a},${t.h / 2 - r}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - a},${t.h / 2 + r}`,
    `L${t.w - a},${t.h / 2 + e / 2}`,
    `L${n},${t.h / 2 + e / 2}`,
    `L${n},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return o.setAttribute("d", l), { dom: o, textArea: { top: 0, bottom: 0, left: 0, right: t.w - n, w: n, h: t.h } };
}
function Ms(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj1", i, 0.25) * s, r = A("adj2", i, 0.25) * s, a = A("adj3", i, 0.25) * s, n = A("adj4", i, 0.64977) * t.w, o = $("path"), l = [
    `M0,${t.h / 2}`,
    `L${a},${t.h / 2 - r}`,
    `L${a},${t.h / 2 - e / 2}`,
    `L${t.w - n},${t.h / 2 - e / 2}`,
    `L${t.w - n},0`,
    `L${t.w},0`,
    `L${t.w},${t.h}`,
    `L${t.w - n},${t.h}`,
    `L${t.w - n},${t.h / 2 + e / 2}`,
    `L${a},${t.h / 2 + e / 2}`,
    `L${a},${t.h / 2 + r}`,
    "Z"
  ].join(" ");
  return o.setAttribute("d", l), { dom: o, textArea: { top: 0, bottom: 0, left: t.w - n, right: 0, w: n, h: t.h } };
}
function Ss(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj1", i, 0.25) * s, r = A("adj2", i, 0.25) * s, a = A("adj3", i, 0.25) * s, n = A("adj4", i, 0.64977) * t.h, o = $("path"), l = [
    `M0,${t.h - n}`,
    `L${t.w / 2 - e / 2},${t.h - n}`,
    `L${t.w / 2 - e / 2},${a}`,
    `L${t.w / 2 - r},${a}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + r},${a}`,
    `L${t.w / 2 + e / 2},${a}`,
    `L${t.w / 2 + e / 2},${t.h - n}`,
    `L${t.w},${t.h - n}`,
    `L${t.w},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return o.setAttribute("d", l), { dom: o, textArea: { top: t.h - n, bottom: 0, left: 0, right: 0, w: t.w, h: n } };
}
function ks(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj1", i, 0.25) * s, r = A("adj2", i, 0.25) * s, a = A("adj3", i, 0.25) * s, n = A("adj4", i, 0.64977) * t.h, o = $("path"), l = [
    "M0,0",
    `L${t.w},0`,
    `L${t.w},${n}`,
    `L${t.w / 2 + e / 2},${n}`,
    `L${t.w / 2 + e / 2},${t.h - a}`,
    `L${t.w / 2 + r},${t.h - a}`,
    `L${t.w / 2},${t.h}`,
    `L${t.w / 2 - r},${t.h - a}`,
    `L${t.w / 2 - e / 2},${t.h - a}`,
    `L${t.w / 2 - e / 2},${n}`,
    `L0,${n}`,
    "Z"
  ].join(" ");
  return o.setAttribute("d", l), { dom: o, textArea: { top: 0, bottom: t.h - n, left: 0, right: 0, w: t.w, h: n } };
}
function Cs(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj1", i, 0.25) * s, r = A("adj2", i, 0.25) * s, a = A("adj3", i, 0.25) * s, n = A("adj4", i, 0.48123) * t.w, o = $("path"), l = [
    `M0,${t.h / 2}`,
    `L${a},${t.h / 2 - r}`,
    `L${a},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - n / 2},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - n / 2},0`,
    `L${t.w / 2 + n / 2},0`,
    `L${t.w / 2 + n / 2},${t.h / 2 - e / 2}`,
    `L${t.w - a},${t.h / 2 - e / 2}`,
    `L${t.w - a},${t.h / 2 - r}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - a},${t.h / 2 + r}`,
    `L${t.w - a},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + n / 2},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + n / 2},${t.h}`,
    `L${t.w / 2 - n / 2},${t.h}`,
    `L${t.w / 2 - n / 2},${t.h / 2 + e / 2}`,
    `L${a},${t.h / 2 + e / 2}`,
    `L${a},${t.h / 2 + r}`,
    "Z"
  ].join(" ");
  return o.setAttribute("d", l), { dom: o, textArea: { top: 0, bottom: 0, left: t.w / 2 - n / 2, right: t.w / 2 - n / 2, w: n, h: t.h } };
}
function vs(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = A("adj1", i, 0.18515) * s, r = A("adj2", i, 0.18515) * s, a = A("adj3", i, 0.18515) * s, n = A("adj4", i, 0.48123) * t.w, o = A("adj4", i, 0.48123) * t.h, l = $("path"), p = [
    `M0,${t.h / 2}`,
    `L${a},${t.h / 2 - r}`,
    `L${a},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - n / 2},${t.h / 2 - e / 2}`,
    `L${t.w / 2 - n / 2},${t.h / 2 - o / 2}`,
    `L${t.w / 2 - e / 2},${t.h / 2 - o / 2}`,
    `L${t.w / 2 - e / 2},${a}`,
    `L${t.w / 2 - r},${a}`,
    `L${t.w / 2},0`,
    `L${t.w / 2 + r},${a}`,
    `L${t.w / 2 + e / 2},${a}`,
    `L${t.w / 2 + e / 2},${t.h / 2 - o / 2}`,
    `L${t.w / 2 + n / 2},${t.h / 2 - o / 2}`,
    `L${t.w / 2 + n / 2},${t.h / 2 - e / 2}`,
    `L${t.w - a},${t.h / 2 - e / 2}`,
    `L${t.w - a},${t.h / 2 - r}`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - a},${t.h / 2 + r}`,
    `L${t.w - a},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + n / 2},${t.h / 2 + e / 2}`,
    `L${t.w / 2 + n / 2},${t.h / 2 + o / 2}`,
    `L${t.w / 2 + e / 2},${t.h / 2 + o / 2}`,
    `L${t.w / 2 + e / 2},${t.h - a}`,
    `L${t.w / 2 + r},${t.h - a}`,
    `L${t.w / 2},${t.h}`,
    `L${t.w / 2 - r},${t.h - a}`,
    `L${t.w / 2 - e / 2},${t.h - a}`,
    `L${t.w / 2 - e / 2},${t.h / 2 + o / 2}`,
    `L${t.w / 2 - n / 2},${t.h / 2 + o / 2}`,
    `L${t.w / 2 - n / 2},${t.h / 2 + e / 2}`,
    `L${a},${t.h / 2 + e / 2}`,
    `L${a},${t.h / 2 + r}`,
    "Z"
  ].join(" ");
  return l.setAttribute("d", p), { dom: l, textArea: { top: t.h / 2 - o / 2, bottom: t.h / 2 - o / 2, left: t.w / 2 - n / 2, right: t.w / 2 - n / 2, w: n, h: o } };
}
function js(i) {
  const t = i.prstGeom || {}, s = i.extend, e = t.pathList, r = t.w, a = t.h, n = $("path"), o = { moveTo: "M", lnTo: "L", cubicBezTo: "C", close: "Z" }, l = s.w / r, p = s.h / a, h = e.map((f) => {
    const m = o[f.type], u = Array.isArray(f.points) ? f.points.map((d) => `${d[0] * l},${d[1] * p}`).join(" ") : "";
    return u ? `${m} ${u}` : `${m}`;
  }).join(" ");
  return n.setAttribute("d", h), n.style.fillRule = "evenodd", { dom: n };
}
function Rs(i) {
  const t = i.extend, s = $("polygon"), e = [`${t.w / 2},0`, `0,${t.h}`, `${t.w},${t.h}`].join(" ");
  return s.setAttribute("points", e), { dom: s };
}
function Ts(i) {
  const t = i.extend, s = $("polygon"), e = [`0,${t.h}`, "0,0", `${t.w},${t.h}`].join(" ");
  return s.setAttribute("points", e), { dom: s };
}
function Is(i) {
  const t = i.extend, s = $("ellipse"), e = t.w / 2, r = t.h / 2;
  return s.setAttribute("cx", e + "px"), s.setAttribute("cy", r + "px"), s.setAttribute("rx", e + "px"), s.setAttribute("ry", r + "px"), { dom: s };
}
function Bs(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, 0.5 * Math.min(t.w, t.h)), r = [
    `M${e},0`,
    `L${t.w},0`,
    `L${t.w - e},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  s.setAttribute("d", r);
  const a = 0.84 * (t.w - e), n = 0.08 * t.h + e / t.w * t.h * 0.42;
  return {
    dom: s,
    textArea: {
      top: n,
      bottom: n,
      left: (t.w - a) / 2,
      right: (t.w - a) / 2,
      w: a,
      h: t.h - 2 * n
    }
  };
}
function _s(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, 0.25 * Math.min(t.w, t.h)), r = [
    `M${e},0`,
    `L${t.w - e},0`,
    `L${t.w},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  s.setAttribute("d", r);
  const a = x("adj", i, 0.5 * Math.min(t.w, t.h)), n = a / t.w * 0.66 * t.h, o = 0.66 * a;
  return {
    dom: s,
    textArea: { top: n, bottom: 0, left: o, right: o, w: t.w - 2 * o, h: t.h - n }
  };
}
function Es(i) {
  const t = i.extend, s = $("path"), e = [
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
function Fs(i) {
  const t = i.extend, s = $("path"), e = [
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
function Ds(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, 0.25 * Math.min(t.w, t.h)), r = [
    `M${e},0`,
    `L${t.w - e},0`,
    `L${t.w},${t.h / 2}`,
    `L${t.w - e},${t.h}`,
    `L${e},${t.h}`,
    `L0,${t.h / 2}`,
    "Z"
  ].join(" ");
  s.setAttribute("d", r);
  const a = 0.098 * t.h + e / t.w * 0.38 * t.h, n = 0.088 * t.w + 0.422 * e;
  return {
    dom: s,
    textArea: { top: a, bottom: a, left: n, right: n, w: t.w - 2 * n, h: t.h - 2 * a }
  };
}
function Os(i) {
  const t = i.extend, s = $("path"), e = [
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
function zs(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, 0.29 * Math.min(t.w, t.h)), r = [
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
function Gs(i) {
  const t = i.extend, s = $("path"), e = 0.344, r = 0.117, a = 0.19, n = [
    `M${t.w * e},0`,
    `L${0.656 * t.w},0`,
    `L${0.883 * t.w},${t.h * a}`,
    `L${t.w},${0.5 * t.h}`,
    `L${0.883 * t.w},${0.81 * t.h}`,
    `L${0.656 * t.w},${t.h}`,
    `L${t.w * e},${t.h}`,
    `L${t.w * r},${0.81 * t.h}`,
    `L0,${0.5 * t.h}`,
    `L${t.w * r},${t.h * a}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", n), {
    dom: s,
    textArea: { top: t.h * a, bottom: t.h * a, left: t.w * r, right: t.w * r, w: 0.766 * t.w, h: 0.62 * t.h }
  };
}
function Zs(i) {
  const t = i.extend, s = $("path"), e = 0.364, r = 0.133, a = 0.135, n = [
    `M${t.w * e},0`,
    `L${0.636 * t.w},0`,
    `L${0.867 * t.w},${t.h * a}`,
    `L${t.w},${t.h * e}`,
    `L${t.w},${0.636 * t.h}`,
    `L${0.867 * t.w},${0.865 * t.h}`,
    `L${0.636 * t.w},${t.h}`,
    `L${t.w * e},${t.h}`,
    `L${t.w * r},${0.865 * t.h}`,
    `L0,${0.636 * t.h}`,
    `L0,${t.h * e}`,
    `L${t.w * r},${t.h * a}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", n), {
    dom: s,
    textArea: { top: t.h * a, bottom: t.h * a, left: t.w * r, right: t.w * r, w: 0.734 * t.w, h: 0.73 * t.h }
  };
}
function Hs(i) {
  const t = i.extend, s = $("path"), e = A("adj1", i, 360), r = A("adj2", i, 270), a = t.w / 2, n = t.h / 2, o = t.w / 2, l = t.h / 2, [p, h] = E(e, a, n, o, l), [f, m] = E(r, a, n, o, l), u = K(e, r), d = `M${a},${n}, L${p} ${h} A ${o} ${l} 0 ${u} 1 ${f} ${m} Z`;
  return s.setAttribute("d", d), { dom: s, textArea: N(i) };
}
function Ws(i) {
  const t = i.extend, s = $("path"), e = A("adj1", i, 270), r = A("adj2", i, 0), a = t.w / 2, n = t.h / 2, o = t.w / 2, l = t.h / 2, [p, h] = E(e, a, n, o, l), [f, m] = E(r, a, n, o, l), u = K(e, r), d = `M${p},${h} A ${o} ${l} 0 ${u} 1 ${f} ${m}`;
  return s.setAttribute("d", d), { dom: s, hasFill: !1 };
}
function Xs(i) {
  const t = i.extend, s = $("path"), e = A("adj1", i, 45), r = A("adj2", i, 270), a = t.w / 2, n = t.h / 2, o = t.w / 2, l = t.h / 2, [p, h] = E(e, a, n, o, l), [f, m] = E(r, a, n, o, l), u = K(e, r), d = `M${p} ${h} A ${o} ${l} 0 ${u} 1 ${f} ${m} Z`;
  return s.setAttribute("d", d), { dom: s, textArea: N(i) };
}
function Vs(i) {
  const t = i.extend, s = $("path"), e = A("adj", i, 1), r = t.w / 2, a = t.h / 2, n = t.w / 2, o = t.h / 2, [l, p] = E(0, r, a, n, o), [h, f] = E(270, r, a, n, o), m = K(0, 270);
  let u = `M${l} ${p} A ${n} ${o} 0 ${m} 1 ${h} ${f}`;
  const d = n * e, g = r + d, y = a - o * d / (t.w / 2), b = (t.w / 2 + g) / 2, w = (t.h / 2 + y) / 2;
  return u += ` Q${b},0 ${g},${y}`, u += ` Q${t.w},${w} ${r + n},${a}`, s.setAttribute("d", u), { dom: s, textArea: N(i) };
}
function Us(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, 0.16667 * Math.min(t.w, t.h)), r = [
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
  const a = 0.285 * e;
  return {
    dom: s,
    hasFill: !1,
    textArea: { top: a, bottom: a, left: a, right: a, w: t.w - 2 * a, h: t.h - 2 * a }
  };
}
function Qs(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, 0.083335 * Math.min(t.w, t.h)), r = [
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
  const a = 0.285 * x("adj", i, 0.16667 * Math.min(t.w, t.h));
  return {
    dom: s,
    hasFill: !1,
    textArea: { top: a, bottom: a, left: a, right: a, w: t.w - 2 * a, h: t.h - 2 * a }
  };
}
function qs(i) {
  const t = i.extend, s = $("path"), e = x("adj1", i, 0.12 * Math.min(t.w, t.h)), r = [
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
function Ys(i) {
  const t = i.extend, s = $("path"), e = x("adj1", i, 0.333 * Math.min(t.w, t.h)), r = Math.min(
    x("adj2", i, 0.333 * Math.min(t.w, t.h)),
    t.w * (1 - e / t.h)
  ), a = [
    "M0,0",
    `L${t.w},0`,
    `L${t.w * (1 - e / t.h)},${e}`,
    `L${r},${e}`,
    `L${r},${t.h * (1 - r / t.w)}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", a), { dom: s };
}
function Js(i) {
  const t = i.extend, s = $("path"), e = x("adj1", i, 0.5 * Math.min(t.w, t.h)), r = x("adj2", i, 0.5 * Math.min(t.w, t.h)), a = [
    "M0,0",
    `L${r},0`,
    `L${r},${t.h - e}`,
    `L${t.w},${t.h - e}`,
    `L${t.w},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" ");
  return s.setAttribute("d", a), {
    dom: s,
    textArea: { top: t.h - e, bottom: 0, left: 0, right: 0, w: t.w, h: e }
  };
}
function Ks(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, 0.5 * Math.min(t.w, t.h)), a = [`M${t.w * e / t.h},0`, `L${t.w},0`, `L0,${t.h}`, `L0,${e}`, "Z"].join(" ");
  s.setAttribute("d", a);
  const n = A("adj", i, 0.5), o = 0.5 * (1 - n) * t.h, l = 0.5 * (1 - n) * t.w;
  return {
    dom: s,
    textArea: { top: 0, bottom: o, left: 0, right: l, w: t.w - l, h: t.h - o }
  };
}
function Ns(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, 0.25 * Math.min(t.w, t.h)), r = [
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
function tr(i) {
  const t = i.extend, s = $("path"), e = x("adj", i, 0.16667 * Math.min(t.w, t.h)), r = [
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
  const a = 0.72 * e;
  return {
    dom: s,
    textArea: { top: a, bottom: a, left: a, right: a, w: t.w - 1.44 * e, h: t.w - 1.44 * e }
  };
}
function er(i) {
  const t = i.extend, s = i.background, e = $("g"), r = $("path"), a = x("adj", i, 0.25 * Math.min(t.w, t.h)), n = [
    `M0,${a / 2}`,
    `L0,${t.h - a / 2}`,
    `A${t.w / 2},${a / 2} 0 0 0 ${t.w},${t.h - a / 2}`,
    `L${t.w},${a / 2}`,
    `A${t.w / 2},${a / 2} 0 0 1 0,${a / 2}`,
    "Z"
  ].join(" ");
  r.setAttribute("d", n);
  const o = $("ellipse");
  return o.setAttribute("cx", t.w / 2 + "px"), o.setAttribute("cy", a / 2 + "px"), o.setAttribute("rx", t.w / 2 + "px"), o.setAttribute("ry", a / 2 + "px"), (s == null ? void 0 : s.type) === "solidFill" && o.setAttribute("fill", S(s, { light: 0.5 }) || "transparent"), e.appendChild(r), e.appendChild(o), {
    dom: e,
    textArea: { top: a, bottom: 0, left: 0, right: 0, w: t.w, h: t.h - a }
  };
}
function sr(i) {
  const t = i.extend, s = i.background, e = x("adj", i, 0.25 * Math.min(t.w, t.h)), r = $("g"), a = $("path");
  a.setAttribute("d", [`M0,${e}`, `L${t.w - e},${e}`, `L${t.w - e},${t.h}`, `L0,${t.h}`, "Z"].join(" "));
  const n = $("path");
  n.setAttribute("d", [`M0,${e}`, `L${e},0`, `L${t.w},0`, `L${t.w - e},${e}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", S(s, { light: 0.8 }) || "transparent");
  const o = $("path");
  return o.setAttribute("d", [`M${t.w},0`, `L${t.w - e},${e}`, `L${t.w - e},${t.h}`, `L${t.w},${t.h - e}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && o.setAttribute("fill", S(s, { dark: 0.6 }) || "transparent"), r.appendChild(a), r.appendChild(n), r.appendChild(o), {
    dom: r,
    textArea: { top: e, bottom: 0, left: 0, right: e, w: t.w - e, h: t.h - e }
  };
}
function rr(i) {
  const t = i.extend, s = i.background, e = x("adj", i, 0.125 * Math.min(t.w, t.h)), r = $("g"), a = $("path");
  a.setAttribute("d", [`M${e},${e}`, `L${t.w - e},${e}`, `L${t.w - e},${t.h - e}`, `L${e},${t.h - e}`, "Z"].join(" "));
  const n = $("path");
  n.setAttribute("d", ["M0,0", `L${e},${e}`, `L${t.w - e},${e}`, `L${t.w},0`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && n.setAttribute("fill", S(s, { light: 0.8 }) || "transparent");
  const o = $("path");
  o.setAttribute("d", [`M${t.w},0`, `L${t.w - e},${e}`, `L${t.w - e},${t.h - e}`, `L${t.w},${t.h}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && o.setAttribute("fill", S(s, { dark: 0.6 }) || "transparent");
  const l = $("path");
  l.setAttribute("d", [`M${t.w},${t.h}`, `L${t.w - e},${t.h - e}`, `L${e},${t.h - e}`, `L0,${t.h}`, "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && l.setAttribute("fill", S(s, { dark: 0.625 }) || "transparent");
  const p = $("path");
  return p.setAttribute("d", [`M0,${t.h}`, `L${e},${t.h - e}`, `L${e},${e}`, "L0,0", "Z"].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && p.setAttribute("fill", S(s, { light: 0.6 }) || "transparent"), r.appendChild(a), r.appendChild(n), r.appendChild(o), r.appendChild(l), r.appendChild(p), {
    dom: r,
    textArea: { top: e, bottom: e, left: e, right: e, w: t.w - 2 * e, h: t.h - 2 * e }
  };
}
function ir(i) {
  const t = i.extend, s = x("adj", i, 0.25 * Math.min(t.w, t.h)), e = $("path"), r = [
    `M0,${t.h / 2}`,
    `A${t.w / 2},${t.h / 2} 0 1,1 0,${t.h / 2 + 1}`,
    "Z",
    `M${t.w - s},${t.h / 2}`,
    `A${t.w / 2 - s},${t.h / 2 - s} 0 1,0 ${t.w - s},${t.h / 2 + 1}`,
    "Z"
  ].join(" ");
  return e.setAttribute("d", r), { dom: e, textArea: N(i) };
}
function ar(i) {
  const t = i.extend, s = x("adj", i, 0.25 * Math.min(t.w, t.h)), e = $("path"), r = Math.atan(t.h / t.w), a = s / 2 / Math.sin(r), n = t.w / 2, o = t.h / 2, l = -1 * t.h / t.w, p = t.h * a / t.w, h = t.w / 2 - s, f = t.h / 2 - s, m = -2 * h * h * l * p, u = Math.sqrt(
    Math.pow(2 * h * h * l * p, 2) - 4 * (f * f + h * h * l * l) * h * h * (p * p - f * f)
  ), d = 2 * (f * f + h * h * l * l), g = (m - u) / d, y = l * g + p, b = (m + u) / d, w = l * b + p, L = -t.h * a / t.w, P = -2 * h * h * l * L, k = Math.sqrt(
    Math.pow(2 * h * h * l * L, 2) - 4 * (f * f + h * h * l * l) * h * h * (L * L - f * f)
  ), M = 2 * (f * f + h * h * l * l), v = (P - k) / M, _ = l * v + L, T = (P + k) / M, I = l * T + L, j = [
    `M0,${t.h / 2}`,
    `A${t.w / 2},${t.h / 2} 0 1,1 0,${t.h / 2 + 1}`,
    "Z",
    `M${n + b},${o - w}`,
    `A${h},${f} 0 0 0 ${n + g},${o - y}`,
    "Z",
    `M${n + v},${o - _}`,
    `A${h},${f} 0 0 0 ${n + T},${o - I}`,
    "Z"
  ].join(" ");
  return e.setAttribute("d", j), { dom: e, textArea: N(i) };
}
function or(i) {
  const t = i.extend, s = Math.min(t.w, t.h), e = $("path"), r = A("adj1", i, 180), a = A("adj2", i, 0), n = x("adj3", i, 0.25 * s), o = t.w / 2, l = t.h / 2, p = t.w / 2, h = t.h / 2, f = t.w / 2 - n, m = t.h / 2 - n, [u, d] = E(r, o, l, p, h), [g, y] = E(a, o, l, p, h), [b, w] = E(r, o, l, f, m), [L, P] = E(a, o, l, f, m), k = K(r, a), M = [
    `M${u},${d}`,
    `A${p} ${h} 0 ${k} 1 ${g} ${y}`,
    `L${L},${P}`,
    `A${f} ${m} 0 ${k} 0 ${b} ${w}`,
    "Z"
  ].join(" ");
  e.setAttribute("d", M);
  const v = [[u, d], [g, y], [b, w], [L, P]];
  r > a && v.push([t.w, t.h / 2]), (a > 180 && a <= 360 && r < 180 || r > a && a >= 0 && a < 180 && r < 180) && v.push([0, t.h / 2]), (r < a && r < 90 && a > 90 || r > a && a > 90 || r > a && r < 90) && v.push([t.w / 2, t.h]), (r < a && r < 270 && a > 270 || r > a && a > 270 || r > a && r < 270) && v.push([t.w / 2, 0]);
  let _ = 1 / 0, T = 1 / 0, I = -1 / 0, j = -1 / 0;
  return v.forEach((F) => {
    _ = Math.min(F[0], _), T = Math.min(F[1], T), I = Math.max(F[0], I), j = Math.max(F[1], j);
  }), {
    dom: e,
    textArea: { top: T, bottom: t.h - j, left: _, right: t.w - I, w: I - _, h: j - T }
  };
}
function nr(i) {
  const t = i.extend, s = i.background, e = $("g"), r = x("adj", i, 0.16667 * Math.min(t.w, t.h)), a = $("path");
  a.setAttribute("d", [
    "M0,0",
    `L${t.w},0`,
    `L${t.w},${t.h - r}`,
    `L${t.w - r},${t.h}`,
    `L0,${t.h}`,
    "Z"
  ].join(" "));
  const n = r * Math.cos(Math.PI / 4) / Math.cos(Math.PI / 6) * Math.cos(75 / 180 * Math.PI), o = $("path");
  return o.setAttribute("d", [
    `M${t.w - r + n}, ${t.h - r + n}`,
    `L${t.w},${t.h - r}`,
    `L${t.w - r},${t.h}`,
    "Z"
  ].join(" ")), (s == null ? void 0 : s.type) === "solidFill" && o.setAttribute("fill", S(s, { dark: 0.6 }) || "transparent"), e.appendChild(a), e.appendChild(o), {
    dom: e,
    textArea: { top: 0, bottom: r, left: 0, right: 0, w: t.w, h: t.h - r }
  };
}
const cr = "http://www.w3.org/2000/svg";
function lr(i, t, s) {
  const e = i.background || {}, r = i.extend, { base64: a, alpha: n, fillRect: o = {} } = e, { b: l = 0, t: p = 0, l: h = 0, r: f = 0 } = o, m = $("defs"), u = $("pattern");
  u.setAttribute("id", "background_" + i.uuid), u.setAttribute("patternUnits", "userSpaceOnUse"), u.setAttribute("width", r.w + ""), u.setAttribute("height", r.h + "");
  const d = $("image");
  d.setAttribute("href", a), d.setAttribute("preserveAspectRatio", "none");
  const g = r.w * h, y = r.h * p, b = r.w * (1 - h - f), w = r.h * (1 - p - l);
  d.setAttribute("width", b + ""), d.setAttribute("height", w + ""), d.setAttribute("x", g + ""), d.setAttribute("y", y + ""), typeof n == "number" && d.setAttribute("opacity", n + ""), u.appendChild(d), m.appendChild(u), t.appendChild(m), s.setAttribute("fill", `url(#background_${i.uuid})`);
}
function hr(i, t, s) {
  const e = i.background || {}, { gsList: r, lin: a, path: n, tileRect: o = {} } = e, l = $("defs"), p = $(n === "circle" ? "radialGradient" : "linearGradient");
  if (p.setAttribute("id", "background_grad_fill_" + i.uuid), (r || []).slice().sort((f, m) => f.pos - m.pos).forEach((f) => {
    const m = $("stop");
    m.setAttribute("offset", `${100 * f.pos}%`), m.setAttribute("stop-color", S(f.color)), p.appendChild(m);
  }), n === "circle") {
    const { r: f, l: m, t: u, b: d } = o;
    f === -1 ? p.setAttribute("cx", "100%") : m === -1 && p.setAttribute("cx", "0%"), u === -1 ? p.setAttribute("cy", "0%") : d === -1 && p.setAttribute("cy", "100%");
  } else a != null && a.ang && p.setAttribute("gradientTransform", `rotate(${a.ang})`);
  l.appendChild(p), t.appendChild(l), s.setAttribute("fill", `url(#background_grad_fill_${i.uuid})`);
}
function pr(i) {
  return !i || !i.type || i.type === "solid" ? "" : ({
    sysDot: [1, 1],
    sysDash: [3, 1],
    dash: [4, 3],
    dashDot: [4, 3, 1, 3],
    lgDash: [8, 3],
    lgDashDot: [8, 3, 1, 3],
    lgDashDotDot: [8, 3, 1, 3, 1, 3]
  }[i.type] || []).map((s) => s * i.width).join(",");
}
function wt(i, t) {
  const s = i.extend, e = i.offset, r = i.border, a = i.background, n = i.rotate, o = i.flipH, l = i.flipV, p = document.createElement("div");
  p.className = `shape-wrapper shape-${i.shape}`, p.style.setProperty("position", "absolute"), p.style.setProperty("width", (s.w || 1) + "px"), p.style.setProperty("height", (s.h || 1) + "px"), p.style.setProperty("left", e.x + "px"), p.style.setProperty("top", e.y + "px");
  let h;
  const f = document.createElementNS(cr, "svg");
  f.style.setProperty("position", "absolute"), f.setAttribute("width", "100%"), f.setAttribute("height", "100%"), f.style.setProperty("left", "0"), f.style.setProperty("top", "0"), f.style.overflow = "visible";
  let m = { left: 0, top: 0, bottom: 0, right: 0, w: s.w, h: s.h }, u = !0, d;
  switch (i.shape) {
    case "customGeom":
      d = js(i), U(i, f, d.dom);
      break;
    case "flowChartProcess":
    case "rect":
      d = { dom: Le(i) };
      break;
    case "snip1Rect":
      d = { dom: Ye(i) };
      break;
    case "snip2SameRect":
      d = { dom: Je(i) };
      break;
    case "snip2DiagRect":
      d = { dom: Ke(i) };
      break;
    case "snipRoundRect":
      d = { dom: Ne(i) };
      break;
    case "roundRect":
      d = { dom: Ve(i) };
      break;
    case "round1Rect":
      d = { dom: Ue(i) };
      break;
    case "round2SameRect":
      d = { dom: Qe(i) };
      break;
    case "round2DiagRect":
      d = { dom: qe(i) };
      break;
    case "triangle":
      d = Rs(i);
      break;
    case "rtTriangle":
      d = Ts(i);
      break;
    case "ellipse":
      d = Is(i);
      break;
    case "line": {
      const w = ts(i);
      U(i, f, w), u = !1, d = { dom: w, hasFill: !1 };
      break;
    }
    case "straightConnector1": {
      const w = es(i);
      U(i, f, w), u = !1, d = { dom: w, hasFill: !1 };
      break;
    }
    case "bentConnector3": {
      const w = ss(i);
      U(i, f, w), u = !1, d = { dom: w, hasFill: !1 };
      break;
    }
    case "curvedConnector3": {
      const w = rs(i);
      U(i, f, w), u = !1, d = { dom: w, hasFill: !1 };
      break;
    }
    case "parallelogram":
      d = Bs(i);
      break;
    case "trapezoid":
      d = _s(i);
      break;
    case "diamond":
      d = Es(i);
      break;
    case "pentagon":
      d = Fs(i);
      break;
    case "hexagon":
      d = Ds(i);
      break;
    case "heptagon":
      d = Os(i);
      break;
    case "octagon":
      d = zs(i);
      break;
    case "decagon":
      d = Gs(i);
      break;
    case "dodecagon":
      d = Zs(i);
      break;
    case "pie":
      d = Hs(i);
      break;
    case "arc":
      d = Ws(i);
      break;
    case "bracketPair":
      d = Us(i);
      break;
    case "bracePair":
      d = Qs(i);
      break;
    case "chord":
      d = Xs(i);
      break;
    case "teardrop":
      d = Vs(i);
      break;
    case "frame":
      d = qs(i);
      break;
    case "halfFrame":
      d = Ys(i);
      break;
    case "corner":
      d = Js(i);
      break;
    case "diagStripe":
      d = Ks(i);
      break;
    case "plus":
      d = Ns(i);
      break;
    case "plaque":
      d = tr(i);
      break;
    case "can":
      d = er(i);
      break;
    case "cube":
      d = sr(i);
      break;
    case "bevel":
      d = rr(i);
      break;
    case "donut":
      d = ir(i);
      break;
    case "noSmoking":
      d = ar(i);
      break;
    case "rightArrow":
      d = is(i);
      break;
    case "leftArrow":
      d = as(i);
      break;
    case "upArrow":
      d = os(i);
      break;
    case "downArrow":
      d = ns(i);
      break;
    case "leftRightArrow":
      d = cs(i);
      break;
    case "upDownArrow":
      d = ls(i);
      break;
    case "quadArrow":
      d = hs(i);
      break;
    case "leftRightUpArrow":
      d = ps(i);
      break;
    case "bentArrow":
      d = ds(i);
      break;
    case "uturnArrow":
      d = fs(i);
      break;
    case "leftUpArrow":
      d = us(i);
      break;
    case "bentUpArrow":
      d = ms(i);
      break;
    case "curvedRightArrow":
      d = $s(i);
      break;
    case "curvedLeftArrow":
      d = ws(i);
      break;
    case "curvedUpArrow":
      d = bs(i);
      break;
    case "curvedDownArrow":
      d = ys(i);
      break;
    case "stripedRightArrow":
      d = xs(i);
      break;
    case "notchedRightArrow":
      d = gs(i);
      break;
    case "homePlate":
      d = Ls(i);
      break;
    case "chevron":
      d = As(i);
      break;
    case "blockArc":
      d = or(i);
      break;
    case "foldedCorner":
      d = nr(i);
      break;
    case "rightArrowCallout":
      d = Ps(i);
      break;
    case "leftArrowCallout":
      d = Ms(i);
      break;
    case "upArrowCallout":
      d = Ss(i);
      break;
    case "downArrowCallout":
      d = ks(i);
      break;
    case "leftRightArrowCallout":
      d = Cs(i);
      break;
    case "quadArrowCallout":
      d = vs(i);
      break;
  }
  if (d && (h = d.dom, d.textArea && (m = d.textArea), d.hasFill === !1 && (u = !1)), h) {
    if (u)
      if (a && a.type === "blipFill")
        lr(i, f, h);
      else if (a && a.type === "gradFill")
        hr(i, f, h);
      else {
        const P = S(a);
        h.setAttribute("fill", P || "transparent");
      }
    else
      h.setAttribute("fill", "transparent");
    r.width ? (h.setAttribute("stroke-width", r.width + ""), h.setAttribute("stroke", S(r.color) || "transparent")) : h.setAttribute("stroke-width", "0");
    const w = pr(r);
    if (w && h.setAttribute("stroke-dasharray", w), r.width) {
      let P = "square";
      switch (r.cap) {
        case "sq":
          P = "square";
          break;
        case "rnd":
          P = "round";
          break;
        case "flat":
          P = "butt";
          break;
        default:
          P = "square";
          break;
      }
      h.setAttribute("stroke-linecap", P);
    }
    const L = r.lineJoin || "round";
    h.setAttribute("stroke-linejoin", L), L === "miter" && r.miterLim && h.setAttribute("stroke-miterlimit", r.miterLim + ""), f.appendChild(h);
  }
  const g = [];
  o && g.push("scaleX(-1)"), l && g.push("scaleY(-1)"), g.length > 0 && (f.style.transform = g.join(" ")), p.appendChild(f);
  const y = { left: m.left, top: m.top, right: m.right || 0, bottom: m.bottom, w: m.w, h: m.h }, b = Xe(i.textBody, y, i.isTextBox, t);
  return b && p.appendChild(b), n && (p.style.transform = `rotate(${n}deg)`), p;
}
function Ae(i) {
  const t = i.extend, s = i.offset, e = i.tr, r = i.tableGrid.gridCol, a = r.reduce((p, h) => p + (h.width || 0), 0), n = Math.ceil(Math.max(a, t.w)), o = document.createElement("div");
  o.style.position = "absolute", o.style.left = s.x + "px", o.style.top = s.y + "px", o.style.width = n + "px", o.style.height = t.h + "px", o.style.overflow = "hidden";
  const l = document.createElement("table");
  return l.style.borderCollapse = "collapse", l.style.tableLayout = "fixed", l.style.width = "100%", e.forEach((p) => {
    const h = p.props.height, f = document.createElement("tr");
    f.style.height = h + "px", p.td.forEach((m, u) => {
      var _, T, I;
      const d = m.props, g = m.inheritTcStyle, y = m.inheritTcTxStyle, b = m.paragraphs;
      if (d.vMerge || d.hMerge) return;
      const w = document.createElement("td");
      let L = 0;
      const P = d.gridSpan || 1;
      for (let j = u; j < u + P && j < r.length; j++)
        L += ((_ = r[j]) == null ? void 0 : _.width) || 0;
      w.style.width = (L || 30) + "px", w.style.boxSizing = "border-box", w.style.wordBreak = "break-word", w.style.overflowWrap = "break-word", d.rowSpan && w.setAttribute("rowspan", d.rowSpan + ""), d.gridSpan && w.setAttribute("colspan", d.gridSpan + "");
      const k = d.noFill ? void 0 : d.background || (g == null ? void 0 : g.background);
      k && (w.style.background = S(k));
      const M = { ...g == null ? void 0 : g.border, ...d.border }, v = (j) => j ? j.toLowerCase().includes("dash") ? "dashed" : j.toLowerCase().includes("dot") ? "dotted" : "solid" : "solid";
      M.bottom && (w.style.borderBottom = `${M.bottom.width}px ${v(M.bottom.type)} ${S(M.bottom.color)}`), M.top && (w.style.borderTop = `${M.top.width}px ${v(M.top.type)} ${S(M.top.color)}`), M.left && (w.style.borderLeft = `${M.left.width}px ${v(M.left.type)} ${S(M.left.color)}`), M.right && (w.style.borderRight = `${M.right.width}px ${v(M.right.type)} ${S(M.right.color)}`), d.marT && (w.style.paddingTop = d.marT + "px"), d.marB && (w.style.paddingBottom = d.marB + "px"), d.marL && (w.style.paddingLeft = d.marL + "px"), d.marR && (w.style.paddingRight = d.marR + "px"), d.anchor === "ctr" ? w.style.verticalAlign = "middle" : d.anchor === "b" && (w.style.verticalAlign = "bottom");
      for (let j = 0; j < b.length; j++) {
        const F = b[j];
        y && (y.bold && ((T = F.rows) == null || T.forEach((O) => {
          O.props && !O.props.bold && (O.props.bold = !0);
        })), y.color && ((I = F.rows) == null || I.forEach((O) => {
          O.props && !O.props.color && (O.props.color = y.color);
        })));
        const tt = ge(F, j + 1, {
          isFirst: j === 0,
          isLast: j === b.length - 1,
          isTable: !0
        });
        w.appendChild(tt);
      }
      f.appendChild(w);
    }), l.appendChild(f);
  }), o.appendChild(l), o;
}
function Pe(i) {
  const t = document.createElement("div"), s = i.extend, e = i.offset, r = i.flipV, a = i.flipH, n = i.rotate;
  t.className = "smart-chart-diagram", t.style.position = "absolute", t.style.left = e.x + "px", t.style.top = e.y + "px", t.style.width = s.w + "px", t.style.height = s.h + "px";
  const o = [];
  a && o.push("scaleX(-1)"), r && o.push("scaleY(-1)"), n && o.push(`rotate(${n}deg)`), t.style.transformOrigin = "center center", t.style.transform = o.join(" ");
  for (let l = 0; l < i.nodes.length; l++) {
    const p = i.nodes[l];
    let h;
    p instanceof at ? h = $t(p) : p instanceof W && (h = wt(p)), h && t.appendChild(h);
  }
  return t;
}
function Me(i) {
  const t = document.createElement("div"), s = i.extend, e = i.offset;
  if (t.style.position = "absolute", t.style.left = e.x + "px", t.style.top = e.y + "px", t.style.width = s.w + "px", t.style.height = s.h + "px", i.options && i.options.series && i.options.series.length > 0)
    try {
      const r = je.init(t, null, {
        renderer: "svg",
        width: s.w,
        height: s.h
      }), a = {
        ...i.options,
        animation: !1,
        animationDuration: 0,
        animationDurationUpdate: 0,
        stateAnimation: { duration: 0 }
      };
      r.setOption(a, {
        notMerge: !0,
        lazyUpdate: !1
      });
    } catch {
    }
  return t;
}
function Se(i, t) {
  const s = document.createElement("div"), e = i.extend, r = i.offset;
  s.style.position = "absolute", s.style.left = r.x + "px", s.style.top = r.y + "px", s.style.width = e.w + "px", s.style.height = e.h + "px";
  const a = [];
  i.flipH && a.push("scaleX(-1)"), i.flipV && a.push("scaleY(-1)"), i.rotate && a.push(`rotate(${i.rotate}deg)`), s.style.transformOrigin = "center center", s.style.transform = a.join(" ");
  for (let n = 0; n < i.nodes.length; n++) {
    const o = i.nodes[n];
    let l;
    o instanceof at ? l = $t(o) : o instanceof W ? l = wt(o, t) : o instanceof mt ? l = Se(o, t) : o instanceof ut ? l = Me(o) : o instanceof dt ? l = Ae(o) : o instanceof ft && (l = Pe(o)), l && s.appendChild(l);
  }
  return s;
}
class we {
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
    e.classList.add("pptx-preview-slide-wrapper"), e.classList.add(`pptx-preview-slide-wrapper-${t}`), e.style.setProperty("width", this.renderPort.width + "px"), e.style.setProperty("height", this.renderPort.height + "px"), e.style.setProperty("position", this.options.mode === "slide" ? "absolute" : "relative"), this.options.mode === "slide" && e.style.setProperty("top", (this.options.viewPort.height - this.renderPort.height) / 2 + "px"), e.style.margin = "0 auto 10px", e.style.setProperty("background", "#fff"), e.style.setProperty("overflow", "hidden");
    const r = t + 1;
    this._renderBackground(s, e);
    const a = this._collectPlaceholderKeys(s.nodes), n = this._collectPlaceholderKeys(s.slideLayout.nodes), o = /* @__PURE__ */ new Set([...n, ...a]), l = a;
    this._renderSlideMaster(s.slideMaster, e, r, o), this._renderSlideLayout(s.slideLayout, e, r, l), this._renderSlide(s, e, r), this.wrapper.append(e);
  }
  _renderSlideMaster(t, s, e, r) {
    const a = document.createElement("div");
    a.classList.add("slide-master-wrapper"), a.style.setProperty("position", "absolute"), a.style.setProperty("left", "0"), a.style.setProperty("top", "0"), a.style.setProperty("width", this.pptx.width + "px"), a.style.setProperty("height", this.pptx.height + "px"), a.style.setProperty("transform", `scale(${this.scale})`), a.style.setProperty("transform-origin", "0 0");
    const n = [...t.nodes].filter(
      (o) => this._shouldRenderMasterNode(o) && !this._isOverridden(o, r)
    );
    n.sort((o, l) => o.order > l.order ? 1 : -1);
    for (const o of n) {
      const l = this._renderNode(o, e);
      l && a.append(l);
    }
    s.append(a);
  }
  _renderSlideLayout(t, s, e, r) {
    const a = document.createElement("div");
    a.classList.add("slide-layout-wrapper"), a.style.setProperty("position", "absolute"), a.style.setProperty("left", "0"), a.style.setProperty("top", "0"), a.style.setProperty("width", this.pptx.width + "px"), a.style.setProperty("height", this.pptx.height + "px"), a.style.setProperty("transform", `scale(${this.scale})`), a.style.setProperty("transform-origin", "0 0");
    const n = [...t.nodes].filter(
      (o) => this._shouldRenderMasterNode(o) && !this._isOverridden(o, r)
    );
    n.sort((o, l) => o.order > l.order ? 1 : -1);
    for (const o of n) {
      const l = this._renderNode(o, e);
      l && a.append(l);
    }
    s.append(a);
  }
  _renderSlide(t, s, e) {
    const r = document.createElement("div");
    r.classList.add("slide-wrapper"), r.style.setProperty("position", "absolute"), r.style.setProperty("left", "0"), r.style.setProperty("top", "0"), r.style.setProperty("width", this.pptx.width + "px"), r.style.setProperty("height", this.pptx.height + "px"), r.style.setProperty("transform", `scale(${this.scale})`), r.style.setProperty("transform-origin", "0 0");
    const a = [...t.nodes];
    a.sort((n, o) => n.order > o.order ? 1 : -1);
    for (const n of a) {
      const o = this._renderNode(n, e);
      o && r.append(o);
    }
    s.append(r);
  }
  _renderNode(t, s) {
    if (t instanceof at) return $t(t);
    if (t instanceof W) return wt(t, s);
    if (t instanceof mt) return Se(t, s);
    if (t instanceof ft) return Pe(t);
    if (t instanceof dt) return Ae(t);
    if (t instanceof ut) return Me(t);
  }
  /**
   * Determines if a node from a slide master or layout should be rendered.
   * Include: userDrawn shapes, non-placeholder shapes, and informational placeholders (sldNum, ftr, dt).
   * Exclude: content placeholders (title, body, etc.) that are empty layout templates.
   */
  _shouldRenderMasterNode(t) {
    return t.userDrawn || !t.type && !t.idx ? !0 : (/* @__PURE__ */ new Set(["sldNum", "ftr", "dt"])).has(t.type);
  }
  /** Collect placeholder keys (type or idx) from a node list. */
  _collectPlaceholderKeys(t) {
    const s = /* @__PURE__ */ new Set();
    for (const e of t)
      e.type ? s.add("type:" + e.type) : e.idx && s.add("idx:" + e.idx);
    return s;
  }
  /** Check if a placeholder node is overridden by a higher layer. */
  _isOverridden(t, s) {
    return s ? !!(t.type && s.has("type:" + t.type) || !t.type && t.idx && s.has("idx:" + t.idx)) : !1;
  }
  _renderBackground(t, s) {
    var a;
    const e = document.createElement("div");
    e.classList.add("slide-background"), e.style.setProperty("position", "absolute"), e.style.setProperty("left", "0"), e.style.setProperty("top", "0"), e.style.setProperty("width", "100%"), e.style.setProperty("height", "100%");
    let r = t.background;
    if (r.type === "none" && (r = t.slideLayout.background), r.type === "none" && (r = t.slideMaster.background), r.type === "blipFill") {
      const { base64: n, alpha: o, fillRect: l = {} } = r, { b: p = 0, t: h = 0, l: f = 0, r: m = 0 } = l, u = this.renderPort.width * f, d = this.renderPort.height * h, g = this.renderPort.width * (1 - f - m), y = this.renderPort.height * (1 - h - p);
      e.style.backgroundImage = `url(${n})`, e.style.backgroundSize = `${g} ${y}`, e.style.backgroundPosition = `${u}px ${d}px`, o && (e.style.opacity = o + ""), e.style.backgroundRepeat = "no-repeat";
    } else if (r.type === "solidFill") {
      const n = S(t.background) || S(t.slideLayout.background) || S(t.slideMaster.background);
      n ? e.style.setProperty("background", n) : e.style.setProperty("background", "#fff");
    } else if (r.type === "gradFill")
      if (r.path === "circle") {
        const n = r.tileRect || {}, { b: o, t: l, l: p, r: h } = n;
        let f = "radial-gradient(circle at ";
        h === -1 ? f += " right" : p === -1 && (f += " left"), l === -1 ? f += " top" : o === -1 && (f += " bottom"), !o && !l && !p && !h && (f += " center"), f += ",", f += r.gsList.map((m) => `${S(m.color)} ${100 * m.pos + "%"}`).join(","), e.style.setProperty("background", f);
      } else {
        let o = `linear-gradient(${(((a = r.lin) == null ? void 0 : a.ang) || 0) + 90}deg,`;
        o += r.gsList.map((l) => `${S(l.color)} ${100 * l.pos + "%"}`).join(","), e.style.setProperty("background", o);
      }
    s.append(e);
  }
}
const H = {};
function et(i, t) {
  if (H[i])
    for (let s = 0; s < H[i].length; s++)
      H[i][s](t);
}
function pt(i, t) {
  H ? H[i] && (H[i] = H[i].filter((s) => s !== t)) : H[i] = [];
}
class dr {
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
    t && this.wrapper.removeChild(t), et("removeSlide");
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
    return et("destroy"), pt("destroy"), new Promise((s, e) => {
      this.wrapper.innerHTML = "";
      const r = this.pptx = new pe();
      r.load(t).then(() => {
        try {
          const a = this.htmlRender = new we(this.wrapper, r, {
            viewPort: { width: this.options.width, height: this.options.height || 0 },
            mode: this.options.mode
          });
          if (this.options.mode === "slide") {
            const n = this.renderNextButton();
            n.onclick = () => this.renderNextSlide(), this.wrapper.append(n);
            const o = this.renderPreButton();
            o.onclick = () => this.renderPreSlide(), this.wrapper.append(o), this.renderPagination(this.wrapper), this._addPre(this.wrapper), this.currentIndex = 0, a.renderSlide(0);
          } else
            for (let n = 0; n < r.slides.length; n++)
              a.renderSlide(n);
          s(r);
        } catch (a) {
          e(a);
        }
      }).catch((a) => e(a));
    });
  }
  load(t) {
    return et("destroy"), pt("destroy"), new Promise((s, e) => {
      this.wrapper.innerHTML = "";
      const r = this.pptx = new pe();
      r.load(t).then(() => {
        try {
          this.htmlRender = new we(this.wrapper, r, {
            viewPort: { width: this.options.width, height: this.options.height || 0 },
            mode: this.options.mode
          }), s(r);
        } catch (a) {
          e(a);
        }
      }).catch((a) => e(a));
    });
  }
  renderSingleSlide(t) {
    this.removeCurrentSlide(), this.currentIndex = t, this.htmlRender.renderSlide(this.currentIndex);
  }
  destroy() {
    et("destroy"), pt("destroy");
  }
}
function $r(i, t) {
  return new dr(i, t);
}
export {
  dr as PPTXPreviewer,
  $r as init
};
