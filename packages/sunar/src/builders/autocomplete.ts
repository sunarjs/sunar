import type { AutocompleteFocusedOption, AutocompleteInteraction, Awaitable } from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder } from "~/types";

export interface AutocompleteOptions {
    /** The name of the command option that has autocomplete enabled. */
    name: string | RegExp;
    /** Filters the autocomplete execution by the command name. */
    commandName?: string | RegExp;
}

/**
 * Autocomplete commands enhance the user experience by providing suggestions while the user is typing.
 * They are particularly useful for commands with multiple options or extensive inputs.
 *
 * @example
 * ```typescript
 * const cityAutocomplete = new Autocomplete({
 *   name: 'city',
 *   commandName: 'weather'
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/autocomplete} for autocomplete documentation
 */
export class Autocomplete implements Omit<Builder, "config"> {
    readonly type: Builders.Autocomplete = Builders.Autocomplete;
    readonly options: AutocompleteOptions;

    protectors: Protector<{ commands: "autocomplete"[] }>[] = [];
    execute: (interaction: AutocompleteInteraction, option: AutocompleteFocusedOption) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(options: AutocompleteOptions) {
        this.options = options;
    }
}
