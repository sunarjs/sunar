import type { ButtonInteraction } from 'discord.js';
import { handleAccepts } from '..';
import { buttonAcceptsArgs } from '../../builders';
import { buttons } from '../../stores';
import { handleProtectors } from '../protectors';

/**
 * Handle a button interaction.
 * @param interaction The button interaction to handle
 */
export async function handleButton(interaction: ButtonInteraction) {
	const component = buttons.find(({ options }) => {
		if (options.id instanceof RegExp) return options.id.test(interaction.customId);
		return options.id === interaction.customId;
	});

	if (!component) return;

	if (typeof component.execute !== 'function') return;

	const accepted = await handleAccepts({ interaction, accepts: component.accepts, args: buttonAcceptsArgs });
	if (!accepted) return; // TODO: Add the ability to handle when not accepted

	const canContinue = await handleProtectors({ protectors: component.protectors, data: interaction });
	if (!canContinue) return;

	const result = await component.execute(interaction);

	if (!result) return;

	// TODO: handle the result of the component execution
}
