import "tsx/esm";

import { register } from "node:module";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { RenderPlugin } from "@11ty/eleventy";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

import vm from "node:vm";

import setupShortcodes from "./config/shortcodes.js";
import setupFilters from "./config/filters.js";
import setupMdxExtension from "./config/extensions/mdx.js";

register("@mdx-js/node-loader", import.meta.url, {
  rehypePlugins: [rehypePrism],
});

export default function (eleventyConfig) {
  setupShortcodes(eleventyConfig);
  setupFilters(eleventyConfig);
  setupMdxExtension(eleventyConfig);

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: function () {
      return async function (data) {
        let content = await this.defaultRenderer(data);
        return renderToStaticMarkup(content);
      };
    },
  });

  eleventyConfig.addGlobalData("webcRender", async function (content) {
    if (!content) return "";

    const { html } = await compile(content, {
      components: "_components/**/*.webc", // Adjust to your components path
    }).compile();

    return html;
  });

  eleventyConfig.addCollection("works", function (collectionApi) {
    const result = collectionApi.getFilteredByGlob("src/work/*.md");
    result.sort((a, b) => Number(b.data.end) - Number(a.data.end));
    return result;
  });

  eleventyConfig.addCollection("posts", function (collectionApi) {
    const result = collectionApi.getFilteredByGlob([
      "src/posts/**/*.md",
      "src/posts/**/*.mdx",
    ]);
    console.log(result);
    result.sort((a, b) => b.date - a.date);
    return result;
  });

  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_components/**/*.webc",
  });
  eleventyConfig.addPlugin(RenderPlugin);
  // eleventyConfig.addPassthroughCopy({
  //   "./src/assets/css": "./assets/css", // Ensure the correct path
  // });
  eleventyConfig.addPassthroughCopy("./src/assets/**/*.svg");
  eleventyConfig.addPassthroughCopy({
    "src/favicon.ico": "favicon.ico",
    "src/icon.svg": "icon.svg",
    "src/apple-touch-icon.png": "apple-touch-icon.png",
  });
  const baseUrl =
    process.env.ELEVENTY_ENV === "production" ? "/subdirectory" : "";

  // Add baseUrl as global data to be used in templates
  eleventyConfig.addGlobalData("baseUrl", baseUrl);

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
