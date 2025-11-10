import { HomeLayout as Layout } from "fumadocs-ui/layouts/home";
import type { ReactNode } from "react";

import { baseOptions } from "@/app/layout.config";

export default function HomeLayout({ children }: { children: ReactNode }): React.ReactElement {
    return (
        <div className="container max-w-6xl">
            <Layout {...baseOptions} style={{ "--spacing-fd-container": "var(--container-6xl)" } as object}>
                {children}
                <Footer />
            </Layout>
        </div>
    );
}

function Footer(): React.ReactElement {
    return (
        <footer className="py-12 text-fd-secondary-foreground">
            <div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-1 font-semibold text-lg">Sunar</p>
                    <p className="text-muted-foreground">
                        Built with love by{" "}
                        <a
                            href="https://github.com/ussego"
                            rel="noreferrer noopener"
                            target="_blank"
                            className="font-medium transition-colors hover:text-foreground"
                        >
                            ussego ↗
                        </a>
                    </p>
                </div>
                <a
                    href="https://github.com/sunarjs/sunar/blob/main/LICENSE.md"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    MIT License ↗
                </a>
            </div>
        </footer>
    );
}
