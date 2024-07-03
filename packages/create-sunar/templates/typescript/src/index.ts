import 'dotenv/config';

import { GatewayIntentBits } from 'discord.js';
import { Client, dirname, load } from 'sunar';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
	],
});

await load(`${dirname()}/{commands,signals}/**/*.{js,ts}`);

client.login();
