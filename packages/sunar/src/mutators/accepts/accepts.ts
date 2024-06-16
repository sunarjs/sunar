import type { Awaitable } from 'discord.js';
import type { Builder } from '../..';
import { isObject } from '../../utils';

export type AcceptFunction<TValue, InputArray = false> = InputArray extends true
	? (values: TValue[]) => Awaitable<boolean>
	: (value: TValue) => Awaitable<boolean>;

export type Accept<TValue, InputArray = false> = TValue | TValue[] | RegExp | AcceptFunction<TValue, InputArray>;

export type AcceptableBuilder = Pick<Builder, 'type' | 'accepts'>;

export function accepts<TBuilder extends AcceptableBuilder>(builder: TBuilder, accepts: TBuilder['accepts']): void {
	if (!isObject(builder.accepts)) return;
	builder.accepts = accepts;
}