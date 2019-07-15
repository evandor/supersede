import { Config } from '@stencil/core';

let globalScript: string = 'src/global/app.ts';

const dev: boolean = process.argv && process.argv.indexOf('--dev') > -1;
if (dev) {
  globalScript = 'src/global/app-dev.ts';
}

export const config: Config = {
  namespace: 'supersede',
  devServer: {
    reloadStrategy: 'hmr',
    port: 4444
  },
  globalStyle: 'src/global/app.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      indexHtml: 'index.html',
      serviceWorker: null // disable service workers
    }
  ],
  globalScript: globalScript
};
