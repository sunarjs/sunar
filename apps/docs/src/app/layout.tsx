import "@/app/global.css";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";

import { Provider } from "@/app/provider";

import { cn } from "@/utils/cn";
import { baseUrl, createMetadata } from "@/utils/metadata";

export const metadata = createMetadata({
    title: {
        template: "%s | Sunar",
        default: "Sunar",
    },
    description: "The discord.js framework for building discord bots.",
    metadataBase: baseUrl,
});

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" className={cn(GeistSans.className, GeistMono.className)} suppressHydrationWarning>
            <body className="relative flex min-h-screen flex-col">
                <Provider>{children}</Provider>
                <Analytics />
            </body>
        </html>
    );
}
