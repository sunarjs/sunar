import type { Awaitable, ChatInputCommandInteraction } from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder, CooldownProp } from "~/types";

export interface GroupConfig extends CooldownProp {}

/**
 * The Group class handles slash commands with subcommands, allowing for structured and efficient
 * management of hierarchical commands under a single root.
 *
 * @deprecated Use SlashParent and SlashSubcommand instead
 *
 * @example
 * ```typescript
 * const musicGroup = new Group('music', 'play', 'song');
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/group} for group documentation
 */
export class Group implements Builder {
    readonly type: Builders.Group = Builders.Group;

    root: string;
    parent: string;
    sub?: string;

    config: GroupConfig = {};
    protectors: Protector<{ commands: "slash"[] }>[] = [];
    execute: (interaction: ChatInputCommandInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(root: string, parent: string, sub?: string) {
        this.root = root;
        this.parent = parent;
        this.sub = sub;
    }
}
