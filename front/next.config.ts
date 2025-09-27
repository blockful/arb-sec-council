import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_PONDER_GRAPHQL_URL: process.env.NEXT_PUBLIC_PONDER_GRAPHQL_URL || 'http://localhost:42069/graphql',
  },
};

export default nextConfig;
