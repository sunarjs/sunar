import type { Awaitable, ModalSubmitInteraction } from "discord.js";

import { UNHANDLED_SYMBOL } from "~/symbols";
import { Builders } from "~/utils";

import type { Protector } from "~/builders";
import type { Builder, CooldownResolvable } from "~/types";

export interface ModalOptions {
    /** The modal custom ID to target. */
    id: string | RegExp;
}

export interface ModalConfig {
    cooldown?: CooldownResolvable;
}

/**
 * Modals are popup forms that can collect detailed user input.
 * They are particularly useful for complex interactions that require multiple fields or steps.
 *
 * @example
 * ```typescript
 * const feedbackModal = new Modal({
 *   id: 'feedback-form'
 * });
 *
 * // Or with regex for dynamic IDs
 * const dynamicModal = new Modal({
 *   id: /^edit-profile-\d+$/
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/builders/modal} for modal documentation
 */
export class Modal implements Builder {
    readonly type: Builders.Modal = Builders.Modal;
    readonly options: ModalOptions;

    config: ModalConfig = {};
    protectors: Protector<{ components: "modal"[] }>[] = [];
    execute: (interaction: ModalSubmitInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

    constructor(options: ModalOptions) {
        this.options = options;
    }
}
