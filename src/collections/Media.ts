import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
  upload: {
    // Was `upload: true` (no processing) — every uploaded file was served at
    // its original resolution with no resized variants. next/image still
    // resizes per-request either way, but it was decoding the full original
    // every time. These sizes cover the breakpoints actually used across the
    // site (marquee/avatar thumbnails, card grids, hero/full-bleed images).
    imageSizes: [
      { name: "thumbnail", width: 400, height: undefined, position: "centre" },
      { name: "card", width: 800, height: undefined, position: "centre" },
      { name: "large", width: 1600, height: undefined, position: "centre" },
    ],
    formatOptions: { format: "webp", options: { quality: 80 } },
  },
};
