import { useState } from 'react';
import { ArrowDownToLine, ArrowUpRight, Check, Copy, Phone } from 'lucide-react';
import { site } from '../data/site';
import { LinkedinIcon } from './BrandIcons';
import { Reveal } from './Reveal';
import { spotlight } from '../lib/useSpotlight';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  const channels = [
    { label: 'LinkedIn', value: 'in/michael-obende', href: site.linkedin, icon: <LinkedinIcon className="size-5" />, external: true },
    { label: 'Phone', value: site.phone, href: site.phoneHref, icon: <Phone className="size-5" aria-hidden="true" /> },
    { label: 'CV', value: 'Download PDF', href: site.cv, icon: <ArrowDownToLine className="size-5" aria-hidden="true" />, download: true },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden border-t border-line pb-16 pt-[clamp(96px,13vw,180px)]">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute left-1/2 top-[30%] h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-tint/45 blur-[150px]" />
        <div className="grid-lines absolute inset-0 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000,transparent_75%)]" />
      </div>

      <div className="wrap">
        <Reveal>
          <p className="eyebrow mb-8 flex items-center gap-3">
            <span className="text-dim">06</span>
            <span className="h-px w-8 bg-accent-2/40" aria-hidden="true" />
            Contact
          </p>
          <h2 id="contact-title" className="display max-w-[14ch] text-[clamp(3rem,9.5vw,9.5rem)]">
            Have something that needs to <span className="accent-serif text-accent">work?</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-10">
          <p className="lede max-w-xl">
            Employers, teams and organisations with a project in mind: write to me. Email is the quickest way to reach me, and I read everything that lands there.
          </p>
          <div>
            <div className="flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-8">
              <a
                href={`mailto:${site.email}`}
                className="link-draw py-2 font-display text-[clamp(1.35rem,5.2vw,4.25rem)] font-medium leading-tight tracking-[-0.035em] text-ink [overflow-wrap:anywhere] hover:text-accent"
              >
                {site.email}
              </a>
              <button type="button" onClick={copy} className="neu inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[14px]" aria-live="polite">
                {copied ? <Check className="size-4 text-accent" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {copied ? 'Copied' : 'Copy email'}
              </button>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {channels.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.05}>
              <a
                href={c.href}
                onPointerMove={spotlight}
                {...(c.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                {...(c.download ? { download: true } : {})}
                className="group glass spotlight flex h-full items-center gap-4 rounded-[22px] p-5 transition-transform duration-500 hover:-translate-y-0.5"
              >
                <span className="neu flex size-12 shrink-0 items-center justify-center rounded-2xl text-accent-2 transition-colors group-hover:text-accent">{c.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-dim">{c.label}</span>
                  <span className="mt-0.5 block truncate text-[15px] text-ink">{c.value}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-dim transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden="true" />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
