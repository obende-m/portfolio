import { Award, BadgeCheck, GraduationCap, MapPin, BookOpen } from 'lucide-react';
import { credentials, experience } from '../data/profile';
import { site } from '../data/site';
import { Reveal, SectionHead } from './Reveal';
import { spotlight } from '../lib/useSpotlight';

export default function About() {
  const now = experience[0];
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad relative border-t border-line">
      <div className="wrap">
        <SectionHead
          index="02"
          label="About"
          id="about-title"
          title={<>Building it, and <span className="accent-serif text-mint">supporting</span> the people who use it.</>}
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-12 lg:gap-5">
          {/* Story */}
          <Reveal className="card p-6 sm:p-10 lg:col-span-7 lg:row-span-2">
            <div className="max-w-[40rem] space-y-6 text-[17px] leading-[1.75] text-muted sm:text-[18px]">
              <p className="font-display text-[1.6rem] font-medium leading-[1.3] tracking-[-0.02em] text-ink sm:text-[1.9rem]">
                I studied Computer Science at Babcock University and finished with a Second Class Upper in 2025. Most of what I’ve learned since came from shipping things people use.
              </p>
              <p>
                I write full-stack TypeScript: React on the front, Node.js and PostgreSQL behind it. I care about the parts that are easy to skip, like who is allowed to do what, what happens when two requests arrive at once, and whether an admin can prove what happened afterwards.
              </p>
              <p>
                My NYSC year was spent in hospitals. At Cedacrest I built and ran an internal inventory system and handled IT support; at Freshsprings I trained staff on a new hospital management system and sat between them and the vendor. That year is why I think about software from the side of the person using it on a busy day.
              </p>
              <p>
                I also co-founded MamiPay Digital Services, where I lead product planning and technical direction for a digital financial services platform.
              </p>
            </div>
          </Reveal>

          {/* ID card — swap for a photo by adding one to /public and an <img> here */}
          <Reveal delay={0.05} className="lg:col-span-5">
            <div onPointerMove={spotlight} className="glass spotlight relative overflow-hidden rounded-[28px] p-6 sm:p-8">
              <div className="absolute -right-16 -top-16 size-56 rounded-full bg-forest/70 blur-3xl" aria-hidden="true" />
              <div className="relative flex items-start justify-between">
                <span className="accent-serif neu-inset flex size-20 items-center justify-center rounded-2xl text-[42px] text-mint">om</span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-dim">Profile</span>
              </div>
              <p className="relative mt-8 font-display text-[1.65rem] font-semibold leading-tight tracking-tight">{site.name}</p>
              <p className="relative mt-1 text-muted">{site.role}</p>
              <dl className="relative mt-8 grid gap-4 border-t border-line pt-6 text-[14px]">
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-dim"><MapPin className="size-4" aria-hidden="true" />Based in</dt>
                  <dd>{site.location}</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-dim"><BadgeCheck className="size-4" aria-hidden="true" />Now</dt>
                  <dd className="text-right">{now.title}, MamiPay</dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="flex items-center gap-2 text-dim"><GraduationCap className="size-4" aria-hidden="true" />Degree</dt>
                  <dd className="text-right">B.Sc. Computer Science, 2:1</dd>
                </div>
              </dl>
            </div>
          </Reveal>

          {/* Credentials */}
          <Reveal delay={0.1} className="card grid gap-6 p-6 sm:p-8 lg:col-span-5">
            <div className="flex items-start gap-4">
              <span className="neu flex size-11 shrink-0 items-center justify-center rounded-xl"><BadgeCheck className="size-5 text-mint" aria-hidden="true" /></span>
              <div>
                <p className="font-medium">{credentials.certification.title}</p>
                <p className="text-[14px] text-muted">{credentials.certification.org}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="neu flex size-11 shrink-0 items-center justify-center rounded-xl"><Award className="size-5 text-mint" aria-hidden="true" /></span>
              <ul className="space-y-1">
                {credentials.awards.map((a) => (
                  <li key={a} className="text-[14px] text-muted first:font-medium first:text-ink">{a}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Training strip */}
          <Reveal delay={0.05} className="card p-6 sm:p-8 lg:col-span-12">
            <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
              <div className="flex items-start gap-4 lg:col-span-4">
                <span className="neu flex size-11 shrink-0 items-center justify-center rounded-xl"><BookOpen className="size-5 text-mint" aria-hidden="true" /></span>
                <div>
                  <p className="font-medium">Training</p>
                  <p className="text-[14px] text-muted">{credentials.training.org}</p>
                </div>
              </div>
              <ul className="flex flex-wrap gap-2 lg:col-span-8">
                {credentials.training.courses.map((c) => (
                  <li key={c} className="neu-inset rounded-full px-3.5 py-2 text-[13px] text-muted">{c}</li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
