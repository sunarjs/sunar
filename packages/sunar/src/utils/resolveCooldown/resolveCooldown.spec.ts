import { CooldownScope, resolveCooldown } from "~/utils";

describe("resolveCooldown()", () => {
    it("should resolve a simple number cooldown", () => {
        const cooldown = 5000;
        const resolved = resolveCooldown(cooldown);

        expect(resolved.time).toBe(5000);
        expect(resolved.limit).toBe(1);
        expect(resolved.scope).toBe(CooldownScope.User);
        expect(resolved.exclude).toEqual([]);
    });

    it("should resolve a global cooldown configuration", () => {
        const cooldown = {
            time: 10000,
            scope: CooldownScope.Global,
        };
        const resolved = resolveCooldown(cooldown);

        expect(resolved.time).toBe(10000);
        expect(resolved.limit).toBe(1);
        expect(resolved.scope).toBe(CooldownScope.Global);
        expect(resolved.exclude).toEqual([]);
    });

    it("should resolve a scoped cooldown configuration", () => {
        const cooldown = {
            time: 20000,
            limit: 3,
            scope: CooldownScope.Channel,
            exclude: ["123456789"],
        };
        const resolved = resolveCooldown(cooldown);

        expect(resolved.time).toBe(20000);
        expect(resolved.limit).toBe(3);
        expect(resolved.scope).toBe(CooldownScope.Channel);
        expect(resolved.exclude).toEqual(["123456789"]);
    });

    it("should resolve a scoped cooldown configuration with default scope", () => {
        const cooldown = {
            time: 30000,
            limit: 2,
            exclude: ["987654321"],
        };
        const resolved = resolveCooldown(cooldown);

        expect(resolved.time).toBe(30000);
        expect(resolved.limit).toBe(2);
        expect(resolved.scope).toBe(CooldownScope.User);
        expect(resolved.exclude).toEqual(["987654321"]);
    });
});
