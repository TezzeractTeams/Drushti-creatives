"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

// TODO: replace placeholder members/photos with the real Drushti team
const TEAM = [
  {
    name: "Member One",
    role: "Creative Director",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Member Two",
    role: "Lead Designer",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Member Three",
    role: "Design Engineer",
    photo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Member Four",
    role: "Project Manager",
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Member Five",
    role: "Content Strategist",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
  },
  {
    name: "Member Six",
    role: "Motion Designer",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
  },
];

// Original arrangement: two columns, alternating members left/right
const LEFT_COLUMN = TEAM.filter((_, i) => i % 2 === 0);
const RIGHT_COLUMN = TEAM.filter((_, i) => i % 2 === 1);

function LinkedInIcon() {
  return (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-label="LinkedIn">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function TeamCard({ member }: { member: (typeof TEAM)[number] }) {
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Pointer-driven wobble: the photo tilts/shifts inside its frame following
  // the cursor, smoothed with springs (traced from the reference).
  const px = useMotionValue(0); // -0.5 .. 0.5
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 12, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 90, damping: 12, mass: 0.5 });

  const imgX = useTransform(sx, (v) => v * 18);
  const imgY = useTransform(sy, (v) => v * 18);
  const rotate = useTransform(sx, (v) => v * 5);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || prefersReducedMotion) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      px.set((e.clientX - rect.left) / rect.width - 0.5);
      py.set((e.clientY - rect.top) / rect.height - 0.5);
    };
    const onLeave = () => {
      px.set(0);
      py.set(0);
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [prefersReducedMotion, px, py]);

  return (
    <div ref={cardRef} className="relative w-56 sm:w-64">
      {/* The ENTIRE card now wobbles as one unit — photo, blurred glow,
          corner brackets, and the name/role/LinkedIn text block below it.
          Mouse listeners stay on the outer, untransformed cardRef div
          above — if they lived on this moving element instead, its own
          motion would keep shifting the getBoundingClientRect() used to
          calculate the pointer offset, feeding back into itself. */}
      <motion.div
        style={
          prefersReducedMotion
            ? undefined
            : { x: imgX, y: imgY, rotate }
        }
        className="relative overflow-hidden p-3"
      >
        {/* Blurred glow spanning the WHOLE card frame — photo and the
            name/role/LinkedIn block are both inside it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.photo}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-40 blur-2xl"
        />

        {/* Corner brackets on the full frame */}
        <span aria-hidden className="absolute left-0 top-0 z-10 h-4 w-4 border-l border-t border-white/40" />
        <span aria-hidden className="absolute right-0 top-0 z-10 h-4 w-4 border-r border-t border-white/40" />
        <span aria-hidden className="absolute bottom-0 left-0 z-10 h-4 w-4 border-b border-l border-white/40" />
        <span aria-hidden className="absolute bottom-0 right-0 z-10 h-4 w-4 border-b border-r border-white/40" />

        <div className="relative aspect-[3/4] w-full overflow-hidden">
          <img src={member.photo} alt={member.name} className="h-full w-full object-cover" />
        </div>

        {/* Name / role / LinkedIn — inside the blurred frame */}
        <div className="relative flex items-start justify-between gap-3 pt-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-white">{member.name}</p>
            <p className="mt-0.5 text-xs text-white/50">{member.role}</p>
          </div>
          <span className="pt-0.5 text-white/40">
            <LinkedInIcon />
          </span>
        </div>
      </motion.div>
    </div>
  );
}

/** Team section traced from the reference: pinned dark screen with centered
 *  heading + CTA, while two columns of member cards float up past it on the
 *  left and right edges, driven by scroll. */
export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Original travel ranges: the columns stream up past the pinned heading,
  // right column offset ~40vh behind the left so cards arrive alternately.
  const leftY = useTransform(scrollYProgress, [0, 1], ["100vh", "-190vh"]);
  const rightY = useTransform(scrollYProgress, [0, 1], ["140vh", "-150vh"]);

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-[#1c1c1c]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* Pinned center content */}
        <div className="relative z-10 flex flex-col items-center gap-6 px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-[0.32em] text-orange"
          >
            Our team
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-heading text-[clamp(3rem,10vw,10rem)] font-bold leading-none text-white"
          >
            Creative minds
          </motion.h2>
          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            whileHover={{ scale: 1.05 }}
            className="bg-orange px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white"
          >
            Meet team
          </motion.a>
        </div>

        {prefersReducedMotion ? (
          /* Static fallback: simple grid under the heading */
          <div className="absolute inset-x-0 bottom-8 z-20 flex flex-wrap justify-center gap-6 px-6">
            {TEAM.slice(0, 3).map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        ) : (
          <>
            {/* Cards float up past the pinned heading, in front of it */}
            <motion.div
              style={{ y: leftY }}
              className="absolute left-[4%] top-0 z-20 flex flex-col gap-[26vh] sm:left-[7%]"
            >
              {LEFT_COLUMN.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </motion.div>
            <motion.div
              style={{ y: rightY }}
              className="absolute right-[4%] top-0 z-20 flex flex-col gap-[26vh] sm:right-[7%]"
            >
              {RIGHT_COLUMN.map((m) => (
                <TeamCard key={m.name} member={m} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
