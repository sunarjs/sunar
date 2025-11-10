import type { Builder } from "~/types";

export type ExecutableBuilder = Pick<Builder, "type" | "execute">;

/**
 * Sets the execution function for an executable builder.
 * This mutator allows you to define what happens when a builder (command, component, etc.) is triggered.
 *
 * @template TBuilder - The builder type extending ExecutableBuilder
 * @param {TBuilder} builder - The builder object to mutate.
 * @param {TBuilder['execute']} execute - The callback function to execute when the builder is triggered.
 *
 * @example
 * ```typescript
 * const ping = new Slash({ name: 'ping', description: 'Pong!' });
 * execute(ping, async (interaction) => {
 *   await interaction.reply('Pong!');
 * });
 * ```
 *
 * @see {@link https://sunar.js.org/docs/mutators/execute} for execute mutator documentation
 */
export function execute<TBuilder extends ExecutableBuilder>(builder: TBuilder, execute: TBuilder["execute"]): void {
    if (typeof execute !== "function") return;
    builder.execute = execute;
}
