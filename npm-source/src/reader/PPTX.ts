import JSZip from 'jszip';
import Slide from './Slide';
import SlideLayout from './SlideLayout';
import SlideMaster from './SlideMaster';
import Theme from './Theme';
import { xmlToJSON } from '../utils/xml';
import { emu2px } from '../utils/unit';

export default class PPTX {
  thumbnail: String;
  width: number;
  height: number;
  _zipContents: JSZip;
  slides: Array<Slide>;
  slideLayouts: Array<SlideLayout>;
  slideMaster: Array<SlideMaster>;
  themes: Array<Theme>;
  medias: { [key: string]: string };
  defaultTextStyleSource: any;
  tableStyles: any;
  wps: boolean;

  constructor() {
    this.slides = [];
    this.slideLayouts = [];
    this.slideMaster = [];
    this.themes = [];
    this.medias = {};
    this.wps = false;
  }

  async load(file: ArrayBuffer | Blob): Promise<void> {
    const zip = new JSZip();
    this._zipContents = await zip.loadAsync(file);
    await this._loadThumbnail();
    await this._loadMedia();
    await this._loadPresentation();
    await this._loadContentTypes();
  }

  async _loadThumbnail(): Promise<void> {
    try {
      if (this._zipContents.files['docProps/thumbnail.jpeg']) {
        const base64 = await this._zipContents.files['docProps/thumbnail.jpeg'].async('base64');
        this.thumbnail = 'data:image/jpeg;base64,' + base64;
      }
    } catch (e) {}
  }

  async _loadPresentation(): Promise<void> {
    try {
      const presentationXml = await this._zipContents.files['ppt/presentation.xml'].async('text');
      const presentationJson = xmlToJSON(presentationXml);
      const sldSz = (presentationJson as any)['p:presentation']['p:sldSz'].attrs;
      this.width = emu2px(parseInt(sldSz.cx));
      this.height = emu2px(parseInt(sldSz.cy));
      this.defaultTextStyleSource = (presentationJson as any)['p:presentation']['p:defaultTextStyle'];

      if (this._zipContents.files['docProps/app.xml']) {
        const appXml = await this._zipContents.files['docProps/app.xml'].async('text');
        const appJson = xmlToJSON(appXml);
        const application = (appJson as any)?.Properties?.Application;
        this.wps = application?.includes('WPS') || false;
      }
    } catch (e) {}
  }

  async _loadContentTypes(): Promise<void> {
    try {
      const contentTypesXml = await this._zipContents.files['[Content_Types].xml'].async('text');
      const contentTypes = xmlToJSON(contentTypesXml);
      const overrides = (contentTypes as any).Types.Override;

      // Load themes
      const themeOverrides = overrides.filter(
        (o: any) => o.attrs.ContentType === 'application/vnd.openxmlformats-officedocument.theme+xml'
      );
      if (themeOverrides) {
        for (const override of themeOverrides) {
          const path = override.attrs.PartName.substr(1);
          const xml = await this._zipContents.files[path].async('text');
          const json = xmlToJSON(xml);
          this.themes.push(new Theme(path, json, this));
        }
      }

      // Load table styles
      const tableStyleOverride = overrides.find(
        (o: any) =>
          o.attrs.ContentType ===
          'application/vnd.openxmlformats-officedocument.presentationml.tableStyles+xml'
      );
      if (tableStyleOverride) {
        const path = tableStyleOverride.attrs.PartName.substr(1);
        const xml = await this._zipContents.files[path].async('text');
        this.tableStyles = xmlToJSON(xml);
      }

      // Load slide masters
      const masterOverrides = overrides.filter(
        (o: any) =>
          o.attrs.ContentType ===
          'application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml'
      );
      for (let i = 0; i < masterOverrides.length; i++) {
        const path = masterOverrides[i].attrs.PartName.substr(1);
        const xml = await this._zipContents.files[path].async('text');
        const json = xmlToJSON(xml);
        this.slideMaster.push(new SlideMaster(path, json, this));
      }

      // Load slide layouts
      const layoutOverrides = overrides.filter(
        (o: any) =>
          o.attrs.ContentType ===
          'application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml'
      );
      for (let i = 0; i < layoutOverrides.length; i++) {
        const path = layoutOverrides[i].attrs.PartName.substr(1);
        const xml = await this._zipContents.files[path].async('text');
        const json = xmlToJSON(xml);
        const layout = new SlideLayout(path, json, this);
        await layout.load();
        this.slideLayouts.push(layout);
      }

      // Load slides
      const slideOverrides = overrides.filter(
        (o: any) =>
          o.attrs.ContentType ===
          'application/vnd.openxmlformats-officedocument.presentationml.slide+xml'
      );
      for (let i = 0; i < slideOverrides.length; i++) {
        const path = slideOverrides[i].attrs.PartName.substr(1);
        const xml = await this._zipContents.files[path].async('text');
        const json = xmlToJSON(xml);
        const slide = new Slide(path, json, this);
        await slide.load();
        this.slides.push(slide);
      }

      this.slides.sort((a, b) => a.index - b.index);
    } catch (e) {}
  }

  async _loadMedia(): Promise<void> {
    // Load images
    const imageFiles = Object.keys(this._zipContents.files)
      .filter((name) => name.startsWith('ppt/media/image'))
      .map((name) => this._zipContents.files[name]);

    for (const file of imageFiles) {
      const ext = file.name.substr(2 + (~-file.name.lastIndexOf('.') >>> 0));
      let mimeType: string;
      switch (ext) {
        case 'jpg':
        case 'jpeg':
          mimeType = 'image/jpeg';
          break;
        case 'png':
          mimeType = 'image/png';
          break;
        case 'gif':
          mimeType = 'image/gif';
          break;
        case 'emf':
          mimeType = 'image/x-emf';
          break;
        case 'wmf':
          mimeType = 'image/x-wmf';
          break;
        default:
          mimeType = 'image/*';
      }
      const base64 = await file.async('base64');
      this.medias[file.name] = `data:${mimeType};base64,${base64}`;
    }

    // Load media (audio/video)
    const mediaFiles = Object.keys(this._zipContents.files)
      .filter(
        (name) =>
          name.startsWith('ppt/media/media') &&
          ['mp3', 'wav', 'ogg', 'mp4', 'webm'].includes(name.split('.').pop()!.toLowerCase())
      )
      .map((name) => this._zipContents.files[name]);

    for (const file of mediaFiles) {
      const ext = file.name.split('.').pop()!.toLowerCase();
      const buffer = await file.async('arraybuffer');
      const blob = new Blob([buffer], {
        type: `${['mp3', 'wav'].includes(ext) ? 'audio' : 'video'}/${ext}`,
      });
      this.medias[file.name] = URL.createObjectURL(blob);
    }
  }

  async getXmlByPath(path: string): Promise<string> {
    if (!this._zipContents.files[path]) throw new Error('File does not exist');
    return await this._zipContents.files[path].async('text');
  }

  getSlideLayout(name: any): SlideLayout {
    return this.slideLayouts.find((l) => l.name === name)!;
  }

  getSlideMaster(name: any): SlideMaster {
    return this.slideMaster.find((m) => m.name === name)!;
  }

  getTheme(name: any): Theme {
    return this.themes.find((t) => t.name === name)!;
  }

  getMedia(name: any): string {
    return this.medias[name];
  }
}
