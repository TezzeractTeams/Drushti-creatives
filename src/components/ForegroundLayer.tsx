"use client";

import { motion } from "motion/react";

import { ExtendedLetterO } from "@/components/ExtendedLetterO";
import PillButton from "@/components/PillButton";
import { EASE } from "@/lib/motion";

export function ForegroundLayer() {
  return (
    <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-6 text-center sm:px-8 lg:px-12">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="font-heading text-heading-hero-half uppercase leading-[0.88] tracking-tighter text-white"
      >
        <span className="block">Your people,</span>
        <span className="block">Connected through</span>
        <span className="inline-flex items-baseline justify-center">
          Your st
          <ExtendedLetterO />
          ry
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        className="pointer-events-auto mt-2"
      >
        <PillButton href="#work" variant="light">
          View our work
        </PillButton>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
        className="absolute bottom-[-40vh] left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-[10px] font-semibold tracking-[0.3em] text-white/40">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </div>
  );
}
