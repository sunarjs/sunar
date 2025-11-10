import { readFileSync } from "node:fs";

import { sync } from "fumadocs-core/search/orama-cloud";

import { CloudManager } from "@oramacloud/client";

const content = readFileSync(".next/server/app/static.json.body");

const records = JSON.parse(content.toString());

const { ORAMA_PRIVATE_API_KEY, ORAMA_MANAGER_INDEX } = process.env;

if (!(ORAMA_PRIVATE_API_KEY && ORAMA_MANAGER_INDEX))
    throw new Error("Orama Cloud secrets are undefined (ORAMA_PRIVATE_API_KEY | ORAMA_MANAGER_INDEX)");

const manager = new CloudManager({ api_key: ORAMA_PRIVATE_API_KEY });

await sync(manager, {
    index: ORAMA_MANAGER_INDEX,
    documents: records,
});

// biome-ignore lint/suspicious/noConsole: Script result
console.log(`Search updated: ${records.length} records`);
