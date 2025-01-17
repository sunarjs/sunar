import type { Awaitable, ClientEvents } from "discord.js";

import type { Protector } from ".";
import { UNHANDLED_SYMBOL } from "../symbols";
import type { Builder } from "../types";
import { Builders } from "../utils";

type SignalName = keyof ClientEvents;

export interface SignalOptions {
    /** If the signal only has to be emitted once. */
    once?: boolean;
}

/**
 * Signals in Sunar correspond to events in discord.js. They allow you to handle various actions and responses that occur within your Discord bot, such as messages being sent, users joining or leaving, and more.
 *
 * @see https://sunar.js.org/docs/builders/signal
 * @see https://sunar.js.org/docs/guides/working-with-signals
 */
export class Signal<TName extends SignalName = SignalName> implements Pick<Builder, "type" | "protectors" | "execute"> {
    public readonly type = Builders.Signal;
    public readonly name: TName;
    public readonly options: SignalOptions;

    public protectors: Protector<{ signals: TName[] }>[] = [];
    public execute: (...args: ClientEvents[TName]) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(name: TName, options: SignalOptions = {}) {
        this.name = name;
        this.options = options;
    }
}
