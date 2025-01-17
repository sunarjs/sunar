import type { MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction } from "discord.js";
import { handleCooldown } from "..";
import { contextMenuCommands } from "../../stores";
import { handleProtectors } from "../protectors";

/**
 * Handle a context menu interaction.
 * @param interaction The context menu interaction to handle
 *
 * @see https://sunar.js.org/docs/guides/interactions-handling
 */
export async function handleContextMenu(
    interaction: UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction,
) {
    const command = contextMenuCommands.get(interaction.commandName);

    if (!command) return;

    const onCooldown = handleCooldown(interaction, command);
    if (onCooldown) return;

    if (typeof command.execute !== "function") return;

    const canContinue = await handleProtectors({ protectors: command.protectors, data: interaction });
    if (!canContinue) return;

    const result = await command.execute(interaction);

    if (!result) return;

    // TODO: handle the result of the command execution
}
