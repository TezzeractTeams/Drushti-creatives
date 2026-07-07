import type { SVGProps } from "react";

/** Sky-blue multi-point burst / star. */
export function Burst(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M50 0c3.2 14.6 6.6 21.7 14.6 27.9C60.9 15.5 62.2 7.6 68.3 0.9 66 15.6 66.4 23.5 72.7 33.4 74.2 20.4 78 13.5 86.6 9.5 78.9 22.2 76.6 29.8 79.1 41 84.9 30.3 90.9 25.9 100 25.6 88.4 35 83.8 41.4 82.8 53.7 92.8 46.4 99.9 44.7 100 50c-14.6 3.2-21.7 6.6-27.9 14.6C84.5 60.9 92.4 62.2 99.1 68.3 84.4 66 76.5 66.4 66.6 72.7 79.6 74.2 86.5 78 90.5 86.6 77.8 78.9 70.2 76.6 59 79.1 69.7 84.9 74.1 90.9 74.4 100 65 88.4 58.6 83.8 46.3 82.8 53.6 92.8 55.3 99.9 50 100c-3.2-14.6-6.6-21.7-14.6-27.9C39.1 84.5 37.8 92.4 31.7 99.1 34 84.4 33.6 76.5 27.3 66.6 25.8 79.6 22 86.5 13.4 90.5 21.1 77.8 23.4 70.2 20.9 59 15.1 69.7 9.1 74.1 0 74.4 11.6 65 16.2 58.6 17.2 46.3 7.2 53.6 0.1 55.3 0 50c14.6-3.2 21.7-6.6 27.9-14.6C15.5 39.1 7.6 37.8 0.9 31.7 15.6 34 23.5 33.6 33.4 27.3 20.4 25.8 13.5 22 9.5 13.4 22.2 21.1 29.8 23.4 41 20.9 30.3 15.1 25.9 9.1 25.6 0 35 11.6 41.4 16.2 53.7 17.2 46.4 7.2 44.7 0.1 50 0Z"
        fill="currentColor"
      />
    </svg>
  );
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

/** Coiled spring/squiggle — used as a playful letter replacement. */
export function Coil(props: SVGProps<SVGSVGElement>) {
  const loops = 7;
  const width = 200;
  const amplitude = 34;
  const midY = 40;
  let d = `M 0 ${midY} `;
  for (let i = 0; i < loops; i++) {
    const x0 = (i / loops) * width;
    const x1 = ((i + 0.5) / loops) * width;
    const x2 = ((i + 1) / loops) * width;
    const dir = i % 2 === 0 ? -1 : 1;
    const y = midY + dir * amplitude;
    d += `C ${x0 + (x1 - x0) * 0.55} ${y}, ${x1 - (x1 - x0) * 0.55} ${y}, ${x1} ${midY} `;
    d += `C ${x1 + (x2 - x1) * 0.55} ${midY - dir * amplitude}, ${x2 - (x2 - x1) * 0.55} ${
      midY - dir * amplitude
    }, ${x2} ${midY} `;
  }
  return (
    <svg viewBox={`0 0 ${width} 80`} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d={d} stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
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
