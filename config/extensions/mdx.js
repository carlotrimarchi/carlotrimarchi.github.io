import { compile } from "@mdx-js/mdx";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import remarkGfm from "remark-gfm";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import { jsx } from "react/jsx-runtime";
import { register } from "node:module";
import rehypeShiki from "@shikijs/rehype";
import { getHighlighter } from "../highlighter.js";

const highlighter = await getHighlighter();
const rehypeShikiPlugin = [rehypeShiki, { highlighter, theme: "github-dark" }];

register("@mdx-js/node-loader", import.meta.url, {
  rehypePlugins: [rehypeShikiPlugin],
});

export default function setupMdxExtension(eleventyConfig) {
  eleventyConfig.addExtension("mdx", {
    key: "11ty.js",
    async compile(_, inputPath) {
      const file = await fs.promises.readFile(inputPath, "utf8");
      const absolutePath = path.resolve(inputPath);
      const compiled = await compile(file, {
        outputFormat: "function-body",
        useDynamicImport: true,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeShikiPlugin],
        baseUrl: pathToFileURL(absolutePath),
      });
      const createModule = new Function(
        "React",
        `return (async () => { ${compiled.value} })()`,
      );
      const { default: Content } = await createModule(runtime);
      return async function () {
        return renderToStaticMarkup(jsx(Content, {}));
      };
    },
  });
  eleventyConfig.addTemplateFormats("mdx");
}
