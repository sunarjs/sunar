import type { Builder } from '../../types';

export type ExecutableBuilder = Pick<Builder, 'type' | 'execute'>;

export function execute<TBuilder extends ExecutableBuilder>(builder: TBuilder, execute: TBuilder['execute']): void {
	if (typeof execute !== 'function') return;
	builder.execute = execute;
}
