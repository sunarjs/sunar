import type { ButtonInteraction } from "discord.js";

import { handleCooldown, handleProtectors } from "~/handlers";
import { buttons } from "~/stores";

/**
 * Handles a button interaction by finding the matching component and executing it.
 * Applies cooldown and protector checks before execution.
 *
 * @param {ButtonInteraction} interaction - The button interaction to handle.
 *
 * @see {@link https://sunar.js.org/docs/guides/interactions-handling} for interaction handling guide
 */
export async function handleButton(interaction: ButtonInteraction): Promise<unknown> {
    const component = buttons.find(({ options }) => {
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
