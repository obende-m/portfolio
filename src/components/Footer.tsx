import { ArrowUp } from 'lucide-react';
import { site } from '../data/site';

export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex flex-col gap-4 text-[13px] text-dim sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="font-mono text-[11.5px] uppercase tracking-[0.12em]">React · TypeScript · Tailwind CSS · Framer Motion</p>
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
          className="neu inline-flex min-h-11 items-center gap-2 self-start rounded-full px-4 text-ink sm:self-auto"
        >
          Back to top <ArrowUp className="size-4" aria-hidden="true" />
        </button>
      </div>
    </footer>
  );
}
