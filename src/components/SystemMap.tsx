import { useEffect, useState, type ReactNode } from 'react';
import { motion, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { Check, ShieldCheck, Activity, Link2, Megaphone } from 'lucide-react';

/** Cycles 0..n-1 on an interval; holds still under reduced motion. */
function useTicker(n: number, ms: number) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(reduce ? n - 1 : 0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setI((v) => (v + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms, reduce]);
  return i;
}

function Chip({
  children,
  className,
  depth,
  px,
  py,
  float = 6,
  delay = 0,
}: {
  children: ReactNode;
  className: string;
  depth: number;
  px: MotionValue<number>;
  py: MotionValue<number>;
  float?: number;
  delay?: number;
}) {
  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth);
  return (
    <motion.div className={`absolute ${className}`} style={{ x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 + delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          animate={{ y: [0, -float, 0] }}
          transition={{ duration: 5 + delay * 3, repeat: Infinity, ease: 'easeInOut' }}
          className="glass rounded-2xl"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

const ballotSteps = ['Link opened', 'Identity confirmed', 'Ballot cast'];
const auditLines = [
  ['admin.signin', 'committee'],
  ['voter.link.issued', 'sms'],
  ['election.opened', 'super_admin'],
  ['ballot.cast', 'receipt'],
  ['election.closed', 'snapshot'],
];
const tickets = ['A-062', 'A-063', 'A-064', 'A-065'];

export default function SystemMap({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  const sx = useSpring(px, { stiffness: 60, damping: 18 });
  const sy = useSpring(py, { stiffness: 60, damping: 18 });
  const step = useTicker(4, 1100);
  const audit = useTicker(auditLines.length, 1800);
  const ticket = useTicker(tickets.length, 2600);

  return (
    <div className="relative mx-auto aspect-[1/1] w-full max-w-[600px] select-none" aria-hidden="true">
      {/* rings + flowing connections */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#b8f0cc" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#b8f0cc" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="30" fill="url(#coreGlow)" />
        {[17, 29, 41].map((r) => (
          <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#f1f3ee" strokeOpacity="0.07" strokeWidth="0.25" />
        ))}
        <circle cx="50" cy="50" r="41" fill="none" stroke="#b8f0cc" strokeOpacity="0.35" strokeWidth="0.3" strokeDasharray="0.6 3.5" />
        {[
          'M50 50 Q 30 40 22 22',
          'M50 50 Q 70 42 82 32',
          'M50 50 Q 32 62 20 76',
          'M50 50 Q 66 64 78 80',
          'M50 50 Q 58 30 60 8',
        ].map((d, i) => (
          <g key={d}>
            <path d={d} fill="none" stroke="#f1f3ee" strokeOpacity="0.08" strokeWidth="0.3" />
            <path d={d} fill="none" stroke="#b8f0cc" strokeOpacity="0.7" strokeWidth="0.45" className="flow" style={{ animationDelay: `${i * -1.2}s` }} vectorEffect="non-scaling-stroke" />
          </g>
        ))}
        {[ [22, 22], [82, 32], [20, 76], [78, 80], [60, 8] ].map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="0.9" fill="#b8f0cc" className="breathe" />
        ))}
      </svg>

      {/* core */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="neu-inset flex size-[104px] flex-col items-center justify-center rounded-full sm:size-[132px]">
          <span className="accent-serif text-[38px] leading-none text-mint sm:text-[46px]">om</span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-dim">systems</span>
        </div>
      </motion.div>

      {/* Ballot — IDA */}
      <Chip px={sx} py={sy} depth={-14} className="left-[0%] top-[6%] w-[200px] sm:w-[232px]" delay={0}>
        <div className="p-3.5 sm:p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-sage">
              <Link2 className="size-3.5" /> Single-use link
            </span>
            <span className="font-mono text-[10px] text-dim">IDA</span>
          </div>
          <ul className="space-y-2">
            {ballotSteps.map((s, i) => {
              const done = step > i;
              return (
                <li key={s} className="flex items-center gap-2.5 text-[12.5px] sm:text-[13px]">
                  <span
                    className={`flex size-[18px] items-center justify-center rounded-full border transition-all duration-500 ${
                      done ? 'border-mint bg-mint text-bg' : 'border-white/20 text-transparent'
                    }`}
                  >
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span className={`transition-colors duration-500 ${done ? 'text-ink' : 'text-dim'}`}>{s}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </Chip>

      {/* Queue — QMan */}
      <Chip px={sx} py={sy} depth={18} className="right-[0%] top-[20%] w-[172px] sm:w-[200px]" delay={0.15} float={8}>
        <div className="p-3.5 sm:p-4">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[#9cc0ff]">
            <Megaphone className="size-3.5" /> Now serving
          </span>
          <div className="relative mt-2 h-[38px] overflow-hidden">
            <motion.div
              key={ticket}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-mono text-[30px] font-medium leading-none tracking-tight text-ink"
            >
              {tickets[ticket]}
            </motion.div>
          </div>
          <p className="text-[11.5px] text-muted">Consultation · QMan</p>
        </div>
      </Chip>

      {/* Audit trail */}
      <Chip px={sx} py={sy} depth={10} className="bottom-[4%] left-[2%] w-[210px] sm:w-[244px]" delay={0.3} float={5}>
        <div className="p-3.5 sm:p-4">
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-sage">
            <ShieldCheck className="size-3.5" /> Audit trail
          </span>
          <ul className="mt-2.5 space-y-1.5 font-mono text-[11px]">
            {[0, 1, 2].map((o) => {
              const [ev, who] = auditLines[(audit + o) % auditLines.length];
              return (
                <motion.li
                  layout
                  key={ev}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: o === 2 ? 1 : 0.55, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-between gap-3"
                >
                  <span className={o === 2 ? 'text-mint' : 'text-muted'}>{ev}</span>
                  <span className="text-dim">{who}</span>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </Chip>

      {/* Health check */}
      <Chip px={sx} py={sy} depth={-20} className="bottom-[12%] right-[0%] hidden sm:block" delay={0.45} float={7}>
        <div className="flex items-center gap-3 px-4 py-3">
          <Activity className="size-4 text-mint" />
          <span className="font-mono text-[11.5px] text-muted">/api/health/ready</span>
          <span className="rounded-md bg-mint/15 px-1.5 py-0.5 font-mono text-[11px] text-mint">200</span>
        </div>
      </Chip>

      {/* Tests */}
      <Chip px={sx} py={sy} depth={24} className="right-[22%] top-[0%] hidden sm:block" delay={0.6} float={4}>
        <div className="flex items-center gap-2.5 px-3.5 py-2.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-mint opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-mint" />
          </span>
          <span className="font-mono text-[11px] text-muted">420 tests passing</span>
        </div>
      </Chip>
    </div>
  );
}
