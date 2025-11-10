import type { AnySelectMenuInteraction } from "discord.js";

import { handleCooldown, handleProtectors } from "~/handlers";
import { selectMenus } from "~/stores";

/**
 * Handles a select menu interaction by finding the matching component and executing it.
 * Supports both string and regex-based ID matching with component type validation.
 *
 * @param {AnySelectMenuInteraction} interaction - The select menu interaction to handle.
 *
 * @see {@link https://sunar.js.org/docs/guides/interactions-handling} for interaction handling guide
 */
export async function handleSelectMenu(interaction: AnySelectMenuInteraction): Promise<unknown> {
    const component = selectMenus.find(({ options }) => {
        if (options.type !== interaction.componentType) return false;
        if (options.id instanceof RegExp) return options.id.test(interaction.customId);
        return options.id === interaction.customId;
    });

    if (!component) return;

    const onCooldown = handleCooldown(interaction, component);
    if (onCooldown) return;

    if (typeof component.execute !== "function") return;

    const canContinue = await handleProtectors({ protectors: component.protectors, data: interaction });
    if (!canContinue) return;

    const result = await component.execute(interaction);

    return result;
}
