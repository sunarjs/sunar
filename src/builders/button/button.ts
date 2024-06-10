import type { Awaitable, ButtonInteraction } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import type { AcceptsArgs, ExecutableBuilder } from '../../types';
import { Builders, type InteractionAccepts } from '../../types';

export interface ButtonOptions {
	id: string | RegExp;
}

export interface ButtonAccepts extends InteractionAccepts {}

export class Button implements ExecutableBuilder {
	public readonly type = Builders.Button;
	public readonly options: ButtonOptions;

	public accepts?: ButtonAccepts;
	public protectors?: Protector<{ components: 'button'[] }>[];
	public execute?: (interaction: ButtonInteraction) => Awaitable<unknown>;

	constructor(options: ButtonOptions) {
		this.options = options;
	}
}

export const buttonAcceptsArgs: AcceptsArgs<ButtonInteraction, ButtonAccepts> = interactionAcceptsArgs;
