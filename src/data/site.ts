/** A link shown in the hero and footer.
 *  `icon` is any name from src/components/Icon.astro */
export interface SocialLink {
  url: string;
  label: string;
  icon?: 'github' | 'linkedin' | 'instagram' | 'x' | 'email' | 'peace' | 'download' | 'arrow-right' | 'arrow-left' | 'sun' | 'moon';
}

/**
 * Feature flags. Defaults live here; `TRAVEL=true pnpm build` overrides the
 * travel flag so the test suite can prove the hidden section still builds.
 */
const TRAVEL_DEFAULT = false;

const envFlag = (name: string, fallback: boolean): boolean => {
  const value = typeof process !== 'undefined' ? process.env[name] : undefined;
  if (value === undefined || value === '') return fallback;
  return value === 'true' || value === '1';
};

/**
 * ─────────────────────────────────────────────────────────────
 *  Site identity — the single source of truth for name, URL,
 *  description and social links. Components never hard-code these.
 * ─────────────────────────────────────────────────────────────
 */
export const site = {
  /** Full name — used for <title> and meta tags */
  title: 'Isabelle Yim',
  /** Short handle used after the dot in page titles ("Work · isabelleyim") */
  shortTitle: 'isabelleyim',
  /** Default meta description for pages that don't set their own */
  description:
    'Isabelle Yim — front-end developer with nearly 8 years of experience, building polished, maintainable product interfaces with TypeScript, Vue 3 / Nuxt and React.',
  /** Production URL — no trailing slash. Used for canonical URLs, OG tags and the sitemap */
  url: 'https://isabelleyim.com',
  author: {
    name: 'Isabelle Yim',
    /** Public email — not published (see content checklist in CLAUDE.md). */
    email: undefined as string | undefined,
    /** Shown in the footer and on /work when set — Isabelle to supply. */
    location: undefined as string | undefined,
    /** Optional link to a PDF résumé served from /public — none yet. */
    resume: undefined as string | undefined,
  },
  /** Sections that exist in the codebase but are not published yet. */
  features: {
    /** Travel stories: nav link, /travel routes and sitemap entries. */
    travel: envFlag('TRAVEL', TRAVEL_DEFAULT),
  },
  /** Shown in the hero and footer, in this order. Delete a line to remove it from both places. */
  socials: {
    github: { url: 'https://github.com/ysa000', label: 'GitHub', icon: 'github' },
    linkedin: { url: 'https://www.linkedin.com/in/isabelleyim/', label: 'LinkedIn', icon: 'linkedin' },
    instagram: { url: 'https://www.instagram.com/ysa_000/', label: 'Instagram', icon: 'instagram' },
    x: { url: 'https://twitter.com/IsabelleYim', label: 'X', icon: 'x' },
  } satisfies Record<string, SocialLink>,
};

export type SocialKey = keyof typeof site.socials;

/**
 * Prefix a root-relative path ("/img/x.jpg") with the configured base
 * path (`base` in astro.config.mjs). The site is served from the domain
 * root so this is a pass-through today, but every internal link and
 * public/ asset goes through it so a subpath deployment would still work.
 */
export const withBase = (path: string): string => {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (!path.startsWith('/')) return path;
  if (path.startsWith(`${base}/`)) return path;
  return `${base}${path}`;
};
