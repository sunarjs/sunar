import { isBuilder } from '..';
import { Signal } from '../../builders';
import { Builders } from '../../types';

export function isSignalBuilder(builder: any): builder is Signal {
	if (!isBuilder(builder)) return false;
	const hasName = 'name' in builder;
	return builder instanceof Signal && builder.type === Builders.Signal && hasName;
}
