import PPTX from '../reader/PPTX';
import HtmlRender from '../html-render/HtmlRender';
import { emit, remove } from '../utils/event-bus';
import { PreviewerOptionsType } from './type';

export default class PPTXPreviewer {
  currentIndex: number = -1;
  dom: HTMLElement;
  options: PreviewerOptionsType;
  wrapper!: HTMLElement;
  pptx?: PPTX;
  htmlRender!: HtmlRender;

  constructor(dom: HTMLElement, options: PreviewerOptionsType) {
    this.dom = dom;
    this.options = options;
    this._renderWrapper();
  }

  get slideCount(): number {
    return this.pptx?.slides?.length ?? 0;
  }

  _renderWrapper(): void {
    const wrapper = document.createElement('div');
    wrapper.classList.add('pptx-preview-wrapper');
    wrapper.setAttribute('position', 'relative');
    wrapper.style.setProperty('background', '#000');
    wrapper.style.setProperty('width', this.options.width + 'px');
    if (this.options.height) wrapper.style.setProperty('height', this.options.height + 'px');
    wrapper.style.setProperty('position', 'relative');
    wrapper.style.setProperty('margin', '0 auto');
    if (this.options.height) wrapper.style.setProperty('overflow-y', 'auto');
    this.dom.append(wrapper);
    this.wrapper = wrapper;
  }

  renderNextButton(): HTMLDivElement {
    const btn = document.createElement('div');
    btn.classList.add('pptx-preview-wrapper-next');
    btn.style.setProperty('position', 'absolute');
    btn.style.setProperty('bottom', '20px');
    btn.style.setProperty('right', '80px');
    btn.style.setProperty('z-index', '100');
    btn.style.setProperty('cursor', 'pointer');
    btn.style.setProperty('width', '40px');
    btn.style.setProperty('height', '40px');
    btn.style.setProperty('background', '#666666');
    btn.style.setProperty('border-radius', '100%');
    const arrow = document.createElement('div');
    arrow.style.setProperty('width', '10px');
    arrow.style.setProperty('height', '10px');
    arrow.style.setProperty('border-left', '2px solid #fff');
    arrow.style.setProperty('border-bottom', '2px solid #fff');
    arrow.style.setProperty('transform', 'rotate(225deg)');
    arrow.style.setProperty('position', 'absolute');
    arrow.style.setProperty('top', '15px');
    arrow.style.setProperty('left', '15px');
    btn.append(arrow);
    return btn;
  }

  renderPreButton(): HTMLDivElement {
    const btn = document.createElement('div');
    btn.classList.add('pptx-preview-wrapper-next');
    btn.style.setProperty('position', 'absolute');
    btn.style.setProperty('bottom', '20px');
    btn.style.setProperty('right', '140px');
    btn.style.setProperty('z-index', '100');
    btn.style.setProperty('cursor', 'pointer');
    btn.style.setProperty('width', '40px');
    btn.style.setProperty('height', '40px');
    btn.style.setProperty('background', '#666666');
    btn.style.setProperty('border-radius', '100%');
    const arrow = document.createElement('div');
    arrow.style.setProperty('width', '10px');
    arrow.style.setProperty('height', '10px');
    arrow.style.setProperty('border-left', '2px solid #fff');
    arrow.style.setProperty('border-bottom', '2px solid #fff');
    arrow.style.setProperty('transform', 'rotate(45deg)');
    arrow.style.setProperty('position', 'absolute');
    arrow.style.setProperty('top', '15px');
    arrow.style.setProperty('left', '15px');
    btn.append(arrow);
    return btn;
  }

  updatePagination(): void {
    const el = this.wrapper.querySelector('.pptx-preview-wrapper-pagination') as HTMLElement;
    if (el) el.innerText = `${this.currentIndex + 1}/${this.slideCount}`;
  }

  renderPagination(container: HTMLElement): void {
    const el = document.createElement('div');
    el.classList.add('pptx-preview-wrapper-pagination');
    el.innerText = `${this.currentIndex + 1}/${this.slideCount}`;
    el.style.setProperty('position', 'absolute');
    el.style.setProperty('bottom', '33px');
    el.style.setProperty('right', '20px');
    el.style.setProperty('color', '#666666');
    el.style.setProperty('font-size', '14px');
    el.style.setProperty('z-index', '100');
    container.append(el);
  }

  removeCurrentSlide(): void {
    const el = this.wrapper.querySelector(`.pptx-preview-slide-wrapper-${this.currentIndex}`);
    if (el) this.wrapper.removeChild(el);
    emit('removeSlide');
  }

  renderNextSlide(): void {
    this.removeCurrentSlide();
    this.currentIndex = this.currentIndex < this.slideCount - 1 ? this.currentIndex + 1 : 0;
    this.htmlRender.renderSlide(this.currentIndex);
    this.updatePagination();
  }

  renderPreSlide(): void {
    this.removeCurrentSlide();
    this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.slideCount - 1;
    this.htmlRender.renderSlide(this.currentIndex);
    this.updatePagination();
  }

  _addPre(container: HTMLElement): void {
    // placeholder for future extension
  }

  preview(data: ArrayBuffer): Promise<PPTX> {
    emit('destroy');
    remove('destroy');
    return new Promise((resolve, reject) => {
      this.wrapper.innerHTML = '';
      const pptx = this.pptx = new PPTX();
      pptx.load(data).then(() => {
        try {
          const htmlRender = this.htmlRender = new HtmlRender(this.wrapper, pptx, {
            viewPort: { width: this.options.width, height: this.options.height || 0 },
            mode: this.options.mode,
          });
          if (this.options.mode === 'slide') {
            const nextBtn = this.renderNextButton();
            nextBtn.onclick = () => this.renderNextSlide();
            this.wrapper.append(nextBtn);
            const preBtn = this.renderPreButton();
            preBtn.onclick = () => this.renderPreSlide();
            this.wrapper.append(preBtn);
            this.renderPagination(this.wrapper);
            this._addPre(this.wrapper);
            this.currentIndex = 0;
            htmlRender.renderSlide(0);
          } else {
            for (let i = 0; i < pptx.slides.length; i++) {
              htmlRender.renderSlide(i);
            }
          }
          resolve(pptx);
        } catch (err) {
          reject(err);
        }
      }).catch((err: any) => reject(err));
    });
  }

  load(data: ArrayBuffer): Promise<PPTX> {
    emit('destroy');
    remove('destroy');
    return new Promise((resolve, reject) => {
      this.wrapper.innerHTML = '';
      const pptx = this.pptx = new PPTX();
      pptx.load(data).then(() => {
        try {
          this.htmlRender = new HtmlRender(this.wrapper, pptx, {
            viewPort: { width: this.options.width, height: this.options.height || 0 },
            mode: this.options.mode,
          });
          resolve(pptx);
        } catch (err) {
          reject(err);
        }
      }).catch((err: any) => reject(err));
    });
  }

  renderSingleSlide(index: number): void {
    this.removeCurrentSlide();
    this.currentIndex = index;
    this.htmlRender.renderSlide(this.currentIndex);
  }

  destroy(): void {
    emit('destroy');
    remove('destroy');
  }
}
