import type { AutocompleteFocusedOption, AutocompleteInteraction, Awaitable } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { UNHANDLED_SYMBOL } from '../../symbols';
import type { AcceptsArgs, Builder, InteractionAccepts } from '../../types';
import { Builders } from '../../utils';

export interface AutocompleteOptions {
	/** The name of the command option that has autocomplete enabled. */
	name: string | RegExp;
	/** Filters the autocomplete execution by the command name. */
	commandName?: string | RegExp;
}

export interface AutocompleteAccepts extends InteractionAccepts {}

/**
 * Autocomplete commands enhance the user experience by providing suggestions while the user is typing. They are particularly useful for commands with multiple options or extensive inputs.
 *
 * @see https://sunar.js.org/docs/builders/autocomplete
 */
export class Autocomplete implements Omit<Builder, 'config'> {
	public readonly type = Builders.Autocomplete;
	public readonly options: AutocompleteOptions;

	public accepts: AutocompleteAccepts = {};
	public protectors: Protector<{ commands: 'autocomplete'[] }>[] = [];
	public execute: (interaction: AutocompleteInteraction, option: AutocompleteFocusedOption) => Awaitable<unknown> =
		() => UNHANDLED_SYMBOL;

	constructor(options: AutocompleteOptions) {
		this.options = options;
	}
}

export const autocompleteAcceptsArgs: AcceptsArgs<AutocompleteInteraction, AutocompleteAccepts> =
	interactionAcceptsArgs;
