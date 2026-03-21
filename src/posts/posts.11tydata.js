export default {
  layout: "post.webc",
  eleventyComputed: {
    permalink: function (data) {
      if (data.permalink) {
        return data.permalink;
      } else {
        const slug = data.slug ?? this.slugify(data.title);
        return `/blog/${slug}/index.html`;
      }
    },
  },
};
