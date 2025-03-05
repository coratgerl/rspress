import * as path from 'node:path';
import { defineConfig } from 'rspress/config';

export default defineConfig({
  root: path.join(__dirname, 'doc'),
  logo: '/logo.png',
  route: {
    cleanUrls: true,
  },
  themeConfig: {
    nav: [
      {
        text: 'Sub folder',
        link: '/subfolder/page',
        position: 'right',
      },
    ],
  },
});
