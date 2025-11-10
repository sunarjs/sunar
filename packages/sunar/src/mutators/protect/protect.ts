import type { Protector } from "~/builders";
import type { Builder } from "~/types";

export type ProtectableBuilder = Pick<Builder, "type" | "protectors">;

// FIXME: Improve types, "any" should not be used here

/**
 * Adds middleware (protectors) to a builder for authorization, validation, or pre-processing.
 * Protectors act as guards that can prevent execution or modify behavior before the main logic runs.
 *
 * @template TBuilder - The builder type extending ProtectableBuilder
 * @param {TBuilder} builder - The builder object to add protectors to.
 * @param {Protector[]} protectors - Array of protector middleware to add to the builder.
 *
 * @returns {Protector[]} The updated protectors array after adding new protectors.
 *
 * @example
 * ```typescript
 * const adminCommand = new Slash({ name: 'admin', description: 'Admin only' });
 * protect(adminCommand, [adminOnlyProtector, cooldownProtector]);
 * ```
 *
 * @see {@link https://sunar.js.org/docs/mutators/protect} for protect mutator documentation
 * @see {@link https://sunar.js.org/docs/guides/middlewares#create-the-protector-logic} for protector creation guide
 * @see {@link https://sunar.js.org/docs/guides/middlewares#create-a-protected-command} for protected command guide
 */
export function protect<TBuilder extends ProtectableBuilder>(builder: TBuilder, protectors: Protector[]): Protector[] {
    if (!Array.isArray(builder.protectors)) return builder.protectors;
    builder.protectors.push(...(protectors as any));
    return builder.protectors;
}
