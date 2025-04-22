export default function setupGlobalData(eleventyConfig) {
  eleventyConfig.addGlobalData("webcRender", async function (content) {
    if (!content) return "";

    const { html } = await compile(content, {
      components: "_components/**/*.webc",
    }).compile();

    return html;
  });

  const baseUrl =
    process.env.ELEVENTY_ENV === "production" ? "/subdirectory" : "";

  eleventyConfig.addGlobalData("baseUrl", baseUrl);
}
