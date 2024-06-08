import type { Awaitable, ClientEvents } from 'discord.js';

import type { Protector } from '..';
import { type Builder, Builders } from '../../types';

type SignalName = keyof ClientEvents;

export interface SignalOptions {
	once?: boolean;
}

export class Signal<TName extends SignalName = SignalName> implements Omit<Builder, 'accepts'> {
	public readonly type = Builders.Signal;
	public readonly name: TName;
	public readonly options: SignalOptions;

	public protectors?: Protector<{ signals: TName[] }>[];
	public execute?: (...args: ClientEvents[TName]) => Awaitable<unknown>;

	constructor(name: TName, options: SignalOptions = {}) {
		this.name = name;
		this.options = options;
	}
}
