import type { ApplicationCommandSubCommandData, ApplicationCommandSubGroupData } from "discord.js";

import { Slash } from "~/builders";
import {
    autocompletes,
    buttons,
    contextMenuCommands,
    groups,
    modals,
    selectMenus,
    signals,
    slashCommands,
    slashParents,
    slashSubcommands,
} from "~/stores";
import {
    getSubcommandKey,
    isAutocompleteBuilder,
    isButtonBuilder,
    isContextMenuBuilder,
    isGroupBuilder,
    isModalBuilder,
    isObject,
    isSelectMenuBuilder,
    isSignalBuilder,
    isSlashBuilder,
    isSlashParentBuilder,
    isSlashSubcommandBuilder,
} from "~/utils";

/**
 * Stores all builders found in the provided modules into their respective collections.
 * This function processes imported modules and categorizes builders by type, then builds
 * complex slash command structures from parents and subcommands.
 *
 * @param {unknown[]} modules - Array of imported modules to process and store.
 *
 * @internal
 */
export function storeModules(modules: unknown[]): void {
    for (const module of modules) {
        if (!isObject(module)) continue; // Skip invalid modules, don't stop processing

        const values = Object.values(module);

        for (const value of values) {
            if (isSignalBuilder(value)) signals.set(Symbol(), value);
            if (isSlashBuilder(value)) slashCommands.set(value.data.name, value);
            if (isGroupBuilder(value)) groups.set(getSubcommandKey(value), value);
            if (isSlashParentBuilder(value)) slashParents.set(value.data.name, value);
            if (isSlashSubcommandBuilder(value)) slashSubcommands.set(getSubcommandKey(value), value);
            if (isContextMenuBuilder(value)) contextMenuCommands.set(value.data.name, value);
            if (isButtonBuilder(value)) buttons.set(Symbol(), value);
            if (isModalBuilder(value)) modals.set(Symbol(), value);
            if (isSelectMenuBuilder(value)) selectMenus.set(Symbol(), value);
            if (isAutocompleteBuilder(value)) autocompletes.set(Symbol(), value);
        }

        // Build slash commands from parents and their subcommands
        slashParents.each((parent) => {
            const parentName = parent.data.name;
            const relevantSubcommands = slashSubcommands.filter(({ parent: subParent }) => subParent === parentName);

            if (relevantSubcommands.size === 0) return;

            // Separate grouped and ungrouped subcommands
            const subcommandsByGroup = new Map<string, ApplicationCommandSubCommandData[]>();
            const ungroupedSubcommands: ApplicationCommandSubCommandData[] = [];

            relevantSubcommands.each(({ group, data }) => {
                if (group) {
                    // Grouped subcommand
                    if (!subcommandsByGroup.has(group)) {
                        subcommandsByGroup.set(group, []);
                    }
                    subcommandsByGroup.get(group)?.push(data);
                } else {
                    // Ungrouped subcommand
                    ungroupedSubcommands.push(data);
                }
            });

            // Build the options for the slash command
            const allOptions: (ApplicationCommandSubGroupData | ApplicationCommandSubCommandData)[] = [];

            // Add grouped subcommands (as subcommand groups)
            parent.data.options.forEach((groupOption) => {
                const groupSubcommands = subcommandsByGroup.get(groupOption.name) || [];
                if (groupSubcommands.length > 0) {
                    allOptions.push({
                        ...groupOption,
                        options: groupSubcommands,
                    });
                }
            });

            // Add ungrouped subcommands (as direct subcommands)
            allOptions.push(...ungroupedSubcommands);

            const builder = new Slash({
                ...parent.data,
                options: allOptions,
            });

            slashCommands.set(builder.data.name, builder);
        });
    }
}
