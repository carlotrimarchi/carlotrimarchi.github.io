import pluginWebc from "@11ty/eleventy-plugin-webc";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(pluginWebc);
  eleventyConfig.addPassthroughCopy({
    "./src/assets/css": "./assets/css", // Ensure the correct path
  });

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
