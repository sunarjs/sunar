import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import ts from "typescript-eslint";

export default defineConfig({
    files: ["**/*.{js,ts}"],
    ignores: ["node_modules/**", "dist/**", ".turbo/**"],

    languageOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },

    extends: [js.configs.recommended, ...ts.configs.recommended],

    rules: {
        "no-unused-vars": "warn",
        "no-undef": "warn",
        "@typescript-eslint/no-unused-vars": [
            "warn",
            { argsIgnorePattern: "^_" },
        ],
    },
});
