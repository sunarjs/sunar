import { isGroupBuilder, isSlashSubcommandBuilder } from "~/utils";

import type { Group, SlashSubcommand } from "~/builders";

/**
 * Generates a unique key for storing and retrieving subcommands based on their hierarchy.
 * Handles different input types including builder objects and string parameters.
 *
 * @param {string | SlashSubcommand | Group} parent - The parent command name or builder object.
 * @param {string | null} [group] - The subcommand group name, if any.
 * @param {string | null} [sub] - The subcommand name.
 *
 * @returns {string} A unique key string for the subcommand.
 *
 * @example
 * ```typescript
 * // For a grouped subcommand: music playlist add
 * const key1 = getSubcommandKey('music', 'playlist', 'add');
 * // Returns: 'music_playlist_add'
 *
 * // For an ungrouped subcommand: music play
 * const key2 = getSubcommandKey('music', null, 'play');
 * // Returns: 'music_play'
 * ```
 *
 * @internal
 */
export function getSubcommandKey(parent: string | SlashSubcommand | Group, group?: string | null, sub?: string | null): string {
    if (isGroupBuilder(parent)) {
        return `${parent.root}_${parent.parent && parent.sub ? `${parent.parent}_${parent.sub}` : parent.parent}`;
    }
    if (isSlashSubcommandBuilder(parent)) {
        return `${parent.parent}_${parent.group ? `${parent.group}_${parent.data.name}` : parent.data.name}`;
    }
    // For ungrouped subcommands, use the sub parameter instead of group
    return `${parent}_${group && sub ? `${group}_${sub}` : sub}`;
}
