import type { Awaitable, ModalSubmitInteraction } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { UNHANDLED_SYMBOL } from '../../symbols';
import type { AcceptsArgs, Builder, CooldownResolvable, InteractionAccepts } from '../../types';
import { Builders } from '../../utils';

export interface ModalAccepts extends InteractionAccepts {}

export interface ModalOptions {
	/** The modal custom ID to target. */
	id: string | RegExp;
}

export interface ModalConfig {
	cooldown?: CooldownResolvable;
}

/**
 * Modals are popup forms that can collect detailed user input. They are particularly useful for complex interactions that require multiple fields or steps.
 *
 * @see https://sunar.js.org/docs/builders/modal
 */
export class Modal implements Builder {
	public readonly type = Builders.Modal;
	public readonly options: ModalOptions;

	public config: ModalConfig = {};
	public accepts: ModalAccepts = {};
	public protectors: Protector<{ components: 'modal'[] }>[] = [];
	public execute: (interaction: ModalSubmitInteraction) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

	constructor(options: ModalOptions) {
		this.options = options;
	}
}

export const modalAcceptsArgs: AcceptsArgs<ModalSubmitInteraction, ModalAccepts> = interactionAcceptsArgs;
