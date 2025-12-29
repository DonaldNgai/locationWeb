import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@DonaldNgai/next-utils', '@DonaldNgai/chakra-ui'],
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
