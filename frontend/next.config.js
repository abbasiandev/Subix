/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/Subix' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/Subix' : '',
  reactStrictMode: true,
  swcMinify: true,
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  images: { unoptimized: true },
  compress: true,
  // Keep Next's default async chunk splitting so Three.js stays lazy-loaded.
  // Static exports cannot apply server-side response headers.
};

module.exports = nextConfig;
