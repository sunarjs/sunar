import { Collection, type Interaction, type RepliableInteraction } from "discord.js";

import { context, cooldownManager } from "../../stores";
import type { Builder, CooldownResolvable, CooldownTimestamp } from "../../types";
import { CooldownScope, resolveCooldown } from "../../utils";

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
    cooldownManager: Collection<string, CooldownTimestamp[]>,
    currentTimestamps: CooldownTimestamp[],
    targetTimestamps: CooldownTimestamp[],
) {
    const timer = setTimeout(() => {
        cooldownManager.sweep((t) => t.some((c) => c.targetId === uniqueId));
    }, time);

    const uniqueId = `${String(targetId)}-${Date.now().toString(36)}`;
    const newTimestamp: CooldownTimestamp = { targetId: uniqueId, expiration: Date.now(), timer };

    cooldownManager.set(interactionId, currentTimestamps ? [...currentTimestamps, newTimestamp] : [newTimestamp]);

    for (const { timer } of targetTimestamps) {
        timer.refresh();
    }
}

function getInteractionId(interaction: Interaction): string | null {
    if (interaction.isCommand()) return interaction.commandId;
    if (interaction.isMessageComponent()) return interaction.customId;
    return null;
}
