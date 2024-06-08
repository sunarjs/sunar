import type { GlobOptions } from 'glob';
import { resolve, storeModules } from '..';

export async function load(patterns: string | string[], options?: GlobOptions) {
	const modules = await resolve(patterns, options);

	storeModules(modules);
}
