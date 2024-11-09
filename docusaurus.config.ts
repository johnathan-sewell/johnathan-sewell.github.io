import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Johnathan Sewell",
  tagline: "Developer Journal",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://johnathan-sewell.github.io/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "johnathan-sewell", // Usually your GitHub org/user name.
  projectName: "johnathan-sewell.github.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        gtag: {
          trackingID: "G-WYHQ8V99F6",
        },
        docs: false,
        // https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog#ex-config
        blog: {
          routeBasePath: "/",
          showReadingTime: true,
          blogTitle: "Developer Journal",
          blogDescription:
            "A blog about software development and other things.",
          postsPerPage: "ALL",
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);

            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "Johnathan Sewell",
      style: "dark",
      items: [
        { to: "/tags", label: "Tags", position: "left" },
        {
          href: "https://github.com/johnathan-sewell",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.linkedin.com/in/johnathan-sewell/",
          label: "LinkedIn",
          position: "right",
        },
      ],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
