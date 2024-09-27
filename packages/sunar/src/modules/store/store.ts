import {
	autocompletes,
	buttons,
	contextMenuCommands,
	groups,
	modals,
	selectMenus,
	signals,
	slashCommands,
} from '../../stores';
import {
	getGroupStoreKey,
	isAutocompleteBuilder,
	isButtonBuilder,
	isContextMenuBuilder,
	isGroupBuilder,
	isModalBuilder,
	isObject,
	isSelectMenuBuilder,
	isSignalBuilder,
	isSlashBuilder,
} from '../../utils';

/**
 * Store all the builders in the sunar collections.
 * @param modules The modules to store
 */
export function storeModules(modules: unknown[]) {
	for (const module of modules) {
		if (!isObject(module)) return;

		const values = Object.values(module);

		for (const value of values) {
			if (isSignalBuilder(value)) signals.set(Symbol(), value);
			if (isSlashBuilder(value)) slashCommands.set(value.data.name, value);
			if (isGroupBuilder(value)) groups.set(getGroupStoreKey(value), value);
			if (isContextMenuBuilder(value)) contextMenuCommands.set(value.data.name, value);
			if (isButtonBuilder(value)) buttons.set(Symbol(), value);
			if (isModalBuilder(value)) modals.set(Symbol(), value);
			if (isSelectMenuBuilder(value)) selectMenus.set(Symbol(), value);
			if (isAutocompleteBuilder(value)) autocompletes.set(Symbol(), value);
		}
	}
}
