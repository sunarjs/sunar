import { join } from 'node:path';

import fs from 'fs-extra';

import type { Features, Language } from '../types';
import { DEPENDENCIES } from '../utils/dependencies';
import { copyConfig } from './copy-config';

interface SetupFeaturesOptions {
	path: string;
	language: Language;
	features: Features;
}

export function setupFeatures({ path, language, features }: SetupFeaturesOptions) {
	const tasks: Promise<void>[] = [];

	if (features.biome) {
		tasks.push(
			(async () => {
				const biomeJsonPath = join(path, 'biome.json');
				await copyConfig('static-biome.json', biomeJsonPath);
				const biomeJson = await fs.readJSON(biomeJsonPath);
				Object.assign(biomeJson, {
					$schema: `https://biomejs.dev/schemas/${DEPENDENCIES['@biomejs/biome']}/schema.json`,
				});
				await fs.writeJSON(biomeJsonPath, biomeJson, { spaces: 4 });
			})(),
		);
	}

	if (features.eslint) {
		tasks.push(
			(async () => {
				const eslintPath = join(path, '.eslintrc.cjs');
				const config = language === 'typescript' ? 'static-eslint-ts.cjs' : 'static-eslint-js.cjs';
				await copyConfig(config, eslintPath);
			})(),
		);
	}

	if (features.prettier) {
		tasks.push(
			(async () => {
				const prettierPath = join(path, '.prettierrc');
				await copyConfig('static-prettier.json', prettierPath);
			})(),
		);
	}

	if (features.tsup && language === 'typescript') {
		tasks.push(
			(async () => {
				const tsupPath = join(path, 'tsup.config.ts');
				await copyConfig('static-tsup.ts', tsupPath);
			})(),
		);
	}

	return Promise.all(tasks);
}
