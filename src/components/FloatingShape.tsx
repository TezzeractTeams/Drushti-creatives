"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type MotionValue } from "motion/react";

interface FloatingShapeProps {
  children: ReactNode;
  className?: string;
  /** Parallax offset driven by scroll (already a MotionValue in px). */
  scrollY?: MotionValue<number>;
  /** Pointer parallax offsets in px. */
  pointerX?: MotionValue<number>;
  pointerY?: MotionValue<number>;
  /** Continuous float tuning. */
  floatY?: number;
  floatRotate?: number;
  duration?: number;
  delay?: number;
}

/**
 * Wraps a decorative shape with three layered motions, each on its own
 * element so the transforms never collide:
 *  1. outer  — scroll parallax (y)
 *  2. middle — pointer parallax (x / y)
 *  3. inner  — continuous, infinite float + rotate
 * All motion is disabled under prefers-reduced-motion.
 */
export default function FloatingShape({
  children,
  className,
  scrollY,
  pointerX,
  pointerY,
  floatY = 18,
  floatRotate = 8,
  duration = 7,
  delay = 0,
}: FloatingShapeProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={className}
      style={prefersReducedMotion ? undefined : { y: scrollY }}
    >
      <motion.div style={prefersReducedMotion ? undefined : { x: pointerX, y: pointerY }}>
        <motion.div
          animate={
            prefersReducedMotion
              ? undefined
              : { y: [0, -floatY, 0], rotate: [0, floatRotate, 0] }
          }
          transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
