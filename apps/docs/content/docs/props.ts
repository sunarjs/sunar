import type { CooldownResolvable, config, execute, protect } from "sunar";

export type {
    AutocompleteOptions,
    ButtonConfig,
    ButtonOptions,
    ContextMenuConfig,
    ContextMenuData,
    CooldownConfig,
    GroupConfig,
    ModalConfig,
    ModalOptions,
    ProtectorOptions,
    SelectMenuConfig,
    SelectMenuOptions,
    SignalOptions,
    SlashConfig,
    SlashParentCommandDataInput,
    SlashParentConfig,
    SlashSubcommandConfig,
    SunarSignals,
} from "sunar";

export interface ICooldownResolvable {
    CooldownResolvable: CooldownResolvable;
}

export interface IExecuteMut {
    execute: typeof execute;
}

export interface IProtectMut {
    protect: typeof protect;
}

export interface IConfigMut {
    config: typeof config;
}
