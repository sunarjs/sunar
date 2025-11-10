import type { Interaction } from "discord.js";

import { handleAutocomplete, handleButton, handleContextMenu, handleModal, handleSelectMenu, handleSlash } from "~/handlers";

/**
 * Handles all the interactions supported by Sunar framework.
 * Routes different interaction types to their appropriate handlers.
 *
 * @param {Interaction} interaction - The Discord interaction to handle.
 *
 * @see {@link https://sunar.js.org/docs/guides/interactions-handling} for interaction handling guide
 */
export async function handleInteraction(interaction: Interaction): Promise<void> {
    if (interaction.isChatInputCommand()) await handleSlash(interaction);
    if (interaction.isContextMenuCommand()) await handleContextMenu(interaction);
    if (interaction.isModalSubmit()) await handleModal(interaction);
    if (interaction.isButton()) await handleButton(interaction);
    if (interaction.isAnySelectMenu()) await handleSelectMenu(interaction);
    if (interaction.isAutocomplete()) await handleAutocomplete(interaction);
}
