import type { Awaitable, ChatInputCommandInteraction } from "discord.js";

import type { Protector } from ".";
import { UNHANDLED_SYMBOL } from "../symbols";
import type { Builder, CooldownProp } from "../types";
import { Builders } from "../utils";

export interface GroupConfig extends CooldownProp {}

/**
 * The Group class handles slash commands with subcommands, allowing for structured and efficient
 * management of hierarchical commands under a single root.
 *
 * @see https://sunar.js.org/docs/builders/group
 */
export class Group implements Builder {
    public readonly type = Builders.Group;

    public root: string;
    public parent: string;
    public sub?: string;

    public config: GroupConfig = {};
    public protectors: Protector<{ commands: "slash"[] }>[] = [];
    public execute: (interaction: ChatInputCommandInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(root: string, parent: string, sub?: string) {
        this.root = root;
        this.parent = parent;
        this.sub = sub;
    }
}
