/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "f003.backblazeb2.com",
      },
      {
        protocol: "https",
        hostname: "ca.slack-edge.com",
      },
    ],
  },
};

module.exports = nextConfig;
