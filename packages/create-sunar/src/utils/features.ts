import type { Option } from "@clack/prompts";

export const FEATURES = ["biome", "tsdown", "tsx", "prettier", "eslint"] as const;

export const BASE_FEATURES = [
    {
        label: "biome",
        value: "biome",
        hint: "format, lint, and more in a fraction of a second",
    },
    {
        label: "prettier",
        value: "prettier",
        hint: "format your project code",
    },
    {
        label: "eslint",
        value: "eslint",
        hint: "static code analysis tool",
    },
] as const satisfies Option<string>[];

export const JS_FEATURES = [] as const satisfies Option<string>[];

export const TS_FEATURES = [
    {
        label: "tsdown",
        value: "tsdown",
        hint: "fast and minimalist TypeScript bundler",
    },
    {
        label: "tsx",
        value: "tsx",
        hint: "easiest way to run TypeScript in Node.js",
    },
] as const satisfies Option<string>[];
