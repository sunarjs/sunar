import { autocompletes, buttons, contextMenuCommands, modals, selectMenus, signals, slashCommands } from '../../stores';
import {
	isAutocompleteBuilder,
	isButtonBuilder,
	isContextMenuBuilder,
	isModalBuilder,
	isObject,
	isSelectMenuBuilder,
	isSignalBuilder,
	isSlashBuilder,
} from '../../utils';

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
			if (isSelectMenuBuilder(value)) selectMenus.set(Symbol(), value);
			if (isAutocompleteBuilder(value)) autocompletes.set(Symbol(), value);
		}
	}
}
