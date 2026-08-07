import type { CollectionConfig } from "payload";

function slugifyTagName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export const Tags: CollectionConfig = {
  slug: "tags",
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
      unique: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "Auto-generated from the tag name if left blank.",
      },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data?.name && !data.slug) {
          data.slug = slugifyTagName(data.name);
        }
        return data;
      },
    ],
  },
};
