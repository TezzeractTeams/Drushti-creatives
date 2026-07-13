"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { EASE } from "@/lib/motion";

interface PillButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  /** "dark" (default): black bg, white text. "light": white bg, ink text, bordered. */
  variant?: "dark" | "light";
}

const VARIANT_CLASSES = {
  dark: "border border-transparent",
  light: "border",
} as const;

const COLOR_TRANSITION = { duration: 0.55, ease: EASE };

const VARIANT_ANIMATION = {
  dark: {
    rest: {
      backgroundColor: "rgb(26, 26, 26)",
      color: "rgb(255, 255, 255)",
      borderColor: "rgb(26, 26, 26)",
    },
    hover: {
      backgroundColor: "rgb(220, 92, 38)",
      color: "rgb(255, 255, 255)",
      borderColor: "rgb(220, 92, 38)",
    },
  },
  light: {
    rest: {
      backgroundColor: "rgb(255, 255, 255)",
      color: "rgb(26, 26, 26)",
      borderColor: "rgba(26, 26, 26, 0.2)",
    },
    hover: {
      backgroundColor: "rgb(26, 26, 26)",
      color: "rgb(255, 255, 255)",
      borderColor: "rgb(26, 26, 26)",
    },
  },
} as const;

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 11L11 1M11 1H3.5M11 1V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Black pill CTA with a masked text-roll hover: the label + arrow slide up
 *  and out while an identical copy slides up into place beneath them, traced
 *  from the reference "BUILD YOUR OWN" button. */
export default function PillButton({
  href,
  children,
  className = "",
  target,
  rel,
  variant = "dark",
}: PillButtonProps) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={VARIANT_ANIMATION[variant]}
      transition={COLOR_TRANSITION}
      className={`font-heading inline-flex items-center rounded-lg px-7 py-3.5 text-xs !uppercase ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {/* Mask: fixed to exactly one line (h-4 = 16px = text-xs line-height),
          clipping the two stacked copies below regardless of the button's
          own padding — the earlier "top-full" version measured the offset
          from the unpadded text row instead of the full button box, so the
          duplicate barely cleared the fold and both copies showed at rest. */}
      <span className="relative h-4 overflow-hidden">
        <motion.span
          className="flex flex-col"
          variants={{ rest: { y: "0%" }, hover: { y: "-50%" } }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <span className="flex h-4 items-center gap-2">
            {children}
            <ArrowIcon />
          </span>
          <span className="flex h-4 items-center gap-2">
            {children}
            <ArrowIcon />
          </span>
        </motion.span>
      </span>
    </motion.a>
  );
}
