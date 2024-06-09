import type {
	AnySelectMenuInteraction,
	Awaitable,
	ChannelSelectMenuInteraction,
	ComponentType,
	MentionableSelectMenuInteraction,
	RoleSelectMenuInteraction,
	SelectMenuType,
	StringSelectMenuInteraction,
	UserSelectMenuInteraction,
} from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { type AcceptsArgs, type Builder, Builders, type InteractionAccepts } from '../../types';

export interface SelectMenuOptions {
	id: string | RegExp;
	type: SelectMenuType;
}

export interface SelectMenuAccepts extends InteractionAccepts {}

export class SelectMenu<TOptions extends SelectMenuOptions = SelectMenuOptions> implements Builder {
	public readonly type = Builders.SelectMenu;
	public readonly options: TOptions;

	public accepts?: SelectMenuAccepts;
	public protectors?: Protector<{ components: 'selectMenu'[] }>[];
	public execute?: (...args: SelectMenuArgs<TOptions>) => Awaitable<unknown>;

	constructor(options: TOptions) {
		this.options = options;
	}
}

export const selectMenuAcceptsArgs: AcceptsArgs<AnySelectMenuInteraction, SelectMenuAccepts> = interactionAcceptsArgs;

export type SelectMenuArgs<TOptions extends SelectMenuOptions> = [
	interaction: TOptions['type'] extends ComponentType.ChannelSelect
		? ChannelSelectMenuInteraction
		: TOptions['type'] extends ComponentType.MentionableSelect
			? MentionableSelectMenuInteraction
			: TOptions['type'] extends ComponentType.RoleSelect
				? RoleSelectMenuInteraction
				: TOptions['type'] extends ComponentType.StringSelect
					? StringSelectMenuInteraction
					: TOptions['type'] extends ComponentType.UserSelect
						? UserSelectMenuInteraction
						: AnySelectMenuInteraction,
];
