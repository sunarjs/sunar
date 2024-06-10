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

import type { CommandKey, ComponentKey, Components, ExecutableBuilder, NextFunction } from '../../types';
import { Builders, Commands } from '../../types';

export interface ProtectorOptions {
	signals?: (keyof ClientEvents)[];
	commands?: CommandKey[];
	components?: ComponentKey[];
}

export class Protector<TOptions extends ProtectorOptions = ProtectorOptions>
	implements Omit<ExecutableBuilder, 'protectors' | 'accepts'>
{
	public readonly type = Builders.Protector;

	public options: TOptions;
	public execute?: (
		data:
			| (TOptions['commands'] extends string[] ? ExecuteData[TOptions['commands'][number]] : never)
			| (TOptions['components'] extends string[] ? ExecuteData[TOptions['components'][number]] : never)
			| (TOptions['signals'] extends string[] ? ClientEvents[TOptions['signals'][number]] : never),
		next: NextFunction,
	) => Awaitable<unknown>;

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
