import type { Awaitable } from 'discord.js';
import type { AcceptableBuilder } from '../../types';

export type AcceptFunction<TValue, InputArray = false> = InputArray extends true
	? (values: TValue[]) => Awaitable<boolean>
	: (value: TValue) => Awaitable<boolean>;

export type Accept<TValue, InputArray = false> = TValue | TValue[] | RegExp | AcceptFunction<TValue, InputArray>;

export function accepts<TBuilder extends AcceptableBuilder>(builder: TBuilder, accepts: TBuilder['accepts']): void {
	builder.accepts = accepts;
	builder.accepts;
}
