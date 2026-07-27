"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import Container from "@/components/Container";

import { EASE } from "@/lib/motion";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "/contact" },
];

const MENU_BUTTON_CLASSES =
  "rounded-full bg-white font-heading text-xs uppercase text-ink transition-colors duration-300 hover:bg-ink hover:text-white";

/** Top-right + expands into a row of nav pills, morphing to × — matching
 *  the reference site's header interaction. Hides on scroll down, shows on
 *  scroll up, matching copula.agency's header behavior. On mobile, the
 *  expanded nav drops into a stacked panel below the header instead of
 *  a horizontal row, since four pills won't fit inline on a narrow screen. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const scrollingDown = latest > previous;

    setScrolled(latest > 10);

    if (open) {
      setHidden(false);
      return;
    }

    if (scrollingDown && latest > 80) {
      setHidden(true);
    } else if (!scrollingDown) {
      setHidden(false);
    }
  });

  const isContactPage = pathname === "/contact";

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${scrolled
        ? "bg-blue border-white/25"
        : isContactPage
          ? "bg-transparent border-[#1A1A1A]/10"
          : "bg-transparent border-white/25"
        }`}
    >
      <Container className="flex items-center justify-between py-0">
        <Link href="/" className="block px-[0.45rem] py-[0.9rem]">
          <Image
            src="/work/drushtiwhitecopy-trimmed.png"
            alt="Drushti Creatives"
            width={318}
            height={199}
            priority
            className="block h-10 w-auto md:h-12"
          />
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop: pills expand inline next to the button */}
          <AnimatePresence>
            {open && (
              <motion.nav className="hidden md:flex items-center gap-2">
                {LINKS.map((link, i) => (
                  <Link key={link.href} href={link.href} passHref legacyBehavior>
                    <motion.a
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16 }}
                      transition={{ duration: 0.45, ease: EASE, delay: i * 0.06 }}
                      className={`inline-flex h-12 items-center justify-center px-5 ${MENU_BUTTON_CLASSES}`}
                    >
                      {link.label}
                    </motion.a>
                  </Link>
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
            className={`relative z-10 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center ${MENU_BUTTON_CLASSES}`}
          >
            <svg width="24" height="24" viewBox="0 0 16 16" fill="none" aria-hidden>
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

      {/* Mobile: stacked dropdown panel below the header */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="md:hidden flex flex-col gap-2 border-t border-white/15 bg-blue px-4 py-4"
          >
            {LINKS.map((link, i) => (
              <Link key={link.href} href={link.href} passHref legacyBehavior>
                <motion.a
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.35, ease: EASE, delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className={`flex h-12 w-full items-center justify-center px-5 ${MENU_BUTTON_CLASSES}`}
                >
                  {link.label}
                </motion.a>
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}