import { Collection, type Interaction, type RepliableInteraction } from "discord.js";

import { context, cooldownManager } from "~/stores";
import { CooldownScope, resolveCooldown } from "~/utils";

import type { Builder, CooldownResolvable, CooldownTimestamp } from "~/types";

/**
 * Handles cooldown logic for builders that have cooldown configuration.
 * Checks if the interaction is on cooldown and manages cooldown timers.
 *
 * @template TInteraction - The interaction type extending RepliableInteraction
 * @template TBuilder - The builder type with cooldown config
 * @param {TInteraction} interaction - The interaction to check for cooldown.
 * @param {TBuilder} builder - The builder with cooldown configuration.
 *
 * @returns {boolean} True if the interaction is on cooldown, false otherwise.
 *
 * @internal
 */
export function handleCooldown<
    TInteraction extends RepliableInteraction,
    TBuilder extends Builder & { config: { cooldown?: CooldownResolvable } },
>(interaction: TInteraction, builder: TBuilder): boolean {
    if (!builder.config.cooldown) return false;
    if (!interaction.isRepliable()) return false;

    const config = resolveCooldown(builder.config.cooldown);

    const { scope } = config;

    const isUser = scope === CooldownScope.User;
    const isChannel = scope === CooldownScope.Channel;
    const isGuild = scope === CooldownScope.Guild;
    const isGlobal = scope === CooldownScope.Global;

    let targetId: string | symbol | null = null;

    if (isUser) {
        targetId = interaction.user.id;
    } else if (isChannel) {
        targetId = interaction.channelId;
    } else if (isGuild) {
        targetId = interaction.guildId;
    } else if (isGlobal) {
        targetId = Symbol();
    }

    if (targetId === null) return false;

    if (!isGlobal && config.exclude.includes(targetId as string)) return false;

    const scopes = cooldownManager.ensure(builder.type, () => new Collection());

    const interactionId = getInteractionId(interaction);
    if (!interactionId) return false;

    const cooldowns = scopes.ensure(scope, () => new Collection([[interactionId, []]]));
    const timestamps = cooldowns.ensure(interactionId, () => []);

    const targetTimestamps = timestamps.filter((c) =>
        typeof c.targetId === "symbol" ? c.targetId === targetId : c.targetId.startsWith(String(targetId)),
    );

    if (!targetTimestamps || targetTimestamps.length < config.limit) {
        addCooldown(targetId, config.time, interactionId, cooldowns, timestamps, targetTimestamps);
        return false;
    }

    const lastTimestamp = targetTimestamps.at(-1);
    if (!lastTimestamp) return false;

    const remaining = config.time - (Date.now() - lastTimestamp.expiration);

    context.client.emit("cooldown", interaction, { remaining, scope, limit: config.limit });

    return true;
}

function addCooldown(
    targetId: string | symbol,
    time: number,
    interactionId: string,
    cooldowns: Collection<string, CooldownTimestamp[]>,
    currentTimestamps: CooldownTimestamp[],
    targetTimestamps: CooldownTimestamp[],
) {
    const uniqueId = `${String(targetId)}-${Date.now().toString(36)}`;

    const timer = setTimeout(() => {
        const existingTimestamps = cooldowns.get(interactionId);
        if (existingTimestamps) {
            const validTimestamps = existingTimestamps.filter((t) => t.targetId !== uniqueId && Date.now() - t.expiration < time);

            if (validTimestamps.length === 0) {
                cooldowns.delete(interactionId);
            } else {
                cooldowns.set(interactionId, validTimestamps);
            }
        }
    }, time);

    const newTimestamp: CooldownTimestamp = { targetId: uniqueId, expiration: Date.now(), timer };

    cooldowns.set(interactionId, currentTimestamps ? [...currentTimestamps, newTimestamp] : [newTimestamp]);

    for (const { timer: existingTimer } of targetTimestamps) {
        clearTimeout(existingTimer);
    }
}

function getInteractionId(interaction: Interaction): string | null {
    if (interaction.isCommand()) return interaction.commandId;
    if (interaction.isMessageComponent()) return interaction.customId;
    return null;
}

/**
 * Clears all cooldowns related to a specific interaction based on its context (user, channel, etc.).
 * This is useful for clearing cooldowns when handling errors or canceling operations.
 *
 * @param {Interaction} interaction - The interaction to clear cooldowns for
 * @returns {number} The number of cooldowns that were cleared
 */
export function clearCooldownsForInteraction(interaction: Interaction): number {
    let clearedCount = 0;

    cooldownManager.each((scopes) => {
        scopes.each((cooldowns) => {
            cooldowns.each((timestamps, interactionId) => {
                const toRemove = timestamps.filter((timestamp) => {
                    const targetId = String(timestamp.targetId);
                    return (
                        targetId.startsWith(interaction.user.id) ||
                        (interaction.channelId && targetId.startsWith(interaction.channelId)) ||
                        (interaction.guildId && targetId.startsWith(interaction.guildId))
                    );
                });

                if (toRemove.length > 0) {
                    toRemove.forEach(({ timer }) => {
                        clearTimeout(timer);
                    });

                    const remainingTimestamps = timestamps.filter((t) => !toRemove.includes(t));

                    if (remainingTimestamps.length === 0) {
                        cooldowns.delete(interactionId);
                    } else {
                        cooldowns.set(interactionId, remainingTimestamps);
                    }

                    clearedCount += toRemove.length;
                }
            });
        });
    });

    return clearedCount;
}
