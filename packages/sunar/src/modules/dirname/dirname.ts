import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { isESM } from '../isESM';

export function dirname(): string {
	return isESM() ? path.dirname(fileURLToPath(import.meta.url)) : __dirname;
}
