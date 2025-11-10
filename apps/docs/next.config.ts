import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const config: NextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "discord.com",
                pathname: "/assets/**",
            },
        ],
    },
    // biome-ignore lint/suspicious/useAwait: Must be async
    async rewrites() {
        return [
            {
                source: "/docs/:path*.mdx",
                destination: "/llms.mdx/:path*",
            },
        ];
    },
};

const withMDX = createMDX();

export default withMDX(config);
