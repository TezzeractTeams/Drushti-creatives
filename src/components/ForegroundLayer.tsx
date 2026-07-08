"use client";

import { motion } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function ForegroundLayer() {
  return (
    <div className="pointer-events-none relative z-10 flex flex-col items-center justify-center gap-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="font-heading text-[clamp(4rem,18vw,20rem)] font-bold uppercase leading-none tracking-tight text-white"
      >
        Drushti
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        className="max-w-sm text-sm font-medium uppercase tracking-[0.25em] text-white/60"
      >
        Creative design studio
      </motion.p>

      <motion.a
        href="#work"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
        whileHover={{ scale: 1.05 }}
        className="pointer-events-auto mt-2 rounded-full border border-white/30 bg-white/10 px-8 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:bg-white/20"
      >
        View our work
      </motion.a>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
        className="absolute bottom-[-40vh] flex flex-col items-center gap-2"
        aria-hidden
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/40">
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
