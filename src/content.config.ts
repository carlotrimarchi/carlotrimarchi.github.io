import { defineCollection } from "astro:content";
import { glob, file } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({
		base: "./src/content/blog",
		pattern: "**/*.{md,mdx}",
		generateId: ({ entry }) => {
			return entry
				.slice(11)
				.replace(/\.mdx?$/, "")
				.replace(/\/index$/, "");
		},
	}),
	schema: z.object({
		title: z.string(),
		teaser: z.string(),
		date: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const work = defineCollection({
	loader: glob({
		base: "./src/content/work",
		pattern: "**/*.{md,mdx}",
	}),
	schema: z.object({
		name: z.string(),
		website: z.string().optional(),
		role: z.string(),
		employmentType: z.string(), 
		start: z.number(),	
		end: z.number(),	
		tags: z.array(z.string()),
	}),
});
export const collections = { blog, work };
