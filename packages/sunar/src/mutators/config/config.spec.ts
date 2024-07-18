import { Builders } from '../../utils';
import { type ConfigurableBuilder, config } from './config';

describe('config()', () => {
	it('should apply configuration to a builder', () => {
		const builder: ConfigurableBuilder = {
			type: Builders.Slash,
			config: { name: 'testCommand', description: 'Test command' },
		};

		const newConfig = { name: 'updatedCommand', description: 'Updated test command' };

		config(builder, newConfig);

		expect(builder.config).toEqual(newConfig);
	});

	it('should handle undefined configuration gracefully', () => {
		const builder: ConfigurableBuilder = {
			type: Builders.Button,
			config: { name: 'testCommand', description: 'Test command' },
		};

		// @ts-expect-error
		config(builder, undefined);

		expect(builder.config).toBeDefined();
		expect(builder.config).toEqual({ name: 'testCommand', description: 'Test command' });
	});

	it('should not apply configuration if config is not an object', () => {
		const builder: ConfigurableBuilder = {
			type: Builders.SelectMenu,
			config: { name: 'testCommand', description: 'Test command' },
		};

		const invalidConfig = 'invalid';

		// @ts-expect-error
		config(builder, invalidConfig);

		expect(builder.config).toEqual({ name: 'testCommand', description: 'Test command' });
	});

	it('should not modify builder if config is not an object', () => {
		const builder: ConfigurableBuilder = {
			type: Builders.ContextMenu,
			config: { name: 'testCommand', description: 'Test command' },
		};

		const invalidConfig = 'invalid';

		// @ts-expect-error
		config(builder, invalidConfig);

		expect(builder).toEqual({
			type: Builders.ContextMenu,
			config: { name: 'testCommand', description: 'Test command' },
		});
	});
});
