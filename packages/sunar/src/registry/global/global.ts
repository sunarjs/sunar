import type { ApplicationCommand, ClientApplication, Collection } from 'discord.js';

import { getApplicationCommands } from '../../utils';

/**
 * Register all commands as global.
 *
 * @param application The client application where the commands will be registered.
 * @returns A registered application commands collection
 */
export function registerGlobalCommands(
	application: ClientApplication,
): Promise<Collection<string, ApplicationCommand>> {
	const applicationCommands = getApplicationCommands();

	return application.commands.set(applicationCommands.length > 0 ? applicationCommands : []);
}
