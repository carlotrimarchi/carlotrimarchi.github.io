export default {
  layout: "post.webc",
  eleventyComputed: {
    permalink: function (data) {
      if (data.permalink) {
        // First, if I have already specified a permalink, just use it
        return data.permalink;
      } else {
        const slug = data.slug ?? this.slugify(data.title);
        return `/blog/${slug}/index.html`;
      }
    },
  },
};
