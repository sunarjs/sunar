import 'dotenv/config';

import { GatewayIntentBits } from 'discord.js';
import { Client, load } from 'sunar';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
	],
});

await load('src/{commands,signals}/**/*.js');

client.login();
