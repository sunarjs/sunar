import type { Protector } from '../../builders';
import type { Builder } from '../../types';

export type ProtectableBuilder = Pick<Builder, 'type' | 'protectors'>;

// FIXME: Improve types, "any" should not be used here
/**
 * Add a middleware to a builder.
 * @param builder The builder to mutate
 * @param protectors An array of protectors that will be added to the builder
 * @returns The new protectors array
 */
export function protect<TBuilder extends ProtectableBuilder>(builder: TBuilder, protectors: Protector[]): Protector[] {
	if (!Array.isArray(builder.protectors)) return builder.protectors;
	builder.protectors.push(...(protectors as any));
	return builder.protectors;
}
