import { Button, SlashParent } from "~/builders";
import { Builders, isSlashParentBuilder } from "~/utils";

describe("isSlashParentBuilder()", () => {
    it("should return true for a valid SlashParent builder", () => {
        const groupBuilder = new SlashParent({ name: "ex", description: "ample" });
        expect(isSlashParentBuilder(groupBuilder)).toBe(true);
    });

    it("should return false for a builder of different type", () => {
        const buttonBuilder = new Button({ id: "testButton" });
        expect(isSlashParentBuilder(buttonBuilder)).toBe(false);
    });

    it("should return false for an object that is not a builder", () => {
        const notABuilder = {
            title: "Not a builder",
        };
        expect(isSlashParentBuilder(notABuilder)).toBe(false);
    });

    it("should return false for null", () => {
        expect(isSlashParentBuilder(null)).toBe(false);
    });

    it("should return false for undefined", () => {
        expect(isSlashParentBuilder(undefined)).toBe(false);
    });

    it("should return false for a builder without data property", () => {
        const invalidBuilder = {
            type: Builders.Group,
        };
        expect(isSlashParentBuilder(invalidBuilder)).toBe(false);
    });
});
