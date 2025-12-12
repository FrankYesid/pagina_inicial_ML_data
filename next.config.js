/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress hydration warnings
  reactStrictMode: true,
  
  // Configure allowed origins for development
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react'],
  },
  
  // Configure headers to prevent extension interference
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        {
          key: 'Access-Control-Allow-Origin',
          value: '*',
        },
        {
          key: 'Access-Control-Allow-Methods',
          value: 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
        },
        {
          key: 'Access-Control-Allow-Headers',
          value: 'Content-Type, Authorization, X-Requested-With, Accept, Origin',
        },
        {
          key: 'Access-Control-Allow-Credentials',
          value: 'true',
        },
        {
          key: 'Access-Control-Max-Age',
          value: '86400',
        },
      ],
    },
  ],
  
  // Configure webpack to handle extension interference
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default nextConfig;