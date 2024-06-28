import type { Awaitable, ButtonInteraction } from 'discord.js';

import type { Protector } from '.';
import { UNHANDLED_SYMBOL } from '../symbols';
import type { Builder, CooldownResolvable } from '../types';
import { Builders } from '../utils';

export interface ButtonOptions {
	/** The button custom ID to target. */
	id: string | RegExp;
}

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
	public protectors: Protector<{ components: 'button'[] }>[] = [];
	public execute: (interaction: ButtonInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

	constructor(options: ButtonOptions) {
		this.options = options;
	}
}
