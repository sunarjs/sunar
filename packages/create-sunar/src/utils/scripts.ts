export const SCRIPTS = {
	START: {
		NODE: 'node src/index.js',
		TSX: 'tsx src/index.ts',
		NODE_DIST: 'node dist/index.js',
	},
	DEV: {
		NODEMON: 'nodemon src/index.js',
		TSX: 'tsx watch src/index.ts',
	},
	BUILD: {
		TSUP: 'tsup',
		TSC: 'tsc',
	},
	FORMAT: {
		BIOME: 'biome format --write .',
		PRETTIER: 'prettier --write .',
	},
	LINT: {
		BIOME: 'biome lint ./src',
		JS_ESLINT: 'eslint . --ext js --report-unused-disable-directives --max-warnings 0',
		TS_ESLINT: 'eslint . --ext ts --report-unused-disable-directives --max-warnings 0',
		TSC: 'tsc --noEmit',
	},
} as const;
