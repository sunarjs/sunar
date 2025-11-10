import { ApplicationCommandOptionType, type ApplicationCommandSubGroupData, type ChatInputApplicationCommandData } from "discord.js";

import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder, CommandConfig } from "~/types";

export interface SlashParentCommandData extends Omit<ChatInputApplicationCommandData, "options"> {
    options: readonly ApplicationCommandSubGroupData[];
}

export interface SlashParentCommandDataInput extends Omit<ChatInputApplicationCommandData, "type" | "options"> {
    groups?: readonly Omit<ApplicationCommandSubGroupData, "type" | "options">[];
}

export interface SlashParentConfig extends CommandConfig {}

/**
 * Slash parent commands define the structure for commands with subcommands and subcommand groups.
 * They act as containers for organizing related subcommands under a single parent command.
 *
 * @example
 * ```typescript
 * const musicParent = new SlashParent({
 *   name: 'music',
 *   description: 'Music commands',
 *   groups: [
 *     { name: 'playlist', description: 'Playlist management' },
 *     { name: 'queue', description: 'Queue management' }
 *   ]
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/slash-parent} for slash parent documentation
 */
export class SlashParent implements Omit<Builder, "execute"> {
    readonly type: Builders.SlashParent = Builders.SlashParent;
    readonly data: SlashParentCommandData;

    root?: string;

    config: SlashParentConfig = {};
    protectors: Protector<{ commands: "slash"[] }>[] = [];

    constructor(data: SlashParentCommandDataInput) {
        const { groups = [], ...newData } = data;

        const options = groups.map(
            (group): ApplicationCommandSubGroupData => ({ ...group, type: ApplicationCommandOptionType.SubcommandGroup, options: [] }),
        );

        this.data = { ...newData, options };
    }
}
