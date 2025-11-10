import type {
    ApplicationCommandType,
    Awaitable,
    ContextMenuCommandInteraction,
    MessageApplicationCommandData,
    MessageContextMenuCommandInteraction,
    UserApplicationCommandData,
    UserContextMenuCommandInteraction,
} from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder, CommandConfig } from "~/types";

export type ContextMenuData = MessageApplicationCommandData | UserApplicationCommandData;

export interface ContextMenuConfig extends CommandConfig {}

/**
 * Context menu commands are available directly in the right-click context menu for users or messages.
 * These commands are convenient for quick actions without needing to type a command.
 *
 * @template TData - The context menu data type (MessageApplicationCommandData or UserApplicationCommandData)
 *
 * @example
 * ```typescript
 * const userInfo = new ContextMenu({
 *   name: 'User Info',
 *   type: ApplicationCommandType.User
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/context-menu} for context menu documentation
 */
export class ContextMenu<TData extends ContextMenuData = ContextMenuData> implements Builder {
    readonly type: Builders.ContextMenu = Builders.ContextMenu;
    readonly data: TData;

    config: ContextMenuConfig = {};
    protectors: Protector<{ commands: "contextMenu"[] }>[] = [];
    execute: (...args: ContextMenuArgs<TData>) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(data: TData) {
        this.data = data;
    }
}

export type ContextMenuArgs<TData extends ContextMenuData> = [
    interaction: TData["type"] extends ApplicationCommandType.Message
        ? MessageContextMenuCommandInteraction
        : TData["type"] extends ApplicationCommandType.User
          ? UserContextMenuCommandInteraction
          : ContextMenuCommandInteraction,
];
