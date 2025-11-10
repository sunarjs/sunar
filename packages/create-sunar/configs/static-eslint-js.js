import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig({
    files: ["**/*.js"],
    ignores: ["node_modules/**", "dist/**", ".turbo/**"],
    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    extends: [js.configs.recommended],
    rules: {
        "no-unused-vars": "warn",
        "no-undef": "warn",
    },
});
