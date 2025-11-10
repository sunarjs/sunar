import type { Awaitable, ButtonInteraction } from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder, CooldownResolvable } from "~/types";

export interface ButtonOptions {
    /** The button custom ID to target. */
    id: string | RegExp;
}

export interface ButtonConfig {
    cooldown?: CooldownResolvable;
}

/**
 * Buttons are interactive elements users can click to trigger specific actions.
 * They are ideal for creating interactive messages, such as confirmation prompts or menu navigation.
 *
 * @example
 * ```typescript
 * const confirmButton = new Button({
 *   id: 'confirm-action'
 * });
 *
 * // Or with regex for dynamic IDs
 * const dynamicButton = new Button({
 *   id: /^delete-\d+$/
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/button} for button documentation
 */
export class Button implements Builder {
    readonly type: Builders.Button = Builders.Button;
    readonly options: ButtonOptions;

    config: ButtonConfig = {};
    protectors: Protector<{ components: "button"[] }>[] = [];
    execute: (interaction: ButtonInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(options: ButtonOptions) {
        this.options = options;
    }
}
