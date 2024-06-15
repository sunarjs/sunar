import type { ApplicationCommandData } from 'discord.js';

import { contextMenuCommands, slashCommands } from '../../stores';

export function getApplicationCommands(): ApplicationCommandData[] {
	if (contextMenuCommands.size <= 0 && slashCommands.size <= 0) return [];
	const commands = [...contextMenuCommands.values(), ...slashCommands.values()];
	const applicationCommands = commands.map(({ data }) => data);
	return applicationCommands;
}
