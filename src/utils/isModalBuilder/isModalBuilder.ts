import { isBuilder } from '..';
import { Modal } from '../../builders';
import { Builders } from '../../types';

export function isModalBuilder(builder: any): builder is Modal {
	if (!isBuilder(builder)) return false;
	return builder instanceof Modal && builder.type === Builders.Modal;
}
