import type { Protector } from '../../builders';
import type { ProtectableBuilder } from '../../types';

// FIXME: Improve types, "any" should not be used here
export function protect<TBuilder extends ProtectableBuilder>(builder: TBuilder, protectors: Protector[]): Protector[] {
	builder.protectors ??= [];
	builder.protectors.push(...(protectors as any));
	return builder.protectors;
}
