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
      {
        protocol: 'https',
        hostname: 'images.tcdn.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // API routes - permite CORS
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: process.env.NODE_ENV === 'production'
              ? process.env.ALLOWED_ORIGIN || 'https://yourdomain.com'
              : '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization, X-Requested-With',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Max-Age',
            value: '86400', // 24 hours
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          // Protege contra clickjacking
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // Protege contra MIME type sniffing
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Controla informações do referrer
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Restringe permissões de APIs
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          // Content Security Policy (CSP) - proteção contra XSS
          {
            key: 'Content-Security-Policy',
            value: process.env.NODE_ENV === 'development'
              ? [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                  "style-src 'self' 'unsafe-inline'",
                  "img-src 'self' data: https:",
                  "font-src 'self' data:",
                  "connect-src 'self' https://yyvjzgxyxgalnnwcjfqh.supabase.co ws://localhost:* http://localhost:*",
                  "frame-ancestors 'self'",
                ].join('; ')
              : [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
                  "style-src 'self' 'unsafe-inline'",
                  "img-src 'self' data: https:",
                  "font-src 'self' data:",
                  "connect-src 'self' https://yyvjzgxyxgalnnwcjfqh.supabase.co",
                  "frame-ancestors 'none'",
                ].join('; '),
          },
          // Força HTTPS em produção
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
};

export default nextConfig;