import type { Awaitable, ClientEvents } from 'discord.js';

import type { Protector } from '..';
import { UNHANDLED_SYMBOL } from '../../symbols';
import type { Builder } from '../../types';
import { Builders } from '../../utils';

type SignalName = keyof ClientEvents;

export interface SignalOptions {
	once?: boolean;
}

export class Signal<TName extends SignalName = SignalName> implements Pick<Builder, 'type' | 'protectors' | 'execute'> {
	public readonly type = Builders.Signal;
	public readonly name: TName;
	public readonly options: SignalOptions;

	public protectors: Protector<{ signals: TName[] }>[] = [];
	public execute: (...args: ClientEvents[TName]) => Awaitable<unknown> = () => UNHANDLED_SYMBOL;

	constructor(name: TName, options: SignalOptions = {}) {
		this.name = name;
		this.options = options;
	}
}
