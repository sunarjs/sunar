import type { Builder } from '../../types';
import { isObject } from '../../utils';

export type ConfigurableBuilder = Pick<Builder, 'type' | 'config'>;

/**
 * Applies the specified configuration to a builder.
 *
 * @param builder The builder to mutate
 * @param config The configuration to apply
 *
 * @see https://sunar.js.org/docs/mutators/config
 * @see https://sunar.js.org/docs/guides/implementing-cooldowns
 * @see https://sunar.js.org/docs/guides/registering-commands/dynamic#specific-guilds-ids-commands
 */
export function config<TBuilder extends ConfigurableBuilder>(builder: TBuilder, config: TBuilder['config']): void {
	if (!isObject(config)) return;
	builder.config = config;
}
