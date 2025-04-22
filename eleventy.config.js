import "tsx/esm";

import setupPlugins from "./config/plugins.js";
import setupCollections from "./config/collections.js";
import setupShortcodes from "./config/shortcodes.js";
import setupGlobalData from "./config/globalData.js";
import setupFilters from "./config/filters.js";
import setupMdxExtension from "./config/extensions/mdx.js";
import setupJsxExtension from "./config/extensions/jsx.js";

export default function (eleventyConfig) {
  setupPlugins(eleventyConfig);
  setupCollections(eleventyConfig);
  setupShortcodes(eleventyConfig);
  setupGlobalData(eleventyConfig);
  setupFilters(eleventyConfig);
  setupMdxExtension(eleventyConfig);
  setupJsxExtension(eleventyConfig);

  eleventyConfig.addPassthroughCopy("./src/assets/**/*.svg");
  eleventyConfig.addPassthroughCopy({
    "src/favicon.ico": "favicon.ico",
    "src/icon.svg": "icon.svg",
    "src/apple-touch-icon.png": "apple-touch-icon.png",
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
    },
    defaults: [
      {
        directory: "posts",
        data: {
          layout: "post.webc",
        },
      },
    ],
  };
}
