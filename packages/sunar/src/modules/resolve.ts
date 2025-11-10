import type { GlobOptionsWithoutFileTypes } from "node:fs";
import { glob } from "node:fs/promises";
import { join } from "node:path";

/**
 * Imports all files that match the given patterns using dynamic imports.
 *
 * @param {string|string[]} patterns - Glob patterns to match module files.
 *  Supports any pattern accepted by tinyglobby.
 * @param {GlobOptions} options - Optional. Additional options for tinyglobby like cwd, dot, etc.
 *  See: https://www.npmjs.com/package/tiny-glob#options
 *
 * @returns {Promise<unknown[]>} A promise that resolves when modules have been imported.
 */
export async function resolve(patterns: string | string[], options: GlobOptionsWithoutFileTypes = {}): Promise<unknown[]> {
    const resolvedImports = [];

    for await (const path of glob(patterns, options)) {
        const absolute = join(process.cwd(), path);
        resolvedImports.push(import(`file://${absolute}`));
    }

    return Promise.all(resolvedImports);
}
