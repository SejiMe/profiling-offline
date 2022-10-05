/** @type {import('next').NextConfig} */
const nextConfig = {
  rules: [
    {
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    },
  ],
  eslint: {
    dirs: ['src'],
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
