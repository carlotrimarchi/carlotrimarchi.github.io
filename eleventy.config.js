import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
  eleventyConfig.addShortcode("pageTitle", function (title) {
    const base = "Carlo Trimarchi";
    const fallback = `${base} | Software Engineer`;
    return title ? `${title} | ${base}` : fallback;
  });

  eleventyConfig.addCollection("works", function (collectionApi) {
    const result = collectionApi.getFilteredByGlob("src/work/*.md");
    console.log(result);
    return result;
  });

  eleventyConfig.addPlugin(pluginWebc, {
    components: "src/_components/**/*.webc",
  });
  eleventyConfig.addPassthroughCopy({
    "./src/assets/css": "./assets/css", // Ensure the correct path
  });
  eleventyConfig.addPassthroughCopy("./src/assets/**/*.svg");

  const baseUrl =
    process.env.ELEVENTY_ENV === "production" ? "/subdirectory" : "";

  // Add baseUrl as global data to be used in templates
  eleventyConfig.addGlobalData("baseUrl", baseUrl);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
