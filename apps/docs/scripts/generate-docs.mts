import * as Typescript from 'fumadocs-typescript';
import * as path from 'node:path';

const demoRegex = /^---type-table-demo---\r?\n(?<content>.+)\r?\n---end---$/gm;
void Typescript.generateFiles({
	input: ['./content/docs/**/*.model.mdx'],
	transformOutput(_, content) {
		return content.replace(demoRegex, '---type-table---\n$1\n---end---');
	},
	output: (file) =>
		path.resolve(
			path.dirname(file),
			`${path.basename(file).split('.')[0]}.mdx`,
		),
});
