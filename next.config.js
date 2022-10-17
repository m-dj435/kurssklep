/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["fakestoreapi.com", "picsum.photos"],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
