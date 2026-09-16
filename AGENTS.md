# isabelleyim.com

Isabelle Yim's personal site. Astro 7 static site started from the
[Astro Wanderer](https://github.com/igagansingh/astro-wanderer) theme (MIT).
Hosted on Vercel at https://isabelleyim.com. `CLAUDE.md` is a symlink to this file.

## Design spec and plans

- Design spec (agreed with Isabelle): `docs/superpowers/specs/2026-09-15-isabelleyim-site-design.md`
- Implementation plans (Superpowers `writing-plans` output): `docs/superpowers/plans/`

Read the spec before changing anything structural. It records what ships, what is
hidden, and the open content questions.

## Stack and commands

- Node 22 (`.nvmrc`), pnpm (`packageManager` in `package.json`).
- `pnpm dev` — dev server (use `astro dev --background` when an agent starts it; manage
  with `astro dev stop` / `astro dev status` / `astro dev logs`).
- `pnpm check` — `astro check` (TypeScript + component diagnostics). Must be clean.
- `pnpm test` — builds `dist/` and a flag-on `dist-travel/`, then runs Vitest against them.
- `pnpm build` — static output in `dist/`.
- CI (`.github/workflows/ci.yml`) runs check, test, build. Vercel deploys `main`.

## Decisions to respect

- **Blog is removed.** Do not reintroduce `src/content/blog`, `/blog` pages or RSS.
- **Travel is kept but hidden** behind `site.features.travel` in `src/data/site.ts`.
  When `false`: no nav link, no `/travel` routes, excluded from the sitemap. The `trips`
  collection and components stay so the flag can simply be flipped later.
- **Single sources of truth:** identity and socials in `src/data/site.ts`; résumé in
  `src/data/resume.ts`. Never hard-code name, URLs or socials in components.
- **No invented facts.** Résumé dates, roles and bullets not supplied by Isabelle stay as
  clearly marked placeholders (see checklist below).
- Plain CSS with design tokens in `src/styles/global.css`. No CSS framework, no UI
  framework runtime.
- The old Next.js site (`ysa000/isabelle-yim`) is untouched and stays live until the
  domain is moved on Vercel.

## Content checklist (Isabelle to supply)

Résumé content comes from `CV-Isabelle-Yim-contenu-FINAL.md` (September 2026), translated
into English in `src/data/resume.ts`. Items the CV leaves in brackets are left out of the
site rather than guessed; each is marked `TODO(Isabelle)` in the data files.

- [ ] End month of the Ceetiz role (site shows "Apr 2022 – 2026")
- [ ] Access42 RGAA course: dates, and whether it has started (site shows "2026 · planned")
- [ ] Accessibility skill group, to add once the certification is obtained
- [ ] Links for the side projects (Free Knit, Vegans Little Helper, Ghibli World)
- [ ] Keep "Available immediately" in the hero bio, or drop it
- [ ] Review the English translation of the CV bullets
- [ ] Keep the X/Twitter link or drop it (`socials.x` in `src/data/site.ts`)
- [ ] Public email on the site, yes/no (`author.email`; the CV's phone number is never published)
- [ ] Location string for the footer and `/work` (`author.location`)
- [x] Experience, education, skills and side projects ported from the CV
- [x] Palette: old dark/nyanza/cerise colours applied as tokens in `src/styles/global.css`

## Docs

Astro docs: https://docs.astro.build — routing, content collections, styling guides.
