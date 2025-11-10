import { SlashSubcommand } from "~/builders";
import { execute } from "~/mutators";

const sub = new SlashSubcommand("info", "server", {
    name: "owner",
    description: "View owner info",
});

execute(sub, async (interaction) => {
    return interaction.reply({ content: `username: ${interaction.user.username}, is-bot: ${interaction.user.bot}` });
});

export { sub };
