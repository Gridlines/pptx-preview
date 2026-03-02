import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'pptxPreview',
      formats: ['es', 'umd'],
      fileName: (format) => `pptx-preview.${format}.js`,
    },
    rollupOptions: {
      external: ['jszip', 'lodash', 'uuid', 'echarts', 'tslib'],
      output: {
        globals: {
          jszip: 'JSZip',
          lodash: '_',
          uuid: 'uuid',
          echarts: 'echarts',
          tslib: 'tslib',
        },
      },
    },
    outDir: 'build',
  },
});
