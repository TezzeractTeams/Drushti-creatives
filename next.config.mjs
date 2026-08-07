import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 85, 90],
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
  async redirects() {
    return [
      // Only redirect portfolio slugs — skip static assets in public/work/
      // (e.g. drushtiwhitecopy-trimmed.png) which include a file extension.
      {
        source: "/work/:slug((?!.*\\.).+)",
        destination: "/portfolio/:slug",
        permanent: true,
      },
    ];
  },
};

export default withPayload(nextConfig);
