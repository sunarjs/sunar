# Sunar

> [!WARNING]  
> This project is still actively in development. Expect ongoing updates and improvements. Use with caution.

## Current support

- ✅ Slash commands
- ✅ Signals handling (events)
- ✅ Context menu commands
- ✅ Button handlers
- ✅ Protectors (middlewares)
- ✅ Modal handlers
- ❌ Autocomplete handlers
- ❌ Select menu handlers
- ❌ External plugins

## About

Sunar emerges as a finely-tuned [discord.js](https://discord.js.org) framework, meticulously engineered to prioritize ease of use and efficiency.

- Lightweight and easy syntax
- Fully typed parameters
- Written in TypeScript

## Installation

[discord.js](https://www.npmjs.com/package/discord.js) library is required for sunar to work.
```bash
npm install sunar discord.js
yarn add sunar discord.js
pnpm add sunar discord.js
bun add sunar discord.js
```

## Basic example usage

```js
// path: src/index.js

import { Client, load } from 'sunar';
import { registerGlobalCommands } from 'sunar/registry';
import { handleInteraction } from 'sunar/handlers';

const start = async () => {
    const client = new Client({ intents: [] });

    client.on('ready', async (c) => {
        await registerGlobalCommands(c.application);

        console.log('Bot ready!')
    });

    client.on('interactionCreate', async (interaction) => {
        await handleInteraction(interaction)
    });
    
    await load('src/{commands,signals}/**/*.{js,ts}'); // stores all sunar modules

    client.login(); // uses by default process.env.DISCORD_TOKEN
}

start();
```

```js
// path: src/commands/ping.js

import { Slash, execute } from 'sunar';

const slash = new Slash({ name: 'ping', description: 'ping pong' });

execute(slash, (interaction) => {
    interaction.reply({ content: `Client WS Ping: ${interaction.client.ws.ping}` });
});

export { slash }
```
