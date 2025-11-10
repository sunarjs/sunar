import { execute, Signal, Signals } from "sunar";
import { handleInteraction } from "sunar/handlers";

const signal = new Signal(Signals.InteractionCreate);

execute(signal, async (interaction) => {
    // handle all the interactions
    await handleInteraction(interaction);

    // handle specific interactions:
    // https://sunar.js.org/docs/guides/interactions-handling#handle-only-specific-interactions
});

export { signal };
