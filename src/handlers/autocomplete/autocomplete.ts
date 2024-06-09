import type { AutocompleteInteraction } from 'discord.js';
import { handleAccepts } from '..';
import { autocompleteAcceptsArgs } from '../../builders';
import { autocompletes } from '../../stores';
import { handleProtectors } from '../protectors';

export async function handleAutocomplete(interaction: AutocompleteInteraction) {
	const focused = interaction.options.getFocused(true);

	const component = autocompletes.find(({ options }) => {
		if (options.name instanceof RegExp) return options.name.test(focused.name);
		if (options.commandName instanceof RegExp) return options.commandName.test(interaction.commandName);
		if (options.commandName && options.commandName !== interaction.commandName) return false;
		return options.name === focused.name;
	});

	if (!component) return;

	if (typeof component.execute !== 'function') return;

	const accepted = await handleAccepts({ interaction, accepts: component.accepts, args: autocompleteAcceptsArgs });
	if (!accepted) return; // TODO: Add the ability to handle when not accepted

	const canContinue = await handleProtectors({ protectors: component.protectors, data: interaction });
	if (!canContinue) return;

	const result = await component.execute(interaction, focused);

	if (!result) return;

	// TODO: handle the result of the command execution
}
