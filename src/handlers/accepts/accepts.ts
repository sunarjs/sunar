import type { BaseInteraction } from 'discord.js';
import type { Accepts, AcceptsArgs, AcceptsEntry } from '../../types';
import { isRegex } from '../../utils';

export interface HandleAcceptsOptions<I extends BaseInteraction = BaseInteraction, A extends Accepts = Accepts> {
	interaction: I;
	accepts?: A;
	args: AcceptsArgs<I, A>;
}

export async function handleAccepts<I extends BaseInteraction, A extends Accepts>({
	interaction,
	accepts,
	args,
}: HandleAcceptsOptions<I, A>): Promise<boolean> {
	if (!accepts) return true;

	const entries = Object.entries(accepts) as AcceptsEntry<A>[];

	for (const entry of entries) {
		const isAccepted = await handleAcceptsEntry({ interaction, entry, args });
		if (!isAccepted) return false;
	}

	return true;
}

export interface HandleAcceptsEntryOptions<I extends BaseInteraction = BaseInteraction, A extends Accepts = Accepts> {
	interaction: I;
	entry: AcceptsEntry<A>;
	args: AcceptsArgs<I, A>;
}

async function handleAcceptsEntry<I extends BaseInteraction, A extends Accepts>({
	interaction,
	entry,
	args,
}: HandleAcceptsEntryOptions<I, A>): Promise<boolean> {
	const [key, accept] = entry;

	const value = args[key](interaction);
	const isArrayValue = Array.isArray(value);

	if (isRegex(accept)) return isArrayValue ? value.every((e) => accept.test(e)) : accept.test(value);

	if (typeof accept === 'function') return accept(value);

	if (typeof accept === 'string') return isArrayValue ? value.includes(accept) : accept === value;

	if (Array.isArray(accept)) {
		return isArrayValue ? accept.every((e: string) => value.includes(e)) : accept.includes(value);
	}

	return true;
}
