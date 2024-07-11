/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "cdn.sanity.io",
        },
      ],
    },
    experimental: {
      taint: true,
    },
    // ...other config settings
  };
  
  export default nextConfig;