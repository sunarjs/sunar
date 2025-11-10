import { Collection } from "discord.js";

import type { Autocomplete, Button, ContextMenu, Group, Modal, SelectMenu, Signal, Slash, SlashParent, SlashSubcommand } from "~/builders";
import type { CooldownTimestamp } from "~/types";
import type { Builders, CooldownScope } from "~/utils";

export const signals: Collection<symbol, Signal> = new Collection();

export const groups: Collection<string, Group> = new Collection();

export const slashCommands: Collection<string, Slash> = new Collection();

export const slashParents: Collection<string, SlashParent> = new Collection();

export const slashSubcommands: Collection<string, SlashSubcommand> = new Collection();

export const contextMenuCommands: Collection<string, ContextMenu> = new Collection();

export const buttons: Collection<symbol, Button> = new Collection();

export const modals: Collection<symbol, Modal> = new Collection();

export const selectMenus: Collection<symbol, SelectMenu> = new Collection();

export const autocompletes: Collection<symbol, Autocomplete> = new Collection();

export const cooldownManager: Collection<Builders, Collection<CooldownScope, Collection<string, CooldownTimestamp[]>>> = new Collection();

export const signalListeners: Collection<symbol, { eventName: string; listener: (...args: any[]) => void }> = new Collection();
