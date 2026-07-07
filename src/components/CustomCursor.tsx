"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

/** Small sky-blue dot that spring-follows the pointer, replacing the native
 *  cursor on fine-pointer devices — matching the reference site's cursor. */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setEnabled(true);
    document.body.classList.add("cursor-none");

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX - 6);
      y.set(e.clientY - 6);
    };
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.body.classList.remove("cursor-none");
    };
  }, [prefersReducedMotion, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full bg-sky"
      style={{ x: sx, y: sy }}
    />
  );
}
