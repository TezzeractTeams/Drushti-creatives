import type { CollectionConfig } from "payload";

export const Team: CollectionConfig = {
  slug: "team",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "designation", "sortOrder"],
  },
  timestamps: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "designation",
      type: "text",
      required: true,
    },
    {
      name: "photo",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "sortOrder",
      type: "number",
      defaultValue: 0,
      admin: {
        description: "Lower numbers appear first in the team section.",
      },
    },
  ],
};
