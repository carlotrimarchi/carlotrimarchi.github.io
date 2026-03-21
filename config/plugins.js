import { createHighlighter } from "shiki";
import { fromHighlighter } from "@shikijs/markdown-it";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { RenderPlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import { getHighlighter } from "./highlighter.js";

export default async function setupPlugins(eleventyConfig) {
  const highlighter = await getHighlighter();

  const md = markdownIt({ html: true });

  md.use(fromHighlighter(highlighter, { theme: "github-dark" }));

  const defaultFence = md.renderer.rules.fence.bind(md.renderer);
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const lang = token.info.trim().split(/\s+/)[0] || "code";
    const inner = defaultFence(tokens, idx, options, env, self);
    return `<div class="code-block">
  <div class="code-block__header cluster repel">
<span aria-hidden="true">&lt;/&gt;</span>
    <dl>
      <dt class="visually-hidden">Code language</dt>
      <dd>${lang}</dd>
    </dl>
  </div>
  ${inner}
</div>`;
  };

  eleventyConfig.setLibrary("md", md);
  eleventyConfig.addPlugin(pluginWebc, {
    components: [
      "src/_components/**/*.webc",
      "src/posts/**/_demos/*.webc",
    ],
  });
  eleventyConfig.addPlugin(RenderPlugin);
}

