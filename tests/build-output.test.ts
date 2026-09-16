import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
import { site } from '../src/data/site';
import { experience, earlierRoles, education, sideProjects, skillGroups } from '../src/data/resume';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const distTravel = join(root, 'dist-travel');

const read = (dir: string, file: string) => readFileSync(join(dir, file), 'utf8');
const page = (dir: string, file: string) => parse(read(dir, file));

/** Every .html file under a directory, recursively. */
function htmlFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

const navLabels = (doc: ReturnType<typeof parse>) =>
  doc.querySelectorAll('header nav a, footer .footer-links a').map((a) => a.text.trim());

describe('home page', () => {
  const doc = page(dist, 'index.html');

  it('exists and is about Isabelle Yim', () => {
    expect(read(dist, 'index.html')).toContain('Isabelle Yim');
    expect(doc.querySelector('title')?.text).toBe('Isabelle Yim');
    expect(doc.querySelector('h1')?.text.replace(/\s+/g, ' ').trim()).toBe('Isabelle Yim');
  });

  it('uses the production domain for canonical and Open Graph URLs', () => {
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://isabelleyim.com/');
    expect(doc.querySelector('meta[property="og:url"]')?.getAttribute('content')).toBe('https://isabelleyim.com/');
    expect(doc.querySelector('meta[property="og:image"]')?.getAttribute('content')).toBe(
      'https://isabelleyim.com/img/og.jpg',
    );
  });

  it('renders exactly the four social links from site.ts in the hero', () => {
    const hrefs = doc.querySelectorAll('.hero .social-link').map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual([
      'https://github.com/ysa000',
      'https://www.linkedin.com/in/isabelleyim/',
      'https://www.instagram.com/ysa_000/',
      'https://twitter.com/IsabelleYim',
    ]);
    expect(hrefs).toEqual(Object.values(site.socials).map((s) => s.url));
    expect(doc.querySelectorAll('.hero .social-link svg').length).toBe(4);
  });

  it('shows the about section and the profile photo', () => {
    expect(doc.querySelector('img.hero-avatar')?.getAttribute('src')).toBe('/img/avatar.jpg');
    expect(doc.querySelector('#about')).not.toBeNull();
    expect(read(dist, 'index.html')).toContain('Ceetiz');
  });

  it('has a footer with the current year and icon-only social links', () => {
    expect(doc.querySelector('footer')?.text).toContain(String(new Date().getFullYear()));
    const socials = doc.querySelectorAll('footer .footer-socials a');
    expect(socials.map((a) => a.getAttribute('href'))).toEqual(Object.values(site.socials).map((s) => s.url));
    for (const a of socials) {
      expect(a.querySelector('svg')).not.toBeNull();
      expect(a.getAttribute('aria-label')).toBeTruthy();
      expect(a.text.trim()).toBe('');
    }
  });
});

describe('blog is removed', () => {
  it('builds no blog pages or RSS feed', () => {
    expect(existsSync(join(dist, 'blog'))).toBe(false);
    expect(existsSync(join(dist, 'rss.xml'))).toBe(false);
  });

  it('has no Blog or RSS links anywhere', () => {
    const doc = page(dist, 'index.html');
    expect(navLabels(doc)).not.toContain('Blog');
    expect(doc.querySelector('link[rel="alternate"][type="application/rss+xml"]')).toBeNull();
    expect(doc.querySelectorAll('a').some((a) => a.getAttribute('href')?.includes('rss'))).toBe(false);
  });
});

describe('travel is hidden behind site.features.travel', () => {
  it('defaults to off', () => {
    expect(site.features.travel).toBe(false);
  });

  it('flag off: builds no /travel routes, nav link or sitemap entries', () => {
    expect(existsSync(join(dist, 'travel'))).toBe(false);
    expect(navLabels(page(dist, 'index.html'))).not.toContain('Travel');
    expect(read(dist, 'sitemap-0.xml')).not.toContain('/travel');
  });

  it('flag on: builds the travel index and the sample trip', () => {
    expect(existsSync(join(distTravel, 'travel', 'index.html'))).toBe(true);
    expect(existsSync(join(distTravel, 'travel', 'kyoto-2026', 'index.html'))).toBe(true);
    expect(navLabels(page(distTravel, 'index.html'))).toContain('Travel');
    expect(read(distTravel, 'sitemap-0.xml')).toContain('https://isabelleyim.com/travel/');
  });
});

describe('work page', () => {
  const html = read(dist, 'work/index.html');

  it('lists every company from resume.ts', () => {
    const companies = [...experience.map((e) => e.company), ...earlierRoles.map((r) => r.company)];
    expect(companies.length).toBeGreaterThan(0);
    for (const company of companies) {
      if (company) expect(html).toContain(company);
    }
  });

  it('lists education, skills and side projects from resume.ts', () => {
    for (const e of education) expect(html).toContain(e.school);
    for (const g of skillGroups) for (const skill of g.skills) expect(html).toContain(skill);
    for (const p of sideProjects) expect(html).toContain(p.name);
  });

  it('never publishes a phone number', () => {
    expect(html).not.toMatch(/\+33|06 68/);
  });

  it('has the right title and canonical', () => {
    const doc = parse(html);
    expect(doc.querySelector('title')?.text).toBe('Work · isabelleyim');
    expect(doc.querySelector('link[rel="canonical"]')?.getAttribute('href')).toBe('https://isabelleyim.com/work/');
  });
});

describe('no theme sample content leaks into the build', () => {
  it('contains no Rowan Hale or example.com strings', () => {
    for (const file of htmlFiles(dist)) {
      const html = readFileSync(file, 'utf8');
      expect(html, file).not.toMatch(/Rowan Hale|rowanhale|example\.com/);
    }
  });
});

describe('stylesheet', () => {
  it('has balanced braces, so component styles are not swallowed by a stray media query', () => {
    const cssDir = join(dist, '_astro');
    const cssFiles = readdirSync(cssDir).filter((f) => f.endsWith('.css'));
    expect(cssFiles.length).toBeGreaterThan(0);
    for (const f of cssFiles) {
      const css = readFileSync(join(cssDir, f), 'utf8');
      expect((css.match(/\{/g) ?? []).length, f).toBe((css.match(/\}/g) ?? []).length);
    }
  });
});

describe('static files', () => {
  it('ships favicon, avatar, OG image, robots.txt and a 404 page', () => {
    for (const f of ['favicon.ico', 'favicon.svg', 'img/avatar.jpg', 'img/og.jpg', 'robots.txt', '404.html']) {
      expect(existsSync(join(dist, f)), f).toBe(true);
    }
    expect(read(dist, 'robots.txt')).toContain('Sitemap: https://isabelleyim.com/sitemap-index.xml');
  });
});
