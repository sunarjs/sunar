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
import { type AcceptsArgs, type Builder, Builders, type InteractionAccepts } from '../../types';

export type ContextMenuData = MessageApplicationCommandData | UserApplicationCommandData;

export interface ContextMenuAccepts extends InteractionAccepts {}

export class ContextMenu<TData extends ContextMenuData = ContextMenuData> implements Builder {
	public readonly type = Builders.ContextMenu;
	public readonly data: TData;

	public accepts?: ContextMenuAccepts;
	public protectors?: Protector<{ commands: 'contextMenu'[] }>[];
	public execute?: (...args: ContextMenuArgs<TData>) => Awaitable<unknown>;

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
