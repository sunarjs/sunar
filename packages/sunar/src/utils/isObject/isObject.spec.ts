import { isObject } from './isObject';

describe('isObject()', () => {
	it('should return true for plain objects', () => {
		expect(isObject({})).toBe(true);
		expect(isObject({ key: 'value' })).toBe(true);
	});

	it('should return false for null', () => {
		expect(isObject(null)).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(isObject(undefined)).toBe(false);
	});

	it('should return false for primitive types', () => {
		expect(isObject(42)).toBe(false);
		expect(isObject('string')).toBe(false);
		expect(isObject(true)).toBe(false);
		expect(isObject(Symbol('symbol'))).toBe(false);
		expect(isObject(BigInt(123))).toBe(false);
	});

	it('should return true for arrays', () => {
		expect(isObject([])).toBe(true);
		expect(isObject([1, 2, 3])).toBe(true);
	});

	it('should return false for functions', () => {
		expect(isObject(() => {})).toBe(false);
		// biome-ignore lint/complexity/useArrowFunction: testing purposes
		expect(isObject(function () {})).toBe(false);
	});

	it('should return true for instances of classes', () => {
		class MyClass {}
		expect(isObject(new MyClass())).toBe(true);
	});

	it('should return true for other non-plain objects', () => {
		expect(isObject(new Date())).toBe(true);
		// biome-ignore lint/nursery/useTopLevelRegex: testing purposes
		expect(isObject(/regex/)).toBe(true);
	});
});
