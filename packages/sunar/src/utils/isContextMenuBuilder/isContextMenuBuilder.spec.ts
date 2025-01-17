import { ApplicationCommandType } from "discord.js";
import { Builders } from "..";
import { Button, ContextMenu } from "../../builders";
import { isContextMenuBuilder } from "./isContextMenuBuilder";

describe("isContextMenuBuilder()", () => {
    it("should return true for a valid ContextMenu builder", () => {
        const contextMenuBuilder = new ContextMenu({ name: "testContextMenu", type: 2 });
        expect(isContextMenuBuilder(contextMenuBuilder)).toBe(true);
    });

    it("should return false for a builder of different type", () => {
        const buttonBuilder = new Button({ id: "testButton" });
        expect(isContextMenuBuilder(buttonBuilder)).toBe(false);
    });

    it("should return false for an object that is not a builder", () => {
        const notABuilder = {
            title: "Not a builder",
        };
        expect(isContextMenuBuilder(notABuilder)).toBe(false);
    });

    it("should return false for null", () => {
        expect(isContextMenuBuilder(null)).toBe(false);
    });

    it("should return false for undefined", () => {
        expect(isContextMenuBuilder(undefined)).toBe(false);
    });

    it("should return false for a builder without data property", () => {
        const invalidBuilder = {
            type: Builders.ContextMenu,
        };
        expect(isContextMenuBuilder(invalidBuilder)).toBe(false);
    });

    it("should return false for a builder with data property but without name", () => {
        // @ts-expect-error
        const invalidBuilder = new ContextMenu({ type: ApplicationCommandType.User });
        expect(isContextMenuBuilder(invalidBuilder)).toBe(false);
    });

    it("should return false for a builder with data property but without type", () => {
        // @ts-expect-error
        const invalidBuilder = new ContextMenu({ name: "invalidBuilder" });
        expect(isContextMenuBuilder(invalidBuilder)).toBe(false);
    });

    it("should return false for a builder with invalid data property", () => {
        // @ts-expect-error
        const invalidBuilder = new ContextMenu("invalidData");
        expect(isContextMenuBuilder(invalidBuilder)).toBe(false);
    });
});
