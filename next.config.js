/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
      },
      {
        protocol: "https",
        hostname: "eagle-sensors.com"
      },
      {
        protocol: "https",
        hostname: "bitslog.files.wordpress.com"
      }
    ],
  },
};

module.exports = nextConfig;
