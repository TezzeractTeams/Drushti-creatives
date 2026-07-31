"use client";

import Image from "next/image";
import Link from "next/link";
import Tag from "@/components/Tag";

type PortfolioCardProps = {
  name: string;
  client: string;
  image: string;
  tags: string[];
  href: string;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
};

export default function PortfolioCard({
  name,
  client,
  image,
  tags,
  href,
  isHovered,
  isDimmed,
  onHover,
  onLeave,
}: PortfolioCardProps) {
  return (
    <Link
      href={href}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`group relative block aspect-[4/3] overflow-hidden rounded-3xl border border-ink/5 bg-white transition-opacity duration-300 ${
        isDimmed ? "opacity-40" : "opacity-100"
      }`}
    >
      <Image
        src={image}
        alt={name}
        fill
        className={`object-cover transition-transform duration-500 ${
          isHovered ? "scale-105" : "scale-100"
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div
        className={`absolute inset-x-0 bottom-0 bg-white px-5 py-4 transition-all duration-300 ease-out ${
          isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <h3 className="font-heading text-base font-semibold text-ink">{name}</h3>
        <p className="mt-0.5 text-xs text-ink/60">{client}</p>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags.slice(0, 2).map((tag) => (
            <Tag key={tag} className="h-6 px-2 text-[0.6rem]">
              {tag}
            </Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
