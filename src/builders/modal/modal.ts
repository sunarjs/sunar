import type { Awaitable, ModalSubmitInteraction } from 'discord.js';

import type { Protector } from '..';
import { interactionAcceptsArgs } from '../../accepts';
import { type AcceptsArgs, type Builder, Builders, type InteractionAccepts } from '../../types';

export interface ModalAccepts extends InteractionAccepts {}

export interface ModalComponentData {
	id: string | RegExp;
}

export class Modal implements Builder {
	public readonly type = Builders.Modal;
	public readonly data: ModalComponentData;

	public accepts?: ModalAccepts;
	public execute?: (interaction: ModalSubmitInteraction) => Awaitable<unknown>;
	public protectors?: Protector<{ components: 'modal'[] }>[] | undefined;

	constructor(data: ModalComponentData) {
		this.data = data;
	}
}

export const modalAcceptsArgs: AcceptsArgs<ModalSubmitInteraction, ModalAccepts> = interactionAcceptsArgs;
