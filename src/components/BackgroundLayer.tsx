"use client";

import { useRef, useEffect } from "react";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { FloatingImage } from "@/components/FloatingImage";
import { FLOATING_IMAGES } from "@/data/floatingImages";

// Canvas: 140vw wide × 140vh tall (40vw/40vh overshoot beyond the viewport,
// so mouse travel pans the canvas by at most ±20vw/±20vh from rest).
// Image size: 20vw × 20vh
//
// Checkerboard pattern (X = image, 0 = empty):
//   X(0,0)  0(0,1)  X(0,2)  0(0,3)  X(0,4)   ← row 0
//   0(1,0)  X(1,1)  0(1,2)  X(1,3)  0(1,4)   ← row 1
//   X(2,0)  0(2,1)  X(2,2)  0(2,3)  X(2,4)   ← row 2
//
// At mouse-center the viewport shows canvas x: 20→120vw, y: 20→120vh.
// Positions are defined so that, at rest, images land at these viewport
// spots: cols at 2% / 40% / 78% (rows 0 & 2) and 21% / 59% (row 1),
// rows at 2vh / 40vh / 78vh. Canvas coord = viewport coord + 20.
const IMAGE_POSITIONS = [
  { left: "22vw", top: "22vh" },   // row 0, col 0 → viewport ( 2vw,  2vh)
  { left: "60vw", top: "22vh" },   // row 0, col 2 → viewport (40vw,  2vh)
  { left: "98vw", top: "22vh" },   // row 0, col 4 → viewport (78vw,  2vh)
  { left: "41vw", top: "60vh" },   // row 1, col 1 → viewport (21vw, 40vh)
  { left: "79vw", top: "60vh" },   // row 1, col 3 → viewport (59vw, 40vh)
  { left: "22vw", top: "98vh" },   // row 2, col 0 → viewport ( 2vw, 78vh)
  { left: "60vw", top: "98vh" },   // row 2, col 2 → viewport (40vw, 78vh)
  { left: "98vw", top: "98vh" },   // row 2, col 4 → viewport (78vw, 78vh)
] as const;

// Mouse center (0.5, 0.5) → canvas center aligned to viewport center
// Mouse top-right (1, 0)  → canvas top-right aligned to viewport top-right
// offsetX = −mouseX × (140vw − 100vw) = −mouseX × 40vw
// offsetY = −mouseY × (140vh − 100vh) = −mouseY × 40vh
const CANVAS_W_VW = 140;
const CANVAS_H_VH = 140;

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
