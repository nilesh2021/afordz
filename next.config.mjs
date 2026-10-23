/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/api/downloads/[productId]": ["./private/downloads/**"],
    "/checkout/success": ["./private/downloads/**"],
  },
  async redirects() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "afordz.in" }],
        destination: "https://www.afordz.in/",
        permanent: true,
      },
      {
        source: "/:path+",
        has: [{ type: "host", value: "afordz.in" }],
        destination: "https://www.afordz.in/:path+",
        permanent: true,
      },
      {
        source: "/training",
        destination: "/courses",
        permanent: true,
      },
      {
        source: "/training/:path*",
        destination: "/courses/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
