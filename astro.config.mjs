// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/data/site';

// https://astro.build/config
export default defineConfig({
  // Production URL (no trailing slash). Used for canonical URLs, OG tags and the sitemap.
  site: site.url,
  // Hosted at the domain root on Vercel, so no `base` subpath.
  integrations: [
    sitemap({
      // Travel pages are not built while the flag is off, but keep them out of the
      // sitemap explicitly so the flag is the only thing that decides.
      filter: (page) => site.features.travel || !new URL(page).pathname.startsWith('/travel'),
    }),
  ],
});
