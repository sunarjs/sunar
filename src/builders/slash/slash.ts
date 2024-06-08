import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { type AcceptsArgs, type Builder, Builders, type InteractionAccepts } from '../../types';

export interface SlashAccepts extends InteractionAccepts {}

export class Slash implements Builder {
	public readonly type = Builders.Slash;
	public readonly data: ChatInputApplicationCommandData;

	public accepts?: SlashAccepts;
	public protectors?: Protector<{ commands: 'slash'[] }>[];
	public execute?: (interaction: ChatInputCommandInteraction) => Awaitable<unknown>;

	constructor(data: ChatInputApplicationCommandData) {
		this.data = data;
	}
}

export const slashAcceptsArgs: AcceptsArgs<ChatInputCommandInteraction, SlashAccepts> = interactionAcceptsArgs;
