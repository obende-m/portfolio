import { useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { ArrowUpRight, Plus } from 'lucide-react';
import { experience } from '../data/profile';
import { SectionHead } from './Reveal';

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad relative border-t border-line">
      <div className="wrap">
        <SectionHead
          index="03"
          label="Experience"
          id="experience-title"
          title={<>Where I’ve <span className="accent-serif text-accent">worked.</span></>}
          lede="A company I co-founded, two hospitals during national service, and the internship where it started."
        />

        <ol ref={listRef} className="relative mt-16 border-t border-line">
          {/* timeline rail */}
          <span className="absolute left-0 top-0 hidden h-full w-px bg-line md:block" aria-hidden="true" />
          <motion.span
            style={{ scaleY: progress }}
            className="absolute left-0 top-0 hidden h-full w-px origin-top bg-accent md:block"
            aria-hidden="true"
          />
          {experience.map((r, i) => {
            const isOpen = open === i;
            return (
              <li key={r.org} className="relative border-b border-line md:pl-10">
                <span
                  className={`absolute -left-[4px] top-9 hidden size-[9px] rounded-full border transition-colors duration-500 md:block ${
                    isOpen ? 'border-accent bg-accent' : 'border-line-strong bg-bg'
                  }`}
                  aria-hidden="true"
                />
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`role-${i}`}
                    className="group grid w-full grid-cols-[1fr_auto] items-start gap-x-6 gap-y-2 py-7 text-left sm:py-8 md:grid-cols-12"
                  >
                    <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-dim md:col-span-3 md:pt-2">{r.period}</span>
                    <span className="col-span-1 row-start-2 md:col-span-8 md:row-start-auto">
                      <span className="block font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em] transition-colors group-hover:text-accent sm:text-[2.1rem]">
                        {r.org}
                      </span>
                      <span className="mt-1 block text-[15px] text-muted">{r.title}</span>
                    </span>
                    <span className="neu col-start-2 row-span-2 row-start-1 inline-flex size-11 items-center justify-center self-center rounded-full md:col-span-1 md:col-start-12 md:row-span-1 md:justify-self-end">
                      <Plus className={`size-4 transition-transform duration-500 ${isOpen ? 'rotate-45 text-accent' : ''}`} aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`role-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-9 md:grid-cols-12">
                        <p className="text-[16px] text-ink md:col-span-4 md:col-start-4">{r.summary}</p>
                        <ul className="space-y-2.5 md:col-span-5">
                          {r.points.map((pt) => (
                            <li key={pt} className="flex gap-3 text-[15px] text-muted">
                              <span className="mt-[0.7em] h-px w-3 shrink-0 bg-accent-2" aria-hidden="true" />
                              {pt}
                            </li>
                          ))}
                          {r.link && (
                            <li>
                              <a href={r.link} target="_blank" rel="noreferrer" className="link-draw mt-2 inline-flex items-center gap-1.5 text-[14px] text-accent-2">
                                {r.link.replace('https://', '')} <ArrowUpRight className="size-3.5" aria-hidden="true" />
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
