import type { PointerEvent } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import SystemMap from './SystemMap';

const ease = [0.16, 1, 0.3, 1] as const;

const headline: { w: string; em?: boolean }[] = [
  { w: 'I' }, { w: 'build' }, { w: 'the' }, { w: 'systems' }, { w: 'behind' },
  { w: 'elections,', em: true }, { w: 'hospitals', em: true }, { w: 'and' }, { w: 'schools.', em: true },
];

export default function Hero() {
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      aria-labelledby="hero-title"
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden pt-28 sm:pt-32"
    >
      {/* ambient ground */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]" aria-hidden="true">
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_65%_45%,#000_20%,transparent_75%)]" />
        <div className="absolute -right-[10%] top-[8%] size-[620px] rounded-full bg-forest/50 blur-[140px]" />
        <div className="absolute -left-[12%] bottom-[-10%] size-[520px] rounded-full bg-forest-deep/70 blur-[120px]" />
        <div className="absolute right-[24%] top-[30%] size-[220px] rounded-full bg-mint/10 blur-[90px]" />
      </div>

      <div className="wrap grid flex-1 items-center gap-10 pb-10 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
            className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[14px] text-muted"
          >
            <span className="font-display text-[15px] font-semibold text-ink">Obende Michael Onimisi</span>
            <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
            <span>Software Developer · IT &amp; Systems</span>
          </motion.p>

          <h1 id="hero-title" className="display text-[clamp(2.6rem,5.5vw,5.6rem)]">
            <span className="sr-only">I build the systems behind elections, hospitals and schools.</span>
            <span aria-hidden="true">
              {headline.map(({ w, em }, i) => (
                <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-top">
                  <motion.span
                    className={`inline-block ${em ? 'accent-serif pr-[0.06em] text-mint' : ''}`}
                    style={em ? { fontSize: '1.08em', letterSpacing: '-0.02em' } : undefined}
                    initial={{ y: '110%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, ease, delay: 0.25 + i * 0.06 }}
                  >
                    {w}
                  </motion.span>
                  {i < headline.length - 1 && <span>&nbsp;</span>}
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.9 }}
            className="lede mt-8 max-w-[34rem]"
          >
            Full-stack web applications in TypeScript, React, Node.js and PostgreSQL, and the websites organisations run on. Based in Nigeria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.05 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#work" className="btn btn-primary">
              See the work <ArrowDown className="arrow size-4" aria-hidden="true" />
            </a>
            <a href="#contact" className="btn neu text-ink">
              Get in touch <ArrowRight className="arrow size-4" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <SystemMap px={px} py={py} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="wrap pb-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-line pt-5 font-mono text-[11.5px] uppercase tracking-[0.12em] text-dim">
          <span>B.Sc. Computer Science · 2:1</span>
          <span className="hidden sm:inline">Co-founder &amp; CEO, MamiPay</span>
          <span className="hidden md:inline">Healthcare IT · NYSC</span>
          <a href="#work" className="link-draw inline-flex min-h-11 items-center text-sage">Scroll to work ↓</a>
        </div>
      </motion.div>
    </section>
  );
}
