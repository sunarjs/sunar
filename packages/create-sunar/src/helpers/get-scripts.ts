import type { Features, Language } from "../types";
import { SCRIPTS } from "../utils/scripts";

export function getScripts(language: Language, features: Features) {
    return {
        start: start(language, features),
        dev: dev(language, features),
        build: build(language, features),
        lint: lint(language, features),
        format: format(features),
    };
}

function start(language: Language, features: Features): string {
    if (language === "typescript" || features.tsdown) {
        return SCRIPTS.START.NODE_DIST;
    }

    return SCRIPTS.START.NODE;
}

function dev(language: Language, features: Features): string | undefined {
    if (features.tsx) return SCRIPTS.DEV.TSX;
    return language === "typescript" ? SCRIPTS.DEV.TS_NODE : SCRIPTS.DEV.JS_NODE;
}

function build(language: Language, features: Features): string | undefined {
    if (language === "javascript") return;
    if (features.tsdown) return SCRIPTS.BUILD.TSDOWN;
    return SCRIPTS.BUILD.TSC;
}

function lint(language: Language, features: Features): string | undefined {
    if (features.biome) return SCRIPTS.LINT.BIOME;

    const isTS = language === "typescript";

    if (features.eslint) {
        if (isTS) return SCRIPTS.LINT.TS_ESLINT;
        return SCRIPTS.LINT.JS_ESLINT;
    }

    if (isTS) return SCRIPTS.LINT.TSC;
}

function format(features: Features): string | undefined {
    if (features.biome) return SCRIPTS.FORMAT.BIOME;
    if (features.prettier) return SCRIPTS.FORMAT.PRETTIER;
}
