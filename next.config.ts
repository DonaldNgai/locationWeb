import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@DonaldNgai/next-utils', '@DonaldNgai/chakra-ui'],
  // SWC is the default compiler for Next.js 15 (much faster than webpack)
  // Turbopack is used for dev (via --turbopack flag), SWC handles production builds
  compiler: {
    // Remove console logs in production (optional performance optimization)
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
