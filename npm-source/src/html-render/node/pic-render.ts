import PicNode from '../../reader/node/PicNode';

// MIME types that browsers cannot render as <img> src
const UNSUPPORTED_IMAGE_TYPES = ['image/x-emf', 'image/x-wmf'];

export function renderPic(node: PicNode): HTMLElement | undefined {
  const extend = node.extend;
  const offset = node.offset;
  const clip = node.clip;
  const base64 = node.base64;
  const audioFile = node.audioFile;
  const videoFile = node.videoFile;

  // Skip images with browser-unsupported formats (e.g. EMF, WMF)
  if (base64) {
    const mimeMatch = base64.match(/^data:([^;]+);/);
    if (mimeMatch && UNSUPPORTED_IMAGE_TYPES.includes(mimeMatch[1])) {
      return undefined;
    }
  }

  const wrapper = document.createElement('div');
  wrapper.style.setProperty('position', 'absolute');
  wrapper.style.setProperty('left', offset.x + 'px');
  wrapper.style.setProperty('top', offset.y + 'px');

  let imgW: number, imgH: number, imgLeft: number, imgTop: number;
  const clipWrapper = document.createElement('div');
  clipWrapper.style.setProperty('position', 'absolute');
  clipWrapper.style.setProperty('left', '0');
  clipWrapper.style.setProperty('top', '0');
  clipWrapper.style.setProperty('width', extend.w + 'px');
  clipWrapper.style.setProperty('height', extend.h + 'px');
  clipWrapper.style.setProperty('overflow', 'hidden');

  if (clip) {
    imgW = extend.w / (1 - (clip.l ?? 0) - (clip.r ?? 0));
    imgH = extend.h / (1 - (clip.t ?? 0) - (clip.b ?? 0));
    imgLeft = -1 * imgW * (clip.l ?? 0);
    imgTop = -1 * imgH * (clip.t ?? 0);
  } else {
    imgW = extend.w;
    imgH = extend.h;
    imgLeft = 0;
    imgTop = undefined as any;
  }

  const img = document.createElement('img');
  img.src = base64;
  img.width = imgW;
  img.height = imgH;
  img.style.setProperty('position', 'absolute');
  img.style.setProperty('left', imgLeft + 'px');
  img.style.setProperty('top', imgTop + 'px');
  clipWrapper.append(img);
  wrapper.append(clipWrapper);

  if (audioFile) {
    const audio = document.createElement('audio');
    audio.style.position = 'absolute';
    audio.style.left = '0';
    audio.style.top = '0';
    audio.src = audioFile;
    audio.controls = true;
    audio.style.transform = 'translate(-50%)';
    wrapper.append(audio);
  }

  if (videoFile) {
    const video = document.createElement('video');
    video.style.position = 'absolute';
    video.style.left = '0';
    video.style.top = '0';
    video.width = extend.w;
    video.height = extend.h;
    video.src = videoFile;
    video.controls = true;
    wrapper.append(video);
  }

  return wrapper;
}
