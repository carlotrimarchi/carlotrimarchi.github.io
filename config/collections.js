export default function setupCollections(eleventyConfig) {
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
}
