import type { BaseInteraction, LocaleString, PermissionResolvable } from 'discord.js';

import type { Accept } from '../mutators';

export type Accepts = Record<string, Accept<any>>;

export interface InteractionAccepts {
	userId?: Accept<string>;
	channelId?: Accept<string>;
	guildId?: Accept<string>;
	guildLocale?: Accept<LocaleString>;
	clientPermissions?: Accept<PermissionResolvable, true>;
	memberPermissions?: Accept<PermissionResolvable, true>;
	memberRoles?: Accept<string, true>;
}

export type AcceptsEntry<A extends Accepts = Accepts> = [keyof A, A[keyof A]];
export type AcceptsArgs<I extends BaseInteraction = BaseInteraction, A extends Accepts = Accepts> = Record<
	keyof A,
	(interaction: I) => string | string[]
>;
