import { ArrowUpRight } from 'lucide-react';
import { moreWork } from '../data/projects';
import { PhoneFrame, ShotImg } from './Frames';
import { Reveal, SectionHead } from './Reveal';
import { spotlight } from '../lib/useSpotlight';

export default function MoreWork() {
  return (
    <section id="more" aria-labelledby="more-title" className="section-pad relative border-t border-line">
      <div className="wrap">
        <SectionHead
          index="05"
          label="More websites"
          id="more-title"
          title={<>More <span className="accent-serif text-accent">websites.</span></>}
          lede="For a ministry in Jos, a guard company and a school in Lagos, and a consultancy. All live and in use."
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:gap-5">
          {moreWork.map((m, i) => (
            <Reveal key={m.name} delay={(i % 2) * 0.08}>
              <article onPointerMove={spotlight} className="group card spotlight relative flex h-full flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-0.5">
                <a href={m.live} target="_blank" rel="noreferrer" className="relative block overflow-hidden" aria-label={`Open the ${m.name} website`}>
                  <div className="shot aspect-[16/10]">
                    <ShotImg shot={m.cover} className="zoom size-full object-cover object-top" sizes="(min-width:768px) 45vw, 100vw" />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg-2 to-transparent" aria-hidden="true" />
                  <PhoneFrame className="absolute bottom-4 right-4 w-[22%] max-w-[120px] transition-transform duration-700 group-hover:-translate-y-1.5">
                    <ShotImg shot={m.mobile} className="w-full" />
                  </PhoneFrame>
                </a>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-display text-[1.6rem] font-semibold leading-tight tracking-[-0.025em]">{m.name}</h3>
                  <p className="mt-2 text-[15px] text-muted">{m.what}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
                    {m.stack.map((s) => (
                      <li key={s} className="neu-inset rounded-full px-2.5 py-1 font-mono text-[11px] text-muted">{s}</li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-7">
                    <a href={m.live} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-[14px] font-medium text-ink">
                      <span className="link-draw">Visit site</span> <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
