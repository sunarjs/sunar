import { remarkNpm } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";
import { z } from "zod";

const sources = ["github-sunar", "discord.js", "discord-api"] as const;

export type ReferenceSource = (typeof sources)[number];

const sourceBaseUrls: Record<ReferenceSource, string> = {
    "github-sunar": "https://github.com/sunarjs/sunar/blob/main/packages/sunar",
    "discord.js": "https://discord.js.org/docs/packages/discord.js/main",
    "discord-api": "https://discord.com/developers/docs",
};

const referenceSchema = z
    .object({
        source: z.enum(sources),
        title: z.string(),
        path: z.string(),
    })
    .transform((input) => ({
        ...input,
        url: `${sourceBaseUrls[input.source]}${input.path}`,
    }));

export type Reference = z.infer<typeof referenceSchema>;

export const docs = defineDocs({
    dir: "content/docs",
    docs: {
        schema: frontmatterSchema.extend({
            index: z.boolean().default(false),
            references: z.array(referenceSchema).optional(),
        }),
        postprocess: {
            includeProcessedMarkdown: true,
        },
    },
    meta: {
        schema: metaSchema,
    },
});

export default defineConfig({
    lastModifiedTime: "git",
    mdxOptions: {
        remarkPlugins: [remarkNpm],
        rehypeCodeOptions: {
            themes: {
                light: "min-light",
                dark: "catppuccin-mocha",
            },
        },
        remarkNpmOptions: {
            persist: { id: "package-manager" },
        },
    },
});
