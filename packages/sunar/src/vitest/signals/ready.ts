import { Signal } from '../../builders';
import { execute } from '../../mutators';
import { Signals } from '../../utils';

const signal = new Signal(Signals.ClientReady);

execute(signal, (client) => {
	// biome-ignore lint/suspicious/noConsoleLog: testing purposes
	// biome-ignore lint/suspicious/noConsole: testing purposes
	console.log(`${client.user.tag} ready!`);
});

export { signal };
