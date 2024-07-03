import arg from 'arg';
import { defineConfig } from 'tsup';

import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';

const args = arg({ '--watch': Boolean });
const isWatch = Boolean(args['--watch']);

export default defineConfig({
	entry: ['src/**/*.ts', '!src/**/*.spec.ts'],
	format: 'esm',
	clean: true,
	dts: false,
	target: 'es2022',
	bundle: true,
	minifyWhitespace: true,
	minifyIdentifiers: false,
	minifySyntax: false,
	watch: isWatch,
	sourcemap: true,
	keepNames: true,
	shims: true,
	skipNodeModulesBundle: true,
	esbuildPlugins: [esbuildPluginVersionInjector()],
	ignoreWatch: ['**/node_modules/**', '**/.git/**'],
});
