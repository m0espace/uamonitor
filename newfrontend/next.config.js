/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5173/:path*',
      },
    ];
  },
  images: {
    domains: ['crafatar.com'],
    loader: ({ src }) => src,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'crafatar.com',
        port: '',
        pathname: '/avatars/**',
      },
    ],
  },
};

module.exports = nextConfig;
