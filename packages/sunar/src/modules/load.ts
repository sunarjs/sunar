import type { GlobOptionsWithoutFileTypes } from "node:fs";

import { resolve, storeModules } from "~/modules";

/**
 * Resolves and stores all Sunar modules matching the given patterns.
 * This function scans for module files and automatically registers any builders found within them.
 *
 * @param {string|string[]} patterns - Glob pattern(s) to match module files. Supports any pattern accepted by tinyglobby.
 * @param {GlobOptions} [options] - Optional configuration for tinyglobby (cwd, filesOnly, dot, etc.).
 *
 * @returns {Promise<void>} A promise that resolves when all modules have been loaded and stored.
 *
 * @example
 * ```typescript
 * // Load all commands from the commands directory
 * await load('src/commands/**\/*.ts');
 *
 * // Load with custom options
 * await load(['src/commands/**\/*.ts', 'src/events/**\/*.ts'], {
 *   cwd: process.cwd(),
 *   filesOnly: true
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/guides/load-modules} for module loading guide
 */
export async function load(patterns: string | string[], options?: GlobOptionsWithoutFileTypes): Promise<void> {
    const modules = await resolve(patterns, options);

    storeModules(modules);
}
