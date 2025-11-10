import { join } from "node:path";

import { DIRNAME } from "./constants";

export const LANGUAGES = ["javascript", "typescript"] as const;

const javascript = join(DIRNAME, "..", "templates", "javascript");
const typescript = join(DIRNAME, "..", "templates", "typescript");

export const templates = { javascript, typescript };
