import type { CollectionConfig } from "payload";

import { SERVICE_CATEGORIES } from "@/lib/content/types";

export const Portfolio: CollectionConfig = {
  slug: "portfolio",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "client", "serviceCategory", "featuredOnHomepage", "updatedAt"],
  },
  timestamps: true,
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "client",
      type: "relationship",
      relationTo: "clients",
      required: true,
    },
    { name: "description", type: "textarea", required: true },
    {
      name: "serviceCategory",
      type: "select",
      required: true,
      options: SERVICE_CATEGORIES.map((value) => ({ label: value, value })),
    },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "tag", type: "text", required: true }],
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "images",
      type: "array",
      label: "Gallery images",
      fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
    },
    {
      type: "row",
      fields: [
        { name: "featuredOnHero", type: "checkbox", label: "Featured on hero", defaultValue: false },
        { name: "featuredOnHomepage", type: "checkbox", label: "Featured on homepage", defaultValue: false },
      ],
    },
    { name: "challenge", type: "textarea", required: true },
    {
      name: "strategy",
      type: "group",
      fields: [
        { name: "intro", type: "textarea" },
        {
          name: "points",
          type: "array",
          fields: [
            { name: "title", type: "text", required: true },
            { name: "text", type: "textarea", required: true },
          ],
        },
      ],
    },
    {
      name: "results",
      type: "array",
      required: true,
      fields: [
        { name: "metric", type: "text" },
        { name: "text", type: "text", required: true },
      ],
    },
  ],
};
