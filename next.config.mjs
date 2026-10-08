/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/downloads/[productId]": ["./private/downloads/**"],
    "/checkout/success": ["./private/downloads/**"],
  },
};

export default nextConfig;
