import type {
	ApplicationCommandType,
	Awaitable,
	ContextMenuCommandInteraction,
	MessageApplicationCommandData,
	MessageContextMenuCommandInteraction,
	UserApplicationCommandData,
	UserContextMenuCommandInteraction,
} from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { UNHANDLED_SYMBOL } from '../../symbols';
import type { AcceptsArgs, Builder, CommandConfig, InteractionAccepts } from '../../types';
import { Builders } from '../../utils';

export type ContextMenuData = MessageApplicationCommandData | UserApplicationCommandData;

export interface ContextMenuAccepts extends InteractionAccepts {}

export interface ContextMenuConfig extends CommandConfig {}

/**
 * Context menu commands are available directly in the right-click context menu for users or messages. These commands are convenient for quick actions without needing to type a command.
 *
 * @see https://sunar.js.org/docs/commands/context-menus
 */
export class ContextMenu<TData extends ContextMenuData = ContextMenuData> implements Builder {
	public readonly type = Builders.ContextMenu;
	public readonly data: TData;

	public config: ContextMenuConfig = {};
	public accepts: ContextMenuAccepts = {};
	public protectors: Protector<{ commands: 'contextMenu'[] }>[] = [];
	public execute: (...args: ContextMenuArgs<TData>) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

	constructor(data: TData) {
		this.data = data;
	}
}

export const contextMenuAcceptsArgs: AcceptsArgs<ContextMenuCommandInteraction, ContextMenuAccepts> =
	interactionAcceptsArgs;

export type ContextMenuArgs<TData extends ContextMenuData> = [
	interaction: TData['type'] extends ApplicationCommandType.Message
		? MessageContextMenuCommandInteraction
		: TData['type'] extends ApplicationCommandType.User
			? UserContextMenuCommandInteraction
			: ContextMenuCommandInteraction,
];
