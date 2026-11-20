export type Shot = { src: string; alt: string; w: number; h: number; mobile?: boolean };

export type Project = {
  slug: string;
  name: string;
  short: string;
  org: string;
  category: string;
  kind: 'application' | 'website';
  summary: string;
  role: string;
  collaborative?: boolean;
  status: string;
  stack: string[];
  live?: string;
  accent: string;
  cover: Shot;
  mobile?: Shot;
  gallery: Shot[];
  intro: string;
  objective: string;
  solution: string;
  features: { title: string; body: string }[];
  decisions?: { title: string; body: string }[];
  architecture?: { layer: string; items: string[] }[];
  note?: string;
};

const img = (name: string, alt: string, w = 1440, h = 900): Shot => ({ src: `/images/projects/${name}.webp`, alt, w, h });
const phone = (name: string, alt: string): Shot => ({ src: `/images/projects/${name}.webp`, alt, w: 600, h: 1299, mobile: true });

export const projects: Project[] = [
  {
    slug: 'ida-elections',
    name: 'IDA Electronic Voting Platform',
    short: 'IDA Elections',
    org: 'Igarra Development Association',
    category: 'Full-stack application · Election management',
    kind: 'application',
    summary:
      'Election management and phone-based voting for an association: voter rolls, ballots, single-use voting links, live results and an audit trail behind every admin action.',
    role: 'Designed and built the client, the API and the database schema.',
    status: 'Live',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'TanStack Query', 'React Hook Form', 'Zod', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Supabase', 'JWT', 'Argon2', 'Twilio', 'PDFKit', 'ExcelJS'],
    live: 'https://ida-elections.vercel.app',
    accent: '#1d4ed8',
    cover: img('ida-admin-dashboard', 'IDA admin overview: registered voters, ballots cast, turnout, time remaining and voting-link accounting'),
    mobile: phone('ida-mobile', 'IDA Election Portal voter page on a phone'),
    gallery: [
      img('ida-admin-voters', 'IDA voter roll with link status per member and filters for no link, sent, voted and revoked; names and contact details blurred'),
      img('ida-admin-results', 'IDA live results page with provisional counts, turnout ring and voting-link totals; candidate name blurred'),
      img('ida-admin-audit', 'IDA audit trail listing timestamped admin events, with voter identities protected'),
      img('ida-admin-settings', 'IDA election settings showing the draft, voting, closed and archived lifecycle with pause and close controls'),
      img('ida-admin-reports', 'IDA reports page offering PDF, Excel and CSV exports of summary, results, participation and audit trail'),
      img('ida-home', 'IDA Election Portal voter landing page with the heading “Every member, one voice.”'),
      img('ida-admin-login', 'IDA admin portal sign-in screen for electoral officials'),
      phone('ida-admin-login-mobile', 'IDA admin sign-in on a phone'),
    ],
    intro:
      'The Igarra Development Association needed to elect its officers with members spread across many places. IDA Elections lets every eligible member vote from a phone through a personal link, while the Electoral Committee runs the election from an admin portal.',
    objective:
      'Give every member exactly one ballot, with no sign-up or password for voters, and give the committee a record they can stand behind: who issued which link, when the election opened and closed, and a result that matches the votes cast.',
    solution:
      'A React client served from Vercel talks to an Express API on Render, backed by PostgreSQL on Supabase through Prisma. Voters open a single-use link, confirm their identity on screen, mark one contest at a time, review and cast, then receive a reference number as their receipt. Admins work behind JWT sessions with role-based permissions.',
    features: [
      { title: 'Voter management', body: 'Add voters one by one or import them from CSV, issue or replace voting links, and send invites by SMS or WhatsApp through Twilio.' },
      { title: 'Positions and candidates', body: 'Positions with a maximum number of selections, candidates with photos stored in Supabase Storage.' },
      { title: 'Single-use voting links', body: 'Each link is a 256-bit token; only its hash is stored. Issuing a new link voids the old one, and a voter who has voted can never be issued another.' },
      { title: 'Election lifecycle', body: 'Draft, active, paused, closed and archived states, a schedule with start and end times, and an emergency lock for suspected tampering.' },
      { title: 'Results and reports', body: 'Live tallies, tie detection that never declares a false single winner, a certified snapshot on close, and PDF, Excel and CSV exports.' },
      { title: 'Receipts and audit trail', body: 'Voters get a reference number they can check later. Every sign-in and admin action is written to an audit log.' },
    ],
    decisions: [
      { title: 'Three admin roles, enforced on the server', body: 'Admin, Election Committee and Super Admin. A deactivated admin or a role downgrade takes effect on the next request, not when the JWT expires.' },
      { title: 'The ballot freezes once voting starts', body: 'After the first ballot, positions and candidates cannot be added or deleted, so no two voters see different ballots and no cast vote is lost to a cascade delete.' },
      { title: 'Locked means 423', body: 'Every mutation that must stop during a lock — votes, link issue, voter and candidate records — goes through one guard that answers HTTP 423 Locked.' },
      { title: 'Tested under concurrency', body: 'Integration tests cover a double-submit with one token, 100 concurrent voters, and closing the election during a burst of votes, run in CI against a real PostgreSQL service.' },
    ],
    architecture: [
      { layer: 'Client · Vercel', items: ['React + Vite', 'React Router', 'TanStack Query', 'React Hook Form + Zod'] },
      { layer: 'API · Render', items: ['Express', 'JWT sessions + RBAC', 'Rate limiting + Helmet', 'Origin check for CSRF'] },
      { layer: 'Data · Supabase', items: ['PostgreSQL via Prisma', 'Storage for candidate photos', 'Tallies + result snapshots', 'Audit log'] },
      { layer: 'Messaging', items: ['Twilio SMS', 'Twilio WhatsApp templates'] },
    ],
    note: 'The admin screens are from the live portal, which currently holds test data. Voter and candidate names and contact details are blurred.',
  },
  {
    slug: 'qman',
    name: 'QMan Patient Flow',
    short: 'QMan',
    org: 'Personal product · Healthcare',
    category: 'Full-stack application · Hospital operations',
    kind: 'application',
    summary:
      'An operations layer that sits above a hospital’s existing management system and runs how patients move: reception, station queues, waiting-room boards and a live command centre.',
    role: 'Designed and built the domain engine, the three web apps and the API.',
    status: 'Version 1 built and tested · being prepared for clinical use',
    stack: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'Fastify', 'PostgreSQL', 'Vitest', 'Testing Library'],
    accent: '#2563eb',
    cover: img('qman-reception', 'QMan reception dashboard showing visits today, live queue status per station and priority patients'),
    gallery: [
      img('qman-clinical', 'QMan clinical workspace for the consultation station with call, recall, skip and escalate actions'),
      img('qman-manager', 'QMan operations dashboard with stations over their wait target and the longest current wait'),
      img('qman-display', 'QMan waiting-room display board for the laboratory showing the number now serving'),
      img('qman-command', 'QMan command centre listing stations that need attention'),
      img('qman-admin', 'QMan administration portal for configuring stations'),
    ],
    intro:
      'I worked inside two hospitals as an NYSC corps member, training staff on a hospital management system and supporting their IT. QMan is the tool I wanted on the waiting-room side: the HMS keeps registration, billing and records, and QMan handles how patients move from station to station.',
    objective:
      'Make every queue visible and every patient trackable without replacing the hospital’s existing system, and make new stations a configuration change rather than a code change.',
    solution:
      'A domain package with no dependencies on HTTP, the database or the clock models the visit as the source of truth; queues are a projection of where visits currently are. Three separate builds share that engine: the staff app, a lightweight display board and a patient tracker opened from a QR code.',
    features: [
      { title: 'Reception and priority patients', body: 'Create visits, see live load per station, and keep emergency and urgent patients at the top regardless of arrival time.' },
      { title: 'Station workspace', body: 'Call next, recall, skip, escalate and send the patient on to the next station, with the visit’s full journey on screen.' },
      { title: 'Manager dashboard and command centre', body: 'Stations over their wait target, the longest current wait, staff workload and everything that needs a decision.' },
      { title: 'Display boards and announcements', body: 'Configurable waiting-room signage, voice announcements and browser notifications.' },
      { title: 'Patient tracker', body: 'Patients follow their visit with a journey code or QR code, with no account, installable as a PWA.' },
      { title: 'Administration and audit', body: 'Stations, ticket templates, workflows, roles and boards edited as data, plus an activity and audit explorer.' },
    ],
    decisions: [
      { title: 'Three applications, one engine', body: 'Staff, display and tracker ship as separate builds, so the public screens carry none of the staff code that can change clinical state. The display board bundle is about 7 kB.' },
      { title: 'Events are the integration seam', body: 'One clinical action emits an event; announcements, notifications, the audit log and every open screen subscribe to it. The queue engine knows about none of them.' },
      { title: 'Two identities, on purpose', body: 'A journey code follows the whole visit; a queue number belongs to one station stop. Position in the queue is always derived, never stored.' },
      { title: 'Decisions written down', body: '57 written architecture decision records, and 420 automated tests across the domain, persistence and the three apps.' },
    ],
    architecture: [
      { layer: 'Apps', items: ['Staff app (~130 kB)', 'Display board (~7 kB)', 'Patient tracker (~10 kB)'] },
      { layer: '@qman/domain', items: ['Visit aggregate + state machine', 'Workflow routing', 'Queues + wait estimation', 'Event envelope'] },
      { layer: 'Server', items: ['Fastify API', '@qman/persistence', 'PostgreSQL'] },
    ],
    note: 'QMan is not deployed publicly yet. The screens on this page come from a local build running its built-in demo data; every patient name is fictional.',
  },
  {
    slug: 'bookdex',
    name: 'BookDex',
    short: 'BookDex',
    org: 'Team project',
    category: 'Web application · Bookings and invoicing',
    kind: 'application',
    summary:
      'Bookings, deposits and invoices for service businesses in Nigeria: one link where clients see services and prices, pick a free time and pay the deposit by bank transfer.',
    role: 'Contributed as part of the team, working on features that let service providers and customers manage bookings.',
    collaborative: true,
    status: 'Live',
    stack: ['React', 'Vite', 'React Router', 'Radix UI', 'Tailwind CSS', 'Supabase', 'Zod'],
    live: 'https://bookdexhub.com',
    accent: '#0369a1',
    cover: img('bookdex-dashboard', 'BookDex dashboard with revenue, bookings, clients and a calendar, beside the public booking page on a phone', 1120, 720),
    mobile: phone('bookdex-mobile', 'BookDex home page on a phone'),
    gallery: [
      img('bookdex-home', 'BookDex home page: “Bookings, deposits and invoices for your service business.”'),
      img('bookdex-booking', 'BookDex public booking page on two phones: studio profile and service selection', 600, 600),
      img('bookdex-invoice', 'A BookDex invoice generated from a booking', 522, 556),
    ],
    intro:
      'BookDex replaces booking by WhatsApp message for salons, studios and other appointment businesses. I worked on it as one member of a team.',
    objective: 'Let a business share one link, take only the times it is really free, collect a deposit and send an invoice without typing it out.',
    solution:
      'Each business gets a public booking page with its services, prices, photos and contacts. Clients choose a service and time, pay the deposit by bank transfer and upload a receipt; the business confirms and sends an invoice as a link, image or PDF.',
    features: [
      { title: 'Public booking page', body: 'Services with prices and durations, working hours, buffer times, daily limits and days off.' },
      { title: 'Deposits by transfer', body: 'Clients pay into the business’s own bank account and attach the receipt to the booking.' },
      { title: 'Calendar and reminders', body: 'Every booking on one calendar, with reminders for confirmed appointments.' },
      { title: 'Invoices', body: 'Generated from the booking with the deposit, the balance and the amount in words.' },
    ],
  },
  {
    slug: 'bomas-academy',
    name: 'Bomas Academy',
    short: 'Bomas Academy',
    org: 'Bomas Academy, Jos',
    category: 'School website and platform',
    kind: 'website',
    summary: 'Website and digital platform for a nursery, primary and secondary school in Jos, with admissions, a staff area and a parent portal link.',
    role: 'Developed the website and platform, including administrative features and the admissions, application and payment workflows.',
    status: 'Live',
    stack: ['React', 'Tailwind CSS', 'Supabase', 'Vercel'],
    live: 'https://www.bomasacademy.org',
    accent: '#1e40af',
    cover: img('bomas-home', 'Bomas Academy home page with students and the heading “Where character meets excellence.”'),
    mobile: phone('bomas-mobile', 'Bomas Academy home page on a phone'),
    gallery: [
      img('bomas-admissions', 'Bomas Academy admissions page'),
      phone('bomas-admissions-mobile', 'Bomas Academy admissions page on a phone'),
    ],
    intro: 'Bomas Academy is a private nursery, primary and secondary school in Jos, Plateau State. Its site is where parents first meet the school and where admissions begin.',
    objective: 'Give the school a clear, fast public presence and move admissions and related admin work online.',
    solution:
      'A React site with sections for academics, admissions, school life, facilities, news, downloads and staff, backed by Supabase for data and sign-in.',
    features: [
      { title: 'Admissions', body: 'How to apply, from nursery to senior secondary, with an online application route.' },
      { title: 'School information', body: 'Academics, facilities, school life, news and downloadable documents.' },
      { title: 'Administrative area', body: 'A signed-in area for school staff, plus a link out to the school portal.' },
    ],
  },
  {
    slug: 'merakicode',
    name: 'MerakiCode',
    short: 'MerakiCode',
    org: 'Meraki Code Limited',
    category: 'Business website · PHP',
    kind: 'website',
    summary: 'Website for an interior and exterior design company, with a project portfolio, artwork, services and an admin login.',
    role: 'Developed the website in PHP, including the administrative side and e-commerce features: product listings and a cart.',
    status: 'Live',
    stack: ['PHP'],
    live: 'https://merakicode.ng',
    accent: '#3b5bdb',
    cover: img('meraki-home', 'Meraki Code home page: “Crafting Inspiring spaces.”'),
    mobile: phone('meraki-mobile', 'Meraki Code home page on a phone'),
    gallery: [],
    intro: 'Meraki Code Limited designs and fits out interior and exterior spaces. The site presents the work and lets the business manage its content.',
    objective: 'Show past projects and artwork in a way that matches the craft, and let the team run listings themselves.',
    solution: 'A server-rendered PHP site with portfolio, artwork, services, about and contact pages, plus an admin area and product listings with a cart.',
    features: [
      { title: 'Portfolio and artwork', body: 'Past projects and artwork presented on their own pages.' },
      { title: 'Admin area', body: 'A login for the business to manage the site.' },
      { title: 'Shop features', body: 'Product listings and cart functionality.' },
    ],
  },
  {
    slug: 'teekay-foundation',
    name: 'Teekay Sickle Cell Foundation',
    short: 'Teekay Foundation',
    org: 'Teekay Sickle Cell Foundation',
    category: 'Nonprofit website · PHP',
    kind: 'website',
    summary: 'Website for a foundation supporting people and families affected by sickle cell disease: its story, events, news, gallery and donations.',
    role: 'Developed the website in PHP.',
    status: 'Live',
    stack: ['PHP', 'Bootstrap'],
    live: 'https://www.teekaysicklecellfoundation.com',
    accent: '#1d4ed8',
    cover: img('teekay-home', 'Teekay Sickle Cell Foundation home page: “Touching lives, one at a time.”'),
    mobile: phone('teekay-mobile', 'Teekay Sickle Cell Foundation home page on a phone'),
    gallery: [],
    intro: 'The foundation raises awareness of sickle cell disease and supports patients and families. The site carries that outreach.',
    objective: 'Tell the foundation’s story clearly, publish its events and news, and make giving straightforward.',
    solution: 'A PHP site with about, gallery, events, news, contact and donation pages.',
    features: [
      { title: 'Outreach', body: 'About, events and news pages that keep supporters informed.' },
      { title: 'Gallery', body: 'Photographs from the foundation’s work.' },
      { title: 'Donations', body: 'A clear route to give, from every page.' },
    ],
  },
];

export type MiniProject = {
  name: string;
  what: string;
  stack: string[];
  live: string;
  cover: Shot;
  mobile: Shot;
};

export const moreWork: MiniProject[] = [
  {
    name: 'Yendel Ocha Kpeling Ministry',
    what: 'Public site and content management for a ministry serving widows in Jos.',
    stack: ['TanStack Start', 'React', 'Tailwind CSS', 'shadcn/ui', 'Supabase'],
    live: 'https://yokm.vercel.app',
    cover: img('yokm-home', 'YOKM home page: “Awake, Oh Ye Widows”'),
    mobile: phone('yokm-mobile', 'YOKM home page on a phone'),
  },
  {
    name: 'Safety Signatures Limited',
    what: 'Site for a Lagos guard company, with server-validated forms, CV uploads and a staff admin.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Motion'],
    live: 'https://safetysignaturesltd.vercel.app',
    cover: img('safety-home', 'Safety Signatures home page: “Security guards and protection for organisations in Lagos”'),
    mobile: phone('safety-mobile', 'Safety Signatures home page on a phone'),
  },
  {
    name: 'Gulf Flower Schools',
    what: 'Multi-page static site for a day and boarding school in Oworonshoki, Lagos.',
    stack: ['Astro', 'GSAP'],
    live: 'https://gulfflowerschool.vercel.app',
    cover: img('gulf-home', 'Gulf Flower Schools home page: “Where young minds bloom, from cradle to SS3.”'),
    mobile: phone('gulf-mobile', 'Gulf Flower Schools home page on a phone'),
  },
  {
    name: 'Rivendell Consults',
    what: 'Site for an architecture, construction and real estate consultancy.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    live: 'https://rivendell-sandy.vercel.app',
    cover: img('rivendell-home', 'Rivendell Consults home page: “Building Legacies Through Design”'),
    mobile: phone('rivendell-mobile', 'Rivendell Consults home page on a phone'),
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
