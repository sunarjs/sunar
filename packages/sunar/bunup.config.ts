import { type BunupPlugin, defineConfig } from "bunup";

import { version } from "./package.json";

const fixDiscordImports: BunupPlugin = {
    name: "fix-discord-imports",
    hooks: {
        async onBuildDone({ files }) {
            const declarationFiles = files.filter((file) => file.pathRelativeToRootDir.endsWith(".d.ts"));
            for (const filePath of declarationFiles) {
                const file = Bun.file(filePath.pathRelativeToRootDir);
                const content = await file.text();
                const updatedContent = content.replace(/from\s+(['"])discord\1/g, "from $1discord.js$1");
                await Bun.write(filePath.pathRelativeToRootDir, updatedContent);
            }
        },
    },
};

export default defineConfig({
    entry: [
        "src/index.ts",
        "src/client.ts",
        "src/symbols.ts",
        "src/handlers/index.ts",
        "src/utils/index.ts",
        "src/stores/index.ts",
        "src/registry/index.ts",
        "src/builders/index.ts",
        "!src/test/**/*",
        "!**/*.{spec,test}.ts",
    ],
    format: "esm",
    target: "node",
    minify: false,
    clean: true,
    dts: true,
    exports: true,
    plugins: [fixDiscordImports],
    define: { "process.env.PACKAGE_VERSION": JSON.stringify(version) },
});
