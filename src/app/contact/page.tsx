"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import PillButton from "@/components/PillButton";

const EASE = [0.22, 1, 0.36, 1] as const;

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 11L11 1M11 1H3.5M11 1V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sent");
  }

  return (
    <main className="w-full bg-[#0B1424]">
      {/* ── HERO SECTION ───────────────────────────────────────── */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-blue px-6 text-center">
        <div className="relative z-10 flex flex-col items-center gap-6 max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="text-xs font-semibold uppercase tracking-[0.32em] text-orange"
          >
            Get in touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="font-heading text-[clamp(2.5rem,7vw,6.5rem)] font-bold leading-[0.95] text-white"
          >
            Let&apos;s build something remarkable.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: EASE }}
            className="mt-4"
          >
            <PillButton href="#form">Start a conversation</PillButton>
          </motion.div>
        </div>
      </section>

      {/* ── FORM SECTION ───────────────────────────────────────── */}
      <section id="form" className="bg-[#F4EFEA] text-[#1A1A1A] py-24 lg:py-36 px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col justify-center scroll-mt-20">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left Column: Heading */}
            <div className="flex flex-col select-none">
              <h2 className="font-heading text-display-lg font-bold leading-[0.95] tracking-tighter uppercase text-[#1A1A1A] flex flex-col gap-2">
                <span>Let&apos;s Tie</span>
                <span className="flex items-center gap-3 md:gap-5">
                  Ideas
                  <motion.svg
                    viewBox="0 0 100 100"
                    className="w-[0.9em] h-[0.9em] text-[#DC5C26] fill-current flex-shrink-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  >
                    <g transform="translate(50,50)">
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                        <rect
                          key={angle}
                          x="-6"
                          y="-45"
                          width="12"
                          height="38"
                          rx="6"
                          transform={`rotate(${angle})`}
                        />
                      ))}
                      <circle cx="0" cy="0" r="10" />
                    </g>
                  </motion.svg>
                </span>
                <span>Together</span>
              </h2>
            </div>

            {/* Right Column: Form */}
            <div className="w-full">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border border-[#1A1A1A]/20 rounded-lg p-8 md:p-12 text-center bg-[#EFEAE3]"
                >
                  <h3 className="font-heading text-2xl font-bold uppercase tracking-tight mb-4 text-[#1A1A1A]">
                    Thank You!
                  </h3>
                  <p className="font-body text-sm text-[#1A1A1A]/70 max-w-md mx-auto leading-relaxed">
                    We&apos;ve received your message and will get back to you shortly. Let&apos;s build something great.
                  </p>
                  <button
                    onClick={() => {
                      setFormData({ name: "", email: "", phone: "", message: "" });
                      setStatus("idle");
                    }}
                    className="mt-8 font-heading text-xs font-bold uppercase tracking-wider underline underline-offset-4 hover:opacity-75 transition-opacity"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 md:gap-8">

                  {/* Name field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-heading text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/80">
                      Name & Surname*
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      placeholder="Enter your name and surname"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full font-body bg-[#EFEAE3] border border-[#1A1A1A]/20 rounded-lg px-5 py-4 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 outline-none focus:border-[#1A1A1A]/60 focus:bg-[#EAE5DE] transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-heading text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/80">
                      Email*
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      placeholder="Enter your Email address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full font-body bg-[#EFEAE3] border border-[#1A1A1A]/20 rounded-lg px-5 py-4 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 outline-none focus:border-[#1A1A1A]/60 focus:bg-[#EAE5DE] transition-all"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-heading text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/80">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full font-body bg-[#EFEAE3] border border-[#1A1A1A]/20 rounded-lg px-5 py-4 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 outline-none focus:border-[#1A1A1A]/60 focus:bg-[#EAE5DE] transition-all"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-heading text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]/80">
                      Message*
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full font-body bg-[#EFEAE3] border border-[#1A1A1A]/20 rounded-lg px-5 py-4 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 outline-none focus:border-[#1A1A1A]/60 focus:bg-[#EAE5DE] transition-all resize-none"
                    />
                  </div>

                  {/* Submit button (Matching PillButton design and animations) */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      initial="rest"
                      whileHover="hover"
                      animate="rest"
                      variants={{
                        rest: {
                          backgroundColor: "rgb(26, 26, 26)",
                          color: "rgb(255, 255, 255)",
                          borderColor: "rgb(26, 26, 26)",
                        },
                        hover: {
                          backgroundColor: "rgb(40, 79, 159)",
                          color: "rgb(255, 255, 255)",
                          borderColor: "rgb(40, 79, 159)",
                        },
                      }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="font-heading inline-flex items-center rounded-lg px-7 py-3.5 text-xs leading-5 !uppercase border border-transparent"
                    >
                      <span className="relative h-5 overflow-hidden">
                        <motion.span
                          className="flex flex-col"
                          variants={{ rest: { y: "0%" }, hover: { y: "-50%" } }}
                          transition={{ duration: 0.4, ease: EASE }}
                        >
                          <span className="flex h-5 items-center gap-2 leading-5">
                            SEND
                            <ArrowIcon />
                          </span>
                          <span className="flex h-5 items-center gap-2 leading-5">
                            SEND
                            <ArrowIcon />
                          </span>
                        </motion.span>
                      </span>
                    </motion.button>
                  </div>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
