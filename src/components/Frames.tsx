import type { ReactNode } from 'react';
import type { Shot } from '../data/projects';

/** Responsive <img>: uses the -sm variant on small screens when one exists. */
export function ShotImg({ shot, className = '', eager = false, sizes }: { shot: Shot; className?: string; eager?: boolean; sizes?: string }) {
  const hasSmall = !shot.mobile && shot.w >= 1040 && !shot.src.includes('booking') && !shot.src.includes('invoice');
  const small = shot.src.replace('.webp', '-sm.webp');
  return (
    <img
      src={shot.src}
      srcSet={hasSmall ? `${small} 760w, ${shot.src} ${Math.min(shot.w, 1440)}w` : undefined}
      sizes={hasSmall ? sizes ?? '(min-width: 1024px) 60vw, 100vw' : undefined}
      alt={shot.alt}
      width={shot.w}
      height={shot.h}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
    />
  );
}

export function BrowserFrame({ url, children, className = '' }: { url?: string; children: ReactNode; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[14px] border border-white/10 bg-[#0b0e0c] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] sm:rounded-[18px] ${className}`}>
      <div className="flex h-8 items-center gap-3 border-b border-white/[0.07] bg-[#141a16] px-3 sm:h-9 sm:px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <i className="size-2.5 rounded-full bg-white/15" />
          <i className="size-2.5 rounded-full bg-white/15" />
          <i className="size-2.5 rounded-full bg-white/15" />
        </span>
        {url && (
          <span className="truncate rounded-md bg-white/[0.05] px-2.5 py-0.5 font-mono text-[10.5px] text-dim sm:text-[11px]">{url}</span>
        )}
      </div>
      <div className="shot">{children}</div>
    </div>
  );
}

export function PhoneFrame({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[30px] border border-white/15 bg-[#0b0e0c] p-[5px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.85)] ${className}`}
    >
      <div className="shot aspect-[390/844] overflow-hidden rounded-[25px]">{children}</div>
    </div>
  );
}
