import { Client } from "~/client";
import { load } from "~/modules";

const client = new Client({ intents: [] });

await load("./src/test/{commands,signals}/**/*.{js,ts}", {
    exclude: ["**/_*.{js,ts}"],
});

client.login();
