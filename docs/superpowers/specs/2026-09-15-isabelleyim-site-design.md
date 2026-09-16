# isabelleyim.com v2 — Astro + Wanderer, built with Superpowers

## Context

The current isabelleyim.com is a single-page Next.js 11 site (repo `ysa000/isabelle-yim`, last touched Jan 2023, deployed on Vercel with the domain aliased in `now.json`). It has a hero (photo, name, "Front-end developer", four social icons), a short bio paragraph block, and a footer.

Goal: a brand-new repo and site built on **Astro 7** using the **Astro Wanderer** theme (`igagansingh/astro-wanderer`, MIT, plain CSS, content collections, no framework runtime). The old repo is **not** touched; it stays as the live fallback until the domain is moved.

Decisions already made with Isabelle:

| Topic | Decision |
|---|---|
| Sections | Home + **Work/résumé** ship first. **Travel** stays in the codebase but hidden behind a flag until there is time for it. **Blog** is removed. |
| Hosting | **Vercel** (domain already lives there). Old project untouched until the new one is verified. |
| Repo | Public `ysa000/isabelleyim.com`, cloned at `~/Dev/isabelleyim.com`. |
| Content | Migrate existing bio, socials and profile photo into the theme's data files. |
| Method | Use the **Superpowers** plugin's workflow (brainstorming → writing-plans → subagent-driven-development with TDD → code review → finishing branch). |

This document is the high-level roadmap and the design input for Superpowers. Superpowers' own `writing-plans` skill will turn it into the granular 2–5 minute task plan inside the new repo.

## Findings that shape the plan

- **Node is not installed** on this Mac (`node` not found; Homebrew `pnpm 10.32.1` is present but errors because it needs Node). Wanderer requires `node >= 22.12`.
- **Superpowers is not installed** (`~/.claude/plugins/installed_plugins.json` is empty). Install: `/plugin install superpowers@claude-plugins-official`.
- `gh` is authenticated as `ysa000`. No Vercel CLI.
- Wanderer facts: `astro ^7.2`, deps `@astrojs/rss`, `@astrojs/sitemap`, Inter + JetBrains Mono via fontsource. Single config files `src/data/site.ts` (identity, socials, URL) and `src/data/resume.ts` (experience, education, skills, hero typing words). Collections `blog` and `trips` in `src/content.config.ts`. `astro.config.mjs` ships with `base: '/astro-wanderer'` (must be deleted) and a GitHub Pages workflow (to be replaced).
- Wanderer's `Icon.astro` has github / linkedin / instagram / email / rss icons but **no X/Twitter icon**; the old site links to X.
- Old site assets worth reusing: `public/profile-picture.jpg`, `public/favicon.ico`, bio text in `components/About.js`, socials in `components/Social.js` (GitHub `ysa000`, LinkedIn `isabelleyim`, Instagram `ysa_000`, X `IsabelleYim`).

## Phase 0 — One-time machine setup (before any code)

1. Install Node 22 LTS: `brew install node@22 && brew link --overwrite node@22` (or `fnm`). Verify `node -v` ≥ 22.12 and that `pnpm -v` now works. Package manager for the project: **pnpm** (already on the machine; Vercel auto-detects the `pnpm-lock.yaml`).
2. Install Superpowers: run `/plugin install superpowers@claude-plugins-official` from an interactive `claude` terminal (or the desktop app's plugin UI). Confirm skills like `superpowers:brainstorming` appear in the skill list.
3. Nothing else: `gh` is ready, Vercel work happens in the dashboard in Phase 4.

## Phase 1 — Scaffold the new repo

1. `cd ~/Dev && pnpm create astro@latest isabelleyim.com -- --template igagansingh/astro-wanderer --no-install --no-git` then `pnpm install`. (Template mode gives a clean tree without the theme's git history.)
2. Delete `package-lock.json`; add `.nvmrc` with `22`; keep `engines.node`.
3. `astro.config.mjs`: set `site: 'https://isabelleyim.com'`, **remove `base`**.
4. Replace `.github/workflows/deploy.yml` (GitHub Pages) with a small `ci.yml` that runs `pnpm check`, `pnpm test`, `pnpm build` on push/PR. Vercel does the deploying.
5. Create a short `CLAUDE.md` (stack, commands, "travel is flag-gated", "blog removed", content checklist).
6. `git init`, initial commit "Scaffold from astro-wanderer", then `gh repo create ysa000/isabelleyim.com --public --source=. --remote=origin --push`. Default branch `main`.
7. Copy this plan into the repo as `docs/superpowers/specs/2026-09-15-isabelleyim-site-design.md` so Superpowers' plan can cite it.

## Phase 2 — Hand over to Superpowers inside the new repo

Open Claude Code in `~/Dev/isabelleyim.com` with the plugin active and start with: "Build the site described in docs/superpowers/specs/2026-09-15-isabelleyim-site-design.md." Expected flow:

1. `superpowers:brainstorming` classifies this as *architectural* and should mostly confirm the spec (design already agreed here). Remaining open questions are listed at the end of this document.
2. `superpowers:using-git-worktrees` creates a feature branch/worktree (`feat/v2-site`) and verifies the test baseline (`pnpm check && pnpm test && pnpm build` green on the scaffold).
3. `superpowers:writing-plans` writes `docs/superpowers/plans/2026-09-15-isabelleyim-site.md` with the tasks in Phase 3 broken into TDD-sized steps.
4. `superpowers:subagent-driven-development` executes them; `requesting-code-review` between tasks; `finishing-a-development-branch` opens the PR to `main`.

**Test harness for TDD** (added as the first task so later tasks have red/green cycles): Vitest with a `build-output.test.ts` that runs against `dist/` (produced by a `globalSetup` calling `astro build`) and asserts on HTML with `node-html-parser`. This is cheap, real, and covers what matters for a static site. `pnpm test` = vitest; `pnpm check` = `astro check`.

## Phase 3 — Work to plan in the new repo (the tasks Superpowers will decompose)

### 3.1 Test harness
- Add `vitest`, `node-html-parser`; `vitest.config.ts` with a global setup that builds once.
- First test: `dist/index.html` exists and contains "Isabelle Yim".

### 3.2 Remove the blog
- Delete `src/content/blog/`, `src/pages/blog/`, `src/pages/rss.xml.ts`, `src/components/PostCard.astro`, the `blog` collection in `src/content.config.ts`, and `@astrojs/rss` from deps.
- Remove the Blog nav item in `Header.astro`, the RSS social link in `site.ts`, and any "latest posts" block on `index.astro`.
- Tests: no `dist/blog/`, no `dist/rss.xml`, nav contains no "Blog" link. `astro check` clean.

### 3.3 Feature-flag Travel (kept, hidden)
- Add `features: { travel: false }` to `site.ts` (typed, single source of truth).
- `Header.astro`/`Footer.astro`: render the Travel link only when the flag is on.
- `src/pages/travel/[...slug].astro`: `getStaticPaths` returns `[]` when off. `src/pages/travel/index.astro`: when off, produce no page (verify during the task that returning a 404 `Response` from a prerendered page is honoured by the Astro 7 build; fallback is to move the two pages under `src/pages/_travel/` via the flag and a tiny script — pick whichever passes the test).
- `@astrojs/sitemap` `filter` excludes `/travel` when off.
- Keep `src/content/trips/` and `public/img/trips/` with one sample so flipping the flag later just works.
- Tests: flag off → no `dist/travel/`, nav has no "Travel"; flag on (test sets env/override) → `dist/travel/index.html` exists.

### 3.4 Site identity (`src/data/site.ts`)
- title "Isabelle Yim", shortTitle "isabelleyim", url `https://isabelleyim.com`, description drawn from the current bio.
- socials: GitHub `https://github.com/ysa000`, LinkedIn `https://www.linkedin.com/in/isabelleyim/`, Instagram `https://www.instagram.com/ysa_000/`, X `https://twitter.com/IsabelleYim` (needs a new `x` glyph added to `Icon.astro`). Email and résumé PDF entries removed unless Isabelle supplies them.
- Tests: hero renders the four social links with correct hrefs; `<title>` is "Isabelle Yim"; canonical URL is the production domain.

### 3.5 Résumé data (`src/data/resume.ts`) and Home copy
- Hero typing roles: "Front-end developer" plus whatever Isabelle adds.
- Experience: port what the old bio states (front-end internship at Cozy Cloud; client work for GrandOptical, Apollo Optik, SeLoger, Adilibre; earlier career as travel consultant and digital project manager). Dates, current role and bullets are **content Isabelle must provide**; the task ships clearly marked placeholders and a checklist in `CLAUDE.md`, never invented facts.
- Home "about" paragraph: the personal bit of the old bio (vegan, knitting, guitar, work/life balance) rewritten for 2026 if Isabelle wants; otherwise keep the original wording.
- Tests: `/work` lists every company name from the data file; no "Rowan Hale"/"example.com" string anywhere in `dist/`.

### 3.6 Assets and branding
- `public/img/avatar.jpg` from the old repo's `profile-picture.jpg` (fetch via `gh api`), `favicon.ico` reused, generate a new `favicon.svg`, and a 1200×630 `og.jpg` (simple name + role card using the theme's tokens, produced with a one-off script, not committed as tooling).
- Optional: bring the old palette (raisin black `#272635`-ish dark, nyanza light, cerise accent) into `src/styles/global.css` tokens so the site feels like hers rather than the demo. Keep it to token values; no layout rewrites.
- Footer: dynamic year.

### 3.7 Cleanup and docs
- Delete theme sample content (`getting-started.md`, `notes-from-the-road.md`, demo trip photos except one kept for the hidden Travel flag), `screenshot.png`, theme README replaced by a project README (stack, commands, how to enable Travel, how to add a trip).

## Phase 4 — Deploy on Vercel and move the domain

1. In the Vercel dashboard: "Add New Project" → import `ysa000/isabelleyim.com`. Preset auto-detects Astro; build `pnpm build`, output `dist`. Node 22.
2. Verify the preview URL: Lighthouse, mobile width, dark/light toggle, all four socials, `/work`, `/404`, no `/blog`, no `/travel`.
3. **User action, after explicit confirmation**: in the *old* Vercel project, remove domains `isabelleyim.com` and `www.isabelleyim.com`; add them to the new project (www → apex redirect). This is the moment the live site changes. Old repo and old project remain untouched as a rollback.
4. Post-switch checks: `curl -I https://isabelleyim.com` → 200, `https://isabelleyim.com/sitemap-index.xml` present, robots.txt present, OG card renders in a social preview tool.

## Verification (end to end)

- `pnpm check` (astro check) clean, `pnpm test` green, `pnpm build` succeeds with no `/blog` or `/travel` output while the flag is off.
- Flip `features.travel` to `true` locally → `/travel` builds with the sample trip, then flip back.
- `pnpm dev` and open in the browser: home, work, 404, theme toggle, keyboard nav on the header.
- CI workflow green on the PR; Vercel preview green; domain switch verified with curl.

## Open items for Isabelle (do not block scaffolding)

1. Résumé details for `/work`: current role and dates, role titles for the client engagements, education, skill groups.
2. Keep the X/Twitter link, or drop it?
3. Public email on the site, yes/no?
4. Location string for the hero/footer (theme shows one).
5. English only (as today), or English + French later? Assumed English only; the plan does not add i18n.
6. Keep the old dark/mint palette or adopt Wanderer's default look? Assumed: Wanderer layout with her colours as tokens.
