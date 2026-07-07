import type { ElementType, ReactNode } from "react";
import clsx from "clsx";

interface ContainerProps {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

export default function Container({ as: Tag = "div", className, children }: ContainerProps) {
  return (
    <Tag className={clsx("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </Tag>
  );
}
