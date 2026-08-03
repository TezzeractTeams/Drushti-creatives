import { Montserrat, Space_Grotesk, Special_Gothic_Expanded_One } from "next/font/google";
import {
  ACTIVE_FONT_SYSTEM,
  activeFontSystem,
  type FontSystemId,
} from "./fontSystems";

export {
  ACTIVE_FONT_SYSTEM,
  activeFontSystem,
  FONT_CSS_VARS,
  FONT_SYSTEMS,
  type FontSystemId,
  type FontSystemDefinition,
} from "./fontSystems";

export {
  BODY_FONT_SIZE,
  BODY_FONT_SM_SIZE,
  getFontSystemCssVars,
  HEADING_FONT_SCALE,
  HEADING_FONT_WEIGHT,
  HEADING_LINE_HEIGHTS,
  HEADING_MIN_LINE_HEIGHT,
  MANIFESTO_SVG_FONT_SIZE,
  MANIFESTO_SVG_FONT_WEIGHT,
} from "./typography";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-body",
  display: "swap",
});

const specialGothicExpandedOne = Special_Gothic_Expanded_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
  display: "swap",
  // Next 15.4's capsize metrics table has no entry for this face, so the
  // automatic fallback-metrics lookup throws during build.
  adjustFontFallback: false,
});

const FONT_VARIABLES: Record<FontSystemId, string> = {
  boldonse: montserrat.variable,
  spaceGrotesk: `${spaceGrotesk.variable} ${montserrat.variable}`,
  notable: montserrat.variable,
  bbhHegarty: montserrat.variable,
  specialGothicExpandedOne: `${specialGothicExpandedOne.variable} ${montserrat.variable}`,
};

/** Apply to <html className> in layout.tsx */
export const fontVariables = FONT_VARIABLES[ACTIVE_FONT_SYSTEM];

/** Google Fonts <link> for heading when preset uses external loading */
export const headingGoogleFontsUrl = activeFontSystem.heading.googleFontsUrl;
