import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/sections/BlogArticle";
import { BLOG_POSTS, getBlogPost } from "@/data/blogPosts";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Blog | Drushti Creatives" };

  return {
    title: `${post.title} | Drushti Creatives`,
    description: post.intro[0],
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main>
      <BlogArticle post={post} />
    </main>
  );
}
