import type { CSSProperties, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Users } from 'lucide-react';
import { getProject, type Project } from '../data/projects';
import { BrowserFrame, PhoneFrame, ShotImg } from './Frames';
import { MaskReveal, Reveal, SectionHead } from './Reveal';
import { spotlight } from '../lib/useSpotlight';

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

function Tile({ p, className = '', children, style }: { p: Project; className?: string; children: ReactNode; style?: CSSProperties }) {
  return (
    <Link
      to={`/work/${p.slug}`}
      onPointerMove={spotlight}
      aria-label={`${p.name} — read the case study`}
      style={{ ...style, ['--accent' as string]: p.accent }}
      className={`group card spotlight relative flex flex-col overflow-hidden transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-0.5 ${className}`}
    >
      {children}
    </Link>
  );
}

function TileText({ p, big = false, maxStack = 5, summary = true }: { p: Project; big?: boolean; maxStack?: number; summary?: boolean }) {
  return (
    <div className="relative z-[1]">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: p.accent }}>
          {p.category}
        </span>
        {p.collaborative && (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10.5px] text-muted">
            <Users className="size-3" aria-hidden="true" /> Team project
          </span>
        )}
      </div>
      <h3 className={`font-display font-semibold tracking-[-0.03em] ${big ? 'text-[clamp(2.2rem,4.4vw,4rem)] leading-[0.95]' : 'text-[1.75rem] leading-tight sm:text-[2rem]'}`}>
        {p.name}
      </h3>
      {summary && <p className={`mt-4 text-muted ${big ? 'max-w-md text-[17px]' : 'max-w-md text-[15px]'}`}>{p.summary}</p>}
      <StackChips items={p.stack} max={maxStack} className="mt-6" />
    </div>
  );
}

function CaseLink({ label = 'Read the case study' }: { label?: string }) {
  return (
    <span className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-ink">
      <span className="link-draw group-hover:[background-size:100%_1px]">{label}</span>
      <span className="neu inline-flex size-9 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45">
        <ArrowUpRight className="size-4" aria-hidden="true" />
      </span>
    </span>
  );
}

export default function Work() {
  const ida = getProject('ida-elections')!;
  const qman = getProject('qman')!;
  const bookdex = getProject('bookdex')!;
  const bomas = getProject('bomas-academy')!;
  const meraki = getProject('merakicode')!;
  const teekay = getProject('teekay-foundation')!;

  return (
    <section id="work" aria-labelledby="work-title" className="section-pad relative">
      <div className="wrap">
        <SectionHead
          index="01"
          label="Selected work"
          id="work-title"
          title={<>Software that <span className="accent-serif text-mint">runs</span> somewhere.</>}
          lede="Two applications I designed and built end to end, a team product, and websites for a school, a design company and a foundation. Every screen here is from the real product."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 sm:mt-20 lg:grid-cols-12 lg:gap-5">
          {/* IDA — the feature */}
          <Tile p={ida} className="lg:col-span-12">
            <div
              className="pointer-events-none absolute inset-0"
              aria-hidden="true"
              style={{ background: 'radial-gradient(80% 90% at 85% 30%, rgba(39,70,53,0.85), transparent 70%), radial-gradient(50% 60% at 10% 100%, rgba(39,70,53,0.4), transparent 70%)' }}
            />
            <div className="grid-lines pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_left,#000,transparent_70%)]" aria-hidden="true" />
            <div className="relative grid gap-10 p-6 sm:p-10 lg:grid-cols-12 lg:gap-8 lg:p-14">
              <div className="flex flex-col justify-between lg:col-span-5">
                <div>
                  <p className="mb-8 inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/[0.07] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-mint">
                    <span className="size-1.5 rounded-full bg-mint" /> Featured · Live
                  </p>
                  <TileText p={ida} big maxStack={8} />
                </div>
                <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-line pt-6">
                  {[
                    ['3', 'admin roles'],
                    ['5', 'election states'],
                    ['9', 'server test suites'],
                  ].map(([n, l]) => (
                    <div key={l}>
                      <dt className="sr-only">{l}</dt>
                      <dd className="font-display text-[2rem] font-semibold leading-none tracking-tight">{n}</dd>
                      <dd className="mt-1 text-[12.5px] leading-snug text-dim">{l}</dd>
                    </div>
                  ))}
                </dl>
                <CaseLink />
              </div>
              <div className="relative lg:col-span-7">
                <MaskReveal>
                  <div className="relative pb-10 pr-0 sm:pb-14 sm:pr-16">
                    <BrowserFrame url="ida-elections.vercel.app/admin/dashboard">
                      <ShotImg shot={ida.cover} className="zoom w-full" sizes="(min-width:1024px) 52vw, 100vw" />
                    </BrowserFrame>
                    <PhoneFrame className="absolute -bottom-2 right-0 w-[28%] max-w-[200px] sm:bottom-0">
                      <ShotImg shot={ida.mobile!} className="zoom w-full" />
                    </PhoneFrame>
                  </div>
                </MaskReveal>
              </div>
            </div>
          </Tile>

          {/* QMan */}
          <Tile p={qman} className="lg:col-span-7">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(70% 60% at 100% 100%, rgba(80,120,220,0.22), transparent 70%)' }} />
            <div className="relative p-6 sm:p-10">
              <TileText p={qman} maxStack={6} />
              <CaseLink />
            </div>
            <div className="relative mt-auto pl-6 sm:pl-10">
              <div className="relative translate-x-0 sm:translate-x-6">
                <BrowserFrame url="qman · reception" className="rounded-b-none sm:rounded-br-none">
                  <ShotImg shot={qman.cover} className="zoom w-full" sizes="(min-width:1024px) 50vw, 100vw" />
                </BrowserFrame>
              </div>
              <div className="absolute -top-6 right-6 hidden w-[36%] overflow-hidden rounded-xl border border-white/10 shadow-2xl sm:block">
                <ShotImg shot={qman.gallery[2]} className="w-full" sizes="300px" />
              </div>
            </div>
          </Tile>

          {/* BookDex */}
          <Tile p={bookdex} className="lg:col-span-5">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(80% 60% at 0% 0%, rgba(232,185,138,0.16), transparent 70%)' }} />
            <div className="relative p-6 sm:p-10">
              <TileText p={bookdex} maxStack={5} />
              <CaseLink />
            </div>
            <div className="relative mt-auto px-6 pb-6 sm:px-10 sm:pb-10">
              <div className="shot overflow-hidden rounded-2xl border border-white/10 bg-[#f7f4ee]">
                <ShotImg shot={bookdex.cover} className="zoom w-full" sizes="(min-width:1024px) 36vw, 100vw" />
              </div>
            </div>
          </Tile>

          {/* Bomas — photo-led */}
          <Tile p={bomas} className="min-h-[520px] lg:col-span-5">
            <div className="shot absolute inset-0">
              <ShotImg shot={bomas.cover} className="zoom size-full object-cover object-[60%_center]" sizes="(min-width:1024px) 40vw, 100vw" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/10" aria-hidden="true" />
            <div className="relative mt-auto p-6 sm:p-10">
              <TileText p={bomas} maxStack={4} />
              <CaseLink />
            </div>
          </Tile>

          {/* MerakiCode */}
          <Tile p={meraki} className="lg:col-span-4">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'linear-gradient(160deg, rgba(201,165,74,0.14), transparent 55%)' }} />
            <div className="relative p-6 sm:p-8">
              <TileText p={meraki} summary={false} />
              <p className="mt-4 text-[15px] text-muted">Interior design company site with portfolio, admin login, product listings and a cart.</p>
            </div>
            <div className="relative mt-auto px-6 pb-6 sm:px-8 sm:pb-8">
              <BrowserFrame url="merakicode.ng">
                <ShotImg shot={meraki.cover} className="zoom w-full" sizes="(min-width:1024px) 30vw, 100vw" />
              </BrowserFrame>
              <CaseLink label="Case study" />
            </div>
          </Tile>

          {/* Teekay */}
          <Tile p={teekay} className="lg:col-span-3">
            <div className="pointer-events-none absolute inset-0" aria-hidden="true" style={{ background: 'radial-gradient(90% 60% at 50% 100%, rgba(224,86,86,0.2), transparent 70%)' }} />
            <div className="relative p-6 sm:p-8">
              <TileText p={teekay} summary={false} maxStack={2} />
            </div>
            <div className="relative mx-auto mt-auto w-[64%] max-w-[220px] pb-6 sm:pb-8">
              <PhoneFrame>
                <ShotImg shot={teekay.mobile!} className="zoom w-full" />
              </PhoneFrame>
            </div>
            <div className="relative px-6 pb-6 sm:px-8 sm:pb-8">
              <CaseLink label="Case study" />
            </div>
          </Tile>
        </div>

        <Reveal className="mt-8 flex justify-end">
          <a href="#more" className="link-draw inline-flex min-h-11 items-center font-mono text-[12px] uppercase tracking-[0.14em] text-sage">
            More websites below ↓
          </a>
        </Reveal>
      </div>
    </section>
  );
}
