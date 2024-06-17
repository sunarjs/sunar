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
import { UNHANDLED_SYMBOL } from '../../symbols';
import type { AcceptsArgs, Builder, CooldownResolvable, InteractionAccepts } from '../../types';
import { Builders } from '../../utils';

export interface SelectMenuOptions {
	/** The select menu custom ID to target. */
	id: string | RegExp;
	/** The type of select menu to target. */
	type: SelectMenuType;
}

export interface SelectMenuAccepts extends InteractionAccepts {}

export interface SelectMenuConfig {
	cooldown?: CooldownResolvable;
}

/**
 * Select menus allow users to choose from a list of options. They are useful for forms, surveys, or any scenario where the user needs to make a selection from multiple choices.
 *
 * @see https://sunar.js.org/docs/components/select-menus
 */
export class SelectMenu<TOptions extends SelectMenuOptions = SelectMenuOptions> implements Builder {
	public readonly type = Builders.SelectMenu;
	public readonly options: TOptions;

	public config: SelectMenuConfig = {};
	public accepts: SelectMenuAccepts = {};
	public protectors: Protector<{ components: 'selectMenu'[] }>[] = [];
	public execute: (...args: SelectMenuArgs<TOptions>) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

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
