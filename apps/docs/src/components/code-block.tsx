import { CodeBlock as BaseCodeBlock, type CodeBlockProps as BaseCodeBlockProps, Pre } from "fumadocs-ui/components/codeblock";
import { type Jsx, toJsxRuntime } from "hast-util-to-jsx-runtime";
import { Fragment, type HTMLAttributes } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { type BundledLanguage, codeToHast, type LanguageInput, type SpecialLanguage, type StringLiteralUnion } from "shiki";

import { cn } from "@/utils/cn";

const langs = ["js"] satisfies (LanguageInput | SpecialLanguage | StringLiteralUnion<BundledLanguage, string>)[];

export type CodeBlockLanguage = (typeof langs)[number];

export type CodeBlockProps = HTMLAttributes<HTMLPreElement> & {
    code: string;
    wrapper?: BaseCodeBlockProps;
    lang: CodeBlockLanguage;
};

export async function CodeBlock({ code, lang, wrapper }: CodeBlockProps) {
    const hast = await codeToHast(code, {
        lang,
        defaultColor: false,
        themes: {
            light: "min-light",
            dark: "catppuccin-mocha",
        },
    });

    const rendered = toJsxRuntime(hast, {
        jsx: jsx as Jsx,
        jsxs: jsxs as Jsx,
        Fragment,
        development: false,
        components: {
            pre: Pre,
        },
    });

    return (
        <BaseCodeBlock allowCopy={false} {...wrapper} className={cn("m-0 bg-fd-muted/50", wrapper?.className)}>
            {rendered}
        </BaseCodeBlock>
    );
}

interface PrettyCodeBlockOptions extends CodeBlockProps {
    background: React.ReactNode;
    container?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}

export function PrettyCodeBlock({ background, container, ...props }: PrettyCodeBlockOptions) {
    return (
        <div
            {...container}
            className={cn(
                "relative flex h-80 overflow-hidden rounded-lg sm:w-full xl:w-[593px] [&>div>canvas]:hidden [&>div>canvas]:sm:block",
                container?.className,
            )}
        >
            {background}
            <CodeBlock
                {...props}
                wrapper={{
                    allowCopy: false,
                    className:
                        "bg-fd-muted/50 dark:bg-fd-muted/60 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 m-auto w-11/12 backdrop-blur-xl border-none",
                    ...props.wrapper,
                }}
            />
        </div>
    );
}
