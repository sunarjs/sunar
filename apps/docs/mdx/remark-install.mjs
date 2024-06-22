import { visit } from 'unist-util-visit';
import convert from 'npm-to-yarn';
import { createElement } from './create-element.mjs';

export function remarkInstall({
	Tab = 'Tab',
	Tabs = 'InstallTabs',
	packageManagers = [
		{ command: (cmd) => convert(cmd, 'npm'), name: 'npm' },
		{ command: (cmd) => convert(cmd, 'pnpm'), name: 'pnpm' },
		{ command: (cmd) => convert(cmd, 'yarn'), name: 'yarn' },
		{ command: (cmd) => convert(cmd, 'bun'), name: 'bun' },
	],
} = {}) {
	return (tree) => {
		visit(tree, 'code', (node) => {
			if (node.lang !== 'package-install') return 'skip';

			const value = node.value.startsWith('npm')
				? node.value
				: `npm install ${node.value}`;

			const insert = createElement(
				Tabs,
				{
					items: {
						type: 'ArrayExpression',
						elements: packageManagers.map(({ name }) => ({
							type: 'Literal',
							value: name,
						})),
					},
				},
				packageManagers.map(({ command, name }) => ({
					type: 'mdxJsxFlowElement',
					name: Tab,
					attributes: [{ type: 'mdxJsxAttribute', name: 'value', value: name }],
					children: [
						{
							type: 'code',
							lang: 'bash',
							meta: `title="Terminal" ${node.meta}`,
							value: command(value),
						},
					],
				})),
			);

			Object.assign(node, insert);
		});
	};
}
