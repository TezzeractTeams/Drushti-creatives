import type { ReactNode } from "react";

interface TagProps {
  children: ReactNode;
  className?: string;
}

/** Outlined pill label used for project/service tags across the site. */
export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`inline-flex h-9 items-center rounded-full border-[0.5px] border-ink px-3 text-xs uppercase text-ink ${className}`}
    >
      {children}
    </span>
  );
}
