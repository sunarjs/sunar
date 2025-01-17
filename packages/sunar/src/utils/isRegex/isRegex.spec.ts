import { isRegex } from "./isRegex";

describe("isRegex()", () => {
    it("should return true for a valid RegExp", () => {
        // biome-ignore lint/performance/useTopLevelRegex: testing purposes
        const regex = /[a-z]+/;
        expect(isRegex(regex)).toBe(true);
    });

    it("should return false for a string", () => {
        const notRegex = "not a regex";
        expect(isRegex(notRegex)).toBe(false);
    });

    it("should return false for a number", () => {
        const notRegex = 42;
        expect(isRegex(notRegex)).toBe(false);
    });

    it("should return false for null", () => {
        // biome-ignore lint/suspicious/noEvolvingTypes: testing purposes
        const notRegex = null;
        expect(isRegex(notRegex)).toBe(false);
    });

    it("should return false for undefined", () => {
        const notRegex = undefined;
        expect(isRegex(notRegex)).toBe(false);
    });

    it("should return false for an object", () => {
        const notRegex = { pattern: "[a-z]+" };
        expect(isRegex(notRegex)).toBe(false);
    });
});
