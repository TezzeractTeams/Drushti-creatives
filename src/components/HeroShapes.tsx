import type { SVGProps } from "react";
import Image, { type ImageProps } from "next/image";

const BLAST_ICON_SRC = "/blast-icon.png";

/** Orange multi-point burst / star.
 *  Note: every call site is ~16px (h-4 w-4) — next/image lets the
 *  optimizer downscale the 580x600 source instead of shipping it full-res. */
export function Burst(props: Omit<ImageProps, "src" | "alt" | "width" | "height"> & { alt?: string }) {
  const { alt = "", ...rest } = props;
  return <Image src={BLAST_ICON_SRC} alt={alt} width={64} height={66} {...rest} />;
}

/** Solid circle. */
export function Circle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <circle cx="50" cy="50" r="50" fill="currentColor" />
    </svg>
  );
}

/** Yellow spiky sun / cog-star. */
export function Spike(props: SVGProps<SVGSVGElement>) {
  const points = 12;
  const outer = 50;
  const inner = 30;
  const cx = 50;
  const cy = 50;
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  d += "Z";
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d={d} fill="currentColor" />
    </svg>
  );
}

/** Half-circle (flat side down). */
export function HalfCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M0 50a50 50 0 0 1 100 0Z" fill="currentColor" />
    </svg>
  );
}

/** Continuous coiled spring using a prolate trochoid parametric equation.
 *  This creates smooth, self-intersecting loops like cursive 'l's or a spring.
 *  Short flat leads on both ends connect it seamlessly to surrounding text. */
export function Coil(props: SVGProps<SVGSVGElement>) {
  const loops = 10;
  const radiusY = 45; 
  const radiusX = 25; 
  const speed = 9.5; 
  const leadLength = 14; 
  const pointsPerLoop = 60; 
  const margin = 10;

  const baseline = radiusY * 2 + margin;
  const height = baseline + margin;
  
  let d = `M 0 ${baseline} L ${leadLength} ${baseline} `;
  
  const segments = loops * pointsPerLoop;
  for (let i = 0; i <= segments; i++) {
    const u = (i / segments) * (loops * 2 * Math.PI);
    const x = leadLength + speed * u + radiusX * Math.sin(u);
    const y = radiusY * Math.cos(u) + radiusY + margin;
    d += `L ${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  
  const endX = leadLength + speed * (loops * 2 * Math.PI);
  const totalWidth = endX + leadLength;
  d += `L ${totalWidth.toFixed(2)} ${baseline}`;

  return (
    <svg
      viewBox={`0 0 ${totalWidth.toFixed(2)} ${height.toFixed(2)}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d={d} stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Scalloped blob (cloud/flower cutout), used for the badge-style CTA. */
export function ScallopBadge(props: SVGProps<SVGSVGElement>) {
  const lobes = 9;
  const segments = 120;
  const outer = 44;
  const inner = 36;
  const cx = 50;
  const cy = 50;
  let d = "";
  for (let i = 0; i <= segments; i++) {
    const t = (i / segments) * Math.PI * 2;
    const r = (outer + inner) / 2 + ((outer - inner) / 2) * Math.cos(lobes * t);
    const x = cx + r * Math.cos(t);
    const y = cy + r * Math.sin(t);
    d += `${i === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)} `;
  }
  d += "Z";
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d={d} fill="currentColor" />
    </svg>
  );
}
