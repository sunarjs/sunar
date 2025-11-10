import versionInjector from 'rollup-plugin-version-injector';
import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["src/**/*.ts", "!src/**/*.{spec,test}.ts", "!src/test/**/*.ts"],
    format: "esm",
    clean: true,
    dts: true,
    treeshake: true,
    target: "es2022",
    unbundle: true,
    skipNodeModulesBundle: true,
    plugins: [versionInjector() as any],
    ignoreWatch: ["**/node_modules/**", "**/.git/**"],
});
