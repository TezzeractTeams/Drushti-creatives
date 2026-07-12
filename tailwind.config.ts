import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import {
  BODY_FONT_SIZE,
  BODY_FONT_SM_SIZE,
  HEADING_FONT_SCALE,
  HEADING_LINE_HEIGHTS,
  HEADING_MIN_LINE_HEIGHT,
  headingClamp,
} from "./src/config/typography";

type FontSizeEntry = string | [string, { lineHeight?: string; letterSpacing?: string }];

function parseRem(value: string) {
  return parseFloat(value.replace("rem", ""));
}

function ensureHeadingLineHeight(fontSize: string, lineHeight?: string) {
  const sizeRem = parseRem(fontSize);

  if (!lineHeight) {
    return String(HEADING_MIN_LINE_HEIGHT);
  }

  if (/^[\d.]+$/.test(lineHeight)) {
    return String(Math.max(parseFloat(lineHeight), HEADING_MIN_LINE_HEIGHT));
  }

  if (lineHeight.endsWith("rem")) {
    const minRem = sizeRem * HEADING_MIN_LINE_HEIGHT;
    return `${Math.max(parseRem(lineHeight), minRem).toFixed(4)}rem`;
  }

  return lineHeight;
}

function scaleHeadingSize(entry: FontSizeEntry): FontSizeEntry {
  const [fontSize, options = {}] = Array.isArray(entry) ? entry : [entry, {}];

  const scaledFontSize = fontSize.replace(
    /([\d.]+)rem/g,
    (_, value) => `${+(parseFloat(value) * HEADING_FONT_SCALE).toFixed(4)}rem`,
  );

  const scaledLineHeight = options.lineHeight?.replace(
    /([\d.]+)rem/g,
    (_, value) => `${+(parseFloat(value) * HEADING_FONT_SCALE).toFixed(4)}rem`,
  );

  const scaledOptions = {
    ...options,
    lineHeight: ensureHeadingLineHeight(scaledFontSize, scaledLineHeight),
  };

  return [scaledFontSize, scaledOptions];
}

const headingSteps = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl", "7xl"] as const;

const scaledHeadingSteps = Object.fromEntries(
  headingSteps.map((step) => {
    const base = defaultTheme.fontSize[step as keyof typeof defaultTheme.fontSize];
    return [`heading-${step}`, scaleHeadingSize(base as FontSizeEntry)];
  }),
);

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "rgb(var(--blue) / <alpha-value>)",
        orange: "rgb(var(--orange) / <alpha-value>)",
        yellow: "rgb(var(--yellow) / <alpha-value>)",
        sky: "rgb(var(--sky) / <alpha-value>)",
        green: "rgb(var(--green) / <alpha-value>)",
        white: "rgb(var(--white) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        cream: "rgb(var(--cream) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
        body: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        "heading-display": HEADING_LINE_HEIGHTS.display,
        heading: HEADING_LINE_HEIGHTS.title,
        "heading-loose": HEADING_LINE_HEIGHTS.loose,
      },
      fontSize: {
        // Keep in sync with BODY_FONT_SIZE in src/config/typography.ts
        base: [BODY_FONT_SIZE, { lineHeight: "1.5" }],
        sm: [BODY_FONT_SM_SIZE, { lineHeight: "1.5" }],
        ...scaledHeadingSteps,
        "heading-hero": [
          headingClamp(4, 18, 20),
          { lineHeight: HEADING_LINE_HEIGHTS.display, letterSpacing: "-0.02em" },
        ],
        "heading-hero-compact": [
          headingClamp(4, 10, 12),
          { lineHeight: HEADING_LINE_HEIGHTS.compact, letterSpacing: "-0.02em" },
        ],
        "heading-sub": [
          headingClamp(1.5, 3.5, 3.5),
          { lineHeight: HEADING_LINE_HEIGHTS.loose, letterSpacing: "-0.02em" },
        ],
        "display-lg": ["clamp(3rem, 6vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2.5rem, 4.5vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(2rem, 3vw, 3rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
};
export default config;
