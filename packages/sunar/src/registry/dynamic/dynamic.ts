import type { ApplicationCommandData, ClientApplication } from 'discord.js';

import { type SunarApplicationCommand, getSunarApplicationCommands } from '../../utils';

export async function registerCommands(application: ClientApplication) {
	const commands = getSunarApplicationCommands();

	const isGuildCommand = (command: SunarApplicationCommand) =>
		command.config.guildIds && command.config.guildIds.length > 0;

	const globalCommands = commands.filter((c) => !isGuildCommand(c));
	const guildCommands = commands.filter(isGuildCommand);

	if (globalCommands.length > 0) await application.commands.set(globalCommands.map((c) => c.data));

	if (guildCommands.length > 0) {
		const mappedGuilds: Record<string, ApplicationCommandData[]> = {};

		for (const { config, data } of guildCommands) {
			if (!config.guildIds || config.guildIds.length <= 0) continue;

			for (const guildId of config.guildIds) {
				if (mappedGuilds[guildId]) mappedGuilds[guildId].push(data);
				else mappedGuilds[guildId] = [data];
			}
		}

		for (const entries of Object.entries(mappedGuilds)) {
			const [guildId, command] = entries;
			await application.commands.set(command, guildId);
		}
	}
}
