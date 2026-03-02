export function arrayBufferToBase64(arrayBuffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(arrayBuffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function extractFileExtension(filename: any): any {
  if (!filename) return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop() : '';
}

export function getImageType(extension: any): string {
  const map: { [key: string]: string } = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    gif: 'image/gif',
    bmp: 'image/bmp',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    emf: 'image/x-emf',
    wmf: 'image/x-wmf',
    tif: 'image/tiff',
    tiff: 'image/tiff',
  };
  return map[extension?.toLowerCase()] || 'image/png';
}
