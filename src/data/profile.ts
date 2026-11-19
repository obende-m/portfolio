export type Role = {
  org: string;
  title: string;
  period: string;
  place?: string;
  summary: string;
  points: string[];
  link?: string;
};

export const experience: Role[] = [
  {
    org: 'MamiPay Digital Services Ltd',
    title: 'Co-Founder & CEO',
    period: '2026 — Present',
    summary: 'Co-founded a digital financial services company and lead its product and technical direction.',
    points: [
      'Set product plans, feature definitions and development priorities.',
      'Turn business requirements into product specifications for the build.',
      'Evaluate technology partners, financial infrastructure providers and integrations.',
      'Work on the website, product presentation and business development.',
    ],
    link: 'https://mamipayweb.com',
  },
  {
    org: 'Freshsprings Medical Services Limited',
    title: 'ICT Officer · NYSC',
    period: 'Apr 2026 — Nov 2026',
    summary: 'Supported the hospital’s rollout of a new Hospital Management System and its day-to-day ICT.',
    points: [
      'Trained staff on the newly implemented Hospital Management System.',
      'Acted as liaison between the organisation and the HMS provider for issues and support.',
      'Relayed staff feedback to the provider and brought resolutions back to staff.',
      'Contributed to the redesign of the organisation’s website.',
    ],
  },
  {
    org: 'Cedacrest Hospitals',
    title: 'IT Support & Systems Management · NYSC',
    period: 'Nov 2025 — Mar 2026',
    summary: 'Built and ran the hospital’s internal inventory management system while handling IT support.',
    points: [
      'Designed, developed and managed an internal inventory management system.',
      'Troubleshot systems, software and other technology issues.',
      'Supported internal applications, websites, databases and digital records.',
    ],
  },
  {
    org: 'HIIT PLC, Abuja',
    title: 'IT Intern',
    period: 'Jan 2024 — Jul 2024',
    summary: 'Front-end work and operations support; named first runner-up for Most Outstanding Intern across all HIIT branches nationwide.',
    points: [
      'Built responsive web interfaces with HTML, CSS and JavaScript.',
      'Served as Student Assistant to the CEO, Mr. Kayode Shobajo.',
      'Represented the interns to management and coordinated front-desk operations.',
      'Received a Letter of Commendation from HIIT PLC.',
    ],
  },
];

export type StackGroup = {
  title: string;
  blurb: string;
  items: { name: string; where?: string }[];
};

/** "where" lists projects in which the tool was verified in code or on the live site. */
export const stack: StackGroup[] = [
  {
    title: 'Interfaces',
    blurb: 'Where most of my hours go.',
    items: [
      { name: 'React', where: 'IDA, QMan, BookDex, Bomas, YOKM' },
      { name: 'TypeScript', where: 'IDA, QMan, YOKM, Safety Signatures' },
      { name: 'Tailwind CSS', where: 'IDA, QMan, BookDex, Bomas, YOKM' },
      { name: 'Vite', where: 'IDA, QMan, YOKM' },
      { name: 'Next.js', where: 'Safety Signatures, Rivendell' },
      { name: 'Astro', where: 'Gulf Flower Schools' },
      { name: 'Framer Motion · GSAP', where: 'Rivendell, Safety Signatures, Gulf Flower' },
      { name: 'JavaScript · HTML · CSS' },
    ],
  },
  {
    title: 'Servers & APIs',
    blurb: 'REST APIs with validation, rate limits and tests.',
    items: [
      { name: 'Node.js', where: 'IDA, QMan' },
      { name: 'Express', where: 'IDA' },
      { name: 'Fastify', where: 'QMan' },
      { name: 'Zod', where: 'IDA, Safety Signatures' },
      { name: 'PHP', where: 'MerakiCode, Teekay Foundation' },
      { name: 'Python · FastAPI' },
    ],
  },
  {
    title: 'Data',
    blurb: 'Schemas, migrations and queries I can explain.',
    items: [
      { name: 'PostgreSQL', where: 'IDA, QMan' },
      { name: 'Prisma', where: 'IDA' },
      { name: 'Supabase', where: 'IDA, YOKM, Safety Signatures, Bomas' },
      { name: 'SQL' },
      { name: 'Row-Level Security' },
    ],
  },
  {
    title: 'Access & security',
    blurb: 'Who can do what, and the proof that they did.',
    items: [
      { name: 'JWT sessions', where: 'IDA' },
      { name: 'Role-based access', where: 'IDA, QMan' },
      { name: 'Argon2 hashing', where: 'IDA' },
      { name: 'Audit logging', where: 'IDA, QMan' },
    ],
  },
  {
    title: 'Ship & test',
    blurb: 'Getting it live and keeping it there.',
    items: [
      { name: 'Git · GitHub' },
      { name: 'GitHub Actions CI', where: 'IDA' },
      { name: 'Vitest', where: 'QMan' },
      { name: 'Vercel', where: 'IDA, Bomas, YOKM, Safety Signatures' },
      { name: 'Render', where: 'IDA' },
    ],
  },
  {
    title: 'IT & systems',
    blurb: 'The work around the software.',
    items: [
      { name: 'System implementation' },
      { name: 'End-user training' },
      { name: 'Vendor liaison' },
      { name: 'Troubleshooting & support' },
      { name: 'Digital records' },
    ],
  },
];

export const credentials = {
  degree: {
    title: 'B.Sc. Computer Science',
    org: 'Babcock University, Ilishan-Remo',
    detail: 'Second Class Upper (2:1) · 2022 — 2025',
  },
  certification: {
    title: 'Certified IT Professional',
    org: 'Computer Professionals (Registration Council of Nigeria) — CPN',
  },
  training: {
    org: 'New Horizons Computer Learning Center',
    courses: [
      'CompTIA A+ (Core 1 & 2)',
      'Fundamentals of Computer Security',
      'Installing and Configuring Windows 10 Client',
      'Oracle Database 12c: SQL Fundamentals',
      'Oracle Database 12c Admin Workshop',
      'Oracle SE8: OCA & OCP',
      'Android Application Management',
    ],
  },
  awards: ['First Runner-Up, Most Outstanding Intern — all HIIT PLC branches nationwide', 'Letter of Commendation, HIIT PLC'],
  volunteer: { role: 'IT / Media Volunteer', org: 'Dominion Chapel', detail: 'Media and technical operations, graphics and slides for services and events.' },
};
