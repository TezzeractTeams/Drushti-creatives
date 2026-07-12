// Shared motion constants and presets. Import from here instead of
// redeclaring per file so brand-wide timing changes are one edit.

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Standard scroll-into-view fade-up used across sections. */
export const fadeUp = (delay = 0, y = 14) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.6 },
  transition: { duration: 0.6, ease: EASE, delay },
});
