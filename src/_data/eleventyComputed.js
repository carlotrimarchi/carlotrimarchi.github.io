export default {
	socialMeta: (data) => {
		const toIsoDate = (value) => {
			if (!value) return "";
			const date = value instanceof Date ? value : new Date(value);
			return Number.isNaN(date.getTime()) ? "" : date.toISOString();
		};

		const baseUrl =
			data.siteUrl ||
			data.siteDefaultUrl ||
			process.env.SITE_URL ||
			process.env.URL ||
			process.env.SITE_DEFAULT_URL ||
			"https://carlotrimarchi.it";

		const safeBaseUrl = String(baseUrl).replace(/\/$/, "");
		const pageUrl = data.page?.url || "/";
		const inputPath = String(data.page?.inputPath || "");
		const isBlogPost =
			pageUrl.startsWith("/blog/") &&
			inputPath.includes("/src/posts/") &&
			!inputPath.endsWith("posts.11tydata.js");
		const imagePath =
			data.ogImage ||
			data.siteDefaultOgImage ||
			"/assets/images/carlo-trimarchi-og-default.png";

		const absoluteImage = imagePath.startsWith("http")
			? imagePath
			: safeBaseUrl + imagePath;

		return {
			siteName: data.siteName || "Carlo Trimarchi",
			type: isBlogPost ? "article" : "website",
			isArticle: isBlogPost,
			title: data.title || data.siteName || "Carlo Trimarchi",
			description: data.teaser || data.description || data.siteDescription || "",
			url: safeBaseUrl + pageUrl,
			image: absoluteImage,
			imageWidth: data.ogImageWidth || data.siteDefaultOgImageWidth || "1200",
			imageHeight: data.ogImageHeight || data.siteDefaultOgImageHeight || "630",
			imageAlt:
				data.ogImageAlt ||
				data.siteDefaultOgImageAlt ||
				data.title ||
				data.siteName ||
				"Carlo Trimarchi",
			locale: data.siteLocale || "en_IE",
			author: data.author || data.siteAuthor || data.siteName || "Carlo Trimarchi",
			publishedTime: isBlogPost ? toIsoDate(data.date || data.page?.date) : "",
			modifiedTime: isBlogPost ? toIsoDate(data.updated || data.modified) : "",
		};
	},
};