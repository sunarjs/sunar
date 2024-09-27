import {
	defineConfig,
	defineDocs,
	frontmatterSchema,
	metaSchema,
} from 'fumadocs-mdx/config';
import {
	fileGenerator,
	remarkDocGen,
	remarkInstall,
	typescriptGenerator,
} from 'fumadocs-docgen';
import { z } from 'zod';

export const { docs, meta } = defineDocs({
	docs: {
		schema: frontmatterSchema.extend({
			index: z.boolean().default(false),
		}),
	},
	meta: {
		schema: metaSchema.extend({
			description: z.string().optional(),
		}),
	},
});

export default defineConfig({
	lastModifiedTime: 'git',
	mdxOptions: {
		rehypeCodeOptions: {
			themes: {
				light: 'min-light',
				dark: 'github-dark-dimmed',
			},
		},
		remarkPlugins: [
			[remarkInstall, { Tabs: 'InstallTabs' }],
			[remarkDocGen, { generators: [typescriptGenerator(), fileGenerator()] }],
		],
	},
});
