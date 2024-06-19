import type { Awaitable, ButtonInteraction } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { UNHANDLED_SYMBOL } from '../../symbols';
import type { AcceptsArgs, Builder, CooldownResolvable, InteractionAccepts } from '../../types';
import { Builders } from '../../utils';

export interface ButtonOptions {
	/** The button custom ID to target. */
	id: string | RegExp;
}

export interface ButtonAccepts extends InteractionAccepts {}

export interface ButtonConfig {
	cooldown?: CooldownResolvable;
}

/**
 * Buttons are interactive elements users can click to trigger specific actions. They are ideal for creating interactive messages, such as confirmation prompts or menu navigation.
 *
 * @see https://sunar.js.org/docs/builders/button
 */
export class Button implements Builder {
	public readonly type = Builders.Button;
	public readonly options: ButtonOptions;

	public config: ButtonConfig = {};
	public accepts: ButtonAccepts = {};
	public protectors: Protector<{ components: 'button'[] }>[] = [];
	public execute: (interaction: ButtonInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

	constructor(options: ButtonOptions) {
		this.options = options;
	}
}

export const buttonAcceptsArgs: AcceptsArgs<ButtonInteraction, ButtonAccepts> = interactionAcceptsArgs;
