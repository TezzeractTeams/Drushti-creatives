import Link from "next/link";
import type { ReactNode } from "react";
import { ScallopBadge } from "@/components/HeroShapes";

interface BadgeButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
}

/** Scalloped-blob CTA button, styled after the reference site's badge button. */
export default function BadgeButton({ href, children, className }: BadgeButtonProps) {
  return (
    <Link
      href={href}
      className={`group relative inline-flex h-24 w-24 items-center justify-center text-center transition-transform duration-300 ease-out hover:scale-105 sm:h-28 sm:w-28 ${className ?? ""}`}
    >
      <ScallopBadge className="absolute inset-0 h-full w-full text-blue" />
      <span className="relative px-2 text-[11px] font-bold leading-tight tracking-wide text-white sm:text-xs">
        {children}
      </span>
    </Link>
  );
}
