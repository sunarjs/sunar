import { Builders } from '..';
import { Button, Group } from '../../builders';
import { isGroupBuilder } from './isGroupBuilder';

describe('isGroupBuilder()', () => {
	it('should return true for a valid Group builder', () => {
		const groupBuilder = new Group('example', 'parent');
		expect(isGroupBuilder(groupBuilder)).toBe(true);
	});

	it('should return false for a builder of different type', () => {
		const buttonBuilder = new Button({ id: 'testButton' });
		expect(isGroupBuilder(buttonBuilder)).toBe(false);
	});

	it('should return false for an object that is not a builder', () => {
		const notABuilder = {
			title: 'Not a builder',
		};
		expect(isGroupBuilder(notABuilder)).toBe(false);
	});

	it('should return false for null', () => {
		expect(isGroupBuilder(null)).toBe(false);
	});

	it('should return false for undefined', () => {
		expect(isGroupBuilder(undefined)).toBe(false);
	});

	it('should return false for a builder without data property', () => {
		const invalidBuilder = {
			type: Builders.Group,
		};
		expect(isGroupBuilder(invalidBuilder)).toBe(false);
	});
});
