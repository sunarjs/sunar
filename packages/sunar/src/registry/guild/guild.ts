import type { ApplicationCommand, ClientApplication, Collection } from "discord.js";

import { getApplicationCommands } from "../../utils";

/**
 * Register all commands for specific guilds.
 *
 * @param application The client application where the commands will be registered.
 * @param guildIds The IDs of the guilds where the commands will be registered.
 *
 * @returns An array of registered application commands collection
 *
 * @see https://sunar.js.org/docs/guides/registering-commands/guilds
 */
export async function registerGuildCommands(
    application: ClientApplication,
    guildIds: string[],
): Promise<Collection<string, ApplicationCommand>[]> {
    const applicationCommands = getApplicationCommands();

    if (applicationCommands.length <= 0) return [];

    const results: Collection<string, ApplicationCommand>[] = [];

    for (const guildId of guildIds) {
        const result = await application.commands.set(applicationCommands, guildId);
        results.push(result);
    }

    return results;
}
