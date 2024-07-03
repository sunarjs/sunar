#!/usr/bin/env node

import { resolve } from 'node:path';
import {
	cancel,
	intro,
	isCancel,
	multiselect,
	note,
	outro,
	select,
	spinner,
	text,
} from '@clack/prompts';
import { bgRed, bold, dim, redBright } from 'colorette';

import { setup } from './setup';
import type { Feature, Language } from './types';

import { copyTemplate } from './helpers/copy-template';
import { getFeaturesOptions } from './helpers/get-features';
import { checkNodeVersion } from './helpers/node-version';
import { validateName } from './helpers/validate-name';

checkNodeVersion();

let name: string | symbol | undefined = process.argv[2];

if (name) {
	const problems = validateName(name);
	if (problems.length > 0) {
		cancel(`Invalid project name: ${problems[0]}`);
		process.exit(0);
	}
}

console.clear();

const version = '[VI]{{inject}}[/VI]';

intro(
	`🚀 ${bgRed(bold(' Sunar CLI '))} ${redBright('- Quickly setup your Discord bot!')} ${dim(`v${version}`)}`,
);

if (!name) {
	name = await text({
		message: '🏷️ Enter the name of your project:',
		placeholder: 'my-bot',
		validate: (name) => {
			const problems = validateName(name);
			if (problems.length > 0) return `Invalid project name: ${problems[0]}`;
		},
	});
}

if (isCancel(name)) {
	cancel('Operation cancelled.');
	process.exit(0);
}

const language: Language | symbol = await select({
	message: '🛠️ Select your preferred language:',
	options: [
		{ value: 'javascript', label: 'JavaScript' },
		{ value: 'typescript', label: 'TypeScript' },
	],
});

if (isCancel(language)) {
	cancel('Operation cancelled.');
	process.exit(0);
}

const features: Feature[] | symbol = await multiselect({
	message: '📦 Select features to include:',
	options: getFeaturesOptions(language),
	required: false,
});

if (isCancel(features)) {
	cancel('Operation cancelled.');
	process.exit(0);
}

const path = resolve(process.cwd(), name);
const allowedFeatures = features ?? [];

const loader = spinner();

loader.start('Creating your Sunar bot project');

await setup({ path, language, allowedFeatures });
await copyTemplate({ language, path });

loader.stop(`Your ${redBright(name)} project is ready! 🎉`);

note(`${redBright(`cd ${name}`)}                \n${redBright('npm install')}`, 'Next Steps');

outro(dim('Problems? https://github.com/sunarjs/sunar/issues'));
