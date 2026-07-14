/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // TeamSection currently hotlinks Unsplash placeholders (TODO: swap for
    // real team photos) — remotePatterns lets next/image optimize them too.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
