export const FEATURES = ['biome', 'tsup', 'tsx', 'nodemon', 'prettier', 'eslint'] as const;

export const BASE_FEATURES = [
	{
		label: 'biome',
		value: 'biome',
		hint: 'format, lint, and more in a fraction of a second',
	},
	{
		label: 'prettier',
		value: 'prettier',
		hint: 'format your project code',
	},
	{
		label: 'eslint',
		value: 'eslint',
		hint: 'static code analysis tool',
	},
] as const;

export const JS_FEATURES = [
	{
		label: 'nodemon',
		value: 'nodemon',
		hint: 'monitor for any changes in your Node.js code',
	},
] as const;

export const TS_FEATURES = [
	{
		label: 'tsup',
		value: 'tsup',
		hint: 'fast and minimalist TypeScript bundler',
	},
	{
		label: 'tsx',
		value: 'tsx',
		hint: 'easiest way to run TypeScript in Node.js',
	},
] as const;
