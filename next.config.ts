import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'registry.npmmirror.com',
        port: '',
        pathname: '/@lobehub/icons-static-png/latest/files/light/**',
      },
    ],
  },
};

export default nextConfig;
