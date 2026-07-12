import type { CSSProperties } from "react";
import { activeFontSystem, FONT_CSS_VARS } from "./fontSystems";

/** Active preset values — consumed by tailwind.config.ts (safe: no next/font). */
export const HEADING_FONT_SCALE = activeFontSystem.heading.scale;
export const HEADING_MIN_LINE_HEIGHT = activeFontSystem.heading.minLineHeight;
export const HEADING_FONT_WEIGHT = activeFontSystem.heading.weight;
export const HEADING_LINE_HEIGHTS = activeFontSystem.heading.lineHeights;
export const BODY_FONT_SIZE = activeFontSystem.body.size;
export const BODY_FONT_SM_SIZE = activeFontSystem.body.smSize;
export const MANIFESTO_SVG_FONT_SIZE = activeFontSystem.manifestoSvgFontSize;
export const MANIFESTO_SVG_FONT_WEIGHT = activeFontSystem.manifestoSvgFontWeight;

export { FONT_CSS_VARS };

export function headingRem(rem: number) {
  return `${+(rem * HEADING_FONT_SCALE).toFixed(4)}rem`;
}

export function headingClamp(minRem: number, vw: number, maxRem: number) {
  return `clamp(${headingRem(minRem)}, ${+(vw * HEADING_FONT_SCALE).toFixed(2)}vw, ${headingRem(maxRem)})`;
}

/** CSS custom properties applied on <html> from layout.tsx */
export function getFontSystemCssVars() {
  const { heading, body } = activeFontSystem;

  return {
    "--body-font-size": body.size,
    "--heading-weight": String(heading.weight),
    "--heading-line-height": heading.defaultLineHeight,
    "--heading-transform": heading.textTransform,
    "--heading-letter-spacing": heading.letterSpacing,
    "--heading-scale": String(heading.scale),
    ...(heading.cssFamily ? { [FONT_CSS_VARS.heading]: heading.cssFamily } : {}),
  } as CSSProperties;
}
