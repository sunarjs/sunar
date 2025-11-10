import { SlashSubcommand } from "~/builders";
import { execute } from "~/mutators";

const sub = new SlashSubcommand("info", "server", {
    name: "general",
    description: "View general info",
});

execute(sub, async (interaction) => {
    if (!interaction.guild) return interaction.reply({ content: "should be in a guild." });
    return interaction.reply({ content: `guild-name: ${interaction.guild.name}, banner-url: ${interaction.guild.bannerURL}` });
});

export { sub };
