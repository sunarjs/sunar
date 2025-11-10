import type {
    AnySelectMenuInteraction,
    AutocompleteInteraction,
    Awaitable,
    ButtonInteraction,
    ChatInputCommandInteraction,
    ClientEvents,
    ContextMenuCommandInteraction,
    ModalSubmitInteraction,
} from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders, Commands, Components } from "~/utils";

import type { Builder, CommandKey, ComponentKey, NextFunction } from "~/types";

export interface ProtectorOptions {
    /** The signals that can be protected by this protector. */
    signals?: (keyof ClientEvents)[];
    /** The commands types that can be protected by this protector. */
    commands?: CommandKey[];
    /** The components types that can be protected by this protector. */
    components?: ComponentKey[];
}

/**
 * Protectors in Sunar act as middleware, allowing you to intercept and control the flow of commands and interactions within your Discord bot. They provide a flexible way to enforce permissions, validate inputs, or perform pre-processing before executing commands.
 *
 * @template TOptions - The protector options type extending ProtectorOptions
 *
 * @example
 * ```typescript
 * const adminOnly = new Protector({
 *   commands: ['slash']
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/protector} for protector documentation
 * @see {@link https://sunar.js.org/docs/guides/middlewares#protectors} for middleware guide
 */
export class Protector<TOptions extends ProtectorOptions = ProtectorOptions> implements Pick<Builder, "type" | "execute"> {
    readonly type: Builders.Protector = Builders.Protector;
    readonly options: TOptions;

    execute: (
        data:
            | (TOptions["commands"] extends string[] ? ExecuteData[TOptions["commands"][number]] : never)
            | (TOptions["components"] extends string[] ? ExecuteData[TOptions["components"][number]] : never)
            | (TOptions["signals"] extends string[] ? ClientEvents[TOptions["signals"][number]] : never),
        next: NextFunction,
    ) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(options?: TOptions) {
        this.options = options ?? ({} as TOptions);
    }
}

export interface ExecuteData {
    [Commands.Slash]: ChatInputCommandInteraction;
    [Commands.ContextMenu]: ContextMenuCommandInteraction;
    [Commands.Autocomplete]: AutocompleteInteraction;
    [Components.Button]: ButtonInteraction;
    [Components.Modal]: ModalSubmitInteraction;
    [Components.SelectMenu]: AnySelectMenuInteraction;
}

export type ProtectorExecuteData<TOptions extends ProtectorOptions = ProtectorOptions> =
    | (TOptions["commands"] extends string[] ? ExecuteData[TOptions["commands"][number]] : never)
    | (TOptions["components"] extends string[] ? ExecuteData[TOptions["components"][number]] : never)
    | (TOptions["signals"] extends string[] ? ClientEvents[TOptions["signals"][number]] : never);
