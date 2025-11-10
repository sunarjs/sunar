import type { CooldownScope } from "~/utils";

/** Represents a timestamp for a cooldown. */
export interface CooldownTimestamp {
    /** The ID of the target (user, channel, guild, or global) for the cooldown. */
    targetId: string | symbol;

    /** The expiration time of the cooldown in milliseconds. */
    expiration: number;

    /** The timer associated with the cooldown. */
    timer: NodeJS.Timeout;
}

/**
 * A type that resolves to a cooldown configuration.
 * Can be either a number (milliseconds) or a more detailed configuration object.
 */
export type CooldownResolvable = number | CooldownConfig;

/** Configuration for cooldowns. */
export type CooldownConfig<TScope extends CooldownScope = CooldownScope> = TScope extends CooldownScope.Global
    ? {
          /** The cooldown time in milliseconds. */
          time: number;

          /** Optional limit for the number of uses before the cooldown applies. */
          limit?: number;

          /** The scope of the cooldown, set to global. */
          scope: CooldownScope.Global;
      }
    : {
          /** The cooldown time in milliseconds. */
          time: number;

          /** Optional array of IDs to exclude from the cooldown. */
          exclude?: string[];

          /** Optional limit for the number of uses before the cooldown applies. */
          limit?: number;

          /** The scope of the cooldown, defaults to the provided scope. */
          scope?: TScope;
      };

/** Context for the cooldown. */
export interface CooldownContext {
    /** The remaining time of the cooldown in milliseconds. */
    remaining: number;

    /** The scope of the cooldown. */
    scope: CooldownScope;

    /** The limit for the number of uses before the cooldown applies. */
    limit: number;
}
