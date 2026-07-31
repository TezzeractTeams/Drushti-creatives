import type { CollectionConfig } from "payload";

export const Clients: CollectionConfig = {
  slug: "clients",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "slug", "updatedAt"],
  },
  timestamps: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "logoSquare",
      type: "upload",
      relationTo: "media",
      label: "Logo (square)",
      required: true,
    },
    {
      name: "logoFocus",
      type: "upload",
      relationTo: "media",
      label: "Logo (focus crop)",
      required: true,
    },
  ],
};
