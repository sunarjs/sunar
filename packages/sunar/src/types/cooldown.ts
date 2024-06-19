import type { CooldownScope } from '..';

export interface CooldownTimestamp {
	targetId: string | symbol;
	expiration: number;
	timer: NodeJS.Timeout;
}

export type CooldownResolvable = number | CooldownConfig;

export type CooldownConfig<TScope extends CooldownScope = CooldownScope> = TScope extends CooldownScope.Global
	? {
			time: number;
			limit?: number;
			scope: CooldownScope.Global;
		}
	: {
			time: number;
			exclude?: string[];
			limit?: number;
			scope?: TScope;
		};

export interface CooldownContext {
	remaining: number;
	scope: CooldownScope;
	limit: number;
}
