import { Collection } from 'discord.js';

import type { Button, ContextMenu, Modal, Signal, Slash } from '../builders';

export const signals = new Collection<symbol, Signal>();

export const slashCommands = new Collection<string, Slash>();

export const contextMenuCommands = new Collection<string, ContextMenu>();

export const buttons = new Collection<symbol, Button>();

export const modals = new Collection<symbol, Modal>();
