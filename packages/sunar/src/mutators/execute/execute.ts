import type { Builder } from '../../types';

export type ExecutableBuilder = Pick<Builder, 'type' | 'execute'>;

/**
 * Set the function to execute when an executable builder is accepted.
 *
 * @param builder The builder to mutate
 * @param execute Callback function to execute when a builder is accepted
 *
 * @see https://sunar.js.org/docs/mutators/execute
 */
export function execute<TBuilder extends ExecutableBuilder>(builder: TBuilder, execute: TBuilder['execute']): void {
	if (typeof execute !== 'function') return;
	builder.execute = execute;
}
