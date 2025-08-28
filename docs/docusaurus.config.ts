import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import { Configuration } from "webpack";
import type * as Preset from "@docusaurus/preset-classic";
import dotenv from "dotenv";
dotenv.config();

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "Terrrrr Backend Docs",
  tagline: "Find all backend docs for the Terrrr backend here.",
  favicon: "img/favicon.ico",

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://terrrrr-backend.vercel.app",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "alexappleget", // Usually your GitHub org/user name.
  projectName: "terrrrr-backend", // Usually your repo name.

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
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            "https://github.com/alexappleget/terrrrr-backend/tree/main/docs/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "/img/terrrrr-social-card.jpg",
    navbar: {
      title: "Terrrrr Backend Docs",
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/alexappleget/terrrrr-backend",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      copyright: `Copyright © ${new Date().getFullYear()} Alex Appleget`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    algolia: {
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: "Backend Documentation for Terrrrr",
      contextualSearch: true,
    },
  } satisfies Preset.ThemeConfig,
  plugins: [
    function webpackBufferFallbackPlugin() {
      return {
        name: "webpack-buffer-fallback-plugin",
        configureWebpack() {
          return {
            resolve: {
              fallback: {
                buffer: require.resolve("buffer/"),
              },
            },
          };
        },
      };
    },
  ],
  stylesheets: ["swagger-ui-react/swagger-ui.css", "/css/custom.css"],
};

export default config;
