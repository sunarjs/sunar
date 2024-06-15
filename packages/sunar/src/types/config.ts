import type { CooldownScope } from '../utils';

export interface CommandConfig {
	cooldown?: CooldownResolvable;
	guildIds?: string[];
}

export type Cooldown = {
	config: CommandConfig;
};

export type CooldownResolvable = number | CommandConfig;

export interface CooldownConfig<TScope extends CooldownScope = CooldownScope> {
	time: number;
	exclude?: string[];
	limit?: number;
	scope?: TScope;
}
