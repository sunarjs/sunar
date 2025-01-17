import { defineConfig } from "tsup";

import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions";
import { esbuildPluginVersionInjector } from "esbuild-plugin-version-injector";

export default defineConfig({
    entry: ["src/**/*.ts", "!src/**/*.spec.ts", "!src/vitest/**/*.ts"],
    format: ["cjs", "esm"],
    clean: true,
    dts: true,
    treeshake: true,
    target: "es2022",
    bundle: true,
    sourcemap: true,
    keepNames: true,
    skipNodeModulesBundle: true,
    esbuildPlugins: [
        esbuildPluginVersionInjector(),
        esbuildPluginFilePathExtensions({ esmExtension: "js", cjsExtension: "cjs" }),
    ],
    ignoreWatch: ["**/node_modules/**", "**/.git/**"],
});
