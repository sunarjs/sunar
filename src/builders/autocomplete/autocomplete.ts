import type { AutocompleteFocusedOption, AutocompleteInteraction, Awaitable } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import type { AcceptsArgs, Builder } from '../../types';
import { Builders, type InteractionAccepts } from '../../types';

export interface AutocompleteOptions {
	name: string | RegExp;
	commandName?: string | RegExp;
}

export interface AutocompleteAccepts extends InteractionAccepts {}

export class Autocomplete implements Builder {
	public readonly type = Builders.Autocomplete;
	public readonly options: AutocompleteOptions;

	public accepts?: AutocompleteAccepts;
	public protectors?: Protector<{ commands: 'autocomplete'[] }>[];
	public execute?: (interaction: AutocompleteInteraction, option: AutocompleteFocusedOption) => Awaitable<unknown>;

	constructor(options: AutocompleteOptions) {
		this.options = options;
	}
}

export const autocompleteAcceptsArgs: AcceptsArgs<AutocompleteInteraction, AutocompleteAccepts> =
	interactionAcceptsArgs;
