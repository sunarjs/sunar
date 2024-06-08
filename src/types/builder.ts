import { type Awaitable, Events } from 'discord.js';
import type { Button, ContextMenu, Protector, Signal, Slash } from '../builders';

export type ProtectableBuilder = Button | Signal | Slash | ContextMenu;
export type AcceptableBuilder = Button | Slash | ContextMenu;
export type ExecutableBuilder = Builder | Slash | ContextMenu | Signal;
export type AnyBuilder = Protector | ProtectableBuilder;

export interface Builder {
	readonly type: Builders;
	accepts?: object;
	protectors?: Protector[];
	execute?: (...args: any) => Awaitable<unknown>;
}

export const Signals = Events;

export const Commands = {
	Slash: 'slash',
	ContextMenu: 'contextMenu',
	Autocomplete: 'autocomplete',
} as const;

export type Command = (typeof Commands)[keyof typeof Commands];

export const Components = {
	Button: 'button',
	Modal: 'modal',
	SelectMenu: 'selectMenu',
} as const;

export type Component = (typeof Components)[keyof typeof Components];

export enum Builders {
	Slash = 0,
	SlashParent = 1,
	SlashGroup = 2,
	ContextMenu = 3,
	Protector = 4,
	Signal = 5,
	Button = 6,
	Modal = 7,
	SelectMenu = 8,
	Autocomplete = 9,
}
