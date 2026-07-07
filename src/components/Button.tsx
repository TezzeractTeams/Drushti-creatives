import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "primary" | "secondary";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "group relative inline-flex items-center justify-center overflow-hidden rounded-pill px-7 py-3.5 text-sm font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const variantStyles: Record<Variant, string> = {
  primary: "bg-orange text-white focus-visible:ring-orange",
  secondary: "border-2 border-blue text-blue focus-visible:ring-blue",
};

const fillStyles: Record<Variant, string> = {
  primary: "bg-blue",
  secondary: "bg-blue",
};

const labelStyles: Record<Variant, string> = {
  primary: "",
  secondary: "group-hover:text-white",
};

export default function Button({ children, variant = "primary", className, ...rest }: ButtonProps) {
  const content = (
    <>
      <span
        aria-hidden
        className={clsx(
          "absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
          fillStyles[variant]
        )}
      />
      <span className={clsx("relative transition-colors duration-300", labelStyles[variant])}>
        {children}
      </span>
    </>
  );

  const classes = clsx(base, variantStyles[variant], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonAsButton)}>
      {content}
    </button>
  );
}
