import { Signal } from "~/builders";
import { execute } from "~/mutators";
import { registerGuildCommands } from "~/registry";
import { slashCommands, slashParents, slashSubcommands } from "~/stores";
import { Signals } from "~/utils";

const signal = new Signal(Signals.ClientReady);

execute(signal, async (client) => {
    if (!process.env.GUILD_ID) throw new Error("GUILD_ID env required");

    if (process.argv.includes("--register")) {
        await registerGuildCommands(client.application, [process.env.GUILD_ID]);
        console.log("Commands registered");
    }

    console.log(`${client.user.tag} ready!`);
    console.log(`${slashCommands.size} slashes, ${slashParents.size} slash parents, ${slashSubcommands.size} slash subcommands`);
});

export { signal };
