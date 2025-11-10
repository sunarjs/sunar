import type { ApplicationCommandData } from "discord.js";

import { contextMenuCommands, slashCommands } from "~/stores";

import type { CommandConfig } from "~/types";

export interface SunarApplicationCommand {
    data: ApplicationCommandData;
    config: CommandConfig;
}

/**
 * Retrieves all Sunar application commands (slash and context menu) with their configurations.
 * Combines both command types into a unified array for registration purposes.
 *
 * @returns {SunarApplicationCommand[]} Array of application commands with their data and config.
 *
 * @example
 * ```typescript
 * const commands = getSunarApplicationCommands();
 * console.log(`Found ${commands.length} commands to register`);
 * ```
 *
 * @internal
 */
export function getSunarApplicationCommands(): SunarApplicationCommand[] {
    if (contextMenuCommands.size <= 0 && slashCommands.size <= 0) return [];
    const commands = [...contextMenuCommands.values(), ...slashCommands.values()];
    const applicationCommands = commands.map(({ data, config }) => ({ data, config }));
    return applicationCommands;
}
