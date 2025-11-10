import { type ClientOptions, Client as DClient } from "discord.js";

import { handleSignals } from "~/handlers";
import { context } from "~/stores";

import type { SunarSignals } from "~/types";

/**
 * The main Sunar Discord client that extends the discord.js Client.
 * Automatically handles signal registration and provides enhanced functionality for Discord bots.
 *
 * @template Ready - Boolean type indicating if the client is ready
 *
 * @example
 * ```typescript
 * import { Client, GatewayIntentBits } from 'sunar';
 *
 * const client = new Client({
 *   intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
 * });
 *
 * await client.login(process.env.DISCORD_TOKEN);
 * ```
 */
export class Client<Ready extends boolean = boolean> extends DClient<Ready> {
    /**
     * Creates a new Sunar Discord client instance.
     *
     * @param {ClientOptions} options - Discord.js client options for initialization.
     */
    public constructor(options: ClientOptions) {
        super(options);

        context.client = this;
    }

    /**
     * Logs the client into Discord and initializes all signal handlers.
     * This method automatically sets up all registered signals before connecting.
     *
     * @param {string} [token] - The Discord bot token. If not provided, uses the token from environment.
     *
     * @returns {Promise<string>} A promise that resolves to the bot token when login is successful.
     */
    public override login(token?: string): Promise<string> {
        handleSignals();
        return super.login(token);
    }
}

declare module "discord.js" {
    interface ClientEvents extends SunarSignals {}
}
