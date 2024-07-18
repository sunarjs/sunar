import { Autocomplete } from '../../builders';
import { isAutocompleteBuilder } from './isAutocompleteBuilder';

describe('isAutocompleteBuilder()', () => {
	it('should return true for a valid Autocomplete builder', () => {
		const autocompleteBuilder = new Autocomplete({ name: 'testAutocomplete' });
		expect(isAutocompleteBuilder(autocompleteBuilder)).toBe(true);
	});

	it('should return false for a builder of different type', () => {
		class MockBuilder {}
		const mockBuilder = new MockBuilder();
		expect(isAutocompleteBuilder(mockBuilder)).toBe(false);
	});

	it('should return false for an object that is not a builder', () => {
		const notABuilder = {
			title: 'Not a builder',
		};
		expect(isAutocompleteBuilder(notABuilder)).toBe(false);
	});

	it('should return false for null', () => {
		expect(isAutocompleteBuilder(null)).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(isAutocompleteBuilder(undefined)).toBe(false);
	});
});
