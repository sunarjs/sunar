import type { Features, Language } from '../types';
import { SCRIPTS } from '../utils/scripts';

function start(features: Features, language: Language): string {
	if (features.tsx) return SCRIPTS.START.TSX;

	if (language === 'typescript') {
		return `${SCRIPTS.BUILD.TSC} && ${SCRIPTS.START.NODE_DIST}`;
	}

	return SCRIPTS.START.NODE;
}

function dev(features: Features): string | undefined {
	if (features.nodemon) return SCRIPTS.DEV.NODEMON;
	if (features.tsx) return SCRIPTS.DEV.TSX;
}

function build(features: Features, language: Language): string | undefined {
	if (language === 'javascript') return;

	if (features.tsup) return SCRIPTS.BUILD.TSUP;

	return SCRIPTS.BUILD.TSC;
}

function lint(features: Features, language: Language): string | undefined {
	const isTS = language === 'typescript';

	if (features.biome) return SCRIPTS.LINT.BIOME;

	if (features.eslint) {
		if (isTS) return SCRIPTS.LINT.TS_ESLINT;
		return SCRIPTS.LINT.JS_ESLINT;
	}

	if (isTS) return SCRIPTS.LINT.TSC;
}

function format(features: Features): string | undefined {
	if (features.biome) return SCRIPTS.FORMAT.BIOME;
	if (features.prettier) return SCRIPTS.FORMAT.PRETTIER;
}

export const scripts = { start, dev, build, lint, format };
