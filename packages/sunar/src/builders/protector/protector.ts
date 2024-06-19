import type {
	AnySelectMenuInteraction,
	AutocompleteInteraction,
	Awaitable,
	ButtonInteraction,
	ChatInputCommandInteraction,
	ClientEvents,
	ContextMenuCommandInteraction,
	ModalSubmitInteraction,
} from 'discord.js';

import { UNHANDLED_SYMBOL } from '../../symbols';
import type { Builder, CommandKey, ComponentKey, NextFunction } from '../../types';
import { Builders, Commands, Components } from '../../utils';

export interface ProtectorOptions {
	/** The signals that can be protected by this protector. */
	signals?: (keyof ClientEvents)[];
	/** The commands types that can be protected by this protector. */
	commands?: CommandKey[];
	/** The components types that can be protected by this protector. */
	components?: ComponentKey[];
}

/**
 * Protectors in Sunar act as middleware, allowing you to intercept and control the flow of commands and interactions within your Discord bot. They provide a flexible way to enforce permissions, validate inputs, or perform pre-processing before executing commands.
 *
 * @see https://sunar.js.org/docs/builders/protector
 * @see https://sunar.js.org/docs/guides/middlewares#protectors
 */
export class Protector<TOptions extends ProtectorOptions = ProtectorOptions>
	implements Pick<Builder, 'type' | 'execute'>
{
	public readonly type = Builders.Protector;
	public readonly options: TOptions;

	public execute: (
		data:
			| (TOptions['commands'] extends string[] ? ExecuteData[TOptions['commands'][number]] : never)
			| (TOptions['components'] extends string[] ? ExecuteData[TOptions['components'][number]] : never)
			| (TOptions['signals'] extends string[] ? ClientEvents[TOptions['signals'][number]] : never),
		next: NextFunction,
	) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

	public constructor(options?: TOptions) {
		this.options = options ?? ({} as TOptions);
	}
}

export interface ExecuteData {
	[Commands.Slash]: ChatInputCommandInteraction;
	[Commands.ContextMenu]: ContextMenuCommandInteraction;
	[Commands.Autocomplete]: AutocompleteInteraction;
	[Components.Button]: ButtonInteraction;
	[Components.Modal]: ModalSubmitInteraction;
	[Components.SelectMenu]: AnySelectMenuInteraction;
}

export type ProtectorExecuteData<TOptions extends ProtectorOptions = ProtectorOptions> =
	| (TOptions['commands'] extends string[] ? ExecuteData[TOptions['commands'][number]] : never)
	| (TOptions['components'] extends string[] ? ExecuteData[TOptions['components'][number]] : never)
	| (TOptions['signals'] extends string[] ? ClientEvents[TOptions['signals'][number]] : never);
