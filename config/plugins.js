import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import pluginWebc from "@11ty/eleventy-plugin-webc";
import { RenderPlugin } from "@11ty/eleventy";

export default function setupPlugins(eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_components/**/*.webc",
  });
  eleventyConfig.addPlugin(RenderPlugin);
}
