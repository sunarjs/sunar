import { Events } from 'discord.js';

export const Signals = {
	...Events,
	Cooldown: 'cooldown',
} as const;

export const Commands = {
	Slash: 'slash',
	ContextMenu: 'contextMenu',
	Autocomplete: 'autocomplete',
} as const;

export const Components = {
	Button: 'button',
	Modal: 'modal',
	SelectMenu: 'selectMenu',
} as const;
