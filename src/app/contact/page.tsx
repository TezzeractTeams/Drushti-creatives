"use client";

import { useEffect, useState, useRef, FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Drushti Creatives — Contact Page
 * Drop-in as: app/contact/page.tsx
 *
 * Assumes your global <Header /> already renders above this (nav is not
 * duplicated here). Brand colors pulled from the Drushti palette:
 * Primary #284F9F · Accent #DC5C26 · Green #77C26B · Light Blue #257FC2 · Gold #E0B624
 */

const GREETINGS = ["Hello", "Ayubowan", "Howzit", "Bonjour", "Namaste", "Hola"];

const BUDGETS = ["$1k – $5k", "$5k – $15k", "$15k – $50k", "$50k+"];

export default function ContactPage() {
  return (
    <main className="bg-[#0B1424] text-white">
      <ContactHero />
      <ContactFormSection />
    </main>
  );
}

/* -------------------------------------------------------------------- */
/*  Hero — "Say [cycling greeting]" + orbiting rings                    */
/* -------------------------------------------------------------------- */

function ContactHero() {
  const [index, setIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % GREETINGS.length);
    }, 1800);
    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <h1 className="flex flex-wrap items-baseline justify-center gap-x-5 text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
        <span className="text-white">Say</span>
        <span className="relative inline-flex h-[1.15em] min-w-[6ch] items-center justify-start overflow-hidden align-baseline">
          <AnimatePresence mode="wait">
            <motion.span
              key={GREETINGS[index]}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 24, filter: "blur(8px)" }
              }
              animate={
                prefersReducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -24, filter: "blur(8px)" }
              }
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="whitespace-nowrap font-serif italic text-[#DC5C26]"
            >
              {GREETINGS[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </h1>

      <p className="mt-6 max-w-md text-base text-white/50 sm:text-lg">
        Tell us about your project — we usually reply within one business day.
      </p>

      <OrbitDecoration className="mt-14" reducedMotion={!!prefersReducedMotion} />
    </section>
  );
}

function OrbitDecoration({
  className = "",
  reducedMotion,
}: {
  className?: string;
  reducedMotion: boolean;
}) {
  return (
    <div className={`relative h-32 w-32 ${className}`} aria-hidden="true">
      <motion.svg
        viewBox="0 0 160 160"
        className="absolute inset-0 h-full w-full"
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 14, repeat: Infinity, ease: "linear" }
        }
      >
        <ellipse
          cx="70"
          cy="80"
          rx="45"
          ry="65"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          transform="rotate(-20 70 80)"
        />
      </motion.svg>
      <motion.svg
        viewBox="0 0 160 160"
        className="absolute inset-0 h-full w-full"
        animate={reducedMotion ? undefined : { rotate: -360 }}
        transition={
          reducedMotion
            ? undefined
            : { duration: 18, repeat: Infinity, ease: "linear" }
        }
      >
        <ellipse
          cx="95"
          cy="70"
          rx="42"
          ry="30"
          fill="none"
          stroke="rgba(220,92,38,0.6)"
          strokeWidth="1.5"
          transform="rotate(15 95 70)"
        />
      </motion.svg>
    </div>
  );
}

/* -------------------------------------------------------------------- */
/*  Form section                                                        */
/* -------------------------------------------------------------------- */

function ContactFormSection() {
  const [budget, setBudget] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // UI-only for now — wire this to an API route (e.g. /api/contact) later.
    setStatus("sent");
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-16 px-6 pb-32 md:grid-cols-[1.4fr_1fr]">
      {/* Left: form */}
      <div>
        <h2 className="mb-10 text-3xl font-bold sm:text-4xl">
          Send us a message
        </h2>

        {status === "sent" ? (
          <div className="rounded-2xl border border-[#77C26B]/30 bg-[#77C26B]/10 p-8">
            <p className="text-lg font-semibold text-[#77C26B]">
              Message sent — thank you!
            </p>
            <p className="mt-2 text-sm text-white/60">
              We&apos;ll get back to you within one business day.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Name" id="name" name="name" placeholder="Your name" required />
              <Field
                label="Email"
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                required
              />
            </div>

            <Field
              label="Company"
              id="company"
              name="company"
              placeholder="Company name (optional)"
            />

            <div>
              <span className="mb-3 block text-sm font-medium text-white/60">
                Budget range
              </span>
              <div className="flex flex-wrap gap-3">
                {BUDGETS.map((b) => {
                  const active = budget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(b)}
                      className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                        active
                          ? "border-[#DC5C26] bg-[#DC5C26] text-white"
                          : "border-white/15 bg-transparent text-white/70 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label
                htmlFor="details"
                className="mb-2 block text-sm font-medium text-white/60"
              >
                Project details
              </label>
              <textarea
                id="details"
                name="details"
                rows={5}
                required
                placeholder="What are you looking to build?"
                className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#284F9F]"
              />
            </div>

            <button
              type="submit"
              className="rounded-full bg-[#DC5C26] px-8 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Send message
            </button>
          </form>
        )}
      </div>

      {/* Right: direct contact panel */}
      <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-8">
        <h3 className="text-lg font-semibold">Prefer to talk directly?</h3>
        <p className="mt-2 text-sm text-white/50">
          Reach out through whichever works best for you.
        </p>

        <div className="mt-6 space-y-4 text-sm">
          <ContactRow label="Email" value="hello@drushticreatives.com" />
          <ContactRow label="Phone" value="+94 11 234 5678" />
          <ContactRow label="Studio" value="Colombo, Sri Lanka" />
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-wide text-white/40">
            Response time
          </p>
          <p className="mt-1 text-sm text-white/70">
            Within 1 business day
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          {["Instagram", "LinkedIn", "Facebook"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-sm text-white/50 underline-offset-4 hover:text-[#DC5C26] hover:underline"
            >
              {social}
            </a>
          ))}
        </div>
      </aside>
    </section>
  );
}

function Field({
  label,
  id,
  ...props
}: {
  label: string;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white/60">
        {label}
      </label>
      <input
        id={id}
        className="w-full rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-white placeholder:text-white/30 outline-none transition-colors focus:border-[#284F9F]"
        {...props}
      />
    </div>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-white/40">{label}</span>
      <span className="font-medium text-white">{value}</span>
    </div>
  );
}
