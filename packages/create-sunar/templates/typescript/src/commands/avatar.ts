import { ApplicationCommandOptionType } from 'discord.js';
import { Slash, execute } from 'sunar';

const slash = new Slash({
	name: 'avatar',
	description: 'Show user avatar',
	options: [
		{
			name: 'target',
			description: 'Target user',
			type: ApplicationCommandOptionType.User,
		},
	],
});

execute(slash, (interaction) => {
	const user = interaction.options.getUser('target') ?? interaction.user;
	const avatarURL = user.displayAvatarURL({ size: 1024, forceStatic: false });

	interaction.reply({
		content: `Avatar of user **${interaction.user.username}**`,
		files: [avatarURL],
	});
});

export { slash };
