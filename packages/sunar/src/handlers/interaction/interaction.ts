import type { Interaction } from 'discord.js';

import { handleAutocomplete, handleModal, handleSelectMenu, handleSlash } from '..';
import { handleButton } from '../button';
import { handleContextMenu } from '../contextMenu';

export async function handleInteraction(interaction: Interaction) {
	if (interaction.isChatInputCommand()) await handleSlash(interaction);
	if (interaction.isContextMenuCommand()) await handleContextMenu(interaction);
	if (interaction.isModalSubmit()) await handleModal(interaction);
	if (interaction.isButton()) await handleButton(interaction);
	if (interaction.isAnySelectMenu()) await handleSelectMenu(interaction);
	if (interaction.isAutocomplete()) await handleAutocomplete(interaction);
}
