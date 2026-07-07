"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const WORDS = ["VISION", "CLARITY", "PERSPECTIVE", "FORESIGHT"];

const TYPE_MS = 45;
const DELETE_MS = 30;
const HOLD_MS = 2200;

interface TypewriterWordProps {
  className?: string;
}

/** Deletes/types the word list char-by-char with a blinking caret, matching
 *  the reference agency site's rotating-headline mechanism. */
export default function TypewriterWord({ className }: TypewriterWordProps) {
  const prefersReducedMotion = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState(prefersReducedMotion ? WORDS[0] : "");
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");

  useEffect(() => {
    if (prefersReducedMotion) return;

    const word = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < word.length) {
        timeout = setTimeout(() => setText(word.slice(0, text.length + 1)), TYPE_MS);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), HOLD_MS);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(word.slice(0, text.length - 1)), DELETE_MS);
      } else {
        setWordIndex((i) => (i + 1) % WORDS.length);
        setPhase("typing");
        return;
      }
    }

    return () => clearTimeout(timeout);
  }, [text, phase, wordIndex, prefersReducedMotion]);

  return (
    <span className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={`${wordIndex}-${i}`}
          initial={{ opacity: 0.35 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        >
          {char}
        </motion.span>
      ))}
      {!prefersReducedMotion && (
        <span className="caret" aria-hidden>
          |
        </span>
      )}
    </span>
  );
}
