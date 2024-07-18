import type { RepliableInteraction } from 'discord.js';

import type { Signals } from '../utils';
import type { CooldownContext } from './cooldown';

export interface SunarSignals {
	[Signals.Cooldown]: [interaction: RepliableInteraction, context: CooldownContext];
}
