import type { Metadata } from "next";
import BlogHero from "@/sections/BlogHero";

export const metadata: Metadata = {
  title: "Blog | Drushti Creatives",
  description:
    "Ideas, lessons, and behind-the-scenes thinking from the Drushti Creatives team.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
    </main>
  );
}
