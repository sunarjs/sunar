import type { ContextMenuCommandInteraction } from 'discord.js';
import { handleAccepts } from '..';
import { contextMenuAcceptsArgs } from '../../builders';
import { contextMenuCommands } from '../../stores';
import { handleProtectors } from '../protectors';

/**
 * Handle a context menu interaction.
 * @param interaction The context menu interaction to handle
 */
export async function handleContextMenu(interaction: ContextMenuCommandInteraction) {
	const command = contextMenuCommands.get(interaction.commandName);

	if (!command) return;

	if (typeof command.execute !== 'function') return;

	const accepted = await handleAccepts({ interaction, accepts: command.accepts, args: contextMenuAcceptsArgs });
	if (!accepted) return; // TODO: Add the ability to handle when not accepted

	const canContinue = await handleProtectors({ protectors: command.protectors, data: interaction });
	if (!canContinue) return;

	const result = await command.execute(interaction);

	if (!result) return;

	// TODO: handle the result of the command execution
}
