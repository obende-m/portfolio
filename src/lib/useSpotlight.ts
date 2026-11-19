import type { PointerEvent } from 'react';

/** Feeds pointer position into --mx/--my for the .spotlight border glow. */
export function spotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}
