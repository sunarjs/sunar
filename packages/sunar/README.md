<div align="center">
	<br />
	<p>
		<a href="https://sunar.js.org"><img src="https://sunar.js.org/simple-banner.png" alt="Sunar simple banner" /></a>
	</p>
</div>

> ⚠️ WARNING: This project is still actively in development. Expect ongoing updates and improvements. Use with caution.


### **Go to the [website](https://sunar.js.org) for detailed info!**

## Table of contents

- [Current support](#current-support)
- [About](#about)
- [Installation](#installation)
- [Basic example usage](#basic-example-usage)
- [Registry](#registry)
  - [Registering Global Commands](#registering-global-commands)
  - [Registering Guild Commands](#registering-guild-commands)
- [Signals](#signals)
- [Commands](#commands)
  - [Autocomplete](#autocomplete)
  - [Context Menu](#context-menu)
  - [Slash Command](#slash-command)
- [Components](#components)
  - [Buttons](#buttons)
  - [Modal](#modal)
  - [Select Menu](#select-menu)
- [Protectors](#protectors)
- [Accepts](#accepts)
- [Credits](#credits)
- [License](#license)

# Current support

- ✅ Slash commands
- ✅ Signals handling (events)
- ✅ Context menu commands
- ✅ Button handlers
- ✅ Protectors (middlewares)
- ✅ Modal handlers
- ✅ Select menu handlers
- ✅ Autocomplete handlers
- ❌ External plugins

# About
Sunar emerges as a finely-tuned [discord.js](https://discord.js.org) framework, meticulously engineered to prioritize ease of use and efficiency.

- Open source
- Written in TypeScript
- Lightweight and easy syntax
- Well structured source code
- Fully typed parameters (JS/TS)
- Minimal, readable and well thought out API

# Installation
[discord.js](https://www.npmjs.com/package/discord.js) library is required for sunar to work.

```bash
npm install sunar discord.js
yarn add sunar discord.js
pnpm add sunar discord.js
bun add sunar discord.js
```

# Basic example usage
```js
// path: src/index.js

import { Client, load } from 'sunar';
import { registerGlobalCommands } from 'sunar/registry';
import { handleInteraction } from 'sunar/handlers';

const start = async () => {
    const client = new Client({ intents: [] });

    client.on('ready', async (c) => {
        await registerGlobalCommands(c.application);

        console.log('Bot ready!');
    });

    client.on('interactionCreate', async (interaction) => {
        await handleInteraction(interaction);
    });
    
    // stores all sunar modules, you can add more
    // directories by passing them after the "signals"
    // with a comma (e.g. signals,buttons,autocompletes)
    await load('src/{commands,signals}/**/*.{js,ts}');

    // uses by default process.env.DISCORD_TOKEN
    client.login(); 
}

start();
```

```js
// path: src/commands/ping.js

import { Slash, execute } from 'sunar';

const slash = new Slash({
    name: 'ping',
    description: 'Show the bot websocket shards ping',
});

execute(slash, (interaction) => {
    interaction.reply({ content: `Client WS Ping: ${interaction.client.ws.ping}` });
});

export { slash };
```

# Registry
The registry in Sunar handles the registration of Discord application commands, ensuring that your commands are properly configured and available for users. This process simplifies the management of commands and their deployment across your Discord server.

## Registering Global Commands
Global commands are available across all servers your bot is a part of. They are ideal for commands that are universally applicable.

```js
import { Client, load } from 'sunar';
import { registerGlobalCommands } from 'sunar/registry';

const start = async () => {
    const client = new Client({ intents: [] });

    client.on('ready', async (c) => {
        await registerGlobalCommands(c.application);
        console.log('Bot ready!');
    });

    await load('src/{commands,signals}/**/*.{js,ts}');

    client.login();
}

start();
```

## Registering Guild Commands
Guild-specific commands are only available within a particular server, making them useful for server-specific functionalities and in a development environment.

```js
import { Client, load } from 'sunar';
import { registerGuildCommands } from 'sunar/registry';

const start = async () => {
    const client = new Client({ intents: [] });

    client.on('ready', async (c) => {
        await registerGuildCommands(c.application, ['YOUR-GUILD-IDS']);
        console.log('Guild-specific commands registered!');

        console.log('Bot ready!');
    });

    await load('src/{commands,signals}/**/*.{js,ts}');

    client.login(); 
}

start();
```

# Signals
Signals in Sunar correspond to events in [discord.js](https://www.npmjs.com/package/discord.js). They allow you to handle various actions and responses that occur within your Discord bot, such as messages being sent, users joining or leaving, and more. These signals enable you to create dynamic and responsive interactions.

```js
import { Signal, execute } from 'sunar';
import { TextChannel } from 'discord.js';

const signal = new Signal('guildMemberAdd');

execute(signal, (member) => {
    const channel = member.guild.channels.cache.find((c) => c.name === 'welcomes');

    if (!(channel instanceof TextChannel)) return;

    channel.send({ content: `${member} just joined!` });
});

export { signal };
```

# Commands
Commands are how users interact with your Discord bot, offering structured ways to trigger actions. They span from simple responses to complex interactions with user input and dynamic responses.

## Autocomplete
Autocomplete commands enhance the user experience by providing suggestions while the user is typing. They are particularly useful for commands with multiple options or extensive inputs.

```js
import { Autocomplete, Slash, execute } from 'sunar';
import { ApplicationCommandOptionType } from 'discord.js';

const slash = new Slash({
    name: 'eat',
    description: 'Eat a fruit',
    options: [{
        name: 'fruit',
        description: 'Select the fruit',
        type: ApplicationCommandOptionType.String,
        autocomplete: true,
        required: true,
    }],
});

execute(slash, (interaction) => {
    const fruit = interaction.options.getString('fruit', true);

    interaction.reply({ content: `You ate the **${fruit}**.` });
});

const autocomplete = new Autocomplete({
    name: 'fruit',
    commandName: 'eat', // optional
});

execute(autocomplete, (interaction, option) => {
    const data = [
        { name: 'Apple', value: 'apple' },
        { name: 'Kiwi', value: 'kiwi' },
        { name: 'Watermelon', value: 'watermelon' },
        { name: 'Banana', value: 'banana' },
        { name: 'Strawberry', value: 'strawberry' },
    ];

    const results = data.filter(
        (e) => e.name.toLowerCase().includes(option.value.toLowerCase())
    );

    interaction.respond(results);
});

export { slash, autocomplete };
```

## Context Menu
Context menu commands are available directly in the right-click context menu for users or messages. These commands are convenient for quick actions without needing to type a command.

```js
import { ContextMenu, execute } from 'sunar';
import { ApplicationCommandType } from 'discord.js';

const contextMenu = new ContextMenu({
    name: 'Show avatar',
    type: ApplicationCommandType.User,
});

execute(contextMenu, (interaction) => {
    const avatarURL = interaction.targetUser.displayAvatarURL({
        size: 1024,
        forceStatic: false,
    });

    interaction.reply({
        content: `Avatar of user **${interaction.user.username}**`,
        files: [avatarURL],
    });
});

export { contextMenu };
```

## Slash Command
Slash commands are one of the primary ways users interact with bots. They provide a structured way for users to issue commands directly within the chat interface.

```js
import { Slash, execute } from 'sunar';
import { ApplicationCommandOptionType } from 'discord.js';

const slash = new Slash({
    name: 'avatar',
    description: 'Show user avatar',
    options: [{
        name: 'target',
        description: 'Target user',
        type: ApplicationCommandOptionType.User,
    }],
});

execute(slash, (interaction) => {
    const user = interaction.options.getUser('target') ?? interaction.user;

    const avatarURL = user.displayAvatarURL({
        size: 1024,
        forceStatic: false,
    });

    interaction.reply({
        content: `Avatar of user **${interaction.user.username}**`,
        files: [avatarURL],
    });
});

export { slash };
```

# Components
Components are interactive elements that enhance user engagement and provide dynamic interaction capabilities within your Discord bot.

## Buttons
Buttons are interactive elements users can click to trigger specific actions. They are ideal for creating interactive messages, such as confirmation prompts or menu navigation.

```js
import { Button, Slash, execute } from 'sunar';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits } from 'discord.js';

const slash = new Slash({
    name: 'leave',
    description: 'Make the bot leave the server',
    dmPermission: false,
    defaultMemberPermissions: [PermissionFlagsBits.Administrator],
});

execute(slash, (interaction) => {
    const button = new ButtonBuilder()
        .setCustomId('confirmLeave')
        .setLabel('Leave')
        .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder()
        .setComponents(button);

    interaction.reply({
        content: 'Are you certain about my leaving the server?',
        components: [row],
    });
});

const button = new Button({ id: 'confirmLeave' });

execute(button, async (interaction) => {
    await interaction.reply({
        content: 'Leaving...',
        ephemeral: true,
    });

    interaction.guild.leave();
});

export { slash, button };
```

## Modal
Modals are popup forms that can collect detailed user input. They are particularly useful for complex interactions that require multiple fields or steps.

```js
import { Modal, Slash, execute } from 'sunar';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

const slash = new Slash({
    name: 'feedback',
    description: 'Send us feedback',
});

execute(slash, (interaction) => {
    const contentInput = new TextInputBuilder()
        .setCustomId('content')
        .setLabel('Content')
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('Your feedback content...')
        .setRequired(true);

    const row = new ActionRowBuilder()
        .setComponents(contentInput);

    const modal = new ModalBuilder()
        .setCustomId('feedback')
        .setTitle('Submit your feedback')
        .setComponents(row);

    interaction.showModal(modal);
});

const modal = new Modal({ id: 'feedback' });

execute(modal, (interaction) => {
    const feedback = interaction.fields.getTextInputValue('content');

    // Send feedback somewhere...

    interaction.reply({
        content: 'Thanks for the feedback!',
        ephemeral: true,
    });
});

export { slash, modal };
```

## Select Menu
Select menus allow users to choose from a list of options. They are useful for forms, surveys, or any scenario where the user needs to make a selection from multiple choices.

```js
import { SelectMenu, Slash, execute } from 'sunar';
import { ActionRowBuilder, ComponentType, StringSelectMenuBuilder } from 'discord.js';

const slash = new Slash({
    name: 'buy',
    description: 'Buy something',
});

execute(slash, (interaction) => {
    const select = new StringSelectMenuBuilder()
        .setCustomId('buy')
        .setOptions(
            { label: 'Laptop', value: 'laptop' },
            { label: 'Smart TV', value: 'smart-tv' },
            { label: 'Tablet', value: 'tablet' },
            { label: 'Smartphone', value: 'smartphone' },
        )
        .setPlaceholder('Select an item to purchase');

    const row = new ActionRowBuilder()
        .setComponents(select);

    interaction.reply({ components: [row] });
});

const select = new SelectMenu({
    id: 'buy',
    type: ComponentType.StringSelect,
});

execute(select, (interaction) => {
    const item = interaction.values.at(0);

    // Do something with the item...

    interaction.reply({ content: `You have purchased the **${item}** item` });
});

export { slash, select };
```

# Protectors
Protectors in Sunar act as middleware, allowing you to intercept and control the flow of commands and interactions within your Discord bot. They provide a flexible way to enforce permissions, validate inputs, or perform pre-processing before executing commands.

```js
import { Protector, Slash, execute, protect } from 'sunar';
import { PermissionFlagsBits } from 'discord.js';

const onlyAdmins = new Protector({
    commands: ['slash'],
    signals: ['interactionCreate'],
});

function isAdmin(permissions) {
    return permissions.has(PermissionFlagsBits.Administrator);
}

execute(onlyAdmins, (arg, next) => {
    const content = 'This command can only be used by administrators';

    if (Array.isArray(arg)) {
        const interaction = arg[0];

        if (interaction.memberPermissions && isAdmin(interaction.memberPermissions)) {
            return next();
        }

        return interaction.isRepliable() && interaction.reply({ content, ephemeral: true });
    }

	if (arg.isChatInputCommand()) {
        if (arg.memberPermissions && isAdmin(arg.memberPermissions)) {
            return next();
        }

        return arg.reply({ content, ephemeral: true });
    }
});

const slash = new Slash({
    name: 'protected',
    description: 'This is a protected slash command',
});

// Protect the slash command with
// the "onlyAdmins" protector.
protect(slash, [onlyAdmins]);

execute(slash, (interaction) => {
    interaction.reply({ content: 'You are an admin!' });
});

export { slash, onlyAdmins };
```

# Accepts
Accepts in Sunar offer a fast and straightforward method to add basic restrictions to commands. They function like protectors but with simpler syntax, making them ideal for enforcing permissions and other basic requirements without needing to write complete middleware functions.

```js
import { Slash, accepts, execute } from 'sunar';
import { ApplicationCommandOptionType, PermissionFlagsBits, Role } from 'discord.js';

const slash = new Slash({
    name: 'remove-role',
    description: 'Remove a role',
    dmPermission: false,
    defaultMemberPermissions: [PermissionFlagsBits.ManageRoles],
    options: [{
        name: 'target',
        description: 'Target role',
        type: ApplicationCommandOptionType.Role,
        required: true,
    }],
});

accepts(slash, {
    clientPermissions: ['ManageRoles'],
});

execute(slash, async (interaction) => {
    const role = interaction.options.getRole('target', true);

    if (!(role instanceof Role)) {
        return interaction.reply({ content: 'Invalid role.' });
    }

    role.editable && (await role.delete());

    interaction.reply({ content: `**${role.name}** deleted.` });
});

export { slash };
```

# Credits
The source code structure is heavily inspired by the [Valibot](https://github.com/fabian-hiller/valibot) package.

# License
Completely free and licensed under the [MIT license](https://github.com/sunarjs/sunar/blob/main/README.md). But if you want, you can give me a star on [GitHub](https://github.com/sunarjs/sunar).