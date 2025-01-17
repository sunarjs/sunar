import type { CooldownResolvable } from "..";

export interface CooldownProp {
    /**
     * Defines the cooldown period for the command.
     * Can be a simple number representing milliseconds or a more complex configuration object.
     *
     * @see https://sunar.js.org/docs/guides/implementing-cooldowns
     */
    cooldown?: CooldownResolvable;
}

/** Configuration for a command. */
export interface CommandConfig extends CooldownProp {
    /**
     * Specifies the guild IDs where the command is registered.
     * If provided, the command will only be available in these guilds.
     *
     * @see https://sunar.js.org/docs/guides/registering-commands/dynamic#specific-guilds-ids-commands
     */
    guildIds?: string[];
}
