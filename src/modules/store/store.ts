import { buttons, contextMenuCommands, modals, signals, slashCommands } from '../../stores';
import { isButtonBuilder, isContextMenuBuilder, isObject, isSignalBuilder, isSlashBuilder } from '../../utils';
import { isModalBuilder } from '../../utils/isModalBuilder';

export function storeModules(modules: unknown[]) {
	for (const module of modules) {
		if (!isObject(module)) return;

		const values = Object.values(module);

		for (const value of values) {
			if (isSignalBuilder(value)) signals.set(Symbol(), value);
			if (isSlashBuilder(value)) slashCommands.set(value.data.name, value);
			if (isContextMenuBuilder(value)) contextMenuCommands.set(value.data.name, value);
			if (isButtonBuilder(value)) buttons.set(Symbol(), value);
			if (isModalBuilder(value)) modals.set(Symbol(), value);
		}
	}
}
