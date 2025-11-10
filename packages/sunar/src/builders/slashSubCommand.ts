import {
    ApplicationCommandOptionType,
    type ApplicationCommandSubCommandData,
    type Awaitable,
    type ChatInputCommandInteraction,
} from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder, CommandConfig } from "~/types";

export interface SlashSubcommandConfig extends Omit<CommandConfig, "guildIds"> {}

/**
 * Slash subcommands are child commands that belong to a parent slash command.
 * They can be grouped or ungrouped and provide specific functionality within a command hierarchy.
 *
 * @example
 * ```typescript
 * // Ungrouped subcommand
 * const playCommand = new SlashSubcommand('music', {
 *   name: 'play',
 *   description: 'Play a song'
 * });
 *
 * // Grouped subcommand
 * const addToPlaylist = new SlashSubcommand('music', 'playlist', {
 *   name: 'add',
 *   description: 'Add song to playlist'
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/slash-subcommand} for slash subcommand documentation
 */
export class SlashSubcommand implements Builder {
    readonly type: Builders.SlashSubcommand = Builders.SlashSubcommand;
    readonly data: ApplicationCommandSubCommandData;

    parent: string;
    group?: string;

    config: SlashSubcommandConfig = {};
    protectors: Protector<{ commands: "slash"[] }>[] = [];
    execute: (interaction: ChatInputCommandInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(parent: string, data: Omit<ApplicationCommandSubCommandData, "type">);
    constructor(parent: string, group: string, data: Omit<ApplicationCommandSubCommandData, "type">);
    constructor(
        parent: string,
        groupOrData: string | Omit<ApplicationCommandSubCommandData, "type">,
        subCmdData?: Omit<ApplicationCommandSubCommandData, "type">,
    ) {
        this.parent = parent;

        if (typeof groupOrData === "string") {
            this.group = groupOrData;
            if (subCmdData) this.data = { ...subCmdData, type: ApplicationCommandOptionType.Subcommand };
            else throw new Error("Data must be provided when group is a string");
        } else {
            this.data = { ...groupOrData, type: ApplicationCommandOptionType.Subcommand };
        }
    }
}
