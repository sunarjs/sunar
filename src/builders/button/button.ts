import type { Awaitable, ButtonInteraction } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import type { AcceptsArgs, Builder } from '../../types';
import { Builders, type InteractionAccepts } from '../../types';

export interface ButtonAccepts extends InteractionAccepts {}

export interface ButtonComponentData {
	id: string | RegExp;
}

export class Button implements Builder {
	public readonly type = Builders.Button;
	public readonly data: ButtonComponentData;

	public accepts?: ButtonAccepts;
	public protectors?: Protector<{ components: 'button'[] }>[];
	public execute?: (interaction: ButtonInteraction) => Awaitable<unknown>;

	constructor(data: ButtonComponentData) {
		this.data = data;
	}
}

export const buttonAcceptsArgs: AcceptsArgs<ButtonInteraction, ButtonAccepts> = interactionAcceptsArgs;
