import { CooldownScope } from '../..';
import type { CooldownConfig, CooldownResolvable } from '../../types';

export function resolveCooldown(cooldown: CooldownResolvable): Required<CooldownConfig> & { exclude: string[] } {
	const isNumber = typeof cooldown === 'number';
	const isGlobalScope = !isNumber && cooldown.scope === CooldownScope.Global;

	let time: number;

	let scope = CooldownScope.User;
	let limit = 1;

	let exclude: string[] = [];

	if (isNumber) {
		time = cooldown;
	} else {
		if (cooldown.scope) scope = cooldown.scope;
		if (cooldown.limit) limit = cooldown.limit;
		time = cooldown.time;

		if (!isGlobalScope) {
			exclude = cooldown.exclude ?? [];
		}
	}

	return { time, limit, scope, exclude };
}
