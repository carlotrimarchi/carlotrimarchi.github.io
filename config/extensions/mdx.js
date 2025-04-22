import { compile } from "@mdx-js/mdx";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";
import rehypePrism from "rehype-prism-plus";
import remarkGfm from "remark-gfm";
import { renderToStaticMarkup } from "react-dom/server";
import * as runtime from "react/jsx-runtime";
import { jsx } from "react/jsx-runtime";

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

  eleventyConfig.addTemplateFormats("mdx");
}
