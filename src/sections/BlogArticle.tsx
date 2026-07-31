"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import type { BlogPost } from "@/data/blogPosts";

const FACEBOOK_ICON = (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LINKEDIN_ICON = (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const COPY_LINK_ICON = (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757M10.81 15.312a4.5 4.5 0 01-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
  </svg>
);

function ShareRow({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const buttonClasses =
    variant === "light"
      ? "border-white/25 text-white/80 hover:border-white hover:text-white"
      : "border-ink/15 text-ink/70 hover:border-ink hover:text-ink";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Copy link"
        onClick={() => {
          navigator.clipboard?.writeText(window.location.href);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1500);
        }}
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${buttonClasses}`}
      >
        {COPY_LINK_ICON}
      </button>

      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${buttonClasses}`}
      >
        {FACEBOOK_ICON}
      </a>

      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${buttonClasses}`}
      >
        {LINKEDIN_ICON}
      </a>

      {copied && (
        <span className={`text-xs ${variant === "light" ? "text-white/60" : "text-ink/50"}`}>
          Link copied
        </span>
      )}
    </div>
  );
}

export default function BlogArticle({ post }: { post: BlogPost }) {
  const hasExpectations = Boolean(post.expectationsIntro && post.expectations?.length);

  const sections = [
    { id: "intro", label: "Introduction" },
    ...(hasExpectations
      ? [{ id: "expectations", label: "What Businesses Actually Expect" }]
      : []),
    { id: "core", label: post.sectionTitle },
    { id: "outro", label: "The Key Takeaway" },
    { id: "closing", label: "The Real Question to Ask" },
  ];

  const [activeId, setActiveId] = useState(sections[0].id);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Several short sections can intersect the trigger band at once —
        // pick the one nearest the top of the viewport as "current" rather
        // than whichever entry the browser happens to report last.
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top <= b.boundingClientRect.top ? a : b
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.slug]);

  return (
    <article className="bg-white pb-20 sm:pb-28">
      <div className="bg-blue pb-16 pt-32 sm:pb-20 sm:pt-40">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-sm text-white/60">
              {post.author} • {post.date} • {post.readingTime}
            </p>
            <div className="mt-5 flex justify-center">
              <ShareRow variant="light" />
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="mt-14 grid gap-10 lg:grid-cols-[220px_1fr] lg:items-start lg:gap-8">
          {/* Contents — sticky scroll-spy sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl bg-cream p-6">
              <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-ink">
                Contents
              </h2>
              <nav className="mt-4 space-y-3">
                {sections.map((section) => {
                  const isActive = section.id === activeId;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className={`flex items-start gap-2 text-sm leading-snug transition-colors ${isActive ? "font-semibold text-ink" : "text-ink/50 hover:text-ink/70"
                        }`}
                    >
                      <span
                        className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? "bg-orange" : "bg-transparent"
                          }`}
                      />
                      {section.label}
                    </a>
                  );
                })}
              </nav>
              <div className="mt-6">
                <ShareRow />
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="min-w-0">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-ink">
              <Image
                src={post.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 640px"
                priority
              />
            </div>

            <div className="mt-10 space-y-6 text-sm leading-relaxed text-ink/75 sm:text-base">
              <section
                id="intro"
                ref={(el) => {
                  sectionRefs.current.intro = el;
                }}
                className="space-y-6 scroll-mt-28"
              >
                {post.intro.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>

              {hasExpectations && (
                <section
                  id="expectations"
                  ref={(el) => {
                    sectionRefs.current.expectations = el;
                  }}
                  className="space-y-4 scroll-mt-28"
                >
                  <p>{post.expectationsIntro}</p>
                  <ul className="space-y-3">
                    {post.expectations!.map((item) => (
                      <li key={item.title} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                        <span>
                          <strong className="text-ink">{item.title}:</strong> {item.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {post.bridge && <p>{post.bridge}</p>}
                </section>
              )}

              <section
                id="core"
                ref={(el) => {
                  sectionRefs.current.core = el;
                }}
                className="space-y-4 scroll-mt-28"
              >
                <h2 className="!mt-2 font-heading text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {post.sectionTitle}
                </h2>
                {post.sectionIntro && <p>{post.sectionIntro}</p>}
                <ul className="space-y-3">
                  {post.pillars.map((item) => (
                    <li key={item.title} className="flex gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                      <span>
                        <strong className="text-ink">{item.title}</strong> {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section
                id="outro"
                ref={(el) => {
                  sectionRefs.current.outro = el;
                }}
                className="scroll-mt-28"
              >
                <p>{post.outro}</p>
              </section>

              <section
                id="closing"
                ref={(el) => {
                  sectionRefs.current.closing = el;
                }}
                className="scroll-mt-28"
              >
                <p>{post.closing}</p>
              </section>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/blog" className="text-sm font-semibold text-ink/60 hover:text-ink">
            ← Back to all articles
          </Link>
        </div>
      </Container>
    </article>
  );
}
