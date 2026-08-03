import type { MouseEventHandler, ReactNode } from "react";
import clsx from "clsx";

interface TagProps {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const TAG_CLASSES =
  "inline-flex h-9 items-center rounded-full border-[0.5px] border-ink px-3 text-xs uppercase text-ink";

/** Outlined pill label used for project/service tags across the site. */
export default function Tag({ children, className, onClick }: TagProps) {
  const classes = clsx(TAG_CLASSES, className);

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {children}
      </button>
    );
  }

  return <span className={classes}>{children}</span>;
}
