export function isRegex(regex: any): regex is RegExp {
	return regex instanceof RegExp;
}
