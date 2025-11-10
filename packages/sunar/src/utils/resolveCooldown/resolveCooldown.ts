import { CooldownScope } from "~/utils";

import type { CooldownConfig, CooldownResolvable } from "~/types";

/**
 * Resolves a cooldown configuration from either a number or a cooldown config object.
 * Normalizes the input into a complete cooldown configuration with all required properties.
 *
 * @param {CooldownResolvable} cooldown - Either a number (milliseconds) or a cooldown config object.
 *
 * @returns {Required<CooldownConfig> & { exclude: string[] }} A complete cooldown configuration.
 *
 * @example
 * ```typescript
 * // Simple number cooldown (5 seconds)
 * const config1 = resolveCooldown(5000);
 *
 * // Complex cooldown configuration
 * const config2 = resolveCooldown({
 *   time: 10000,
 *   scope: CooldownScope.Guild,
 *   limit: 3,
 *   exclude: ['123456789']
 * });
 * ```
 *
 * @internal
 */
export function resolveCooldown(cooldown: CooldownResolvable): Required<CooldownConfig> & { exclude: string[] } {
    const isNumber = typeof cooldown === "number";
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
