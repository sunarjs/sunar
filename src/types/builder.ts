import { type Awaitable, Events } from 'discord.js';
import type { Autocomplete, Button, ContextMenu, Modal, Protector, Signal, Slash } from '../builders';
import type { SelectMenu } from '../builders';

export type ProtectableBuilder = Signal | Slash | ContextMenu | Modal | Button | SelectMenu | Autocomplete;
export type AcceptableBuilder = Slash | ContextMenu | SelectMenu | Modal | Button | Autocomplete;
export type ExecutableBuilder = Signal | Slash | ContextMenu | SelectMenu | Modal | Button | Protector | Autocomplete;
export type AnyBuilder = Protector | ProtectableBuilder | ExecutableBuilder | AcceptableBuilder;

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

export type CommandKey = (typeof Commands)[keyof typeof Commands];

export const Components = {
	Button: 'button',
	Modal: 'modal',
	SelectMenu: 'selectMenu',
} as const;

export type ComponentKey = (typeof Components)[keyof typeof Components];

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
