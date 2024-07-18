import { Protector } from '../../builders';
import { Builders } from '../../utils';
import { type ProtectableBuilder, protect } from './protect';

describe('protect()', () => {
	it('should add protectors to the builder', () => {
		const builder: ProtectableBuilder = {
			type: Builders.Slash,
			protectors: [],
		};

		const newProtectors: Protector[] = [
			new Protector({ commands: ['slash'] }),
			new Protector({ commands: ['contextMenu'] }),
		];

		const result = protect(builder, newProtectors);

		expect(result).toHaveLength(2);
		expect(result).toEqual(newProtectors);
		expect(builder.protectors).toEqual(newProtectors);
	});

	it('should append protectors to existing protectors', () => {
		const existingProtector = new Protector({ commands: ['slash'] });

		const builder: ProtectableBuilder = {
			type: Builders.Button,
			protectors: [existingProtector],
		};

		const newProtectors: Protector[] = [
			new Protector({ components: ['button'] }),
			new Protector({ components: ['modal'] }),
		];

		const result = protect(builder, newProtectors);

		expect(result).toHaveLength(3);
		expect(builder.protectors).toEqual([existingProtector, ...newProtectors]);
	});

	it('should handle undefined protectors gracefully', () => {
		const builder: ProtectableBuilder = {
			type: Builders.SelectMenu,
			// @ts-expect-error
			protectors: undefined,
		};

		const newProtectors: Protector[] = [new Protector({ components: ['selectMenu'] })];

		const result = protect(builder, newProtectors);

		expect(result).toBeUndefined();
	});

	it('should not modify builder if protectors is not an array', () => {
		const builder: ProtectableBuilder = {
			type: Builders.ContextMenu,
			// @ts-expect-error
			protectors: 'invalid',
		};

		const newProtectors: Protector[] = [new Protector({ commands: ['contextMenu'] })];

		const result = protect(builder, newProtectors);

		expect(result).toBe('invalid');
		expect(builder.protectors).toBe('invalid');
	});
});
