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
 *  scroll up, matching copula.agency's header behavior. */
export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Tracks the page's overall scroll position (no target = whole document).
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const scrollingDown = latest > previous;

    // Solid background only kicks in once you've actually left the very top
    // of the page — at scrollY 0 it stays transparent over the hero.
    setScrolled(latest > 10);

    // If the nav menu is open, force the header to stay visible so it can't
    // slide away mid-click on a link.
    if (open) {
      setHidden(false);
      return;
    }

    // 80px threshold so the header doesn't flicker away on a tiny nudge
    // right at the top of the page.
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
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "bg-blue border-white/25"
          : isContactPage
          ? "bg-transparent border-[#1A1A1A]/10"
          : "bg-transparent border-white/25"
      }`}
    >
      <Container className="flex items-center justify-between py-0">
        <Link href="/" className="block px-[0.45rem] py-[0.9rem]">
          <Image
            src={isContactPage && !scrolled ? "/work/DrushtiLogo.png" : "/work/drushtiwhitecopy-trimmed.png"}
            alt="Drushti Creatives"
            width={318}
            height={199}
            priority
            className="block h-12 w-auto"
          />
        </Link>

        <div className="flex items-center gap-3">
          <AnimatePresence>
            {open && (
              <motion.nav className="flex items-center gap-2">
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
            className={`flex h-12 w-12 items-center justify-center ${MENU_BUTTON_CLASSES}`}
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
    </motion.header>
  );
}
