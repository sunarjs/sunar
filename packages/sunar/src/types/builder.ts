import type { Awaitable } from "discord.js";

import type { Protector } from "~/builders";
import type { Builders, Commands, Components } from "~/utils";

export interface Builder {
    readonly type: Builders;
    protectors: Protector[];
    execute: (...args: any) => Awaitable<unknown>;
    config: object;
}

export type CommandKey = (typeof Commands)[keyof typeof Commands];

export type ComponentKey = (typeof Components)[keyof typeof Components];
