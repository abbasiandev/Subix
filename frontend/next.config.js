/** @type {import('next').NextConfig} */
const isGhPages = process.env.DEPLOY_TARGET === 'gh-pages';
const basePath = isGhPages ? '/Subix' : (process.env.NEXT_PUBLIC_BASE_PATH || '');

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
