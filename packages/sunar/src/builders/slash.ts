import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction } from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder, CommandConfig } from "~/types";

export interface SlashConfig extends CommandConfig {}

/**
 * Slash commands are one of the primary ways users interact with bots. They provide a structured way for users to issue commands directly within the chat interface.
 *
 * @example
 * ```typescript
 * const ping = new Slash({
 *   name: 'ping',
 *   description: 'Replies with Pong!'
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/slash} for slash command documentation
 */
export class Slash implements Builder {
    readonly type: Builders.Slash = Builders.Slash;
    readonly data: ChatInputApplicationCommandData;

    config: SlashConfig = {};
    protectors: Protector<{ commands: "slash"[] }>[] = [];
    execute: (interaction: ChatInputCommandInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(data: ChatInputApplicationCommandData) {
        this.data = data;
    }
}
