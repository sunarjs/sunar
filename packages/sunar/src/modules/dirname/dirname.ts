import path from 'node:path';
import { fileURLToPath } from 'node:url';

export function dirname(url: string): string {
	return path.dirname(fileURLToPath(url))
}
