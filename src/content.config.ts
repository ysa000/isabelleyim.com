import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/** Travel stories. Only built when `site.features.travel` is on (see src/data/site.ts). */
const trips = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trips' }),
  schema: z.object({
    title: z.string(),
    place: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    heroImage: z.string(),
    gallery: z.array(z.string()).default([]),
    circlePhotos: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
  }),
});

export const collections = { trips };
