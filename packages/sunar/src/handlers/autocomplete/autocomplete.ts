import type { AutocompleteInteraction } from "discord.js";
import { autocompletes } from "../../stores";
import { handleProtectors } from "../protectors";

/**
 * Handle an autocomplete interaction.
 * @param interaction The autocomplete interaction to handle
 *
 * @see https://sunar.js.org/docs/guides/interactions-handling
 */
export async function handleAutocomplete(interaction: AutocompleteInteraction) {
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

    if (!result) return;

    // TODO: handle the result of the command execution
}
