import type { ChatInputCommandInteraction } from 'discord.js';

import { handleCooldown } from '..';
import { slashCommands } from '../../stores';
import { handleProtectors } from '../protectors';

/**
 * Handle a chat input interaction.
 * @param interaction The chat input interaction to handle
 *
 * @see https://sunar.js.org/docs/guides/interactions-handling
 */
export async function handleSlash(interaction: ChatInputCommandInteraction) {
	const command = slashCommands.get(interaction.commandName);

	if (!command) return;

	const onCooldown = handleCooldown(interaction, command);
	if (onCooldown) return;

	if (typeof command.execute !== 'function') return;

	const canContinue = await handleProtectors({ protectors: command.protectors, data: interaction });
	if (!canContinue) return;

	const result = await command.execute(interaction);

	if (!result) return;

	// TODO: handle the result of the command execution
}
