import type { ChatInputCommandInteraction } from 'discord.js';

import type { Slash } from '../../builders';
import { groups } from '../../stores';
import { getGroupStoreKey } from '../../utils';
import { handleCooldown } from '../cooldown';
import { handleProtectors } from '../protectors';

export interface HandleGroupOptions {
	parent: string | null;
	sub: string | null;
}

export async function handleSubcommands(
	command: Slash,
	interaction: ChatInputCommandInteraction,
	{ parent, sub }: HandleGroupOptions,
) {
	const root = interaction.commandName;

	const groupStoreKey = getGroupStoreKey(root, parent, sub);

	const group = groups.get(groupStoreKey);
	if (!group) return;

	const cooldownBuilder = group.config.cooldown ? group : command;

	const onCooldown = handleCooldown(interaction, cooldownBuilder);
	if (onCooldown) return;

	const protectors = command.protectors.concat(group.protectors);

	const canContinue = await handleProtectors({ protectors, data: interaction });
	if (!canContinue) return;

	typeof group.execute !== 'function' && console.log('execute not function');
	if (typeof group.execute !== 'function') return;

	const result = await group.execute(interaction);

	if (!result) return;
}
