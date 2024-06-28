import type { AnySelectMenuInteraction } from 'discord.js';
import { handleCooldown } from '..';
import { selectMenus } from '../../stores';
import { handleProtectors } from '../protectors';

/**
 * Handle a select menu interaction.
 * @param interaction The select menu interaction to handle
 *
 * @see https://sunar.js.org/docs/guides/interactions-handling
 */
export async function handleSelectMenu(interaction: AnySelectMenuInteraction) {
	const component = selectMenus.find(({ options }) => {
		if (options.type !== interaction.componentType) return false;
		if (options.id instanceof RegExp) return options.id.test(interaction.customId);
		return options.id === interaction.customId;
	});

	if (!component) return;

	const onCooldown = handleCooldown(interaction, component);
	if (onCooldown) return;

	if (typeof component.execute !== 'function') return;

	const canContinue = await handleProtectors({ protectors: component.protectors, data: interaction });
	if (!canContinue) return;

	const result = await component.execute(interaction);

	if (!result) return;

	// TODO: handle the result of the component execution
}
