import { SlashSubcommand } from "~/builders";
import { execute } from "~/mutators";

const sub = new SlashSubcommand("auth", {
    name: "config",
    description: "Configure authentication settings",
});

execute(sub, async (interaction) => {
    return interaction.reply({ content: "This is a test reply for /auth config." });
});

export { sub };
