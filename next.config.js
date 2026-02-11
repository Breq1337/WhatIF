/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Evita erro UNKNOWN/errno -4094 no Windows: cache em memória em dev em vez de .next/cache
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

module.exports = nextConfig;
