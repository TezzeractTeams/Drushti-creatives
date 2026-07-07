"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Container from "@/components/Container";

const EASE = [0.22, 1, 0.36, 1] as const;

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

/** Top-right + expands into a row of nav pills, morphing to × — matching
 *  the reference site's header interaction. */
export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-white/25">
      <Container className="flex items-center justify-between py-6">
        <span className="font-heading text-lg font-bold text-white">Drushti</span>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {open && (
              <motion.nav className="flex items-center gap-2">
                {LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                    className="rounded-full bg-white px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-blue hover:text-white"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.nav>
            )}
          </AnimatePresence>

          <motion.button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path
                d="M8 1v14M1 8h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </motion.button>
        </div>
      </Container>
    </header>
  );
}
