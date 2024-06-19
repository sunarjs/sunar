<div align="center">
	<br />
	<p>
		<a href="https://sunar.js.org"><img src="https://sunar.js.org/simple-banner.png" alt="Sunar simple banner" /></a>
	</p>
</div>

> ⚠️ WARNING: This project is still actively in development. Expect ongoing updates and improvements. Use with caution.

## **Go to the [website](https://sunar.js.org) to get started!**


### Table of contents
- [Simple example](#simple-example)
	- [Initialize the client](#initialize-the-client)
	- [Create your first signal](#create-your-first-signal)
	- [Create your first command](#create-your-first-command)
	- [Handle interactions](#handle-interactions)
- [Credits](#credits)
- [License](#license)


# Simple example

If you're new to Sunar, you can follow these steps to get started.

Ensure you have [Node.js](https://nodejs.org) (16.11.0 or newer) installed on your machine. Sunar requires [discord.js](https://npmjs.com/package/discord.js) as a peer dependency.

## Initialize the client

Create a new file, e.g., `index.js`, and set up your Discord bot using Sunar.

```js
// path: src/index.js

import { Client, load } from 'sunar';

const start = async () => {
    const client = new Client({ intents: [] });

    // stores all sunar modules, you can add more
    // directories by passing them after the "signals"
    // with a comma (e.g. signals,buttons,autocompletes)
    await load('src/{commands,signals}/**/*.{js,ts}');

    client.login('YOUR_DISCORD_BOT_TOKEN');
};

start();
```

## Create your first signal

Signals handle events in your Discord bot. Let's create a basic `ready` signal to log when the bot is online and ready.

```js
// path: src/signals/ready.js

import { Signal, execute } from 'sunar';
import { registerCommands } from 'sunar/registry';

const signal = new Signal('ready', { once: true });

execute(signal, async (client) => {
    await registerCommands(client.application);
    console.log(`Logged in as ${client.user.tag}`);
});

export { signal };
```

## Create your first command

Let's create a simple `ping` command that responds with the bot's ping when invoked.

```js
// path: src/commands/ping.js

import { Slash, execute } from 'sunar';

const slash = new Slash({
    name: 'ping',
    description: 'Show client ws ping',
});

execute(slash, (interaction) => {
    interaction.reply({
        content: `Client WS Ping: ${interaction.client.ws.ping}`,
    });
});

export { slash };
```

## Handle interactions

To make the ping command work, add the `interactionCreate` signal to your project to handle interactions:

```js
// path: src/signals/interaction-create.js

import { Signal, execute } from 'sunar';
import { handleInteraction } from 'sunar/handlers';

const signal = new Signal('interactionCreate');

execute(signal, async (interaction) => {
    await handleInteraction(interaction);
});

export { signal };
```

# Credits
Special thanks to [discord.js](https://discord.js.org) for their incredible library that powers Sunar, to [Valibot](https://github.com/fabian-hiller/valibot) for inspiring our code structure, and to [Fumadocs](https://fumadocs.vercel.app/) for being an excellent framework for creating documentations.

# License
Completely free and licensed under the [MIT license](https://github.com/sunarjs/sunar/blob/main/README.md). But if you want, you can give me a star on [GitHub](https://github.com/sunarjs/sunar).