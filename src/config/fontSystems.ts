/**
 * Switch the site typography preset here — one change, full system swap.
 *
 *   "boldonse"      — Boldonse headings + Montserrat body
 *   "spaceGrotesk"  — Space Grotesk headings + Montserrat body
 *   "notable"       — Notable headings + Montserrat body
 *   "bbhHegarty"    — BBH Hegarty headings + Montserrat body
 *   "specialGothicExpandedOne" — Special Gothic Expanded One headings + Montserrat body
 *
 * To add a new preset:
 * 1. Add an entry to FONT_SYSTEMS below
 * 2. Extend FontSystemId
 * 3. Wire any next/font loaders in fonts.ts if needed
 * 4. Save and restart the dev server (Tailwind reads this at build time)
 */
export const ACTIVE_FONT_SYSTEM = "specialGothicExpandedOne" as const;

export type FontSystemId =
  | "boldonse"
  | "spaceGrotesk"
  | "notable"
  | "bbhHegarty"
  | "specialGothicExpandedOne";

export type FontSystemDefinition = {
  id: FontSystemId;
  label: string;
  heading: {
    /** CSS font-family when loaded via Google Fonts link (Boldonse). */
    cssFamily?: string;
    /** Google Fonts stylesheet URL, if heading is not loaded via next/font. */
    googleFontsUrl?: string;
    weight: number;
    letterSpacing: string;
    textTransform: "none" | "uppercase";
    scale: number;
    minLineHeight: number;
    defaultLineHeight: string;
    lineHeights: {
      display: string;
      compact: string;
      title: string;
      loose: string;
    };
  };
  body: {
    size: string;
    smSize: string;
    lineHeight: string;
  };
  manifestoSvgFontSize: number;
  manifestoSvgFontWeight: number;
};

export const FONT_SYSTEMS = {
  boldonse: {
    id: "boldonse",
    label: "Boldonse + Montserrat",
    heading: {
      cssFamily: '"Boldonse", sans-serif',
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Boldonse&display=swap",
      weight: 400,
      letterSpacing: "-0.02em",
      textTransform: "none",
      scale: 0.7,
      minLineHeight: 1.4,
      defaultLineHeight: "1.4",
      lineHeights: {
        display: "1.3",
        compact: "1.4",
        title: "1.4",
        loose: "1.5",
      },
    },
    body: {
      size: "14px",
      smSize: "14px",
      lineHeight: "1.5",
    },
    manifestoSvgFontSize: 49,
    manifestoSvgFontWeight: 400,
  },
  spaceGrotesk: {
    id: "spaceGrotesk",
    label: "Space Grotesk + Montserrat",
    heading: {
      weight: 700,
      letterSpacing: "-0.02em",
      textTransform: "uppercase",
      scale: 1,
      minLineHeight: 1.05,
      defaultLineHeight: "1.05",
      lineHeights: {
        display: "1",
        compact: "0.85",
        title: "1.05",
        loose: "1.375",
      },
    },
    body: {
      size: "14px",
      smSize: "14px",
      lineHeight: "1.5",
    },
    manifestoSvgFontSize: 70,
    manifestoSvgFontWeight: 700,
  },
  notable: {
    id: "notable",
    label: "Notable + Montserrat",
    heading: {
      cssFamily: '"Notable", sans-serif',
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Notable&display=swap",
      weight: 400,
      letterSpacing: "-0.01em",
      textTransform: "none",
      scale: 0.7,
      minLineHeight: 1.4,
      defaultLineHeight: "1.4",
      lineHeights: {
        display: "1.3",
        compact: "1.4",
        title: "1.4",
        loose: "1.5",
      },
    },
    body: {
      size: "14px",
      smSize: "14px",
      lineHeight: "1.5",
    },
    manifestoSvgFontSize: 49,
    manifestoSvgFontWeight: 400,
  },
  bbhHegarty: {
    id: "bbhHegarty",
    label: "BBH Hegarty + Montserrat",
    heading: {
      cssFamily: '"BBH Hegarty", sans-serif',
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=BBH+Hegarty&display=swap",
      weight: 400,
      letterSpacing: "-0.02em",
      textTransform: "none",
      scale: 1,
      minLineHeight: 1.05,
      defaultLineHeight: "1.05",
      lineHeights: {
        display: "1",
        compact: "0.85",
        title: "1.05",
        loose: "1.375",
      },
    },
    body: {
      size: "14px",
      smSize: "14px",
      lineHeight: "1.5",
    },
    manifestoSvgFontSize: 70,
    manifestoSvgFontWeight: 700,
  },
  specialGothicExpandedOne: {
    id: "specialGothicExpandedOne",
    label: "Special Gothic Expanded One + Montserrat",
    heading: {
      cssFamily: '"Special Gothic Expanded One", sans-serif',
      googleFontsUrl:
        "https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap",
      weight: 400,
      letterSpacing: "-0.02em",
      textTransform: "none",
      scale: 1,
      minLineHeight: 1.05,
      defaultLineHeight: "1.05",
      lineHeights: {
        display: "1",
        compact: "0.85",
        title: "1.05",
        loose: "1.375",
      },
    },
    body: {
      size: "14px",
      smSize: "14px",
      lineHeight: "1.5",
    },
    manifestoSvgFontSize: 70,
    manifestoSvgFontWeight: 700,
  },
} satisfies Record<FontSystemId, FontSystemDefinition>;

export const activeFontSystem = FONT_SYSTEMS[ACTIVE_FONT_SYSTEM];

/** CSS variable names — keep in sync with globals.css */
export const FONT_CSS_VARS = {
  heading: "--font-heading",
  body: "--font-body",
} as const;
