/** @type {import('next').NextConfig} */
const isProdBuild = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export only for production build (GitHub Pages).
  // Dev keeps API routes for local proxy (pages/api/[...path].ts).
  ...(isProdBuild ? { output: "export" } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/Subix",
};

module.exports = nextConfig;
