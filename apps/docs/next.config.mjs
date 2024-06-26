import createMDX from 'fumadocs-mdx/config';
import {
	remarkDocGen,
	fileGenerator,
	typescriptGenerator,
	remarkInstall,
} from 'fumadocs-docgen';

const withMDX = createMDX({
	mdxOptions: {
		rehypeCodeOptions: {
			themes: {
				light: 'min-light',
				dark: 'github-dark-dimmed',
			},
		},
		lastModifiedTime: 'git',
		remarkPlugins: [
			[remarkInstall, { Tabs: 'InstallTabs' }],
			[remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }],
		],
	},
});

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
};

export default withMDX(config);
