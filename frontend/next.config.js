/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Set basePath if deploying to /repo-name on GitHub Pages
  // basePath: "/subix",
};

module.exports = nextConfig;
