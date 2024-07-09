import type { Features, Language } from '../types';
import { SCRIPTS } from '../utils/scripts';

export function getScripts(language: Language, features: Features) {
	return {
		start: start(language, features),
		dev: dev(features),
		build: build(language, features),
		lint: lint(language, features),
		format: format(features),
	};
}

function start(language: Language, features: Features): string {
	if (language === 'typescript' || features.tsup) {
		return SCRIPTS.START.NODE_DIST;
	}

	return SCRIPTS.START.NODE;
}

function dev(features: Features): string | undefined {
	if (features.nodemon) return SCRIPTS.DEV.NODEMON;
	if (features.tsx) return SCRIPTS.DEV.TSX;
}

function build(language: Language, features: Features): string | undefined {
	if (language === 'javascript') return;

	if (features.tsup) return SCRIPTS.BUILD.TSUP;

	return SCRIPTS.BUILD.TSC;
}

function lint(language: Language, features: Features): string | undefined {
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
