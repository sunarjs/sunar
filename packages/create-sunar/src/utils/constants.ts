import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const DIRNAME = dirname(fileURLToPath(import.meta.url));
