/**
 * Résumé data shown on /work and used for the hero and structured data.
 *
 * Source: Isabelle's English résumé (resume_iyim_2026_EN.pdf, September 2026).
 * Texts are copied as written there. Nothing is invented: values the résumé does
 * not give (course dates, project links) are left out and the components skip
 * them. Open items are marked `TODO(Isabelle)` and listed in the content
 * checklist in CLAUDE.md.
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
    role: 'Front-End Developer',
    company: 'Ceetiz',
    location: 'Paris',
    start: 'April 2022',
    end: 'October 2026',
    bullets: [
      'Delivered the redesign of the back-office and B2C website: built screens within a hexagonal architecture, turned mock-ups into UI, and mapped the back-end data model to the interface.',
      'Designed and maintained the design system for the admin tools: a library of responsive, reusable Vue 3 components shared across internal applications.',
      'Reviewed code for the front-end team: checked merge requests and kept work consistent with team conventions and the design system.',
      'Continuously improved the live B2C site through bug fixes and performance optimisations.',
    ],
    badges: ['TypeScript', 'Vue 3 / Nuxt', 'Tailwind CSS', 'Hexagonal architecture', 'GitLab'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Adilibre',
    location: 'Paris',
    start: 'July 2019',
    end: 'September 2020',
    bullets: [
      'Built an internal npm module for ePub3 compliance testing (structure and metadata), integrated into the back-office, so issues were caught automatically on import instead of surfacing after delivery when client brands reported them.',
      'Designed functional mock-ups, then built the detail and management screens (contacts, mailing lists, point-of-sale materials), from wireframe to production.',
    ],
    badges: ['React', 'GraphQL', 'Node.js', 'Material UI', 'Figma', 'CodeCommit'],
  },
  {
    role: 'Front-End Developer',
    company: 'SeLoger',
    location: 'Paris',
    start: 'February 2018',
    end: 'June 2019',
    bullets: [
      'Delivered the redesign of the property listing page, one of the most visited pages on the site, with responsive, cross-browser React/Redux components.',
      'Built A/B tests (Kameleoon) on the legacy version so product changes could be decided on real user data.',
      'Improved SEO (metadata, semantic structure) and increased unit test coverage.',
    ],
    badges: ['React', 'Redux', 'styled-components', 'Jest', 'Kameleoon', 'Scrum'],
  },
  {
    role: 'Front-End Developer',
    company: 'Keyrus',
    location: 'Levallois-Perret',
    start: 'April 2017',
    end: 'December 2017',
    bullets: [
      'Built the front end for the redesign of GrandVision’s websites (Grand Optical, Générale d’Optique and Apollo in Germany), turning mock-ups into responsive, cross-browser pages across 3 brands and 2 markets.',
      'Standardised CSS across the group’s sites (Less, BEM) and fixed display bugs.',
    ],
    badges: ['HTML5', 'CSS3', 'jQuery', 'Less', 'BEM'],
  },
  {
    role: 'Digital Project Manager',
    company: 'BigYouth',
    location: 'Paris',
    start: 'January 2015',
    end: 'January 2016',
    summary:
      'Managed web projects at an agency: scoped client requirements, coordinated editorial, creative and technical teams, tracked schedule, budget and quality, and handled client relations.',
  },
];

/** Roles outside the main timeline. Empty: the résumé covers everything. */
export const earlierRoles: EarlierRole[] = [];

export const education: Education[] = [
  {
    degree: 'Building accessible, RGAA-compliant websites',
    field: 'Certification in progress',
    school: 'Access42',
    // TODO(Isabelle): course dates, if you want more than the year.
    start: '2026',
  },
  {
    degree: 'Full-Stack JavaScript Developer',
    field: 'Certified qualification, RNCP Level 6, equivalent to a bachelor’s degree',
    school: 'Ifocop',
    start: '2016',
  },
  {
    degree: 'Multimedia Project Management',
    school: 'IESA Multimédia',
    start: '2014',
  },
];

export const skillGroups: SkillGroup[] = [
  { title: 'Code', skills: ['TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'] },
  {
    title: 'Frameworks & libraries',
    skills: ['Vue 3 / Nuxt', 'React', 'Tailwind CSS', 'styled-components', 'Material UI', 'GraphQL'],
  },
  {
    title: 'Practices',
    skills: ['design systems', 'reusable components', 'code review', 'unit testing (Jest)', 'hexagonal architecture'],
  },
  // TODO(Isabelle): add an "Accessibility" group (RGAA 4, WCAG 2.1 AA, semantic HTML, ARIA,
  // keyboard navigation, screen-reader testing) once the Access42 certification is obtained.
  { title: 'Tools & methods', skills: ['Git (GitLab, GitHub)', 'GitLab CI', 'Figma', 'Scrum', 'Jira'] },
  { title: 'Languages', skills: ['French — native', 'English — fluent, professional working proficiency'] },
];

export const sideProjects: SideProject[] = [
  {
    name: 'Free Knit',
    years: '2021–2022',
    stack: ['Remix', 'TypeScript', 'Tailwind CSS'],
    description:
      'Turns a paper knitting pattern into a digital tracker: you work through your project by ticking off each completed step.',
  },
  {
    name: 'Vegans Little Helper',
    years: '2021',
    stack: ['Next.js', 'Tailwind CSS'],
    description: 'A product listing that helps users identify vegan products and flag them.',
  },
  {
    name: 'Ghibli World',
    years: '2021',
    stack: ['Next.js', 'TypeScript', 'styled-components'],
    description: 'A catalogue of Studio Ghibli films, with a filterable list and a detailed page for each film.',
  },
];

/** Plain job title, used on /work, in meta descriptions and structured data. */
export const jobTitle = 'Front-end developer';

/** Summary from the résumé, shown in the hero and at the top of /work (and so in the PDF).
 *  Reworded in the first person, and without the leading job title that the pages already show just above it. */
export const intro =
  'With nearly 8 years of experience, I build polished, maintainable product interfaces: design systems, reusable components, code review. I have redesigned back-offices and consumer-facing websites with TypeScript, Vue 3 / Nuxt and React. I am currently completing the RGAA accessibility certification to build accessible websites.';

/** Lines typed out one character at a time in the hero. */
export const typingRoles = [
  `${jobTitle} 💻`,
  'Knitter / Crocheter 🧶',
  'Stargazer 🔭',
  'Plant-powered 🌱 / Friend of all animals 🐮',
  'Cat mom 😺',
];
