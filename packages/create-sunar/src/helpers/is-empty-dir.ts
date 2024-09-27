/*
The original code comes from:
https://github.com/vercel/next.js
*/

import { lstatSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { note } from '@clack/prompts';
import { blue, redBright, underline } from 'colorette';

const validFiles = [
	'.DS_Store',
	'.git',
	'.gitattributes',
	'.gitignore',
	'.gitlab-ci.yml',
	'.hg',
	'.hgcheck',
	'.hgignore',
	'.idea',
	'.npmignore',
	'.travis.yml',
	'LICENSE',
	'Thumbs.db',
	'docs',
	'mkdocs.yml',
	'npm-debug.log',
	'yarn-debug.log',
	'yarn-error.log',
	'yarnrc.yml',
	'.yarn',
];

const imlRegex = /\.iml$/;

export function isEmptyDir(root: string, name: string): boolean {
	const conflicts = readdirSync(root).filter(
		(file) => !(validFiles.includes(file) || imlRegex.test(file)),
	);

	if (conflicts.length <= 0) return true;

	const invalidFiles = conflicts.map((file) => {
		try {
			const stats = lstatSync(join(root, file));
			if (stats.isDirectory()) return `  ${blue(file)}/`;
			return `  ${file}`;
		} catch {
			return `  ${file}`;
		}
	});

	note(`${redBright(`The directory ${underline(name)} contains files that could conflict:`)}

${invalidFiles.join('\n')}

Try using a new directory name, or remove the files listed above.`);

	return false;
}
