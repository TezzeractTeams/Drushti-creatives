"use client";

import { useRef, useEffect } from "react";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { FloatingImage } from "@/components/hero-local/FloatingImage";
import { FLOATING_IMAGES } from "@/data/floatingImages";

// Canvas: 150vw wide × 150vh tall
// Image size: 20vw × 20vh
// Gap between images: 30vw × 20vh
// Col step: 20 + 30 = 50vw | Row step: 20 + 20 = 40vh
//
// 3×3 grid, center cell left empty (X = image, 0 = empty):
//   X(0,0)  X(0,1)  X(0,2)   ← row 0
//   X(1,0)  0(1,1)  X(1,2)   ← row 1
//   X(2,0)  X(2,1)  X(2,2)   ← row 2
//
// Each position defined explicitly (col × 50vw, row × 40vh):
const IMAGE_POSITIONS = [
  { left: "0vw",   top: "0vh"  },   // row 0, col 0
  { left: "50vw",  top: "0vh"  },   // row 0, col 1
  { left: "100vw", top: "0vh"  },   // row 0, col 2
  { left: "0vw",   top: "40vh" },   // row 1, col 0
  { left: "100vw", top: "40vh" },   // row 1, col 2
  { left: "0vw",   top: "80vh" },   // row 2, col 0
  { left: "50vw",  top: "80vh" },   // row 2, col 1
  { left: "100vw", top: "80vh" },   // row 2, col 2
] as const;

// Mouse center (0.5, 0.5) → canvas center aligned to viewport center
// Mouse top-right (1, 0)  → canvas top-right aligned to viewport top-right
// offsetX = −mouseX × (150vw − 100vw) = −mouseX × 50vw
// offsetY = −mouseY × (150vh − 100vh) = −mouseY × 50vh
const CANVAS_W_VW = 150;
const CANVAS_H_VH = 150;

interface Props {
  containerRef: React.RefObject<HTMLElement | null>;
}

export function BackgroundLayer({ containerRef }: Props) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ targetX: 0.5, targetY: 0.5, x: 0.5, y: 0.5 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [containerRef]);

  useAnimationFrame(() => {
    const m = mouseRef.current;
    m.x += (m.targetX - m.x) * 0.08;
    m.y += (m.targetY - m.y) * 0.08;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const offsetX = -m.x * ((CANVAS_W_VW / 100 - 1) * vw);
    const offsetY = -m.y * ((CANVAS_H_VH / 100 - 1) * vh);

    canvas.style.transform = `translate3d(${offsetX.toFixed(1)}px, ${offsetY.toFixed(1)}px, 0)`;
  });

  return (
    <div
      ref={canvasRef}
      className="pointer-events-none absolute z-0"
      style={{
        width: `${CANVAS_W_VW}vw`,
        height: `${CANVAS_H_VH}vh`,
        left: 0,
        top: 0,
        padding: "20vh",
        willChange: "transform",
      }}
    >
      <div className="pointer-events-auto relative h-full w-full">
        {FLOATING_IMAGES.map((img, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left:   IMAGE_POSITIONS[i].left,
              top:    IMAGE_POSITIONS[i].top,
              width:  "20vw",
              height: "20vh",
            }}
          >
            <FloatingImage {...img} />
          </div>
        ))}
      </div>
    </div>
  );
}
