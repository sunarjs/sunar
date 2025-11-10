import type { AutocompleteInteraction } from "discord.js";

import { handleProtectors } from "~/handlers";
import { autocompletes } from "~/stores";

/**
 * Handles an autocomplete interaction by finding the matching autocomplete handler and executing it.
 * Supports both string and regex-based matching for option names and command names.
 *
 * @param {AutocompleteInteraction} interaction - The autocomplete interaction to handle.
 *
 * @see {@link https://sunar.js.org/docs/guides/interactions-handling} for interaction handling guide
 */
export async function handleAutocomplete(interaction: AutocompleteInteraction): Promise<unknown> {
    const focused = interaction.options.getFocused(true);

    const command = autocompletes.find(({ options }) => {
        if (options.name instanceof RegExp) return options.name.test(focused.name);
        if (options.commandName instanceof RegExp) return options.commandName.test(interaction.commandName);
        if (options.commandName && options.commandName !== interaction.commandName) return false;
        return options.name === focused.name;
    });

    if (!command) return;

    if (typeof command.execute !== "function") return;

    const canContinue = await handleProtectors({ protectors: command.protectors, data: interaction });
    if (!canContinue) return;

    const result = await command.execute(interaction, focused);

    return result;
}
