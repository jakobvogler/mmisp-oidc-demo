/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
  },
}

export default nextConfig
