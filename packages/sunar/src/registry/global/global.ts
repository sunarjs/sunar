import type { ApplicationCommand, ClientApplication, Collection } from "discord.js";

import { getApplicationCommands } from "~/utils";

/**
 * Registers all Sunar commands as global Discord application commands.
 * Global commands are available in all guilds where the bot is present.
 *
 * @param {ClientApplication} application - The Discord client application instance.
 *
 * @returns {Promise<Collection<string, ApplicationCommand>>} A collection of registered global commands.
 *
 * @example
 * ```typescript
 * await registerGlobalCommands(client.application);
 * ```
 *
 * @see {@link https://sunar.js.org/docs/guides/registering-commands#explicit-global-registration} for global command registration guide
 */
export function registerGlobalCommands(application: ClientApplication): Promise<Collection<string, ApplicationCommand>> {
    const applicationCommands = getApplicationCommands();

    return application.commands.set(applicationCommands.length > 0 ? applicationCommands : []);
}
