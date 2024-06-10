import type { Awaitable, ModalSubmitInteraction } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { type AcceptsArgs, Builders, type ExecutableBuilder, type InteractionAccepts } from '../../types';

export interface ModalAccepts extends InteractionAccepts {}

export interface ModalOptions {
	id: string | RegExp;
}

export class Modal implements ExecutableBuilder {
	public readonly type = Builders.Modal;
	public readonly options: ModalOptions;

	public accepts?: ModalAccepts;
	public execute?: (interaction: ModalSubmitInteraction) => Awaitable<unknown>;
	public protectors?: Protector<{ components: 'modal'[] }>[] | undefined;

	constructor(options: ModalOptions) {
		this.options = options;
	}
}

export const modalAcceptsArgs: AcceptsArgs<ModalSubmitInteraction, ModalAccepts> = interactionAcceptsArgs;
