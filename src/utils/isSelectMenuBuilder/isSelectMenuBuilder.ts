import { isBuilder } from '..';
import { SelectMenu } from '../../builders';
import { Builders } from '../../types';

export function isSelectMenuBuilder(builder: any): builder is SelectMenu {
	if (!isBuilder(builder)) return false;
	return builder instanceof SelectMenu && builder.type === Builders.SelectMenu;
}
