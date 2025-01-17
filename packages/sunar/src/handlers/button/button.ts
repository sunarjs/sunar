import type { ButtonInteraction } from "discord.js";

import { handleCooldown } from "..";
import { buttons } from "../../stores";
import { handleProtectors } from "../protectors";

/**
 * Handle a button interaction.
 * @param interaction The button interaction to handle
 *
 * @see https://sunar.js.org/docs/guides/interactions-handling
 */
export async function handleButton(interaction: ButtonInteraction) {
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

    if (!result) return;

    // TODO: handle the result of the component execution
}
