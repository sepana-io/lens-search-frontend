/** @type {import('next').NextConfig} */
const svg = {
  test: /\.svg$/,
  use: ['@svgr/webpack'],
}


// module.exports = nextConfig
module.exports = {
  reactStrictMode: true,
  webpack(config) {
      config.module.rules.push(svg);
      return config;
  }
};
