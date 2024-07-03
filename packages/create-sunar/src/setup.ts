import { execSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

import { cancel } from '@clack/prompts';
import fs from 'fs-extra';

import { getDependencies } from './helpers/get-dependencies';
import { getFeatures } from './helpers/get-features';
import { getScripts } from './helpers/get-scripts';
import { isEmptyDir } from './helpers/is-empty-dir';
import { isWriteable } from './helpers/is-writeable';

import { setupFeatures } from './helpers/setup-features';
import type { Feature, Language } from './types';

interface SetupOptions {
	path: string;
	language: Language;
	allowedFeatures: Feature[];
}

export async function setup({ path, language, allowedFeatures }: SetupOptions) {
	const writeable = await isWriteable(dirname(path));

	if (!writeable) {
		cancel('The bot path is not writable, check directory permissions and try again');
		process.exit(1);
	}

	const name = basename(path);

	mkdirSync(path, { recursive: true });
	if (!isEmptyDir(path, name)) process.exit(1);

	process.chdir(path);

	execSync('npm init -y');

	const packageJsonPath = join(path, 'package.json');
	const packageJson = await fs.readJSON(packageJsonPath);

	const features = getFeatures(allowedFeatures);

	const { dependencies, devDependencies } = getDependencies(language, features);

	Object.assign(packageJson, {
		name,
		description: 'An awesome Discord bot created with Sunar.',
		main: language === 'javascript' ? 'src/index.js' : 'dist/index.js',
		type: 'module',
		version: '0.0.0',
		scripts: getScripts(language, features),
		dependencies,
		devDependencies,
	});

	await fs.writeJSON(packageJsonPath, packageJson, { spaces: 4 });
	await setupFeatures({ path, language, features });
}
