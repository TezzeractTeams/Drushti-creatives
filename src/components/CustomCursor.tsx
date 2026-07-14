"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";

const CURSOR_SIZE = 22;
const PROXIMITY_RADIUS = 44;

const CLICKABLE_SELECTOR = [
  'a[href]',
  "button:not(:disabled)",
  '[role="button"]',
  'input[type="submit"]',
  'input[type="button"]',
  "label[for]",
  "select",
  "summary",
  '[tabindex]:not([tabindex="-1"])',
  ".cursor-pointer",
].join(", ");

type Ripple = { id: number; x: number; y: number };

function findClickable(el: Element | null): Element | null {
  if (!el || el.closest("[data-custom-cursor]")) return null;
  return el.closest(CLICKABLE_SELECTOR);
}

/** Sample points around the pointer so the cursor reacts before it sits on a target. */
function getClickableNear(x: number, y: number, radius: number): Element | null {
  const direct = findClickable(document.elementFromPoint(x, y));
  if (direct) return direct;

  const samples = 10;
  for (let i = 0; i < samples; i += 1) {
    const angle = (i / samples) * Math.PI * 2;
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    const found = findClickable(document.elementFromPoint(px, py));
    if (found) return found;
  }

  return null;
}

/** Mid-grey dot that spring-follows the pointer, replacing the native
 *  cursor on fine-pointer devices. Expands to an outlined ring with ripples
 *  when approaching clickable elements. */
export default function CustomCursor() {
  const prefersReducedMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleId = useRef(0);
  const wasInteractive = useRef(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const interactive = useMotionValue(0);

  const sx = useSpring(x, { stiffness: 150, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 20, mass: 0.5 });
  const interactiveSpring = useSpring(interactive, { stiffness: 380, damping: 28 });

  const scale = useTransform(interactiveSpring, [0, 1], [1, 1.45]);
  const fillOpacity = useTransform(interactiveSpring, [0, 1], [1, 0]);
  const ringOpacity = useTransform(interactiveSpring, [0, 1], [0, 1]);

  const half = CURSOR_SIZE / 2;

  const spawnRipple = useCallback((clientX: number, clientY: number) => {
    const id = rippleId.current;
    rippleId.current += 1;
    setRipples((prev) => [...prev, { id, x: clientX, y: clientY }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 700);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    setEnabled(true);
    document.body.classList.add("cursor-none");

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX - half);
      y.set(e.clientY - half);

      const clickable = getClickableNear(e.clientX, e.clientY, PROXIMITY_RADIUS);
      const nearClickable = Boolean(clickable);
      interactive.set(nearClickable ? 1 : 0);

      if (nearClickable && !wasInteractive.current) {
        spawnRipple(e.clientX, e.clientY);
      }
      wasInteractive.current = nearClickable;
    };

    const handleDown = (e: MouseEvent) => {
      const clickable = getClickableNear(e.clientX, e.clientY, PROXIMITY_RADIUS);
      if (clickable) spawnRipple(e.clientX, e.clientY);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mousedown", handleDown);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mousedown", handleDown);
      document.body.classList.remove("cursor-none");
    };
  }, [half, interactive, prefersReducedMotion, spawnRipple, x, y]);

  if (!enabled) return null;

  return (
    <div data-custom-cursor className="pointer-events-none fixed inset-0 z-[9999]">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            aria-hidden
            className="absolute rounded-full border-2 border-neutral-400"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: CURSOR_SIZE,
              height: CURSOR_SIZE,
              marginLeft: -half,
              marginTop: -half,
            }}
            initial={{ scale: 1, opacity: 0.55 }}
            animate={{ scale: 3.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>

      <motion.div
        aria-hidden
        className="absolute left-0 top-0"
        style={{ x: sx, y: sy, width: CURSOR_SIZE, height: CURSOR_SIZE, scale }}
      >
        <motion.span
          className="absolute inset-0 rounded-full bg-neutral-400"
          style={{ opacity: fillOpacity }}
        />
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-neutral-400 bg-transparent"
          style={{ opacity: ringOpacity }}
        />
      </motion.div>
    </div>
  );
}
