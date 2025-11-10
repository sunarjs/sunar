import { Signal } from "~/builders";
import { handleInteraction } from "~/handlers";
import { execute } from "~/mutators";
import { Signals } from "~/utils";

const signal = new Signal(Signals.InteractionCreate);

execute(signal, async (interaction) => {
    await handleInteraction(interaction);
});

export { signal };
