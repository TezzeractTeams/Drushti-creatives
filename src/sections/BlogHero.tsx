"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Container from "@/components/Container";
import PillButton from "@/components/PillButton";
import { fadeUp } from "@/lib/motion";
import { FEATURED_POST } from "@/data/blog";

/** Blog landing page */
export default function BlogHero() {
  const POSTS = [
    FEATURED_POST,
    {
      title: "Building Brands That People Remember",
      author: "Drushti Team",
      image: "/blog-2.jpg",
    },
    {
      title: "Why Consistency Beats Creativity",
      author: "Drushti Team",
      image: "/blog-3.jpg",
    },
  ];

  return (
    <section className="bg-white pb-16 pt-32 sm:pb-24 sm:pt-40">
      <Container>
        {/* Hero */}
        <motion.div {...fadeUp()} className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-ink/15 px-4 py-1.5 text-xs font-medium text-ink/70">
            Our Journal
          </span>

          <h1 className="mt-5 font-heading text-heading-5xl font-bold leading-heading tracking-tight text-ink sm:text-heading-6xl">
            Creative <span className="text-orange">Perspectives</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink/60 sm:text-base">
            Ideas, lessons, and behind-the-scenes thinking from the Drushti
            team—helping you build a brand that stays consistent,
            professional, and always moving forward.
          </p>
        </motion.div>

        {/* Blog Cards */}
        <motion.div
          {...fadeUp(0.1)}
          className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3"
        >
          {POSTS.map((post) => (
            <article
              key={post.title}
              className="group overflow-hidden rounded-3xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
              </div>

              <div className="p-6">
                <p className="text-sm text-ink/50">
                  by {post.author}
                </p>

                <h2 className="mt-3 font-heading text-2xl font-bold leading-snug text-ink transition-colors duration-300 group-hover:text-orange">
                  {post.title}
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  Discover practical branding, design, and marketing insights
                  that help businesses create memorable experiences and grow
                  with confidence.
                </p>

                <div className="mt-6">
                  <PillButton href="/blog">
                    Read article
                  </PillButton>
                </div>
              </div>
            </article>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          {...fadeUp(0.15)}
          className="relative mx-auto mt-20 flex max-w-5xl flex-col overflow-hidden rounded-3xl bg-ink sm:flex-row sm:items-center"
        >
          <div className="relative z-10 flex-1 px-8 py-12 sm:px-12 sm:py-16">
            <h3 className="max-w-md font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              Imagine having a{" "}
              <span className="text-orange">creative team</span> fully dedicated
              to your brand
            </h3>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
              You already know what Drushti can do. The next step takes 30
              minutes and could change how your brand shows up everywhere.
            </p>

            <div className="mt-8">
              <PillButton href="/contact" variant="light">
                Get started
              </PillButton>
            </div>
          </div>

          <div className="relative h-56 w-full sm:h-full sm:w-72 sm:shrink-0 lg:w-96">
            <Image
              src="/team-member-2.png"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width:640px) 100vw, 384px"
            />
          </div>
        </motion.div>
      </Container>
    </section>
  );
}