import type { Feature, Features, Language } from '../types';
import { BASE_FEATURES, FEATURES, JS_FEATURES, TS_FEATURES } from '../utils/features';

export function getFeaturesOptions(language: Language) {
	if (language === 'javascript') return [...BASE_FEATURES, ...JS_FEATURES];
	return [...BASE_FEATURES, ...TS_FEATURES];
}

export function getFeatures(features: Feature[]): Features {
	const entries = FEATURES.map((f) => [f, features.includes(f)]);
	return Object.fromEntries(entries);
}
