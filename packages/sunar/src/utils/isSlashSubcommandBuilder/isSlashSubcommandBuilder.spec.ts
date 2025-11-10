import { Button, SlashSubcommand } from "~/builders";
import { Builders, isSlashSubcommandBuilder } from "~/utils";

describe("isSlashSubcommandBuilder()", () => {
    it("should return true for a valid SlashParent builder", () => {
        const groupBuilder = new SlashSubcommand("parent", { name: "ex", description: "ample" });
        expect(isSlashSubcommandBuilder(groupBuilder)).toBe(true);
    });

    it("should return false for a builder of different type", () => {
        const buttonBuilder = new Button({ id: "testButton" });
        expect(isSlashSubcommandBuilder(buttonBuilder)).toBe(false);
    });

    it("should return false for an object that is not a builder", () => {
        const notABuilder = {
            title: "Not a builder",
        };
        expect(isSlashSubcommandBuilder(notABuilder)).toBe(false);
    });

    it("should return false for null", () => {
        expect(isSlashSubcommandBuilder(null)).toBe(false);
    });

    it("should return false for undefined", () => {
        expect(isSlashSubcommandBuilder(undefined)).toBe(false);
    });

    it("should return false for a builder without data property", () => {
        const invalidBuilder = {
            type: Builders.Group,
        };
        expect(isSlashSubcommandBuilder(invalidBuilder)).toBe(false);
    });
});
