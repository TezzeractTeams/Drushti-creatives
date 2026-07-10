"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Container from "@/components/Container";
import Image from "next/image";
const EASE = [0.22, 1, 0.36, 1] as const;

const WORDS = ["EXCEPTIONAL", "INNOVATIVE", "IMPACTFUL", "MEMORABLE", "REMARKABLE"];

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Our Works", href: "#work" },
  { label: "About Us", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/drushticreatives/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/drushti-creatives/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/drushticreatives/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/94768519161",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* ── CTA SECTION ─────────────────────────────────────────
          The "sheet": opaque, rounded bottom, stacked above the pinned
          footer. As the page ends it lifts away, uncovering the footer. */}
      <section className="bg-[#db5b26] py-20 lg:py-32 relative z-10 overflow-hidden rounded-b-3xl">
        <Container>
          <div className="max-w-xl relative z-10">
            <h2 className="mb-4 font-heading text-5xl font-bold leading-tight text-ink sm:text-6xl lg:text-7xl">
              LET&apos;S MAKE<br />SOMETHING{" "}
              <span className="relative inline-block">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={wordIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: EASE }}
                    className="text-white inline-block"
                  >
                    {WORDS[wordIndex]}
                  </motion.span>
                </AnimatePresence>
              </span>
            </h2>

            <p className="mb-10 text-base text-ink/60">Kick start a project with us today</p>

            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:collabs@drushticreatives.com"
                className="inline-flex items-center gap-3 rounded-full bg-ink px-7 py-4 text-sm font-semibold uppercase tracking-widest text-white transition-transform hover:scale-105"
              >
                Discuss a project
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/30">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a
                href="https://wa.me/94768519161"
                className="inline-flex items-center gap-3 rounded-full border border-ink/20 bg-white px-7 py-4 text-sm font-semibold uppercase tracking-widest text-ink transition-transform hover:scale-105"
              >
                Schedule a call
                <span className="flex h-6 w-6 items-center justify-center rounded-full border border-ink/20">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* ── DARK FOOTER ─────────────────────────────────────────
          Pinned at the viewport bottom (sticky bottom-0, z-0 under the
          page's z-10 wrapper): revealed as the CTA sheet lifts away.
          -mt-8 pulls it up underneath the CTA section above so the two
          overlap slightly instead of leaving a seam/gap between them
          before the sticky reveal kicks in. Adjust the value (e.g. -mt-4
          or -mt-16) depending on how much overlap you actually want. */}
      <footer className="sticky bottom-0 z-0 -mt-8 h-[70vh] overflow-hidden bg-[#1c1c1c]">
        <Container className="relative flex h-full flex-col justify-center gap-12 py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          {/* Giant lowercase wordmark, left — sized up from the original
              (which had no explicit width, so it rendered at the image's
              small natural/intrinsic size). Bumped through breakpoints so
              it stays proportionally large on bigger screens too. */}
          <div className="relative flex items-center justify-center overflow-hidden">
            <img
              src="work/drushtiwhitecopy.png"
              alt="Drushti Creatives"
              className="w-64 sm:w-80 lg:w-[28rem] xl:w-[32rem] h-auto"
            />
          </div>

          {/* Nav / contact / socials, right */}
          <div className="flex flex-col gap-10 sm:flex-row sm:gap-14 lg:gap-16">
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit whitespace-nowrap text-sm text-white transition-colors hover:text-white/60"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="flex flex-col gap-1 text-sm text-white/50">
              <p className="text-white">Sri Lanka</p>
              <address className="max-w-56 not-italic leading-relaxed">
                Orion City, Colombo 09, Western Province
              </address>
              <a href="tel:+94768519161" className="mt-5 transition-colors hover:text-white">
                +94 76 851 9161
              </a>
              <a href="mailto:collabs@drushticreatives.com" className="transition-colors hover:text-white">
                collabs@drushticreatives.com
              </a>
            </div>

            <div className="flex items-start gap-5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white transition-colors hover:text-white/60"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <p className="text-xs text-white/60 lg:absolute lg:bottom-14 lg:right-0">
            © Drushti Creatives {new Date().getFullYear()}
          </p>
        </Container>
      </footer>
    </>
  );
}
