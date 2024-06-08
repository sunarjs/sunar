import { isBuilder } from '..';
import { Button } from '../../builders';
import { Builders } from '../../types';

export function isButtonBuilder(builder: any): builder is Button {
	if (!isBuilder(builder)) return false;
	return builder instanceof Button && builder.type === Builders.Button;
}
