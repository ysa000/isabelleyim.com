/**
 * Résumé data shown on /work and used for the hero and structured data.
 *
 * Source: Isabelle's CV (CV-Isabelle-Yim-contenu-FINAL.md, September 2026),
 * translated from French. Nothing is invented: where the CV leaves a value in
 * brackets (an end month, a course date, a project link) the field is left out
 * and the components skip it. Open items are marked `TODO(Isabelle)` and listed
 * in the content checklist in CLAUDE.md.
 */

export interface Experience {
  role: string;
  company: string;
  companyUrl?: string;
  location?: string;
  start?: string;
  end?: string;
  current?: boolean;
  summary?: string;
  bullets?: string[];
  badges?: string[];
}

export interface EarlierRole {
  role: string;
  company?: string;
  start?: string;
  end?: string;
}

export interface Education {
  degree: string;
  field?: string;
  school: string;
  /** A single year when `end` is omitted. */
  start: string;
  end?: string;
  /** Short status shown next to the date, e.g. "planned". */
  note?: string;
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export interface SideProject {
  name: string;
  years: string;
  stack: string[];
  description: string;
  /** TODO(Isabelle): links, if the projects are online somewhere. */
  url?: string;
}

/** Work history — newest first. Shown on /work. */
export const experience: Experience[] = [
  {
    role: 'Front-end developer',
    company: 'Ceetiz',
    location: 'Paris',
    start: 'Apr 2022',
    // TODO(Isabelle): end month (the CV has "[mois] 2026").
    end: '2026',
    summary: 'Back-office and B2C site rebuild, a shared design system, and code review for the front-end team.',
    bullets: [
      'Rebuilt the back-office and the B2C site: built the screens within a hexagonal architecture, implemented the designs and mapped the back-end data model onto the interface.',
      'Designed and maintained the back-office design system: a library of responsive, reusable Vue 3 components shared across the internal applications.',
      'Code review within the front-end team: reviewed merge requests for consistency with team conventions and the design system.',
      'Continuous improvement of the B2C site in production: bug fixes and performance optimisations.',
    ],
    badges: ['TypeScript', 'Vue 3 / Nuxt', 'Tailwind CSS', 'Hexagonal architecture', 'GitLab'],
  },
  {
    role: 'Full-stack developer',
    company: 'Adilibre',
    location: 'Paris',
    start: 'Jul 2019',
    end: 'Sep 2020',
    summary: 'Publishing back-office: ePub3 compliance tooling and management screens, from wireframe to production.',
    bullets: [
      'Built an internal npm module that checks ePub3 files for compliance (structure and metadata), integrated into the back-office: issues are now caught automatically on import, where previously they only surfaced after delivery, reported by client brands.',
      'Designed the functional mockups, then built the detail and management screens (contacts, mailing lists, point-of-sale material): from wireframe to production.',
    ],
    badges: ['React', 'GraphQL', 'Node.js', 'Material UI', 'Figma', 'CodeCommit'],
  },
  {
    role: 'Front-end developer',
    company: 'SeLoger',
    location: 'Paris',
    start: 'Feb 2018',
    end: 'Jun 2019',
    summary: 'Rebuild of the property listing page, A/B testing and SEO on one of the most visited pages of the site.',
    bullets: [
      'Rebuilt the listing detail page, one of the most visited pages on the site: responsive, cross-browser React/Redux components.',
      'Built A/B tests (Kameleoon) on the legacy version, so product decisions could be settled on real data.',
      'SEO optimisation (metadata, semantic structure) and unit test coverage.',
    ],
    badges: ['React', 'Redux', 'styled-components', 'Jest', 'Kameleoon', 'Scrum'],
  },
  {
    role: 'Front-end developer',
    company: 'Keyrus',
    location: 'Levallois-Perret',
    start: 'Apr 2017',
    end: 'Dec 2017',
    summary: 'Redesign of the GrandVision group sites: Grand Optical, Générale d’Optique and Apollo (Germany).',
    bullets: [
      'Responsive, cross-browser integration from the designs, across three brands and two markets.',
      'Harmonised the CSS across the group’s sites (Less, BEM) and fixed display bugs.',
    ],
    badges: ['HTML5', 'CSS3', 'jQuery', 'Less', 'BEM'],
  },
  {
    role: 'Multimedia project manager',
    company: 'BigYouth',
    location: 'Paris',
    start: 'Jan 2015',
    end: 'Jan 2016',
    summary:
      'Managed web projects in an agency: scoping the need, coordinating the editorial, creative and technical teams, tracking schedule, budget and quality, and the client relationship.',
  },
];

/** Roles outside the main timeline. Empty: the CV covers everything. */
export const earlierRoles: EarlierRole[] = [];

export const education: Education[] = [
  {
    degree: 'Developing accessible websites compliant with RGAA',
    field: 'Certifying course',
    school: 'Access42',
    // TODO(Isabelle): confirm the dates and whether the course has started (the CV has "[2026]").
    start: '2026',
    note: 'planned',
  },
  {
    degree: 'Full-stack JavaScript developer',
    field: 'Certified title, RNCP level 6',
    school: 'Ifocop',
    start: '2016',
  },
  {
    degree: 'Multimedia project manager',
    school: 'IESA Multimédia',
    start: '2014',
  },
];

export const skillGroups: SkillGroup[] = [
  { title: 'Languages', skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
  {
    title: 'Frameworks & libraries',
    skills: ['Vue 3 / Nuxt', 'React', 'Tailwind CSS', 'styled-components', 'Material UI', 'GraphQL'],
  },
  {
    title: 'Practices',
    skills: ['Design systems', 'Reusable components', 'Code review', 'Unit testing (Jest)', 'Hexagonal architecture'],
  },
  // TODO(Isabelle): add an "Accessibility" group (RGAA 4, WCAG 2.1 AA, semantic HTML, ARIA,
  // keyboard navigation, screen-reader testing) once the Access42 certification is obtained.
  { title: 'Tools & methods', skills: ['Git (GitLab, GitHub)', 'GitLab CI', 'Figma', 'Scrum', 'JIRA'] },
  { title: 'Spoken languages', skills: ['French (native)', 'English (professional, fluent)'] },
];

export const sideProjects: SideProject[] = [
  {
    name: 'Free Knit',
    years: '2021 – 2022',
    stack: ['Remix', 'TypeScript', 'Tailwind CSS'],
    description:
      'Turns a paper knitting pattern into a digital tracker: you move through a project by ticking off the steps you have completed.',
  },
  {
    name: 'Vegans Little Helper',
    years: '2021',
    stack: ['Next.js', 'Tailwind CSS'],
    description: 'A product listing for identifying and flagging products that are vegan.',
  },
  {
    name: 'Ghibli World',
    years: '2021',
    stack: ['Next.js', 'TypeScript', 'styled-components'],
    description: 'A catalogue of Studio Ghibli films: a filterable list and a detail page for each film.',
  },
];

/** Plain job title, used on /work, in meta descriptions and structured data. */
export const jobTitle = 'Front-end developer';

/** Short pitch from the CV, shown in the hero and at the top of /work (and so in the PDF).
 *  TODO(Isabelle): keep or drop "Available immediately". */
export const intro =
  'Close to eight years building careful, maintainable product interfaces: design systems, reusable components, code review. At home in back-office and consumer-site rebuilds, in TypeScript, Vue 3 / Nuxt and React. Available immediately.';

/** Lines typed out one character at a time in the hero. */
export const typingRoles = [
  `${jobTitle} 💻`,
  'Knitter / Crocheter 🧶',
  'Plant-powered 🌱 / Friend of all animals 🐮',
  'Cat mom 😺',
];
