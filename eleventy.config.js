import "tsx/esm";

import setupPlugins from "./config/plugins.js";
import setupCollections from "./config/collections.js";
import setupShortcodes from "./config/shortcodes.js";
import setupGlobalData from "./config/globalData.js";
import setupFilters from "./config/filters.js";
import setupMdxExtension from "./config/extensions/mdx.js";
import setupJsxExtension from "./config/extensions/jsx.js";

export default function (eleventyConfig) {
  const isDevelopment = process.env.ELEVENTY_ENV === "development";

  setupPlugins(eleventyConfig);
  setupCollections(eleventyConfig);
  setupShortcodes(eleventyConfig);
  setupGlobalData(eleventyConfig);
  setupFilters(eleventyConfig);
  setupMdxExtension(eleventyConfig);
  setupJsxExtension(eleventyConfig);

  eleventyConfig.addTransform("remove-empty-paragraphs", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) {
      return content;
    }

    return content.replace(/<p>\s*<\/p>/g, "");
  });

  eleventyConfig.ignores.add("src/posts/**/_demos/**");
  eleventyConfig.ignores.add("**/posts/**/_demos/**");

  if (!isDevelopment) {
    eleventyConfig.ignores.add("src/posts/_tests/**");
    eleventyConfig.ignores.add("**/posts/_tests/**");
  }

  eleventyConfig.addPassthroughCopy("./src/assets/**/*.svg");
  eleventyConfig.addPassthroughCopy({
    "src/posts/**/!(_*).{png,jpg,jpeg,webp,avif,gif,svg}": "blog",
  });
  eleventyConfig.addPassthroughCopy({
    "src/posts/2026-04-04-typst-the-developer-way-of-authoring-pdfs/example-cv.png":
      "blog/typst-the-developer-way-of-authoring-pdfs/example-cv.png",
  });
  eleventyConfig.addPassthroughCopy("./src/assets/js/**/*.js");
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
  };
}
