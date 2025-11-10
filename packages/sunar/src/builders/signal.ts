import type { Awaitable, ClientEvents } from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder } from "~/types";

type SignalName = keyof ClientEvents;

export interface SignalOptions {
    /** If the signal only has to be emitted once. */
    once?: boolean;
}

/**
 * Signals in Sunar correspond to events in discord.js. They allow you to handle various actions and responses that occur within your Discord bot, such as messages being sent, users joining or leaving, and more.
 *
 * @template TName - The Discord.js event name type
 *
 * @example
 * ```typescript
 * const ready = new Signal('ready', { once: true });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/signal} for signal documentation
 * @see {@link https://sunar.js.org/docs/guides/working-with-signals} for signals guide
 */
export class Signal<TName extends SignalName = SignalName> implements Pick<Builder, "type" | "protectors" | "execute"> {
    readonly type: Builders.Signal = Builders.Signal;
    readonly name: TName;
    readonly options: SignalOptions;

    protectors: Protector<{ signals: TName[] }>[] = [];
    execute: (...args: ClientEvents[TName]) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(name: TName, options: SignalOptions = {}) {
        this.name = name;
        this.options = options;
    }
}
