"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";

type SubService = {
    id: string;
    title: string;
    image: string;
    peek: string;
};

const SUB_SERVICES: SubService[] = [
    { id: "marketing", title: "Digital Marketing", image: "/images/sub-services/content-front.png", peek: "/images/sub-services/content-back.png" },
    { id: "brand", title: "Brand Identity", image: "/images/sub-services/brand-front.png", peek: "/images/sub-services/brand-back.png" },
    { id: "web", title: "Web Design", image: "/images/sub-services/web-front.jpg", peek: "/images/sub-services/web-back.jpg" },
    { id: "video", title: "Video Production", image: "/images/sub-services/innovative.png", peek: "/images/sub-services/innovative.png" },
    { id: "graphic", title: "Graphic Design", image: "/images/sub-services/landscape-front.jpg", peek: "/images/sub-services/landscape-back.jpg" },
];

const ROTATE_DEG = 35;
const X_OFFSET = 270;
const Z_OFFSET = 120;

export default function SubServicesCarousel() {
    const [active, setActive] = useState(2);
    const count = SUB_SERVICES.length;

    const go = (dir: 1 | -1) => setActive((prev) => (prev + dir + count) % count);

    return (
        <section className="relative py-20 md:py-28 overflow-hidden bg-cream">
            <Container>
                <div
                    className="relative h-[480px] sm:h-[580px] md:h-[680px] flex items-center justify-center"
                    style={{ perspective: "2000px" }}
                >
                    {SUB_SERVICES.map((item, index) => {
                        let offset = index - active;
                        if (offset > count / 2) offset -= count;
                        if (offset < -count / 2) offset += count;

                        const isActive = offset === 0;
                        const absOffset = Math.abs(offset);
                        const isVisible = absOffset <= 2;

                        // Match the screenshot's alternating/perspective scales
                        let scale = 1;
                        if (absOffset === 1) scale = 0.55;
                        if (absOffset === 2) scale = 0.85;

                        let x = 0;
                        if (offset < 0) {
                            x = offset === -1 ? -X_OFFSET * 0.85 : -X_OFFSET * 1.85;
                        } else if (offset > 0) {
                            x = offset === 1 ? X_OFFSET * 0.85 : X_OFFSET * 1.85;
                        }

                        let z = -absOffset * Z_OFFSET;
                        let rotateY = offset === 0 ? 0 : offset > 0 ? -ROTATE_DEG : ROTATE_DEG;
                        let zIndex = 10 - absOffset;

                        return (
                            <motion.div
                                key={item.id}
                                className="absolute"
                                style={{ transformStyle: "preserve-3d", zIndex }}
                                initial={false}
                                animate={{
                                    x,
                                    z,
                                    rotateY,
                                    opacity: isVisible ? 1 : 0,
                                    scale,
                                }}
                                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setActive(index)}
                                    className="relative w-[340px] h-[380px] sm:w-[420px] sm:h-[480px] md:w-[480px] md:h-[520px] rounded-[2rem] overflow-hidden shadow-2xl focus:outline-none block group"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        draggable={false}
                                    />
                                    
                                    {/* Overlay for text readability */}
                                    <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                                    
                                    {isActive && (
                                        <motion.div 
                                            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none p-6"
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15, duration: 0.4 }}
                                        >
                                            <h3 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white font-normal drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] text-center leading-none tracking-tight">
                                                {item.title.toLowerCase()}
                                            </h3>
                                            <div className="mt-10 pointer-events-auto">
                                                <Link href={`/services/${item.id}`} passHref legacyBehavior>
                                                    <Button variant="primary" className="!rounded-md">View more</Button>
                                                </Link>
                                            </div>
                                        </motion.div>
                                    )}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-16 flex items-center justify-center gap-5">
                    <button
                        type="button"
                        onClick={() => go(-1)}
                        aria-label="Previous"
                        className="w-14 h-14 rounded-full bg-ink/50 hover:bg-ink text-white flex items-center justify-center transition-colors shadow-lg"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <button
                        type="button"
                        onClick={() => go(1)}
                        aria-label="Next"
                        className="w-14 h-14 rounded-full bg-ink text-white flex items-center justify-center transition-colors shadow-lg"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 6l6 6-6 6" />
                        </svg>
                    </button>
                </div>
            </Container>
        </section>
    );
}