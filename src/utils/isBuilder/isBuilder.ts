import { isObject } from '..';
import { type Builder, Builders } from '../../types';

export function isBuilder(builder: any): builder is Builder {
	if (!isObject(builder)) return false;
	const hasType = 'type' in builder;
	return hasType && typeof builder.type === 'number' && Boolean(Builders[builder.type]);
}
