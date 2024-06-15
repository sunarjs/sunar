import { join } from 'node:path';

import { type GlobOptions, glob } from 'glob';

export async function resolve(patterns: string | string[], options: GlobOptions = {}) {
	const paths = await glob(patterns, options);

	const imports = paths.map((path) => {
		const absolute = join(process.cwd(), path.toString());
		return import(`file://${absolute}`);
	});

	return Promise.all(imports);
}
