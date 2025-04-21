import "tsx/esm";

import { register } from "node:module";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { RenderPlugin } from "@11ty/eleventy";
import { renderToStaticMarkup } from "react-dom/server";
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";

import path from "node:path";
import { pathToFileURL } from "node:url";
import { jsx } from "react/jsx-runtime";
import vm from "node:vm";
import fs from "node:fs";
import { compile } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";

register("@mdx-js/node-loader", import.meta.url, {
  rehypePlugins: [rehypePrism],
});

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addExtension("mdx", {
    key: "11ty.js",
    async compile(_, inputPath) {
      const file = await fs.promises.readFile(inputPath, "utf8");

      const absolutePath = path.resolve(inputPath);

      const compiled = await compile(file, {
        outputFormat: "function-body",
        useDynamicImport: true,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypePrism],
        baseUrl: pathToFileURL(absolutePath),
        //baseUrl: new URL(inputPath, "file://"),
      });

      const createModule = new Function(
        "React",
        `return (async () => { ${compiled.value} })()`,
      );

      const { default: Content } = await createModule(runtime); // ✅ Evaluate the wrapped async module

      return async function () {
        return renderToStaticMarkup(jsx(Content, {}));
      };
    },
  });

  // eleventyConfig.addExtension("mdx", {
  //   key: "11ty.js",
  //   compile: async function (_, inputPath) {
  //     const mod = await import(inputPath);
  //     const Component = mod.default;
  //
  //     return async function () {
  //       const html = renderToStaticMarkup(Component());
  //       console.log(html); // Check if code blocks are tokenized
  //       return html;
  //     };
  //   },
  // });
  eleventyConfig.addTemplateFormats("mdx");

  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: function () {
      return async function (data) {
        let content = await this.defaultRenderer(data);
        return renderToStaticMarkup(content);
      };
    },
  });

  eleventyConfig.addShortcode("pageTitle", function (title) {
    const base = "Carlo Trimarchi";
    const fallback = `${base} | Software Engineer`;
    return title ? `${title} | ${base}` : fallback;
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

  const baseUrl =
    process.env.ELEVENTY_ENV === "production" ? "/subdirectory" : "";

  // Add baseUrl as global data to be used in templates
  eleventyConfig.addGlobalData("baseUrl", baseUrl);

  eleventyConfig.addFilter("postDate", (dateObj) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateObj).toLocaleDateString("en-IE", options);
    return date;
  });

  eleventyConfig.addFilter("dateAttribute", (date) => {
    return new Date(date).toISOString().slice(0, 10);
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
