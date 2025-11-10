import type { ClientEvents } from "discord.js";

import { handleProtectors } from "~/handlers";
import { context, signalListeners, signals } from "~/stores";

/**
 * Handles all the registered signals by attaching event listeners to the Discord client.
 * This function is used internally by Sunar and automatically clears existing listeners to prevent duplicates.
 *
 * @internal
 */
export function handleSignals(): void {
    clearSignalListeners();

    for (const [symbolKey, signal] of signals.entries()) {
        if (!signal.execute) continue;

        const method = signal.options.once ? "once" : "on";

        const listener = async (...args: ClientEvents[keyof ClientEvents]) => {
            if (!signal.execute) return;

            const canContinue = await handleProtectors({ protectors: signal.protectors, data: args });
            if (!canContinue) return;

            try {
                await signal.execute(...args);
            } catch (error) {
                if (error instanceof Error) context.client.emit("error", error);
            }
        };

        context.client[method](signal.name, listener);

        signalListeners.set(symbolKey, {
            eventName: signal.name,
            listener,
        });
    }
}

/**
 * Clears all registered signal listeners to prevent memory leaks.
 * This function removes all event listeners that were previously registered by handleSignals().
 *
 * @internal
 */
export function clearSignalListeners(): void {
    for (const { eventName, listener } of signalListeners.values()) {
        context.client.removeListener(eventName, listener);
    }
    signalListeners.clear();
}
