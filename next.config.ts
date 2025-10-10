import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Ignora erros do ESLint durante o build de produção
    ignoreDuringBuilds: true,
  },
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