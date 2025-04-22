export default function setupFilters(eleventyConfig) {
  eleventyConfig.addFilter("postDate", (dateObj) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateObj).toLocaleDateString("en-IE", options);
    return date;
  });

  eleventyConfig.addFilter("dateAttribute", (date) => {
    return new Date(date).toISOString().slice(0, 10);
  });
}
