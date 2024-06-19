import type { ChatInputCommandInteraction } from 'discord.js';

import { handleCooldown } from '..';
import { slashAcceptsArgs } from '../../builders';
import { slashCommands } from '../../stores';
import { handleAccepts } from '../accepts';
import { handleProtectors } from '../protectors';

/**
 * Handle a chat input interaction.
 * @param interaction The chat input interaction to handle
 */
export async function handleSlash(interaction: ChatInputCommandInteraction) {
	const command = slashCommands.get(interaction.commandName);

	if (!command) return;

	const onCooldown = handleCooldown(interaction, command);
	if (onCooldown) return;

	if (typeof command.execute !== 'function') return;

	const accepted = await handleAccepts({ interaction, accepts: command.accepts, args: slashAcceptsArgs });
	if (!accepted) return; // TODO: Add the ability to handle when not accepted

	const canContinue = await handleProtectors({ protectors: command.protectors, data: interaction });
	if (!canContinue) return;

	const result = await command.execute(interaction);

	if (!result) return;

	// TODO: handle the result of the command execution
}
