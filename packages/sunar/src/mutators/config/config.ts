import type { Builder } from '../../types';
import { isObject } from '../../utils';

export type ConfigurableBuilder = Pick<Builder, 'type' | 'config'>;

/** NOT SUPPORTED */
export function config<TBuilder extends ConfigurableBuilder>(builder: TBuilder, config: TBuilder['config']): void {
	if (!isObject(config)) return;
	builder.config = config;
}
