import { join } from "node:path";
import fs from "fs-extra";

import { DIRNAME } from "../utils/constants";

export async function copyConfig(name: string, path: string) {
    const configPath = join(DIRNAME, "..", "configs", name);
    await fs.copyFile(configPath, path);
}
