import type { AnySelectMenuInteraction, ButtonInteraction, ModalSubmitInteraction } from 'discord.js';

export type Prettify<TObject> = { [TKey in keyof TObject]: TObject[TKey] } & {};
export type NextFunction = () => symbol;

export type ComponentInteraction = ButtonInteraction | ModalSubmitInteraction | AnySelectMenuInteraction;
