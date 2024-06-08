import type { ClientApplication } from 'discord.js';

import { getApplicationCommands } from '../../utils';

export async function registerGuildCommands(application: ClientApplication, guildIds: string[]) {
	const applicationCommands = getApplicationCommands();

	if (applicationCommands.length <= 0) return;

	for (const guildId of guildIds) {
		await application.commands.set(applicationCommands, guildId);
	}
}
