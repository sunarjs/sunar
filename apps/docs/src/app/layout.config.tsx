import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

import { Logo } from "@/components/logo";

export const baseOptions: BaseLayoutProps = {
    githubUrl: "https://github.com/sunarjs/sunar",
    nav: {
        title: <Logo className="size-6" />,
        transparentMode: "top",
    },
};
