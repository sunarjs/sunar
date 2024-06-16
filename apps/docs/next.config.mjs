import createMDX from 'fumadocs-mdx/config';
import {
	remarkDocGen,
	fileGenerator,
	typescriptGenerator,
} from 'fumadocs-docgen';
import { remarkInstall } from './mdx/remark-install.mjs';

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
			remarkInstall,
			[remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }],
		],
	},
});

/** @type {import('next').NextConfig} */
const config = {
	reactStrictMode: true,
};

export default withMDX(config);
