import { withPayload } from "@payloadcms/next/withPayload";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
    localPatterns: [
      { pathname: "/api/media/file/**" },
      { pathname: "/work/**" },
      { pathname: "/clients/**" },
      { pathname: "/services/**" },
      { pathname: "/art/**" },
      { pathname: "/images/**" },
      { pathname: "/why we exist/**" },
      // Root-level public assets (icons, articles, team photos, etc.)
      { pathname: "/**" },
    ],
  },
  serverExternalPackages: ["jose"],
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      ".cjs": [".cts", ".cjs"],
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".mjs": [".mts", ".mjs"],
    };

    return webpackConfig;
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

export default withPayload(nextConfig, { devBundleServerPackages: true });

if (process.env.NODE_ENV !== "production") {
  initOpenNextCloudflareForDev();
}
