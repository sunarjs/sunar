import type { Awaitable, ChatInputApplicationCommandData, ChatInputCommandInteraction } from 'discord.js';

import type { Protector } from '.';
import { UNHANDLED_SYMBOL } from '../symbols';
import type { Builder, CommandConfig } from '../types';
import { Builders } from '../utils';

export interface SlashConfig extends CommandConfig {}

/**
 * Slash commands are one of the primary ways users interact with bots. They provide a structured way for users to issue commands directly within the chat interface.
 *
 * @see https://sunar.js.org/docs/builders/slash
 */
export class Slash implements Builder {
	public readonly type = Builders.Slash;
	public readonly data: ChatInputApplicationCommandData;

	public config: SlashConfig = {};
	public protectors: Protector<{ commands: 'slash'[] }>[] = [];
	public execute: (interaction: ChatInputCommandInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

	constructor(data: ChatInputApplicationCommandData) {
		this.data = data;
	}
}
