// ./nextjs-pages/next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.sanity.io',
        },
      ],
    },
    // ...other config settings
  };
  
  module.exports = nextConfig;