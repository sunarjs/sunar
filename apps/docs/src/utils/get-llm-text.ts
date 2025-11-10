import type { InferPageType } from "fumadocs-core/source";

import type { source } from "@/app/source";

export async function getLLMText(page: InferPageType<typeof source>) {
    const processed = await page.data.getText("processed");

    return `# ${page.data.title}
URL: ${page.url}

${processed}`;
}
