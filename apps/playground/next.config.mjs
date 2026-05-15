/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@malayalamlang/core'],
  webpack: (config) => {
    config.resolve.extensionAlias = {
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
    };
    return config;
  },
};

export default nextConfig;
