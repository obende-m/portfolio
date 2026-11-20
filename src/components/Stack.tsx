import { Reveal, SectionHead } from './Reveal';
import { stack } from '../data/profile';
import { spotlight } from '../lib/useSpotlight';

const layout = ['lg:col-span-6 lg:row-span-2', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-3', 'lg:col-span-12'];

export default function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="section-pad relative border-t border-line">
      <div className="wrap">
        <SectionHead
          index="04"
          label="Stack"
          id="stack-title"
          title={<>Tools, and where I’ve <span className="accent-serif text-accent">used</span> them.</>}
          lede="Next to each tool is the project where it shows up in the code or on the live site. Tools without a project are ones I’ve used outside this portfolio."
        />

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {stack.map((g, gi) => {
            const big = gi === 0;
            const strip = gi === stack.length - 1;
            return (
              <Reveal key={g.title} delay={(gi % 3) * 0.06} className={`${layout[gi]} ${big || strip ? 'sm:col-span-2' : ''}`}>
                <div
                  onPointerMove={spotlight}
                  className={`spotlight h-full rounded-[28px] p-6 sm:p-8 ${big ? 'glass' : 'card'} ${strip ? 'lg:flex lg:items-center lg:gap-10' : ''}`}
                >
                  <div className={strip ? 'lg:w-[30%] lg:shrink-0' : ''}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">0{gi + 1}</p>
                    <h3 className={`mt-3 font-display font-semibold tracking-[-0.025em] ${big ? 'text-[2.4rem] leading-none sm:text-[3rem]' : 'text-[1.5rem]'}`}>{g.title}</h3>
                    <p className="mt-2 text-[14px] text-muted">{g.blurb}</p>
                  </div>
                  {strip ? (
                    <ul className="mt-6 flex flex-wrap gap-2 lg:mt-0">
                      {g.items.map((it) => (
                        <li key={it.name} className="neu rounded-full px-4 py-2.5 text-[14px]">{it.name}</li>
                      ))}
                    </ul>
                  ) : (
                    <ul className={`mt-7 divide-y divide-line border-t border-line ${big ? 'sm:mt-10' : ''}`}>
                      {g.items.map((it) => (
                        <li key={it.name} className="group/row flex items-baseline justify-between gap-4 py-3 transition-colors">
                          <span className={`transition-colors group-hover/row:text-accent ${big ? 'text-[17px] sm:text-[19px]' : 'text-[15px]'}`}>{it.name}</span>
                          {it.where && (
                            <span className="text-right font-mono text-[11px] leading-snug text-dim transition-colors group-hover/row:text-accent-2">{it.where}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
