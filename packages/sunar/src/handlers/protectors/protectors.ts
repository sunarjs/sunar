import type { Protector, ProtectorExecuteData } from '../../builders';
import { PROTECTOR_NEXT_SYMBOL } from '../../symbols';

export interface HandleProtectorsOptions<TProtectors extends Protector[]> {
	protectors?: TProtectors;
	data: ProtectorExecuteData<TProtectors[number]['options']>;
}

export async function handleProtectors<TProtectors extends Protector[]>({
	protectors,
	data,
}: HandleProtectorsOptions<TProtectors>): Promise<boolean> {
	if (!protectors || protectors.length <= 0) return true;

	for (const protector of protectors) {
		if (typeof protector.execute !== 'function') continue;

		// FIXME: Improve types, "never" should not be used here
		const result = await protector.execute(data as never, () => PROTECTOR_NEXT_SYMBOL);

		if (result !== PROTECTOR_NEXT_SYMBOL) return false;
	}

	return true;
}
