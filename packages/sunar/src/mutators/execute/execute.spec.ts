import { Builders } from '../../utils';
import { type ExecutableBuilder, execute } from './execute';

describe('execute()', () => {
	it('should set the execute function on the builder', () => {
		const builder: ExecutableBuilder = {
			type: Builders.Slash,
			execute: () => {},
		};

		const newExecute = () => 'executed';

		execute(builder, newExecute);

		expect(builder.execute).toBe(newExecute);
	});

	it('should not set the execute function if it is not a function', () => {
		const builder: ExecutableBuilder = {
			type: Builders.Button,
			execute: () => 'original execution',
		};

		const invalidExecute = 'invalid';

		// @ts-expect-error
		execute(builder, invalidExecute);

		expect(builder.execute()).toBe('original execution');
	});

	it('should handle undefined execute function gracefully', () => {
		const builder: ExecutableBuilder = {
			type: Builders.SelectMenu,
			execute: () => 'original execution',
		};

		// @ts-expect-error
		execute(builder, undefined);

		expect(builder.execute()).toBe('original execution');
	});

	it('should not modify builder if execute is not a function', () => {
		const builder: ExecutableBuilder = {
			type: Builders.ContextMenu,
			execute: () => 'original execution',
		};

		const invalidExecute = 123;

		// @ts-expect-error
		execute(builder, invalidExecute);

		expect(builder.execute()).toBe('original execution');
	});
});
