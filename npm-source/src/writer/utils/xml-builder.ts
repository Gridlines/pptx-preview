export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function xmlDecl(): string {
  return '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
}

export function tag(
  name: string,
  attrs?: Record<string, string | number | boolean | undefined>,
  children?: string
): string {
  const attrStr = attrs
    ? Object.entries(attrs)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => ` ${k}="${escapeXml(String(v))}"`)
        .join('')
    : '';

  if (children === undefined || children === null) {
    return `<${name}${attrStr}/>`;
  }
  return `<${name}${attrStr}>${children}</${name}>`;
}
