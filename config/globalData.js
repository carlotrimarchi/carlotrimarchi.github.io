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
  const siteUrl =
    process.env.SITE_URL || process.env.URL || "https://carlotrimarchi.it";
  const siteDefaultUrl =
    process.env.SITE_DEFAULT_URL || "https://carlotrimarchi.it";

  eleventyConfig.addGlobalData("baseUrl", baseUrl);
  eleventyConfig.addGlobalData("siteUrl", siteUrl.replace(/\/$/, ""));
  eleventyConfig.addGlobalData("siteDefaultUrl", siteDefaultUrl.replace(/\/$/, ""));
  eleventyConfig.addGlobalData("siteName", "Carlo Trimarchi");
  eleventyConfig.addGlobalData("siteLocale", "en_IE");
  eleventyConfig.addGlobalData(
    "siteDescription",
    "Software engineer and educator specialized in full-stack web development, technical writing, and tutorials on CSS, TypeScript, React, esoteric technologies, and more."
  );
  eleventyConfig.addGlobalData("siteDefaultOgImage", "/assets/images/carlo-trimarchi-og-default.png");
  eleventyConfig.addGlobalData("siteDefaultOgImageWidth", "1200");
  eleventyConfig.addGlobalData("siteDefaultOgImageHeight", "630");
  eleventyConfig.addGlobalData("siteDefaultOgImageAlt", "Carlo Trimarchi website preview image");
}
