import type { RepliableInteraction } from "discord.js";

import type { CooldownContext } from "~/types";

export interface SunarSignals {
    cooldown: [interaction: RepliableInteraction, context: CooldownContext];
}
