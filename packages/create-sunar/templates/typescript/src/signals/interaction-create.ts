import { Signal, Signals, execute } from 'sunar';
import { handleInteraction } from 'sunar/handlers';

const signal = new Signal(Signals.InteractionCreate);

execute(signal, (interaction) => {
	// handle all the interactions
	handleInteraction(interaction);

	// handle specific interactions:
	// https://sunar.js.org/docs/guides/interactions-handling#handle-only-specific-interactions
});

export { signal };
