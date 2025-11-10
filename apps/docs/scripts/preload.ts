/** biome-ignore-all lint/correctness/noUndeclaredVariables: Bun is the runtime */
import { createMdxPlugin } from "fumadocs-mdx/bun";

Bun.plugin(createMdxPlugin());
