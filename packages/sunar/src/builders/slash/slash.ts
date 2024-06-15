import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { UNHANDLED_SYMBOL } from '../../symbols';
import type { AcceptsArgs, Builder, CommandConfig, InteractionAccepts } from '../../types';
import { Builders } from '../../utils';

export interface SlashAccepts extends InteractionAccepts {}

export interface SlashConfig extends CommandConfig {}

export class Slash implements Builder {
	public readonly type = Builders.Slash;
	public readonly data: ChatInputApplicationCommandData;

	public config: SlashConfig = {};
	public accepts: SlashAccepts = {};
	public protectors: Protector<{ commands: 'slash'[] }>[] = [];
	public execute: (interaction: ChatInputCommandInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

	constructor(data: ChatInputApplicationCommandData) {
		this.data = data;
	}
}

export const slashAcceptsArgs: AcceptsArgs<ChatInputCommandInteraction, SlashAccepts> = interactionAcceptsArgs;
