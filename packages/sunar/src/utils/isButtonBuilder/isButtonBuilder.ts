import { Builders, isBuilder } from '..';
import { Button } from '../../builders';

export function isButtonBuilder(builder: any): builder is Button {
	if (!isBuilder(builder)) return false;
	return builder instanceof Button && builder.type === Builders.Button;
}
