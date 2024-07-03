import type { DEPENDENCIES } from './utils/dependencies';
import type { FEATURES } from './utils/features';
import type { LANGUAGES } from './utils/templates';

export type Language = (typeof LANGUAGES)[number];
export type Feature = (typeof FEATURES)[number];
export type Features = Record<Feature, boolean>;

export type Dependency = keyof typeof DEPENDENCIES;
