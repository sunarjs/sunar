import { load } from './load';

import { Signal, Slash } from '../../builders';
import { signals, slashCommands } from '../../stores';

beforeEach(() => {
	signals.clear();
	slashCommands.clear();
});

describe('load()', () => {
	it('should return undefined when loading files', async () => {
		const result = await load('src/vitest/{commands,signals}/**/*.ts');

		expect(result).toBeUndefined();
	});

	it('should store and retrieve commands and signals correctly', async () => {
		await load('src/vitest/{commands,signals}/**/*.ts');

		const ping = slashCommands.get('ping');

		expect(ping).toBeInstanceOf(Slash);
		expect(ping?.execute).toBeTypeOf('function');

		expect(signals.size).toBeGreaterThan(0);
	});

	it('should ignore files with underscore prefix', async () => {
		await load('src/vitest/{commands,signals}/**/*.ts', {
			ignore: 'src/**/_*.ts',
		});

		const ignored = slashCommands.get('ignored');

		expect(ignored).toBeUndefined();
	});

	it('should handle empty patterns gracefully', async () => {
		await load([]);

		expect(slashCommands.size).toBe(0);
		expect(signals.size).toBe(0);
	});

	it('should load modules with multiple patterns', async () => {
		await load(['src/vitest/commands/**/*.ts', 'src/vitest/signals/**/*.ts']);

		const command = slashCommands.at(0);
		const signal = signals.at(0);

		expect(command).toBeInstanceOf(Slash);
		expect(signal).toBeInstanceOf(Signal);
	});

	it('should handle patterns that match no files', async () => {
		await load('src/invalid-path-test/**/*.ts');

		expect(slashCommands.size).toBe(0);
		expect(signals.size).toBe(0);
	});
});
