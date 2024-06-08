import type { ExecutableBuilder } from '../../types';

export function execute<TBuilder extends ExecutableBuilder>(builder: TBuilder, execute: TBuilder['execute']): void {
	builder.execute = execute;
	builder.execute;
}
