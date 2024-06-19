import type { CooldownResolvable } from '..';

export interface CommandConfig {
	cooldown?: CooldownResolvable;
	guildIds?: string[];
}
