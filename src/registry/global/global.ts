import type { ClientApplication } from 'discord.js';

import { getApplicationCommands } from '../../utils';

export async function registerGlobalCommands(application: ClientApplication) {
	const applicationCommands = getApplicationCommands();

	if (applicationCommands.length <= 0) return;

	await application.commands.set(applicationCommands);
}
