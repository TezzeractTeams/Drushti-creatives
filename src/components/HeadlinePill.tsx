import type { ReactNode } from "react";
import clsx from "clsx";

export default function HeadlinePill({
  children,
  variant,
}: {
  children: ReactNode;
  variant: "blue" | "orange" | "yellow" | "green";
}) {
  return (
    <span
      className={clsx(
        "mx-[0.04em] inline-flex translate-y-[0.04em] items-center rounded-pill px-[0.32em] py-[0.06em] align-baseline sm:mx-[0.06em] sm:translate-y-[0.06em] sm:px-[0.42em] sm:py-[0.08em]",
        variant === "blue" && "bg-blue text-white",
        variant === "orange" && "bg-orange text-white",
        variant === "yellow" && "bg-yellow text-ink",
        variant === "green" && "bg-green text-white",
      )}
    >
      {children}
    </span>
  );
}
