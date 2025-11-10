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
} from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder, CooldownResolvable } from "~/types";

export interface SelectMenuOptions {
    /** The select menu custom ID to target. */
    id: string | RegExp;
    /** The type of select menu to target. */
    type: SelectMenuType;
}

export interface SelectMenuConfig {
    cooldown?: CooldownResolvable;
}

/**
 * Select menus allow users to choose from a list of options.
 * They are useful for forms, surveys, or any scenario where the user needs to make a selection from multiple choices.
 *
 * @template TOptions - The select menu options type extending SelectMenuOptions
 *
 * @example
 * ```typescript
 * const roleSelect = new SelectMenu({
 *   id: 'role-selection',
 *   type: ComponentType.RoleSelect
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/select-menu} for select menu documentation
 */
export class SelectMenu<TOptions extends SelectMenuOptions = SelectMenuOptions> implements Builder {
    readonly type: Builders.SelectMenu = Builders.SelectMenu;
    readonly options: TOptions;

    config: SelectMenuConfig = {};
    protectors: Protector<{ components: "selectMenu"[] }>[] = [];
    execute: (...args: SelectMenuArgs<TOptions>) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(options: TOptions) {
        this.options = options;
    }
}

export type SelectMenuArgs<TOptions extends SelectMenuOptions> = [
    interaction: TOptions["type"] extends ComponentType.ChannelSelect
        ? ChannelSelectMenuInteraction
        : TOptions["type"] extends ComponentType.MentionableSelect
          ? MentionableSelectMenuInteraction
          : TOptions["type"] extends ComponentType.RoleSelect
            ? RoleSelectMenuInteraction
            : TOptions["type"] extends ComponentType.StringSelect
              ? StringSelectMenuInteraction
              : TOptions["type"] extends ComponentType.UserSelect
                ? UserSelectMenuInteraction
                : AnySelectMenuInteraction,
];
