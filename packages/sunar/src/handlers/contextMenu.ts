import type { MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";

import { handleCooldown, handleProtectors } from "~/handlers";
import { contextMenuCommands } from "~/stores";

/**
 * Handles a context menu interaction (right-click menu on users or messages).
 * Applies cooldown and protector checks before executing the command.
 *
 * @param {UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction} interaction - The context menu interaction to handle.
 *
 * @see {@link https://sunar.js.org/docs/guides/interactions-handling} for interaction handling guide
 */
export async function handleContextMenu(
    interaction: UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction,
): Promise<unknown> {
    const command = contextMenuCommands.get(interaction.commandName);

    if (!command) return;

    const onCooldown = handleCooldown(interaction, command);
    if (onCooldown) return;

    if (typeof command.execute !== "function") return;

    const canContinue = await handleProtectors({ protectors: command.protectors, data: interaction });
    if (!canContinue) return;

    const result = await command.execute(interaction);

    return result;
}
