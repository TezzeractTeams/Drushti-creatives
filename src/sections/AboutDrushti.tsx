"use client";

import { motion, type MotionValue } from "motion/react";
import Container from "@/components/Container";
import { Burst } from "@/components/HeroShapes";
import { EASE } from "@/lib/motion";

type AboutDrushtiProps = {
    /** Scroll-driven opacity (1 → 0) passed from ClientAboutCurtain. */
    contentFadeOpacity?: MotionValue<number>;
};

export default function AboutDrushti({ contentFadeOpacity }: AboutDrushtiProps) {
    return (
        <section className="sticky top-0 z-0 flex min-h-[80vh] flex-col justify-center bg-white py-28">
            <Container>
                <motion.div style={contentFadeOpacity ? { opacity: contentFadeOpacity } : undefined}>
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.6 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="mb-10 flex items-center gap-2 text-xs font-semibold tracking-[0.32em] text-ink"
                    >
                        <Burst className="h-4 w-4 text-orange" />
                        About Drushti
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="relative max-w-3xl"
                    >
                        <h2 className="font-heading text-heading-4xl leading-heading text-ink sm:text-heading-5xl lg:text-heading-6xl">
                             Flexible Strategy for Your Vision
                        </h2>

                        <p className="mt-6 text-base leading-relaxed text-ink/70">
                        We don’t force your brand into a pre define structure. We adapt our tools to fit your unique culture, building a visual and verbal identity that belongs solely to you.
                        </p>

                    
                    </motion.div>
                </motion.div>
            </Container>
        </section>
    );
}
