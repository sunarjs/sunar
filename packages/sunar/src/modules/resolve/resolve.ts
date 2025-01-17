import { join } from "node:path";

import { type GlobOptions, glob } from "glob";

/**
 * Import all files that match the patterns.
 * @param patterns The glob patterns to resolve
 * @param options The glob options
 */
export async function resolve(patterns: string | string[], options: GlobOptions = {}): Promise<any[]> {
    const paths = await glob(patterns, options);

    const imports = paths.map((path) => {
        const absolute = join(process.cwd(), path.toString());
        return import(`file://${absolute}`);
    });

    return Promise.all(imports);
}
