import nextPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    remotePatterns: [
      {
        hostname: "media.graphassets.com",
      },
    ],
  },
};

const withPWA = nextPWA({
  dest: "public",
  mode: "production",
  disable: process.env.NODE_ENV === "development",
});

export default withPWA(nextConfig);
