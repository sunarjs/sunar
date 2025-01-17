import type { ApplicationCommandData } from "discord.js";

import type { CommandConfig } from "../..";
import { contextMenuCommands, slashCommands } from "../../stores";

export interface SunarApplicationCommand {
    data: ApplicationCommandData;
    config: CommandConfig;
}

export function getSunarApplicationCommands(): SunarApplicationCommand[] {
    if (contextMenuCommands.size <= 0 && slashCommands.size <= 0) return [];
    const commands = [...contextMenuCommands.values(), ...slashCommands.values()];
    const applicationCommands = commands.map(({ data, config }) => ({ data, config }));
    return applicationCommands;
}
