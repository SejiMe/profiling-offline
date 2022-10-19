/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    return config;
  },
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
