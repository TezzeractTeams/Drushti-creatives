export interface FloatingImageConfig {
  src: string;
  alt: string;
  /** Idle float cycle length in seconds */
  speed: number;
  /** Sin-wave phase offset in radians */
  phase: number;
  /** Idle float amplitude in pixels */
  amplitude: number;
  priority?: boolean;
  /** Where to navigate when clicked */
  href?: string;
  /** Next/Image `sizes` attribute */
  sizes?: string;
  /** Extra classes for the outer container (useful for positioning) */
  className?: string;
  /** Extra classes for the clickable link */
  linkClassName?: string;
}
