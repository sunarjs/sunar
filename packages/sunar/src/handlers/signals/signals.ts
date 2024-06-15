import { context, signals } from '../../stores';
import { handleProtectors } from '../protectors';

export function handleSignals() {
	for (const signal of signals.values()) {
		if (!signal.execute) return;

		const method = signal.options.once ? 'once' : 'on';

		context.client[method](signal.name, async (...args) => {
			if (!signal.execute) return;

			const canContinue = await handleProtectors({ protectors: signal.protectors, data: args });
			if (!canContinue) return;

			signal.execute(...args);
		});
	}
}
