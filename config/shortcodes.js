export default function setupShortcodes(eleventyConfig) {
  eleventyConfig.addShortcode("pageTitle", function (title) {
    const base = "Carlo Trimarchi";
    const fallback = `${base} | Software Engineer`;
    return title ? `${title} | ${base}` : fallback;
  });
}
