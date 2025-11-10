import { execute, Signal, Signals } from "sunar";
import { registerCommands } from "sunar/registry";

const signal = new Signal(Signals.ClientReady, { once: true });

execute(signal, async (client) => {
    // this will register commands either globally or per server
    // if the --register flag is present in the command line arguments
    if (process.argv.includes("--register")) {
        await registerCommands(client.application);
        console.log("Commands registered");
    }
    // register commands for specific guild IDs: https://sunar.js.org/docs/guides/registering-commands/guilds
    // register commands globally: https://sunar.js.org/docs/guides/registering-commands/global

    console.info(`Bot ${client.user.tag} ready!`);
});

export { signal };
