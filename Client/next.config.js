/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrite() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ];
  },
  future: { webpack5: true },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  images: { domains: ['firebasestorage.googleapis.com'] },
  eslint: {
    dirs: ['src'],
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
