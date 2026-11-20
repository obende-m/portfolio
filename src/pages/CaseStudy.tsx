import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight, Info, Users } from 'lucide-react';
import { getProject, projects } from '../data/projects';
import { BrowserFrame, PhoneFrame, ShotImg } from '../components/Frames';
import { MaskReveal, Reveal } from '../components/Reveal';
import { StackChips } from '../components/Work';
import { useMeta } from '../lib/useMeta';
import { spotlight } from '../lib/useSpotlight';
import NotFound from './NotFound';

const ease = [0.16, 1, 0.3, 1] as const;

function Label({ n, children }: { n: string; children: string }) {
  return (
    <p className="eyebrow mb-6 flex items-center gap-3">
      <span className="text-dim">{n}</span>
      <span className="h-px w-8 bg-accent-2/40" aria-hidden="true" />
      {children}
    </p>
  );
}

export default function CaseStudy() {
  const { slug = '' } = useParams();
  const p = getProject(slug);
  useMeta(p ? `${p.name} — Case study · Obende Michael` : 'Not found · Obende Michael', p?.summary);
  if (!p) return <NotFound />;

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const host = p.live?.replace(/^https?:\/\/(www\.)?/, '');
  const desktopGallery = p.gallery.filter((g) => !g.mobile);
  const mobileGallery = p.gallery.filter((g) => g.mobile);
  let n = 0;
  const num = () => String(++n).padStart(2, '0');

  return (
    <motion.main
      id="main"
      key={p.slug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ ['--accent' as string]: p.accent }}
    >
      {/* Header */}
      <header className="relative isolate overflow-hidden pb-14 pt-32 sm:pt-40">
        <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_55%,transparent)]" aria-hidden="true">
          <div className="absolute -right-[10%] -top-[20%] size-[700px] rounded-full opacity-25 blur-[150px]" style={{ background: p.accent }} />
          <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_70%_20%,#000,transparent_75%)]" />
        </div>
        <div className="wrap">
          <Link to="/#work" className="group inline-flex min-h-11 items-center gap-2 text-[14px] text-muted hover:text-ink">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" /> All work
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mb-6 font-mono text-[12px] uppercase tracking-[0.14em]" style={{ color: p.accent }}>
                {p.category}
              </motion.p>
              <h1 className="display text-[clamp(2.75rem,7.5vw,7rem)]">
                <span className="block overflow-hidden pb-[0.1em]">
                  <motion.span className="block" initial={{ y: '105%' }} animate={{ y: 0 }} transition={{ duration: 1.1, ease, delay: 0.1 }}>
                    {p.name}
                  </motion.span>
                </span>
              </h1>
              <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.35 }} className="lede mt-6 max-w-2xl">
                {p.summary}
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease, delay: 0.45 }} className="lg:col-span-4">
              <dl className="glass grid gap-5 rounded-[24px] p-6 text-[14px]">
                <div>
                  <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">My role</dt>
                  <dd className="mt-1.5 text-ink">{p.role}</dd>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">For</dt>
                    <dd className="mt-1.5 text-muted">{p.org}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">Status</dt>
                    <dd className="mt-1.5 text-muted">{p.status}</dd>
                  </div>
                </div>
                {p.collaborative && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-ink/10 bg-ink/[0.03] p-3 text-muted">
                    <Users className="mt-0.5 size-4 shrink-0 text-accent-2" aria-hidden="true" />
                    Built by a team. Only my part of the work is claimed here.
                  </div>
                )}
                <div className="flex flex-wrap gap-2 pt-1">
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary !min-h-11 !px-5 !text-[14px]">
                      Visit {host} <ArrowUpRight className="arrow arrow-up size-4" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </dl>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Cover */}
      <div className="wrap">
        <MaskReveal>
          <div className={`relative ${p.mobile ? 'pb-10 sm:pb-16 sm:pr-24 lg:pr-40' : ''}`}>
            <BrowserFrame url={host ?? `${p.short.toLowerCase()} · local build`}>
              <ShotImg shot={p.cover} eager className="w-full" sizes="(min-width:1320px) 1240px, 100vw" />
            </BrowserFrame>
            {p.mobile && (
              <PhoneFrame className="absolute bottom-0 right-0 w-[26%] max-w-[260px]">
                <ShotImg shot={p.mobile} className="w-full" />
              </PhoneFrame>
            )}
          </div>
        </MaskReveal>
      </div>

      {/* Overview */}
      <section className="section-pad" aria-labelledby="overview">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Label n={num()}>Overview</Label>
            <h2 id="overview" className="font-display text-[clamp(1.75rem,3vw,2.6rem)] font-medium leading-[1.2] tracking-[-0.025em]">{p.intro}</h2>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-6 lg:col-start-7 lg:pt-14">
            <Reveal delay={0.05}>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent-2">The goal</h3>
              <p className="mt-4 text-[16px] leading-[1.75] text-muted">{p.objective}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h3 className="font-mono text-[12px] uppercase tracking-[0.14em] text-accent-2">The build</h3>
              <p className="mt-4 text-[16px] leading-[1.75] text-muted">{p.solution}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-line section-pad" aria-labelledby="features">
        <div className="wrap">
          <Reveal>
            <Label n={num()}>What it does</Label>
            <h2 id="features" className="h2 max-w-3xl">Features</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {p.features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 0.06}>
                <div onPointerMove={spotlight} className={`spotlight h-full rounded-[24px] p-6 sm:p-7 ${i === 0 ? 'glass' : 'card'}`}>
                  <span className="font-mono text-[12px]" style={{ color: p.accent }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 font-display text-[1.35rem] font-semibold tracking-[-0.02em]">{f.title}</h3>
                  <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{f.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {(desktopGallery.length > 0 || mobileGallery.length > 0) && (
        <section className="border-t border-line section-pad" aria-labelledby="screens">
          <div className="wrap">
            <Reveal>
              <Label n={num()}>Screens</Label>
              <h2 id="screens" className="h2">From the real product</h2>
            </Reveal>
            <div className="mt-12 grid gap-5 lg:grid-cols-12">
              {desktopGallery.map((g, i) => {
                const wide = i % 3 === 0;
                const square = g.w / g.h < 1.2;
                return (
                  <Reveal key={g.src} className={wide && !square ? 'lg:col-span-12' : 'lg:col-span-6'}>
                    {square ? (
                      <div className="shot overflow-hidden rounded-[22px] border border-ink/10">
                        <ShotImg shot={g} className="w-full" sizes="(min-width:1024px) 40vw, 100vw" />
                      </div>
                    ) : (
                      <BrowserFrame>
                        <ShotImg shot={g} className="w-full" sizes={wide ? '(min-width:1320px) 1240px, 100vw' : '(min-width:1024px) 50vw, 100vw'} />
                      </BrowserFrame>
                    )}
                  </Reveal>
                );
              })}
              {mobileGallery.map((g) => (
                <Reveal key={g.src} className="mx-auto w-[62%] max-w-[300px] lg:col-span-4 lg:mx-0 lg:w-auto lg:max-w-none lg:px-10">
                  <PhoneFrame>
                    <ShotImg shot={g} className="w-full" />
                  </PhoneFrame>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Architecture */}
      {p.architecture && (
        <section className="border-t border-line section-pad" aria-labelledby="architecture">
          <div className="wrap">
            <Reveal>
              <Label n={num()}>How it fits together</Label>
              <h2 id="architecture" className="h2">Architecture</h2>
            </Reveal>
            <div className={`relative mt-12 grid gap-4 md:grid-cols-2 ${p.architecture.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
              <svg className="pointer-events-none absolute left-0 top-[42px] hidden h-2 w-full lg:block" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 2">
                <line x1="0" y1="1" x2="100" y2="1" stroke={p.accent} strokeOpacity="0.5" strokeWidth="0.6" className="flow" vectorEffect="non-scaling-stroke" />
              </svg>
              {p.architecture.map((a, i) => (
                <Reveal key={a.layer} delay={i * 0.08}>
                  <div className="glass relative h-full rounded-[24px] p-6">
                    <div className="flex items-center gap-3">
                      <span className="neu-inset flex size-11 items-center justify-center rounded-full font-mono text-[12px]" style={{ color: p.accent }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-[1.2rem] font-semibold tracking-tight">{a.layer}</h3>
                    </div>
                    <ul className="mt-6 space-y-2.5">
                      {a.items.map((it) => (
                        <li key={it} className="flex items-center gap-2.5 font-mono text-[12.5px] text-muted">
                          <span className="size-1.5 rounded-full" style={{ background: p.accent }} aria-hidden="true" />
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Decisions */}
      {p.decisions && (
        <section className="border-t border-line section-pad" aria-labelledby="decisions">
          <div className="wrap grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Label n={num()}>Under the hood</Label>
              <h2 id="decisions" className="h2">Technical decisions</h2>
              <p className="lede mt-6">The choices that shaped how it was built.</p>
            </Reveal>
            <ol className="lg:col-span-7 lg:col-start-6">
              {p.decisions.map((d, i) => (
                <Reveal key={d.title} delay={0.04 * i}>
                  <li className="grid grid-cols-[auto_1fr] gap-x-6 border-t border-line py-7 last:border-b">
                    <span className="font-mono text-[12px] text-dim">{String(i + 1).padStart(2, '0')}</span>
                    <div>
                      <h3 className="font-display text-[1.35rem] font-semibold tracking-[-0.02em]">{d.title}</h3>
                      <p className="mt-2.5 text-[15.5px] leading-relaxed text-muted">{d.body}</p>
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Stack + note */}
      <section className="border-t border-line section-pad" aria-labelledby="built-with">
        <div className="wrap grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <Label n={num()}>Built with</Label>
            <h2 id="built-with" className="sr-only">Built with</h2>
            <StackChips items={p.stack} />
          </Reveal>
          {p.note && (
            <Reveal delay={0.08} className="lg:col-span-4 lg:col-start-9">
              <div className="neu-inset flex gap-3 rounded-[20px] p-5 text-[14.5px] leading-relaxed text-muted">
                <Info className="mt-0.5 size-4 shrink-0 text-accent-2" aria-hidden="true" />
                {p.note}
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Next */}
      <Link
        to={`/work/${next.slug}`}
        className="group relative block overflow-hidden border-t border-line"
        aria-label={`Next case study: ${next.name}`}
      >
        <div className="absolute inset-0 -z-10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: `radial-gradient(60% 120% at 50% 100%, ${next.accent}22, transparent 70%)` }} aria-hidden="true" />
        <div className="wrap flex items-end justify-between gap-6 py-16 sm:py-24">
          <div>
            <p className="eyebrow mb-4">Next case study</p>
            <p className="display text-[clamp(2.2rem,6vw,5.5rem)] transition-colors duration-500 group-hover:text-accent">{next.name}</p>
          </div>
          <span className="neu mb-2 inline-flex size-14 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:translate-x-1 sm:size-16">
            <ArrowRight className="size-5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </motion.main>
  );
}
