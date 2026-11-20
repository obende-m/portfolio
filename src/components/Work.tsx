import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Users } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { BrowserFrame, PhoneFrame, ShotImg } from './Frames';
import { Reveal, SectionHead } from './Reveal';

const ease = [0.16, 1, 0.3, 1] as const;

export function StackChips({ items, max = 99, className = '' }: { items: string[]; max?: number; className?: string }) {
  const shown = items.slice(0, max);
  const rest = items.length - shown.length;
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`} aria-label="Technologies">
      {shown.map((s) => (
        <li key={s} className="neu-inset rounded-full px-2.5 py-1 font-mono text-[11px] text-muted">
          {s}
        </li>
      ))}
      {rest > 0 && <li className="rounded-full px-2 py-1 font-mono text-[11px] text-dim">+{rest}</li>}
    </ul>
  );
}

const frameUrl: Record<string, string> = {
  'ida-elections': 'ida-elections.vercel.app/admin/dashboard',
  qman: 'qman · reception',
};

const stats: Record<string, [string, string][]> = {
  'ida-elections': [
    ['3', 'admin roles'],
    ['5', 'election states'],
    ['9', 'server test suites'],
  ],
  qman: [
    ['420', 'automated tests'],
    ['57', 'decision records'],
  ],
};

const host = (url?: string) => (url ? new URL(url).host.replace(/^www\./, '') : undefined);

/* Text column: each line slides up in turn when the row scrolls into view. */
const list = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 26 }, show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } } };

function ProjectRow({ p, i }: { p: Project; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // gentle drift while the row passes; nothing is pinned and scrolling is never taken over
  const drift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70]);
  const phoneDrift = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [130, -110]);
  const flip = i % 2 === 1;
  const n = String(i + 1).padStart(2, '0');

  return (
    <article ref={ref} className="border-t border-line py-[clamp(56px,7vw,100px)] first:border-t-0 first:pt-0">
      <Link
        to={`/work/${p.slug}`}
        aria-label={`${p.name}: read the case study`}
        className="group grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
      >
        {/* text */}
        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
          className={`min-w-0 lg:col-span-5 ${flip ? 'lg:order-2' : ''}`}
        >
          <motion.div variants={item} className="mb-6 flex flex-wrap items-center gap-3">
            <span className="font-display text-[15px] font-semibold text-accent">{n}</span>
            <span className="h-px w-8 bg-accent/30" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-2">{p.category}</span>
          </motion.div>
          {p.collaborative && (
            <motion.p variants={item} className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-ink/[0.04] px-2.5 py-1 font-mono text-[11px] text-muted">
              <Users className="size-3" aria-hidden="true" /> Team project
            </motion.p>
          )}
          <motion.h3 variants={item} className="font-display text-[clamp(2.1rem,3.8vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {p.name}
          </motion.h3>
          <motion.p variants={item} className="mt-6 max-w-lg text-[17px] leading-relaxed text-muted">
            {p.summary}
          </motion.p>
          {stats[p.slug] && (
            <motion.dl variants={item} className="mt-8 flex gap-10">
              {stats[p.slug].map(([v, l]) => (
                <div key={l}>
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-display text-[2rem] font-semibold leading-none tracking-tight text-ink">{v}</dd>
                  <dd className="mt-1.5 text-[13px] text-dim">{l}</dd>
                </div>
              ))}
            </motion.dl>
          )}
          <motion.div variants={item}>
            <StackChips items={p.stack} max={6} className="mt-8" />
          </motion.div>
          <motion.span variants={item} className="mt-10 inline-flex items-center gap-3 text-[15px] font-medium text-ink">
            <span className="link-draw group-hover:[background-size:100%_1px]">Read the case study</span>
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-accent text-white shadow-[0_10px_24px_-10px_rgba(29,78,216,0.7)] transition-transform duration-500 group-hover:rotate-45 group-hover:scale-110">
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </span>
          </motion.span>
        </motion.div>

        {/* visual */}
        <div className={`relative min-w-0 lg:col-span-7 ${flip ? 'lg:order-1' : ''}`}>
          <motion.div
            initial={reduce ? false : { clipPath: 'inset(12% 8% 12% 8% round 40px)', opacity: 0.3, scale: 0.96 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 32px)', opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.3, ease }}
            className="relative overflow-hidden rounded-[32px] border border-line bg-gradient-to-br from-bg-2 to-tint/60 px-5 pb-0 pt-10 sm:px-12 sm:pt-16"
          >
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,#000,transparent_75%)]" aria-hidden="true" />
            <motion.div style={{ y: drift }} className="relative">
              <BrowserFrame url={frameUrl[p.slug] ?? host(p.live)} className="rounded-b-none transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-2 sm:rounded-b-none">
                <ShotImg shot={p.cover} className="zoom w-full" sizes="(min-width:1024px) 52vw, 100vw" />
              </BrowserFrame>
            </motion.div>
          </motion.div>
          {p.mobile && (
            <motion.div
              style={{ y: phoneDrift }}
              className={`absolute bottom-[-6%] w-[24%] max-w-[180px] ${flip ? 'left-3 sm:left-5' : 'right-3 sm:right-5'}`}
            >
              <PhoneFrame className="transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-[-2deg]">
                <ShotImg shot={p.mobile} className="w-full" />
              </PhoneFrame>
            </motion.div>
          )}
        </div>
      </Link>
    </article>
  );
}

export default function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="section-pad relative">
      <div className="wrap">
        <SectionHead
          index="01"
          label="Selected work"
          id="work-title"
          title={<>Software that <span className="accent-serif text-accent">runs</span> somewhere.</>}
          lede="Two applications I designed and built end to end, a team product, and websites for a school, a design company and a foundation. Every screen here is from the real product."
        />

        <div className="mt-20 sm:mt-28">
          {projects.map((p, i) => (
            <ProjectRow key={p.slug} p={p} i={i} />
          ))}
        </div>

        <Reveal className="mt-4 flex justify-end">
          <a href="#more" className="link-draw inline-flex min-h-11 items-center font-mono text-[12px] uppercase tracking-[0.14em] text-accent-2">
            More websites below ↓
          </a>
        </Reveal>
      </div>
    </section>
  );
}
