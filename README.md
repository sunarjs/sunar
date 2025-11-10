<div align="center">
	<br />
	<p>
		<a href="https://sunar.js.org"><img src="https://sunar.js.org/simple-banner.png" alt="Sunar simple banner" /></a>
	</p>
</div>

<div align="center">

[![npm version](https://img.shields.io/npm/v/sunar.svg)](https://www.npmjs.com/package/sunar)
[![npm downloads](https://img.shields.io/npm/dm/sunar.svg)](https://www.npmjs.com/package/sunar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

</div>

A simple and easy to use Discord.js framework that provides a structured approach to building Discord bots with **ESM-only** support, built-in command handling, and modular architecture.

> **Note**: This project is actively maintained and continuously improved. Check the [changelog](https://github.com/sunarjs/sunar/releases) for latest updates.

## 🚀 Features

- **🎯 Type-Safe**: Full TypeScript support with comprehensive type definitions
- **⚡ Modern**: Built for Discord.js v14 with ESM support  
- **🔧 Modular**: Clean separation of concerns with builders, handlers, and stores
- **🛡️ Protected**: Built-in cooldown and permission protection system
- **🎨 Flexible**: Support for slash commands, buttons, modals, context menus, and more
- **📦 Tree-Shakable**: Optimized bundle size with selective imports
- **🔄 Auto-Loading**: Automatic command registration and file loading
- **🎪 Signals**: Custom event system for enhanced bot functionality

## 📦 Installation

```bash
npm install sunar discord.js
```

```bash
yarn add sunar discord.js
```

```bash
pnpm add sunar discord.js
```

```bash
bun add sunar discord.js
```

> **Note**: Sunar is **ESM-only**. Make sure your project has `"type": "module"` in your `package.json` or use `.mjs` file extensions.

## 🏁 Quick Start

### 1. Initialize the client

```javascript
// src/index.js
import { Client, GatewayIntentBits, load } from 'sunar';

const start = async () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages
    ]
  });

  // Load all commands, signals, and components
  await load('src/{commands,signals,components}/**/*.js');

  await client.login(); // uses process.env.DISCORD_TOKEN by default
};

start();
```

### 2. Create your first signal

```javascript
// src/signals/ready.js
import { Signal, execute } from 'sunar';
import { registerCommands } from 'sunar/registry';

const ready = new Signal('ready', { once: true });

execute(ready, async (client) => {
  // ⚠️ WARNING: Command registration in ready event is for demonstration only!
  // For production, create a separate script to register commands.
  // This approach registers commands every time the bot starts.
  await registerCommands(client.application);
  
  console.log(`${client.user.tag} is ready! 🚀`);
});

export { ready };
```

> **⚠️ Command Registration Best Practices:**
>
> - **Development**: Use `registerCommands()` for quick testing and development
> - **Production**: Create a separate deployment script to register commands only when needed
> - **Guild-specific**: Use `registerGuildCommands()` for testing in specific servers
> - **Global**: Use `registerGlobalCommands()` for production deployment
>
> Registering commands on every bot startup can hit Discord's rate limits and is unnecessary in production.

### 3. Create your first command

```javascript
// src/commands/ping.js
import { Slash, execute } from 'sunar';

const ping = new Slash({
  name: 'ping',
  description: 'Show client ws ping'
});

execute(ping, (interaction) => {
  interaction.reply({
    content: `Client WS Ping: ${interaction.client.ws.ping}ms 🏓`
  });
});

export { ping };
```

### 4. Handle interactions

```javascript
// src/signals/interactionCreate.js
import { Signal, execute } from 'sunar';
import { handleInteraction } from 'sunar/handlers';

const interactionCreate = new Signal('interactionCreate');

execute(interactionCreate, async (interaction) => {
  await handleInteraction(interaction);
});

export { interactionCreate };
```

## 📚 Core Concepts

### Builders

Sunar provides various builders for different Discord interactions:

- **`Slash`** - Slash commands (`/command`)
- **`Button`** - Interactive buttons
- **`Modal`** - Popup forms
- **`ContextMenu`** - Right-click context menus
- **`SelectMenu`** - Dropdown selection menus
- **`Signal`** - Custom events and Discord events
- **`SlashParent`** - Parent commands for subcommands
- **`SlashSubcommand`** - Subcommands and grouped commands
- **`Protector`** - Middleware for authorization and validation

### Mutators

Enhance your builders with additional functionality:

```javascript
import { Slash, execute, config, protect, Protector } from 'sunar';

// Create a protector
const adminOnly = new Protector({
  commands: ['slash']
});

execute(adminOnly, (interaction, next) => {
  if (!interaction.memberPermissions?.has('Administrator')) {
    interaction.reply({ content: 'Admin only!', ephemeral: true });
    return; // Block execution
  }
  return next(); // Allow execution
});

const slash = new Slash({
  name: 'admin',
  description: 'Admin only command'
});

// Add configuration
config(slash, {
  guildIds: ['123456789'], // Guild-specific command
  cooldown: 5000           // 5 second cooldown (in milliseconds)
});

// Add protection
protect(slash, [adminOnly]);

execute(slash, (interaction) => {
  interaction.reply('Admin command executed!');
});

export { slash, adminOnly };
```

## 🎯 Advanced Examples

### Modal with Form Handling

```javascript
import { Slash, Modal, execute } from 'sunar';
import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from 'discord.js';

// Slash command to trigger modal
const feedback = new Slash({
  name: 'feedback',
  description: 'Submit feedback'
});

execute(feedback, (interaction) => {
  const modal = new ModalBuilder()
    .setCustomId('feedback-modal')
    .setTitle('Submit Feedback')
    .addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('message')
          .setLabel('Your feedback')
          .setStyle(TextInputStyle.Paragraph)
          .setRequired(true)
      )
    );

  interaction.showModal(modal);
});

// Modal handler
const feedbackModal = new Modal({
  id: 'feedback-modal'
});

execute(feedbackModal, (interaction) => {
  const message = interaction.fields.getTextInputValue('message');
  // Process feedback...
  
  interaction.reply({
    content: 'Thank you for your feedback! 💙',
    ephemeral: true
  });
});

export { feedback, feedbackModal };
```

### Dynamic Button Handling with Regex

```javascript
import { Button, execute } from 'sunar';

// Handle buttons with dynamic IDs like "delete-123", "delete-456"
const deleteButton = new Button({
  id: /^delete-\d+$/
});

execute(deleteButton, (interaction) => {
  const id = interaction.customId.split('-')[1];
  
  // Delete logic here...
  
  interaction.reply({
    content: `Item ${id} deleted successfully!`,
    ephemeral: true
  });
});

export { deleteButton };
```

### Subcommands and Groups

```javascript
import { SlashParent, SlashSubcommand, execute } from 'sunar';
import { ApplicationCommandOptionType } from 'discord.js';

// Parent command
const music = new SlashParent({
  name: 'music',
  description: 'Music commands',
  groups: [{
    name: "playlist",
    description: "Playlist commands"
  }]
});

// Subcommand
const play = new SlashSubcommand('music', {
  name: 'play',
  description: 'Play a song',
  options: [{
    name: 'query',
    description: 'Song to play',
    type: ApplicationCommandOptionType.String,
    required: true
  }]
});

// Grouped subcommand
const addToPlaylist = new SlashSubcommand('music', 'playlist', {
  name: 'add',
  description: 'Add song to playlist'
});

execute(play, (interaction) => {
  const query = interaction.options.getString('query', true);
  interaction.reply(`Now playing: ${query} 🎵`);
});

execute(addToPlaylist, (interaction) => {
  interaction.reply('Song added to playlist! 📝');
});

export { music, play, addToPlaylist };
```

## 📁 Recommended Project Structure

```
src/
├── commands/           # Slash commands
│   ├── utility/
│   │   ├── ping.js
│   │   └── avatar.js
│   └── music/
        ├── parent.js
│       ├── play.js
│       └── playlist.js
├── components/         # Interactive components
│   ├── buttons/
│   │   ├── confirm.js
│   │   └── delete.js
│   ├── modals/
│   │   └── feedback.js
│   └── selects/
│       └── role-select.js
├── protectors/        # Middleware
│   ├── admin-only.js
│   └── cooldown.js
├── signals/           # Event handlers
│   ├── ready.js
│   ├── interactionCreate.js
│   └── messageCreate.js
└── index.js          # Bot entry point
```

## 🔧 TypeScript Support

Sunar provides full TypeScript support. For TypeScript projects:

### TypeScript Example

```typescript
import { Client, GatewayIntentBits, Slash, execute } from 'sunar';

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const ping = new Slash({
  name: 'ping',
  description: 'Replies with Pong!'
});

execute(ping, (interaction) => {
  interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
});

await client.login(); // uses process.env.DISCORD_TOKEN by default
```

## 📖 API Reference

### Core Exports

```javascript
// Main client and builders
import { 
  Client,
  Slash, 
  Button, 
  Modal, 
  ContextMenu, 
  SelectMenu, 
  Signal,
  SlashParent,
  SlashSubcommand,
  Protector
} from 'sunar';

// Mutators and utilities
import { execute, config, protect, load } from 'sunar';
```

### Selective Imports

```javascript
// Registry
import { registerCommands } from 'sunar/registry';

// Handlers
import { handleInteraction, handleSlash } from 'sunar/handlers';

// Utilities
import { isSlashBuilder, isButtonBuilder } from 'sunar/utils';

// Stores
import { context, slashes, buttons } from 'sunar/stores';
```

## 🛠 Development

### Building

```bash
bun run build
```

### Testing

```bash
bun run test
```

### Development Mode

```bash
bun run test:dev
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/sunarjs/sunar/blob/main/LICENSE) file for details.

## ❤️ Support

If you find Sunar helpful, please consider:

- ⭐ Starring the repository on [GitHub](https://github.com/sunarjs/sunar)
- 🐛 Reporting bugs or issues
- 💡 Suggesting new features
- 📖 Contributing to documentation
- 💬 Sharing your projects built with Sunar

## 🔗 Links

- **📖 Documentation**: [https://sunar.js.org](https://sunar.js.org)
- **📦 NPM Package**: [https://www.npmjs.com/package/sunar](https://www.npmjs.com/package/sunar)
- **🐙 GitHub Repository**: [https://github.com/sunarjs/sunar](https://github.com/sunarjs/sunar)
- **🐛 Issues & Bug Reports**: [https://github.com/sunarjs/sunar/issues](https://github.com/sunarjs/sunar/issues)
- **💬 Discord.js Documentation**: [https://discord.js.org](https://discord.js.org)

## 🙏 Credits

Special thanks to:

- **[Discord.js](https://discord.js.org)** - The incredible library that powers Sunar
- **[Fumadocs](https://fumadocs.dev/)** - Excellent framework for creating documentation

---

**Made with ❤️ by [Usse](https://github.com/ussego)**
