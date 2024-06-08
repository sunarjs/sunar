import type { Interaction } from 'discord.js';

import { handleModal, handleSlash } from '..';
import { handleContextMenu } from '../contextMenu';

export async function handleInteraction(interaction: Interaction) {
	if (interaction.isChatInputCommand()) await handleSlash(interaction);
	if (interaction.isContextMenuCommand()) await handleContextMenu(interaction);
	if (interaction.isModalSubmit()) await handleModal(interaction);
}
