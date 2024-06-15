import { Collection } from 'discord.js';

import type { Autocomplete, Button, ContextMenu, Modal, SelectMenu, Signal, Slash } from '../builders';
import type { CooldownResolvable } from '../types';

export const signals = new Collection<symbol, Signal>();

export const slashCommands = new Collection<string, Slash>();

export const contextMenuCommands = new Collection<string, ContextMenu>();

export const buttons = new Collection<symbol, Button>();

export const modals = new Collection<symbol, Modal>();

export const selectMenus = new Collection<symbol, SelectMenu>();

export const autocompletes = new Collection<symbol, Autocomplete>();

export const cooldowns = new Collection<symbol, Required<CooldownResolvable>>();
