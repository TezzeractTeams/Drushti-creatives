// Work shown in the "Our Work" section on each single-service page
// (src/app/services/[id]/page.tsx) — keyed by the same service id used in
// SERVICES_DATA there (marketing/brand/web/video/graphic). Each service gets
// its own distinct set of cards rather than reusing the same global project
// list. An empty array just hides the section.

export interface WorkItem {
  name: string;
  client: string;
  image: string;
  tags: string[];
  /** Case-study page for this piece of work, if it has one. */
  href: string;
}

// TEMPORARY: placeholder cards cycling through existing site imagery, until
// real per-service work (title, client, image, tags, link) is supplied —
// swap these out item by item, no need to touch OurWork.tsx.
const PLACEHOLDER_IMAGES = [
  "/work/advantis.webp",
  "/work/norlanka.webp",
  "/work/softlogic.webp",
  "/work/ginger-fresh.webp",
  "/work/fairfirst.webp",
  "/images/sub-services/content-front.png",
  "/images/sub-services/brand-front.png",
  "/images/sub-services/web-front.jpg",
  "/images/sub-services/innovative.png",
  "/images/sub-services/landscape-front.jpg",
];

function placeholderWork(serviceLabel: string, offset: number): WorkItem[] {
  return Array.from({ length: 9 }, (_, i) => ({
    name: `${serviceLabel} Project ${i + 1}`,
    client: "Placeholder Client",
    image: PLACEHOLDER_IMAGES[(offset + i) % PLACEHOLDER_IMAGES.length],
    tags: ["Placeholder"],
    href: "#",
  }));
}

export const SERVICE_WORK: Record<string, WorkItem[]> = {
  marketing: placeholderWork("Digital Marketing", 0),
  brand: placeholderWork("Brand Identity", 2),
  web: placeholderWork("Web Design", 4),
  video: placeholderWork("Video Production", 6),
  graphic: placeholderWork("Graphic Design", 8),
};
