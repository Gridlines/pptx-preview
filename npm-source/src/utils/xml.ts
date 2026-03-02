var orderCounter = 1;

export function xmlToJSON(xmlString: any) {
  const LT = '<'.charCodeAt(0);
  const GT = '>'.charCodeAt(0);
  const DASH = '-'.charCodeAt(0);
  const SLASH = '/'.charCodeAt(0);
  const EXCL = '!'.charCodeAt(0);
  const SINGLE_QUOTE = "'".charCodeAt(0);
  const DOUBLE_QUOTE = '"'.charCodeAt(0);
  const QUESTION = '?'.charCodeAt(0);
  const WHITESPACE = '\r\n\t>/= ';
  let pos = 0;

  orderCounter = 1;

  return normalizeChildren(
    (function parseChildren(): any[] {
      const children: any[] = [];
      while (xmlString[pos]) {
        if (xmlString.charCodeAt(pos) === LT) {
          if (xmlString.charCodeAt(pos + 1) === SLASH) {
            pos = xmlString.indexOf('>', pos);
            return children;
          }
          if (xmlString.charCodeAt(pos + 1) === EXCL) {
            if (xmlString.charCodeAt(pos + 2) === DASH) {
              while (
                xmlString.charCodeAt(pos) !== GT ||
                xmlString.charCodeAt(pos - 1) !== DASH ||
                xmlString.charCodeAt(pos - 2) !== DASH ||
                pos === -1
              ) {
                pos = xmlString.indexOf('>', pos + 1);
              }
              if (pos === -1) pos = xmlString.length;
            } else {
              for (pos += 2; xmlString.charCodeAt(pos) !== GT; pos++);
            }
            pos++;
            continue;
          }
          if (xmlString.charCodeAt(pos + 1) === QUESTION) {
            pos = xmlString.indexOf('>', pos);
            pos++;
            continue;
          }

          let nameStart = ++pos;
          while (WHITESPACE.indexOf(xmlString[pos]) === -1) pos++;
          const tagName = xmlString.slice(nameStart, pos);

          let hasAttrs = false;
          let attrs: any = {};
          while (xmlString.charCodeAt(pos) !== GT) {
            const charCode = xmlString.charCodeAt(pos);
            if ((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123)) {
              nameStart = pos;
              while (WHITESPACE.indexOf(xmlString[pos]) === -1) pos++;
              const attrName = xmlString.slice(nameStart, pos);
              let quote = xmlString.charCodeAt(pos);
              while (quote !== SINGLE_QUOTE && quote !== DOUBLE_QUOTE) {
                pos++;
                quote = xmlString.charCodeAt(pos);
              }
              const quoteChar = xmlString[pos];
              const valueStart = ++pos;
              pos = xmlString.indexOf(quoteChar, valueStart);
              const value = xmlString.slice(valueStart, pos);
              if (!hasAttrs) {
                attrs = {};
                hasAttrs = true;
              }
              attrs[attrName] = value;
            }
            pos++;
          }

          let childNodes: any[] = [];
          if (xmlString.charCodeAt(pos - 1) !== SLASH) {
            pos++;
            childNodes = parseChildren();
          }
          children.push({ children: childNodes, tagName, attrs });
        } else {
          const textStart = pos;
          pos = xmlString.indexOf('<', pos) - 1;
          if (pos === -2) pos = xmlString.length;
          const text = xmlString.slice(textStart, pos + 1);
          if (text.length > 0) children.push(text);
        }
        pos++;
      }
      return children;
    })()
  );
}

function normalizeChildren(children: any[]): any {
  const result: any = {};
  if (children === undefined) return {};
  if (children.length === 1 && typeof children[0] === 'string') return children[0];

  children.forEach((child) => {
    if (!result[child.tagName]) result[child.tagName] = [];
    if (typeof child === 'object') {
      const normalized = normalizeChildren(child.children);
      if (typeof normalized === 'object') {
        if (child.attrs) normalized.attrs = child.attrs;
        if (normalized.attrs === undefined) {
          normalized.attrs = { order: orderCounter };
        } else {
          normalized.attrs.order = orderCounter;
        }
      }
      orderCounter++;
      result[child.tagName].push(normalized);
    }
  });

  for (const key in result) {
    if (result[key].length === 1) result[key] = result[key][0];
  }
  return result;
}
