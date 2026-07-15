import type { ServiceShowcaseItem } from "@/data/servicesShowcase";

const ICON_PATHS: Record<ServiceShowcaseItem["icon"], React.ReactNode> = {
  marketing: (
    <>
      <rect x="10" y="55" width="14" height="30" rx="2" />
      <rect x="32" y="38" width="14" height="47" rx="2" />
      <rect x="54" y="20" width="14" height="65" rx="2" />
      <path d="M14 45 L58 15" strokeLinecap="round" />
      <path d="M46 15 H60 V29" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  brand: (
    <>
      <circle cx="50" cy="50" r="36" />
      <path d="M50 14 A36 36 0 0 1 78 66" />
      <circle cx="50" cy="50" r="6" fill="currentColor" stroke="none" />
      <path d="M20 78 L30 68" strokeLinecap="round" />
    </>
  ),
  graphic: (
    <>
      <rect x="16" y="16" width="34" height="34" rx="2" />
      <circle cx="67" cy="33" r="17" />
      <path d="M25 84 L45 54 L65 84 Z" />
    </>
  ),
  content: (
    <>
      <rect x="22" y="12" width="56" height="76" rx="4" />
      <path d="M34 30 H66" strokeLinecap="round" />
      <path d="M34 44 H66" strokeLinecap="round" />
      <path d="M34 58 H54" strokeLinecap="round" />
      <path d="M34 72 H60" strokeLinecap="round" />
    </>
  ),
  video: (
    <>
      <rect x="12" y="26" width="52" height="48" rx="4" />
      <path d="M64 40 L88 26 V74 L64 60 Z" strokeLinejoin="round" />
      <path d="M34 40 L46 50 L34 60 Z" strokeLinejoin="round" />
    </>
  ),
  web: (
    <>
      <rect x="12" y="18" width="76" height="58" rx="4" />
      <path d="M12 32 H88" />
      <circle cx="21" cy="25" r="2" fill="currentColor" stroke="none" />
      <circle cx="29" cy="25" r="2" fill="currentColor" stroke="none" />
      <circle cx="37" cy="25" r="2" fill="currentColor" stroke="none" />
      <path d="M26 46 H50" strokeLinecap="round" />
      <path d="M26 58 H60" strokeLinecap="round" />
      <path d="M26 68 H44" strokeLinecap="round" />
    </>
  ),
};

/** Simple outlined line-art icon per service — traced from the reference's
 *  monochrome wireframe illustrations, built as plain SVG rather than
 *  fabricated photographic/AI art. */
export default function ServiceIcon({
  icon,
  className,
}: {
  icon: ServiceShowcaseItem["icon"];
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      className={className}
    >
      {ICON_PATHS[icon]}
    </svg>
  );
}
