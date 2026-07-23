"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, animate, type PanInfo } from "motion/react";
import Container from "@/components/Container";
import Button from "@/components/Button";

type SubService = {
    id: string;
    title: string;
    image: string;
};

const SUB_SERVICES: SubService[] = [
    {
        id: "marketing",
        title: "Digital Marketing",
        image: "/images/sub-services/content-front.png",
    },
    {
        id: "brand",
        title: "Brand Identity",
        image: "/images/sub-services/brand-front.png",
    },
    {
        id: "web",
        title: "Web Design",
        image: "/images/sub-services/web-front.jpg",
    },
    {
        id: "video",
        title: "Video Production",
        image: "/images/sub-services/innovative.png",
    },
    {
        id: "graphic",
        title: "Graphic Design",
        image: "/images/sub-services/landscape-front.jpg",
    },
];

/** Depth layout — side cards stay clearly peeking past the active card. */
function getCardTransform(offset: number, spread: number) {
    const abs = Math.abs(offset);
    const dir = Math.sign(offset);

    if (abs === 0) {
        return { x: 0, z: 0, rotateY: 0, scale: 1, blur: 0, opacity: 1 };
    }

    if (abs === 1) {
        return {
            x: dir * 340 * spread,
            z: -140,
            rotateY: dir * -18,
            scale: 0.82,
            blur: 1.5,
            opacity: 1,
        };
    }

    if (abs === 2) {
        return {
            x: dir * 560 * spread,
            z: -260,
            rotateY: dir * -26,
            scale: 0.68,
            blur: 3,
            opacity: 0.95,
        };
    }

    return {
        x: dir * 720 * spread,
        z: -360,
        rotateY: dir * -30,
        scale: 0.55,
        blur: 5,
        opacity: 0,
    };
}

const SPRING = { type: "spring" as const, stiffness: 220, damping: 28, mass: 0.9 };
const DRAG_THRESHOLD = 80;

export default function SubServicesCarousel() {
    const [active, setActive] = useState(2);
    const [spread, setSpread] = useState(1);
    const count = SUB_SERVICES.length;
    const dragX = useMotionValue(0);
    const isDragging = useRef(false);
    const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const updateSpread = () => {
            const w = window.innerWidth;
            if (w < 480) setSpread(0.48);
            else if (w < 768) setSpread(0.68);
            else if (w < 1024) setSpread(0.86);
            else setSpread(1);
        };
        updateSpread();
        window.addEventListener("resize", updateSpread);
        return () => window.removeEventListener("resize", updateSpread);
    }, []);

    const normalizeOffset = useCallback(
        (index: number) => {
            let offset = index - active;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            return offset;
        },
        [active, count]
    );

    const go = useCallback(
        (dir: 1 | -1) => {
            setActive((prev) => (prev + dir + count) % count);
        },
        [count]
    );

    const stopAutoplay = useCallback(() => {
        if (autoplayRef.current) {
            clearInterval(autoplayRef.current);
            autoplayRef.current = null;
        }
    }, []);

    const startAutoplay = useCallback(() => {
        stopAutoplay();
        autoplayRef.current = setInterval(() => go(1), 4200);
    }, [go, stopAutoplay]);

    useEffect(() => {
        startAutoplay();
        return stopAutoplay;
    }, [startAutoplay, stopAutoplay]);

    const onDragStart = () => {
        isDragging.current = true;
        stopAutoplay();
    };

    const onDragEnd = (_: unknown, info: PanInfo) => {
        isDragging.current = false;
        const { offset, velocity } = info;
        const shouldAdvance =
            Math.abs(offset.x) > DRAG_THRESHOLD || Math.abs(velocity.x) > 500;

        if (shouldAdvance) {
            go(offset.x < 0 || velocity.x < 0 ? 1 : -1);
        }

        animate(dragX, 0, { type: "spring", stiffness: 400, damping: 40 });
        startAutoplay();
    };

    return (
        <section className="relative overflow-hidden bg-cream py-20 md:py-28">
            <Container>
                <div
                    className="relative flex h-[520px] items-center justify-center sm:h-[640px] md:h-[760px]"
                    style={{ perspective: "1800px", perspectiveOrigin: "50% 48%" }}
                >
                    <motion.div
                        className="absolute inset-0 flex cursor-grab items-center justify-center active:cursor-grabbing"
                        style={{ x: dragX, transformStyle: "preserve-3d" }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.18}
                        onDragStart={onDragStart}
                        onDragEnd={onDragEnd}
                    >
                        {SUB_SERVICES.map((item, index) => {
                            const offset = normalizeOffset(index);
                            const absOffset = Math.abs(offset);
                            const isActive = offset === 0;
                            const isVisible = absOffset <= 2;
                            const t = getCardTransform(offset, spread);

                            return (
                                <motion.div
                                    key={item.id}
                                    className="absolute"
                                    style={{ transformStyle: "preserve-3d" }}
                                    initial={false}
                                    animate={{
                                        x: t.x,
                                        z: t.z,
                                        rotateY: t.rotateY,
                                        scale: t.scale,
                                        opacity: isVisible ? t.opacity : 0,
                                        filter: t.blur > 0 ? `blur(${t.blur}px)` : "blur(0px)",
                                        zIndex: 20 - absOffset,
                                    }}
                                    transition={SPRING}
                                >
                                    <button
                                        type="button"
                                        onClick={() => {
                                            if (isDragging.current) return;
                                            if (!isActive) {
                                                setActive(index);
                                                startAutoplay();
                                            }
                                        }}
                                        className="group relative block h-[420px] w-[320px] overflow-hidden rounded-[2rem] shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 sm:h-[520px] sm:w-[400px] md:h-[600px] md:w-[480px]"
                                        aria-label={item.title}
                                        aria-current={isActive ? "true" : undefined}
                                    >
                                        <img
                                            src={item.image}
                                            alt=""
                                            className="absolute inset-0 h-full w-full object-cover"
                                            draggable={false}
                                        />

                                        <div
                                            className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"
                                                }`}
                                        />

                                        {isActive && (
                                            <motion.div
                                                className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center p-6"
                                                initial={{ opacity: 0, y: 15 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15, duration: 0.4 }}
                                            >
                                                <h3 className="font-heading text-center text-4xl font-normal leading-none tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)] md:text-5xl lg:text-6xl">
                                                    {item.title}
                                                </h3>
                                                <div className="pointer-events-auto mt-10">
                                                    <Button
                                                        href={`/services/${item.id}`}
                                                        variant="primary"
                                                        className="!rounded-md"
                                                    >
                                                        View More
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        )}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>

                <div className="mt-16 flex items-center justify-center gap-5">
                    <NavButton
                        label="Previous"
                        onClick={() => {
                            go(-1);
                            startAutoplay();
                        }}
                    >
                        <path d="M15 18l-6-6 6-6" />
                    </NavButton>
                    <NavButton
                        label="Next"
                        onClick={() => {
                            go(1);
                            startAutoplay();
                        }}
                    >
                        <path d="M9 6l6 6-6 6" />
                    </NavButton>
                </div>
            </Container>
        </section>
    );
}

function NavButton({
    label,
    onClick,
    children,
}: {
    label: string;
    onClick: () => void;
    children: ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-lg transition-colors hover:bg-ink/80"
        >
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {children}
            </svg>
        </button>
    );
}
