import type { AnySelectMenuInteraction } from 'discord.js';
import { handleAccepts } from '..';
import { selectMenuAcceptsArgs } from '../../builders';
import { selectMenus } from '../../stores';
import { handleProtectors } from '../protectors';

export async function handleSelectMenu(interaction: AnySelectMenuInteraction) {
	const component = selectMenus.find(({ options }) => {
		if (options.type !== interaction.componentType) return false;
		if (options.id instanceof RegExp) return options.id.test(interaction.customId);
		return options.id === interaction.customId;
	});

	if (!component) return;

	if (typeof component.execute !== 'function') return;

	const accepted = await handleAccepts({ interaction, accepts: component.accepts, args: selectMenuAcceptsArgs });
	if (!accepted) return; // TODO: Add the ability to handle when not accepted

	const canContinue = await handleProtectors({ protectors: component.protectors, data: interaction });
	if (!canContinue) return;

	const result = await component.execute(interaction);

	if (!result) return;

	// TODO: handle the result of the component execution
}