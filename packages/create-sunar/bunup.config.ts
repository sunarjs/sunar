import { defineConfig } from "bunup";
import { version } from "./package.json";

export default defineConfig({
    format: "esm",
    target: "node",
    entry: "src/index.ts",
    minify: true,
    dts: false,
    clean: true,
    sourcemap: false,
    define: {
        "process.env.PACKAGE_VERSION": JSON.stringify(version),
    },
});
