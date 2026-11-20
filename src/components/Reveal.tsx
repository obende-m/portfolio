import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1] as const;

/** One-time reveal for section headings and large blocks. Used sparingly. */
export function Reveal({ children, delay = 0, className = '', y = 28 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Image block that unmasks upward the first time it enters the viewport. */
export function MaskReveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: 'inset(18% 6% 18% 6% round 28px)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.3, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ index, label, title, lede, id }: { index: string; label: string; title: ReactNode; lede?: ReactNode; id?: string }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <Reveal className="lg:col-span-7">
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span className="text-dim">{index}</span>
          <span className="h-px w-8 bg-accent-2/40" aria-hidden="true" />
          {label}
        </p>
        <h2 id={id} className="h2">{title}</h2>
      </Reveal>
      {lede && (
        <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
          <p className="lede">{lede}</p>
        </Reveal>
      )}
    </div>
  );
}
