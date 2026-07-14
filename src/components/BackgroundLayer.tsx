"use client";

import { useRef, useEffect } from "react";
import { useAnimationFrame } from "@/hooks/useAnimationFrame";
import { FloatingImage } from "@/components/FloatingImage";
import { FLOATING_IMAGES } from "@/data/floatingImages";

// Canvas: 200vw wide × 200vh tall (100vw/100vh overshoot beyond the viewport,
// so mouse travel pans the canvas by at most ±50vw/±50vh from rest).
// Image size: 20vw × 12.5vw (8:5 aspect ratio)
//
// At mouse-center the viewport shows canvas x: 50→150vw, y: 50→150vh.
// Positions are defined so that, at rest, images land at these viewport spots.
// Canvas coord = viewport coord + 50.
const IMAGE_POSITIONS = [
  // 3 rows × 4 cols (12 total), row-major
  // Preserve corner boxes exactly (current corners):
  //   top-left     (15vw,  25vh)
  //   top-right    (165vw, 25vh)
  //   bottom-left  (15vw,  165vh)
  //   bottom-right (165vw, 165vh)
  //
  // Spread the two middle columns outward while keeping a consistent grid:
  //   cols: 15vw, 50vw, 130vw, 165vw
  //   rows: 25vh, 90vh, 165vh
  { left: "15vw",  top: "15vh" },   // row 0, col 0 (corner)
  { left: "75vw",  top: "25vh" },   // row 0, col 1 (middle)
  { left: "125vw", top: "55vh" },   // row 0, col 2 (middle)
  { left: "175vw", top: "25vh" },   // row 0, col 3 (corner)

  { left: "5vw",  top: "90vh" },   // row 1, col 0
  { left: "50vw",  top: "65vh" },   // row 1, col 1
  { left: "110vw", top: "110vh" },   // row 1, col 2
  { left: "155vw", top: "90vh" },   // row 1, col 3

  { left: "15vw",  top: "165vh" },  // row 2, col 0 (corner)
  { left: "60vw",  top: "125vh" },  // row 2, col 1
  { left: "100vw", top: "175vh" },  // row 2, col 2
  { left: "175vw", top: "160vh" },  // row 2, col 3 (corner)
] as const;

// Mouse center (0.5, 0.5) → canvas center aligned to viewport center
// Mouse top-right (1, 0)  → canvas top-right aligned to viewport top-right
// offsetX = −mouseX × (200vw − 100vw) = −mouseX × 100vw
// offsetY = −mouseY × (200vh − 100vh) = −mouseY × 100vh
const CANVAS_W_VW = 200;
const CANVAS_H_VH = 200;

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
            className="absolute z-0 hover:z-20"
            style={{
              left:   IMAGE_POSITIONS[i].left,
              top:    IMAGE_POSITIONS[i].top,
              width:  "20vw",
              height: "12.5vw",
            }}
          >
            <FloatingImage {...img} />
          </div>
        ))}
      </div>
    </div>
  );
}
