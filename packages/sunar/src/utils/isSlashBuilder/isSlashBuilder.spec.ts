import { Builders } from '..';
import { Button, Slash } from '../../builders';
import { isSlashBuilder } from './isSlashBuilder';

describe('isSlashBuilder()', () => {
	it('should return true for a valid Slash builder', () => {
		const slashBuilder = new Slash({ name: 'testCommand', description: 'Test command' });
		expect(isSlashBuilder(slashBuilder)).toBe(true);
	});

	it('should return false for a builder of different type', () => {
		const buttonBuilder = new Button({ id: 'testButton' });
		expect(isSlashBuilder(buttonBuilder)).toBe(false);
	});

	it('should return false for an object that is not a builder', () => {
		const notABuilder = {
			title: 'Not a builder',
		};
		expect(isSlashBuilder(notABuilder)).toBe(false);
	});

	it('should return false for null', () => {
		expect(isSlashBuilder(null)).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(isSlashBuilder(undefined)).toBe(false);
	});

	it('should return false for a builder without data property', () => {
		const invalidBuilder = {
			type: Builders.Slash,
		};
		expect(isSlashBuilder(invalidBuilder)).toBe(false);
	});

	it('should return false for a builder with data property but without name', () => {
		// @ts-expect-error
		const invalidBuilder = new Slash({ description: 'Test command' });
		expect(isSlashBuilder(invalidBuilder)).toBe(false);
	});

	it('should return false for a builder with data property but without description', () => {
		// @ts-expect-error
		const invalidBuilder = new Slash({ name: 'testCommand' });
		expect(isSlashBuilder(invalidBuilder)).toBe(false);
	});

	it('should return false for a builder with invalid data property', () => {
		// @ts-expect-error
		const invalidBuilder = new Slash('invalidData');
		expect(isSlashBuilder(invalidBuilder)).toBe(false);
	});
});
