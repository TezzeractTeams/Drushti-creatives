import type { MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";

interface TagProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  size?: "default" | "lg";
}

const TAG_BASE_CLASSES =
  "inline-flex items-center rounded-full border-[0.5px] border-ink uppercase text-ink";

const TAG_SIZE_CLASSES = {
  default: "h-9 px-3 text-xs",
  lg: "h-10 px-4 text-sm",
} as const;

/** Outlined pill label used for project/service tags across the site. */
export default function Tag({ children, className, onClick, size = "default" }: TagProps) {
  const classes = clsx(TAG_BASE_CLASSES, TAG_SIZE_CLASSES[size], className);

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
