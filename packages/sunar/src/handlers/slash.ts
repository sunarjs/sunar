import type { ChatInputCommandInteraction } from "discord.js";

import { handleCooldown, handleProtectors, handleSubcommands } from "~/handlers";
import { slashCommands } from "~/stores";

/**
 * Handles a chat input (slash command) interaction.
 * Processes both regular slash commands and subcommands with cooldown and protector checks.
 *
 * @param {ChatInputCommandInteraction} interaction - The slash command interaction to handle.
 *
 * @returns {Promise<unknown>} The result of the command execution, if any.
 *
 * @see {@link https://sunar.js.org/docs/guides/interactions-handling} for interaction handling guide
 */
export async function handleSlash(interaction: ChatInputCommandInteraction): Promise<unknown> {
    const command = slashCommands.get(interaction.commandName);
    if (!command) return;

    const group = interaction.options.getSubcommandGroup(false);
    const sub = interaction.options.getSubcommand(false);

    if ((group && sub) || sub) return handleSubcommands(command, interaction, { group, sub });

    const onCooldown = handleCooldown(interaction, command);
    if (onCooldown) return;

    const canContinue = await handleProtectors({ protectors: command.protectors, data: interaction });
    if (!canContinue) return;

    if (typeof command.execute !== "function") return;

    const result = await command.execute(interaction);

    return result;
}
