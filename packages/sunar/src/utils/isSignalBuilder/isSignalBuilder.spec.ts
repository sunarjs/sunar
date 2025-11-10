import { Signal } from "~/builders";
import { Builders, isSignalBuilder } from "~/utils";

describe("isSignalBuilder()", () => {
    it("should return true for a valid Signal builder", () => {
        const signalBuilder = new Signal("messageCreate");
        expect(isSignalBuilder(signalBuilder)).toBe(true);
    });

    it("should return false for a builder of different type", () => {
        class DifferentBuilder {
            constructor(public type: Builders) {}
        }
        const differentBuilder = new DifferentBuilder(Builders.Button);
        expect(isSignalBuilder(differentBuilder)).toBe(false);
    });

    it("should return false for an object that is not a builder", () => {
        const notABuilder = {
            title: "Not a builder",
        };
        expect(isSignalBuilder(notABuilder)).toBe(false);
    });

    it("should return false for null", () => {
        expect(isSignalBuilder(null)).toBe(false);
    });

    it("should return false for undefined", () => {
        expect(isSignalBuilder(undefined)).toBe(false);
    });

    it("should return false for a builder without required properties", () => {
        const invalidBuilder = {
            type: Builders.Signal,
        };
        expect(isSignalBuilder(invalidBuilder)).toBe(false);
    });
});
