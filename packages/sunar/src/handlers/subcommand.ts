import type { ChatInputCommandInteraction } from "discord.js";

import { handleCooldown, handleProtectors } from "~/handlers";
import { slashSubcommands } from "~/stores";
import { getSubcommandKey } from "~/utils";

import type { Slash } from "~/builders";

export interface HandleGroupOptions {
    group: string | null;
    sub: string | null;
}

/**
 * Handles slash subcommand execution by finding and executing the appropriate subcommand.
 * Combines protectors from both parent command and subcommand for comprehensive protection.
 *
 * @param {Slash} command - The parent slash command.
 * @param {ChatInputCommandInteraction} interaction - The slash command interaction.
 * @param {HandleGroupOptions} options - Object containing group and sub command info.
 * @param {string | null} options.group - The subcommand group name, if any.
 * @param {string | null} options.sub - The subcommand name.
 *
 * @returns {Promise<unknown>} The result of the subcommand execution, if any.
 *
 * @internal
 */
export async function handleSubcommands(
    command: Slash,
    interaction: ChatInputCommandInteraction,
    { group, sub }: HandleGroupOptions,
): Promise<unknown> {
    const parent = interaction.commandName;

    const subcommandKey = getSubcommandKey(parent, group, sub);

    const subcommand = slashSubcommands.get(subcommandKey);
    if (!subcommand) return;

    const cooldownBuilder = subcommand.config.cooldown ? subcommand : command;

    const onCooldown = handleCooldown(interaction, cooldownBuilder);
    if (onCooldown) return;

    const protectors = command.protectors.concat(subcommand.protectors);

    const canContinue = await handleProtectors({ protectors, data: interaction });
    if (!canContinue) return;

    if (typeof subcommand.execute !== "function") return;

    const result = await subcommand.execute(interaction);

    return result;
}
