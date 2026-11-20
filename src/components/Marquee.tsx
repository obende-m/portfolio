const words = [
  'Web applications',
  'Product design',
  'APIs & databases',
  'Websites',
  'IT support',
  'Systems that last',
];

function Row() {
  return (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {words.map((w, i) => (
        <span key={w} className="flex items-center">
          <span
            className={`whitespace-nowrap px-8 text-[clamp(2rem,4.6vw,4.2rem)] leading-none sm:px-12 ${
              i % 2 ? 'accent-serif text-accent' : 'font-display font-semibold tracking-[-0.04em] text-ink'
            }`}
          >
            {w}
          </span>
          <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-accent sm:size-8" fill="currentColor">
            <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Slow ticker of what I do. Decorative; the same content is in the sections below. */
export default function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-line bg-bg-2 py-8 sm:py-10 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max animate-[marquee_38s_linear_infinite] hover:[animation-play-state:paused]">
        <Row />
        <Row />
      </div>
    </div>
  );
}
