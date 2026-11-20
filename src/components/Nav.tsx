import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownToLine, Menu, X } from 'lucide-react';
import { nav, site } from '../data/site';

function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string>('');
  useEffect(() => {
    if (!enabled) return;
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

export function Monogram({ className = '' }: { className?: string }) {
  return (
    <span className={`accent-serif inline-flex size-10 items-center justify-center rounded-full neu text-[22px] leading-none text-accent ${className}`}>
      om
    </span>
  );
}

export default function Nav() {
  const { pathname } = useLocation();
  const onHome = pathname === '/';
  const active = useActiveSection(onHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const href = (id: string) => (onHome ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4">
      <div className="wrap">
        <motion.nav
          aria-label="Main"
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className={`flex items-center justify-between gap-4 rounded-full py-2 pl-2 pr-2 transition-all duration-500 ${
            scrolled || !onHome ? 'glass bg-white/80' : 'border border-transparent'
          }`}
        >
          <Link to="/" className="flex items-center gap-3 rounded-full pr-3" aria-label="Obende Michael — home">
            <Monogram />
            <span className="hidden font-display text-[15px] font-semibold tracking-tight sm:block">Obende Michael</span>
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => {
              const isActive = onHome && active === n.id;
              return (
                <li key={n.id}>
                  <a
                    href={href(n.id)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative inline-flex min-h-11 items-center rounded-full px-4 text-[14px] transition-colors ${
                      isActive ? 'text-ink' : 'text-muted hover:text-ink'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-ink/[0.07] ring-1 ring-ink/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {n.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href={site.cv} download className="btn btn-primary hidden !min-h-11 !px-5 !text-[14px] sm:inline-flex">
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              Download CV
            </a>
            <button
              type="button"
              className="neu inline-flex size-11 items-center justify-center rounded-full md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </motion.nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 -z-10 flex flex-col bg-bg/95 px-4 pb-8 pt-28 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col">
              {nav.map((n, i) => (
                <motion.li
                  key={n.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  <a href={href(n.id)} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5">
                    <span className="display text-[2.6rem]">{n.label}</span>
                    <span className="font-mono text-xs text-dim">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={site.cv} download className="btn btn-primary mt-auto w-full">
              <ArrowDownToLine className="size-4" aria-hidden="true" />
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
