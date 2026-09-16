# isabelleyim.com

[Isabelle Yim](https://isabelleyim.com)'s personal site: a home page with a short bio and a
`/work` page with her experience. Built with [Astro 7](https://astro.build) on the
[Astro Wanderer](https://github.com/igagansingh/astro-wanderer) theme (MIT), plain CSS, no
framework runtime. Hosted on Vercel.

## Develop

Requires Node 22 (`.nvmrc`) and pnpm.

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm check      # astro check — TypeScript and component diagnostics
pnpm test       # builds the site, then runs Vitest against dist/
pnpm build      # static output in dist/
```

CI (`.github/workflows/ci.yml`) runs check, test and build on every push and pull request.
Vercel builds `main` with `pnpm build` and serves `dist/`.

## Where things live

```
public/
  favicon.ico, favicon.svg   # icons
  img/avatar.jpg             # hero photo
  img/og.jpg                 # 1200×630 share card
  img/trips/                 # travel photos (hidden section)
src/
  data/site.ts               # name, URL, description, socials, feature flags
  data/resume.ts             # experience, education, skills, hero typing words
  components/                # Header, Hero, About, Experience, Gallery, …
  content/trips/             # travel stories in markdown (hidden section)
  pages/                     # index, work, 404, robots.txt, travel/*
  styles/global.css          # design tokens and all styling
tests/                       # Vitest assertions on the built HTML
```

`src/data/site.ts` and `src/data/resume.ts` are the only places identity and résumé
content are written; components read from them.

## Enabling the Travel section

Travel is in the codebase but hidden. Set `TRAVEL_DEFAULT` to `true` in
`src/data/site.ts` and the nav link, `/travel` routes and sitemap entries appear. The test
suite already builds a flag-on copy (`TRAVEL=true`) so the section cannot rot silently.

## Adding a trip

1. Create `src/content/trips/<slug>.md` with the front matter used in `kyoto-2026.md`
   (`title`, `place`, `date`, `summary`, `heroImage`, `gallery`, `circlePhotos`, `highlights`).
2. Put the photos in `public/img/trips/<slug>/` and thumbnails with the same file names in
   `public/img/trips/<slug>/thumbs/`.
3. Delete the sample trip when you have a real one.

## Credits

Theme by [Gagan Singh](https://igagansingh.com), MIT licensed (see `LICENSE`).
