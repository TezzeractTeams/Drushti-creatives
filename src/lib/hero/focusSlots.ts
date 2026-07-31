// Canvas: 200vw wide × 200vh tall (100vw/100vh overshoot beyond the viewport,
// so mouse travel pans the canvas by at most ±50vw/±50vh from rest).
// Image size: 20vw × 12.5vw (8:5 aspect ratio)
//
// At mouse-center the viewport shows canvas x: 50→150vw, y: 50→150vh.
// Positions are defined so that, at rest, images land at these viewport spots.
// Canvas coord = viewport coord + 50.
export const IMAGE_POSITIONS = [
  { left: "15vw", top: "15vh" },
  { left: "75vw", top: "25vh" },
  { left: "125vw", top: "55vh" },
  { left: "175vw", top: "25vh" },
  { left: "5vw", top: "90vh" },
  { left: "50vw", top: "65vh" },
  { left: "110vw", top: "110vh" },
  { left: "155vw", top: "90vh" },
  { left: "15vw", top: "165vh" },
  { left: "60vw", top: "125vh" },
  { left: "100vw", top: "175vh" },
  { left: "175vw", top: "160vh" },
] as const;

export const CANVAS_W_VW = 200;
export const CANVAS_H_VH = 200;
export const IMAGE_BOX_WIDTH_VW = 20;
export const IMAGE_BOX_HEIGHT_VW = 12.5;

/** Focus-frame images revealed together on first paint, before one-by-one sequence. */
export const INITIAL_FOCUS_BATCH = 2;

/** Canvas offset at rest (mouse center 0.5, 0.5). */
const REST_OFFSET_VW = 50;
const REST_OFFSET_VH = 50;

function parseUnit(value: string): number {
  return parseFloat(value);
}

function slotViewportRect(index: number) {
  const pos = IMAGE_POSITIONS[index];
  const left = parseUnit(pos.left) - REST_OFFSET_VW;
  const top = parseUnit(pos.top) - REST_OFFSET_VH;
  return {
    left,
    top,
    right: left + IMAGE_BOX_WIDTH_VW,
    bottom: top + IMAGE_BOX_HEIGHT_VW,
  };
}

function intersectsViewport(rect: ReturnType<typeof slotViewportRect>): boolean {
  return (
    rect.left < 100 &&
    rect.right > 0 &&
    rect.top < 100 &&
    rect.bottom > 0
  );
}

/** Slots visible in the viewport when the canvas is at rest. */
export function getFocusSlotIndices(): number[] {
  return IMAGE_POSITIONS.map((_, i) => i).filter((i) =>
    intersectsViewport(slotViewportRect(i)),
  );
}

function slotCenterDistance(index: number, centerX: number, centerY: number): number {
  const rect = slotViewportRect(index);
  const cx = (rect.left + rect.right) / 2;
  const cy = (rect.top + rect.bottom) / 2;
  return (cx - centerX) ** 2 + (cy - centerY) ** 2;
}

/** Focus slots ordered center-outward for sequential reveal. */
export function getFocusSlotRevealOrder(): number[] {
  const focus = getFocusSlotIndices();
  return getPrioritySlotIndices(focus, focus.length);
}

/** Up to `maxPriority` focus slots closest to the viewport center. */
export function getPrioritySlotIndices(
  focusIndices: number[],
  maxPriority = focusIndices.length,
): number[] {
  return [...focusIndices]
    .sort(
      (a, b) =>
        slotCenterDistance(a, 50, 50) - slotCenterDistance(b, 50, 50),
    )
    .slice(0, maxPriority);
}
