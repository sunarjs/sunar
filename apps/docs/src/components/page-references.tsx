"use client";

import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "fumadocs-ui/components/ui/popover";
import { BookOpenIcon, ChevronDown, ExternalLinkIcon } from "lucide-react";
import type { Reference, ReferenceSource } from "source.config";

import { DiscordIcon, DiscordJSIcon, GitHubIcon } from "@/icons";
import { cn } from "@/utils/cn";

interface Params {
    data?: Reference[];
}

const sourceIcons: Record<ReferenceSource, React.ReactNode> = {
    "github-sunar": <GitHubIcon />,
    "discord.js": <DiscordJSIcon className="text-fd-background dark:text-fd-foreground" />,
    "discord-api": <DiscordIcon className="text-fd-background dark:text-fd-foreground" />,
};

export function PageReferences({ data }: Params) {
    if (!data) return null;

    return (
        <Popover>
            <PopoverTrigger
                className={cn(
                    buttonVariants({
                        color: "secondary",
                        size: "sm",
                        className: "gap-2 [&_svg]:size-3.5 [&_svg]:text-fd-muted-foreground",
                    }),
                )}
            >
                <BookOpenIcon />
                References
                <ChevronDown className="size-3.5 text-fd-muted-foreground" />
            </PopoverTrigger>
            <PopoverContent className="flex flex-col overflow-auto">
                {data.map((item) => (
                    <a
                        key={item.url}
                        href={item.url}
                        rel="noreferrer noopener"
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-lg p-2 text-sm hover:bg-fd-accent hover:text-fd-accent-foreground [&_svg]:size-4"
                    >
                        {sourceIcons[item.source]}
                        <span className="pr-8">{item.title}</span>
                        <ExternalLinkIcon className="ms-auto size-3.5 text-fd-muted-foreground" />
                    </a>
                ))}
            </PopoverContent>
        </Popover>
    );
}
