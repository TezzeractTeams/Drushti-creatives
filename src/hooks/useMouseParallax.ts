import { useEffect, useRef } from "react";
import { useAnimationFrame } from "./useAnimationFrame";

const LERP = 0.08;

interface MouseState {
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
}

/**
 * Tracks mouse position relative to an element and returns a ref object
 * whose `.x` / `.y` are smoothly interpolated (lerp 0.08) offsets in pixels,
 * representing how much the background should shift opposite to the cursor.
 * Never causes React re-renders — consumers read the ref imperatively in RAF.
 */
export function useMouseParallax(containerRef: React.RefObject<HTMLElement | null>) {
  const stateRef = useRef<MouseState>({ targetX: 0, targetY: 0, currentX: 0, currentY: 0 });
  const outputRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      // Normalized -0.5..0.5 relative to container center
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      stateRef.current.targetX = nx;
      stateRef.current.targetY = ny;
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [containerRef]);

  useAnimationFrame(() => {
    const s = stateRef.current;
    s.currentX += (s.targetX - s.currentX) * LERP;
    s.currentY += (s.targetY - s.currentY) * LERP;
    outputRef.current.x = s.currentX;
    outputRef.current.y = s.currentY;
  });

  return outputRef;
}
