import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: "Developer Journal",
  tagline: "Johnathan Sewell",
  
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: "https://johnathan-sewell.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "johnathan-sewell", // Usually your GitHub org/user name.
  projectName: "johnathan-sewell.github.io", // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        
        docs: false,
        blog: {
          routeBasePath: '/',
          showReadingTime: true,
          blogTitle: 'Developer Journal',
          blogDescription: 'A blog about software development and other things.',
          postsPerPage: 'ALL',
          blogSidebarCount: 0
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    
    navbar: {
      title: 'Developer Journal',
    },
    
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
