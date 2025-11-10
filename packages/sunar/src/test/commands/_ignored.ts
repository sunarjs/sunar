import { Slash } from "~/builders";
import { execute } from "~/mutators";

const slash = new Slash({ name: "ignored", description: "Testing ignore property of load function" });

execute(slash, (interaction) => {
    interaction.reply({ content: "Hello World!" });
});

export { slash };
