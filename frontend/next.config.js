/** @type {import('next').NextConfig} */
// Fluxo is served from the root of its custom domain. A base path remains
// configurable for preview deployments without leaking the old GitHub Pages path.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath,
  assetPrefix: basePath,
  reactStrictMode: true,
  swcMinify: true,
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },
  images: { unoptimized: true },
  compress: true,
  // Keep Next's default async chunk splitting so Three.js stays lazy-loaded.
  // Static exports cannot apply server-side response headers.
};

module.exports = nextConfig;
