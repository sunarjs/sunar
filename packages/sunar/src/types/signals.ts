import type { RepliableInteraction } from 'discord.js';
import type { CooldownContext } from './cooldown';

export interface SunarSignals {
	cooldown: [interaction: RepliableInteraction, context: CooldownContext];
}
