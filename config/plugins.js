import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { RenderPlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";

export default function setupPlugins(eleventyConfig) {


  const md = markdownIt();

  const defaultFence = md.renderer.rules.fence.bind(md.renderer);

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const lang = token.info.trim().split(/\s+/)[0] || "code";
    const inner = defaultFence(tokens, idx, options, env, self);
    return `<div class="code-block">
  <div class="code-block__header">
    <span class="code-block__lang">${lang}</span>
  </div>
  ${inner}
</div>`;
  };

  eleventyConfig.addPlugin(syntaxHighlight, { markdownItOptions: { highlight: null } });
  eleventyConfig.setLibrary("md", md);



  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_components/**/*.webc",
  });
  eleventyConfig.addPlugin(RenderPlugin);
}