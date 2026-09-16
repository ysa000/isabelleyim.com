# Plan — isabelleyim.com v2 (from the 2026-09-15 design spec)

Source: `docs/superpowers/specs/2026-09-15-isabelleyim-site-design.md`, Phase 3.
Each task is one commit on `claude/isabelleyim-site-design-78cedc`, verified with
`pnpm check && pnpm test && pnpm build` before moving on.

| # | Task | Done when |
|---|------|-----------|
| 1 | **Test harness** — `vitest`, `node-html-parser`, `vitest.config.ts` whose global setup runs `astro build` twice (flag off → `dist/`, flag on → `dist-travel/`). `pnpm test` script. | `tests/build-output.test.ts` runs; the whole suite below is written up front and goes green task by task. |
| 2 | **Remove the blog** — delete `src/content/blog`, `src/pages/blog`, `rss.xml.ts`, `PostCard.astro`, the `blog` collection, `@astrojs/rss`, the Blog nav/footer links, the RSS social and `<link rel=alternate>`. | No `dist/blog`, no `dist/rss.xml`, nav has no "Blog". |
| 3 | **Feature-flag Travel** — `site.features.travel` (default `false`, `TRAVEL=true` env override for tests). Header/Footer links conditional, `travel/[...slug]` returns no paths, `travel/index` returns a 404 `Response`, sitemap `filter`. | Flag off: no `dist/travel`, no nav link, not in sitemap. Flag on: `dist-travel/travel/index.html` exists. |
| 4 | **Site identity** — `site.ts` with Isabelle's name, URL, description and the four socials; new `x` glyph in `Icon.astro`; email/résumé/location removed or optional. | Hero has exactly the four social hrefs; `<title>` is "Isabelle Yim"; canonical is the production domain. |
| 5 | **Résumé data and copy** — `resume.ts` ported from the old bio with no invented dates; optional fields render conditionally; About section on the home page with the old bio wording. | `/work` lists every company in the data file; no "Rowan Hale"/"example.com" in `dist/`. |
| 6 | **Assets and palette** — `avatar.jpg` and `favicon.ico` from the old repo, new `favicon.svg`, generated `img/og.jpg`, old palette as tokens in `global.css`. | OG/avatar/favicon files exist in `dist/`, meta tags point at them. |
| 7 | **Cleanup and docs** — remove sample posts, extra sample trip photos, `screenshot.png`; project README; CLAUDE.md checklist updated. | Repo contains only what the site uses; docs describe how to enable Travel and add a trip. |

Phase 4 (Vercel import and domain move) is a manual step for Isabelle and is not part of this plan.
