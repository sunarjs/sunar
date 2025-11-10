import type { Dependency, Features, Language } from "../types";
import { DEPENDENCIES } from "../utils/dependencies";

interface PackageDependencies {
    dependencies: Record<Dependency, string>;
    devDependencies?: Record<Dependency, string>;
}

export function getDependencies(language: Language, features: Features): PackageDependencies {
    const deps: Dependency[] = ["sunar", "discord.js", "dotenv"];
    const devDeps: Dependency[] = [];

    if (features.eslint) devDeps.push("eslint");

    if (language === "typescript") {
        devDeps.push("@types/node", "typescript");
        if (features.tsx) devDeps.push("tsx");
        if (features.tsdown) devDeps.push("tsdown");
        if (features.eslint) devDeps.push("typescript-eslint");
    }

    if (features.biome) devDeps.push("@biomejs/biome");
    if (features.prettier) devDeps.push("prettier");

    const depsEntries = deps.map((dep) => [dep, DEPENDENCIES[dep]]);
    const devDepsEntries = devDeps.map((dep) => [dep, DEPENDENCIES[dep]]);

    depsEntries.sort();
    devDepsEntries.sort();

    const dependencies = Object.fromEntries(depsEntries);
    const devDependencies = Object.fromEntries(devDepsEntries);

    const devDepsLength = devDepsEntries.length;

    return {
        dependencies,
        devDependencies: devDepsLength > 0 ? devDependencies : undefined,
    };
}
