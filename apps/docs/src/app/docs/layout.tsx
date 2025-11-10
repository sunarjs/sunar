import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";

import { baseOptions } from "@/app/layout.config";
import { source } from "@/app/source";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <DocsLayout sidebar={{ defaultOpenLevel: 1, collapsible: false }} tree={source.pageTree} {...baseOptions}>
            {children}
        </DocsLayout>
    );
}
