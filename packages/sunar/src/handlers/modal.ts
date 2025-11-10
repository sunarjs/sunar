import type { ModalSubmitInteraction } from "discord.js";

import { handleCooldown, handleProtectors } from "~/handlers";
import { modals } from "~/stores";

/**
 * Handles a modal submit interaction by finding the matching component and executing it.
 * Applies cooldown and protector checks before execution.
 *
 * @param {ModalSubmitInteraction} interaction - The modal submit interaction to handle.
 *
 * @see {@link https://sunar.js.org/docs/guides/interactions-handling} for interaction handling guide
 */
export async function handleModal(interaction: ModalSubmitInteraction): Promise<unknown> {
    const component = modals.find(({ options }) => {
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
