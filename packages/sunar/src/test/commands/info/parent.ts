import { SlashParent } from "~/builders";

const parent = new SlashParent({
    name: "info",
    description: "View info",
    groups: [
        {
            name: "server",
            description: "Server info",
        },
    ],
});

export { parent };
