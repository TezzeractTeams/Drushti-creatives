"use client";

import { motion } from "motion/react";

import { EASE } from "@/lib/motion";

export function ForegroundLayer() {
  return (
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
  );
}
