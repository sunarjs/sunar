import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/**/*.ts', '!src/**/*.spec.ts'],
	format: 'esm',
	clean: true,
	dts: true,
	target: 'es2022',
	bundle: true,
	sourcemap: true,
	keepNames: true,
	skipNodeModulesBundle: true,
	ignoreWatch: ['**/node_modules/**', '**/.git/**'],
});
