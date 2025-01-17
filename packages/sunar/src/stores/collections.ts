import { Collection } from "discord.js";

import type { CooldownTimestamp } from "..";
import type { Autocomplete, Button, ContextMenu, Group, Modal, SelectMenu, Signal, Slash } from "../builders";
import type { Builders, CooldownScope } from "../utils";

export const signals = new Collection<symbol, Signal>();

export const groups = new Collection<string, Group>();

export const slashCommands = new Collection<string, Slash>();

export const contextMenuCommands = new Collection<string, ContextMenu>();

export const buttons = new Collection<symbol, Button>();

export const modals = new Collection<symbol, Modal>();

export const selectMenus = new Collection<symbol, SelectMenu>();

export const autocompletes = new Collection<symbol, Autocomplete>();

export const cooldownManager = new Collection<
    Builders,
    Collection<CooldownScope, Collection<string, CooldownTimestamp[]>>
>();
