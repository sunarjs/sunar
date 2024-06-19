import type { GlobOptions } from 'glob';
import { resolve, storeModules } from '..';

/**
 * Resolve and store all the sunar modules.
 *
 * @param patterns The glob patterns to load
 * @param options The glob options
 *
 * @see https://sunar.js.org/docs/guides/load-modules
 */
export async function load(patterns: string | string[], options?: GlobOptions): Promise<void> {
	const modules = await resolve(patterns, options);

	storeModules(modules);
}
