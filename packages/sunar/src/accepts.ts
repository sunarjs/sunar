import type { BaseInteraction } from 'discord.js';

import type { AcceptsArgs, InteractionAccepts } from './types';

export const interactionAcceptsArgs: AcceptsArgs<BaseInteraction, InteractionAccepts> = {
	userId: (i) => i.user.id,
	guildId: (i) => i.guildId ?? '',
	channelId: (i) => i.channelId ?? '',
	guildLocale: (i) => i.guildLocale ?? '',
	clientPermissions: (i) => {
		if (!i.guild?.members.me) return [];
		return i.guild.members.me.permissions.toArray();
	},
	memberPermissions: (i) => {
		if (!i.memberPermissions) return [];
		return i.memberPermissions.toArray();
	},
	memberRoles: (i) => {
		if (!i.member) return [];
		if (Array.isArray(i.member.roles)) return i.member.roles;
		return i.member.roles.cache.map((r) => r.id);
	},
};
