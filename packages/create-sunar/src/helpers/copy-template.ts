import fs from 'fs-extra';

import type { Language } from '../types';
import { templates } from '../utils/templates';

interface CopyTemplateOptions {
	language: Language;
	path: string;
}

export async function copyTemplate({ language, path }: CopyTemplateOptions) {
	await fs.copy(templates[language], path);
}
