import { isObject } from "~/utils";

import type { Builder } from "~/types";

export type ConfigurableBuilder = Pick<Builder, "type" | "config">;

/**
 * Applies the specified configuration to a given builder, allowing dynamic configuration of slash commands.
 *
 * @template TBuilder
 * @param {TBuilder} builder - The builder object that will be mutated.
 * @param {TBuilder['config']} config - The configuration to apply to the builder.
 *
 * @see {@link https://sunar.js.org/docs/mutators/config} for mutators documentation
 * @see {@link https://sunar.js.org/docs/guides/implementing-cooldowns} for cooldowns guide
 * @see {@link https://sunar.js.org/docs/guides/registering-commands#register-commands-dynamically} for guild IDs guide
 */
export function config<TBuilder extends ConfigurableBuilder>(builder: TBuilder, config: TBuilder["config"]): void {
    if (!isObject(config)) return;
    builder.config = config;
}
