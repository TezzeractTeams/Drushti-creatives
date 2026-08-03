"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent, type MotionValue } from "motion/react";
import Container from "@/components/Container";
import PillButton from "@/components/PillButton";

type Band = {
    id: string;
    label: string;
    // Tailwind background class — solid brand-color fill instead of a photo.
    bg: string;
    // Light backgrounds (yellow) need dark text/button for contrast; dark
    // backgrounds (blue/green/orange/sky) keep white.
    text: string;
    buttonVariant?: "light";
};

// Same 5 sub-services as SubServicesCarousel/ServicesHero's arc version —
// now presented as flat brand-color bands instead of photos. Each band's
// id matches a key in SERVICES_DATA in services/[id]/page.tsx, so the
// button links straight to that service's detail page.
const BANDS: Band[] = [
    { id: "marketing", label: "Social Media & Digital Marketing", bg: "bg-sky", text: "text-white", buttonVariant: "light" },
    { id: "logo", label: "Logo Design & Graphic Design", bg: "bg-green", text: "text-white", buttonVariant: "light" },
    { id: "web", label: "Website & UI Designing", bg: "bg-orange", text: "text-white", buttonVariant: "light" },
    /*{ id: "video", label: "Video Production", bg: "bg-yellow", text: "text-white", buttonVariant: "light" },*/
    { id: "content", label: "Content Development", bg: "bg-blue", text: "text-white", buttonVariant: "light" },
];

// Each band owns a slice of the section's overall scroll progress, with a
// slight overlap so the next band starts expanding a beat before the
// previous one finishes — that's what produces the "one after another"
// cascade rather than every band expanding in lockstep.
const BAND_WINDOWS: [number, number][] = [
    [0.0, 0.22],
    [0.15, 0.37],
    [0.3, 0.52],
    [0.45, 0.67],
    [0.6, 0.82],
];

const COLLAPSED_HEIGHT = "9vh";
const EXPANDED_HEIGHT = "34vh";

// How many pixels of scrolling map across the full 0..1 band cascade above.
// Deliberately NOT derived from the bands' own layout size — see the note
// on scrollYProgress in ServicesHero for why.
const SCROLL_DISTANCE = 1400;

// Framer's `style={{ opacity: motionValue }}` binding doesn't reliably push
// updates to the DOM in this project's setup (confirmed by comparison: the
// same motionValue's "change" events fire correctly, and other style keys
// like height/scale/color update fine on the same elements — only opacity
// gets stuck at its initial value). Subscribing manually and writing
// `el.style.opacity` ourselves sidesteps it.
function useOpacity(value: MotionValue<number>) {
    const ref = useRef<HTMLDivElement>(null);
    useMotionValueEvent(value, "change", (v) => {
        if (ref.current) ref.current.style.opacity = String(v);
    });
    return ref;
}

function ParallaxBand({
    band,
    window: [start, end],
    scrollYProgress,
}: {
    band: Band;
    window: [number, number];
    scrollYProgress: MotionValue<number>;
}) {
    // Band grows taller as scroll passes through its own window, pushing the
    // bands below it down the page — a real layout height change (not an
    // absolute-positioned overlay), so collapsed cards stay flush against
    // each other with no gap, and an expanding card never covers the next one.
    const height = useTransform(
        scrollYProgress,
        [start, end],
        [COLLAPSED_HEIGHT, EXPANDED_HEIGHT],
        { clamp: true }
    );
    // The button fades/scales in during the back half of the window, once
    // the card has mostly finished expanding.
    const mid = start + (end - start) * 0.55;
    const buttonOpacity = useTransform(scrollYProgress, [mid, end], [0, 1]);
    const buttonOpacityRef = useOpacity(buttonOpacity);
    const buttonScale = useTransform(scrollYProgress, [mid, end], [0.85, 1]);

    return (
        <motion.div style={{ height }} className={`relative w-full overflow-hidden ${band.bg}`}>
            <div className={`absolute inset-0 flex items-center justify-start px-6 sm:px-12 ${band.text}`}>
                <span className="font-heading text-heading-4xl font-black uppercase leading-heading tracking-tight sm:text-heading-5xl lg:text-heading-6xl">
                    {band.label}
                </span>
            </div>

            {/* Revealed once the band has (mostly) finished expanding */}
            <motion.div
                ref={buttonOpacityRef}
                style={{ scale: buttonScale, opacity: buttonOpacity.get() }}
                className="absolute bottom-6 left-6 sm:bottom-8 sm:left-12"
            >
                <PillButton href={`/services/${band.id}`} variant={band.buttonVariant}>
                    Explore service
                </PillButton>
            </motion.div>
        </motion.div>
    );
}

export default function ServicesHero({ selectedId = null }: { selectedId?: string | null } = {}) {
    const sectionRef = useRef<HTMLElement>(null);
    const [sectionTop, setSectionTop] = useState(0);
    // Reused for the filtered single-band view below: a constant progress of
    // 1 makes ParallaxBand's own scroll-driven transforms evaluate to their
    // end state (fully expanded, button visible) with no scroll needed.
    const staticProgress = useMotionValue(1);

    // Measured once (and on viewport resize) rather than tracked live: the
    // bands inside this section grow in real layout height as they expand,
    // so if scrollYProgress were computed from THIS section's own live
    // bounding rect (via useScroll's target option), growing a band would
    // resize the section, which would shift scrollYProgress, which would
    // grow the band again — a self-referential loop that threw a "cannot
    // update a component while rendering" React warning. Anchoring to a
    // one-time measurement of the section's starting position breaks the
    // loop while still letting the bands' heights genuinely push the layout.
    useEffect(() => {
        if (!sectionRef.current) return;
        const measure = () => {
            const rect = sectionRef.current!.getBoundingClientRect();
            setSectionTop(rect.top + window.scrollY);
        };
        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const { scrollY } = useScroll();
    const scrollYProgress = useTransform(scrollY, (v) => {
        const p = (v - sectionTop) / SCROLL_DISTANCE;
        return Math.min(1, Math.max(0, p));
    });

    const selectedBand = selectedId ? BANDS.find((band) => band.id === selectedId) : null;

    return (
        <section ref={sectionRef} className="relative overflow-hidden bg-blue pt-16 md:pt-24">

            <div className="relative mt-14 md:mt-20">
                {selectedBand ? (
                    // Filtered: only the selected tag's band, already fully
                    // expanded — replaces the scroll-driven cascade entirely.
                    <ParallaxBand band={selectedBand} window={[0, 1]} scrollYProgress={staticProgress} />
                ) : (
                    BANDS.map((band, i) => (
                        <ParallaxBand
                            key={band.id}
                            band={band}
                            window={BAND_WINDOWS[i]}
                            scrollYProgress={scrollYProgress}
                        />
                    ))
                )}
            </div>
        </section>
    );
}
