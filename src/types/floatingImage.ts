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
}
