import type {
	config,
	execute,
	protect,
	CooldownResolvable,
} from 'sunar';

export type {
	AutocompleteOptions,
	ContextMenuData,
	SignalOptions,
	ButtonOptions,
	SelectMenuOptions,
	ModalOptions,
} from 'sunar';

export type {
	ContextMenuConfig,
	ModalConfig,
	SlashConfig,
	ButtonConfig,
	SelectMenuConfig,
	CooldownConfig,
	GroupConfig,
} from 'sunar';

export interface ICooldownResolvable {
	CooldownResolvable: CooldownResolvable
}

export interface IExecuteMut {
	execute: typeof execute
}

export interface IProtectMut {
	protect: typeof protect
}

export interface IConfigMut {
	config: typeof config
}