"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

type Tag = "div" | "section" | "ul" | "li" | "span" | "article";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  as?: Tag;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

/** Fades and slides a single element in as it enters the viewport. */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  y = 32,
  once = true,
  amount = 0.3,
  as = "div",
}: ScrollRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: easeOut },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

interface ScrollRevealGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
  amount?: number;
  as?: Tag;
}

/** Wraps ScrollRevealItem children and reveals them one after another. */
export function ScrollRevealGroup({
  children,
  className,
  stagger = 0.12,
  once = true,
  amount = 0.3,
  as = "div",
}: ScrollRevealGroupProps) {
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

interface ScrollRevealItemProps {
  children: ReactNode;
  className?: string;
  y?: number;
  as?: Tag;
}

/** A single staggered child of ScrollRevealGroup. */
export function ScrollRevealItem({ children, className, y = 32, as = "div" }: ScrollRevealItemProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}

export default ScrollReveal;
