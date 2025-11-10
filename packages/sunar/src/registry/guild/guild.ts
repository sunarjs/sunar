import type { ApplicationCommand, ClientApplication, Collection } from "discord.js";

import { getApplicationCommands } from "~/utils";

/**
 * Registers all Sunar commands for specific Discord guilds.
 * Guild commands are only available in the specified guilds and update faster than global commands.
 *
 * @param {ClientApplication} application - The Discord client application instance.
 * @param {string[]} guildIds - Array of guild IDs where commands should be registered.
 *
 * @returns {Promise<Collection<string, ApplicationCommand>[]>} Array of collections containing registered commands for each guild.
 *
 * @example
 * ```typescript
 * const guildIds = ['123456789', '987654321'];
 * await registerGuildCommands(client.application, guildIds);
 * ```
 *
 * @see {@link https://sunar.js.org/docs/guides/registering-commands#registering-for-specific-guilds-recommended-for-development} for guild command registration guide
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
