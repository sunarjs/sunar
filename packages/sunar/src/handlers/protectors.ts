import { PROTECTOR_NEXT_SYMBOL, UNHANDLED_SYMBOL } from "~/symbols";

import type { Protector, ProtectorExecuteData } from "~/builders";

export interface HandleProtectorsOptions<TProtectors extends Protector[]> {
    protectors?: TProtectors;
    data: ProtectorExecuteData<TProtectors[number]["options"]>;
}

/**
 * Handles execution of protector middleware for builders.
 * Executes each protector in sequence and stops if any protector blocks execution.
 *
 * @template TProtectors - Array of protector types
 * @param {HandleProtectorsOptions<TProtectors>} options - Object containing protectors and data.
 * @param {TProtectors} options.protectors - Array of protectors to execute.
 * @param {ProtectorExecuteData} options.data - Data to pass to protectors.
 *
 * @returns {Promise<boolean>} True if all protectors allow execution, false otherwise.
 *
 * @internal
 */
export async function handleProtectors<TProtectors extends Protector[]>({
    protectors,
    data,
}: HandleProtectorsOptions<TProtectors>): Promise<boolean> {
    if (!protectors || protectors.length <= 0) return true;

    for (const protector of protectors) {
        if (typeof protector.execute !== "function") continue;

        // FIXME: Improve types, "never" should not be used here
        const result = await protector.execute(data as never, () => PROTECTOR_NEXT_SYMBOL);

        if (result === UNHANDLED_SYMBOL) continue;
        if (result !== PROTECTOR_NEXT_SYMBOL) return false;
    }

    return true;
}
