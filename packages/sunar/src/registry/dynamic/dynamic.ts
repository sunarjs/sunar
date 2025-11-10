import { type ApplicationCommand, type ApplicationCommandData, type ClientApplication, Collection } from "discord.js";

import { getSunarApplicationCommands, type SunarApplicationCommand } from "~/utils";

export interface DynamicRegistryResult {
    globalCommands: Collection<string, ApplicationCommand>;
    guildCommands: Collection<string, ApplicationCommand>[];
}

/**
 * Registers both global and guild-specific commands in the given application context.
 * By default, all commands are registered globally unless specified otherwise in their configuration.
 *
 * @param {ClientApplication} application - The application instance where commands are registered.
 *
 * @returns {Promise<DynamicRegistryResult>} An object containing collections of registered global and guild commands.
 *
 * @see {@link https://sunar.js.org/docs/guides/registering-commands#register-commands-dynamically} for dynamic command registration guide
 */
export async function registerCommands(application: ClientApplication): Promise<DynamicRegistryResult> {
    const commands = getSunarApplicationCommands();

    const isGuildCommand = (command: SunarApplicationCommand) => command.config.guildIds && command.config.guildIds.length > 0;

    const globalCommands = commands.filter((c) => !isGuildCommand(c));
    const guildCommands = commands.filter(isGuildCommand);

    let globalCommandsResult: DynamicRegistryResult["globalCommands"] = new Collection();

    if (globalCommands.length > 0) {
        const result = await application.commands.set(globalCommands.map((c) => c.data));
        globalCommandsResult = result;
    }

    const guildCommandsResults: DynamicRegistryResult["guildCommands"] = [];

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

            const result = await application.commands.set(command, guildId);
            guildCommandsResults.push(result);
        }
    }

    return {
        globalCommands: globalCommandsResult,
        guildCommands: guildCommandsResults,
    };
}
