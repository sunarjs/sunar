export function isESM(): boolean {
	return !!import.meta.url;
}
