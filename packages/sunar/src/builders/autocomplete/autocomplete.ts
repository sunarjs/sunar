import type { AutocompleteFocusedOption, AutocompleteInteraction, Awaitable } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { UNHANDLED_SYMBOL } from '../../symbols';
import type { AcceptsArgs, Builder, InteractionAccepts } from '../../types';
import { Builders } from '../../utils';

export interface AutocompleteOptions {
	name: string | RegExp;
	commandName?: string | RegExp;
}

export interface AutocompleteAccepts extends InteractionAccepts {}

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
