import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dvtbbuxon/**",
      },
      {
        protocol: "https",
        hostname: "www.gstatic.com",
      },
    ],
  },
  headers: async () => [
    {
      // Block crawlers on the admin subdomain
      source: "/:path*",
      has: [{ type: "host", value: "admin.kellyvillebarber.com.au" }],
      headers: [
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
      ],
    },
  ],
};

export default nextConfig;
