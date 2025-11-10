export const SCRIPTS = {
    START: {
        NODE: "node src/index.js",
        NODE_DIST: "node dist/index.js",
    },
    DEV: {
        JS_NODE: "node --watch src/index.js",
        TS_NODE: "node --watch src/index.ts",
        TSX: "tsx watch src/index.ts",
    },
    BUILD: {
        TSDOWN: "tsdown",
        TSC: "tsc",
    },
    FORMAT: {
        BIOME: "biome format --write .",
        PRETTIER: "prettier --write .",
    },
    LINT: {
        BIOME: "biome lint ./src",
        JS_ESLINT: "eslint .",
        TS_ESLINT: "eslint .",
        TSC: "tsc --noEmit",
    },
} as const;
