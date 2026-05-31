import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const novels = defineCollection({
	loader: glob({ base: './src/content/novels', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			author: z.string(),
			slug: z.string(),
			description: z.string(),
			order: z.number().default(99),
			coverImage: image().optional(),
		}),
});

const chapters = defineCollection({
	loader: glob({ base: './src/content/chapters', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			chapterOrder: z.number().optional(),
		}),
});

export const collections = { novels, chapters };
