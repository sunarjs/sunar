import type {
	ApplicationCommandType,
	Awaitable,
	ContextMenuCommandInteraction,
	MessageApplicationCommandData,
	MessageContextMenuCommandInteraction,
	UserApplicationCommandData,
	UserContextMenuCommandInteraction,
} from 'discord.js';

import type { Protector } from '.';
import { UNHANDLED_SYMBOL } from '../symbols';
import type { Builder, CommandConfig } from '../types';
import { Builders } from '../utils';

export type ContextMenuData = MessageApplicationCommandData | UserApplicationCommandData;

export interface ContextMenuConfig extends CommandConfig {}

/**
 * Context menu commands are available directly in the right-click context menu for users or messages. These commands are convenient for quick actions without needing to type a command.
 *
 * @see https://sunar.js.org/docs/builders/context-menu
 */
export class ContextMenu<TData extends ContextMenuData = ContextMenuData> implements Builder {
	public readonly type = Builders.ContextMenu;
	public readonly data: TData;

	public config: ContextMenuConfig = {};
	public protectors: Protector<{ commands: 'contextMenu'[] }>[] = [];
	public execute: (...args: ContextMenuArgs<TData>) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

	constructor(data: TData) {
		this.data = data;
	}
}

export type ContextMenuArgs<TData extends ContextMenuData> = [
	interaction: TData['type'] extends ApplicationCommandType.Message
		? MessageContextMenuCommandInteraction
		: TData['type'] extends ApplicationCommandType.User
			? UserContextMenuCommandInteraction
			: ContextMenuCommandInteraction,
];
