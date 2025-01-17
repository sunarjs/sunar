import { Button, ContextMenu } from "../../builders";
import { isButtonBuilder } from "./isButtonBuilder";

describe("isButtonBuilder()", () => {
    it("should return true for a valid Button builder", () => {
        const buttonBuilder = new Button({ id: "testButton" });
        expect(isButtonBuilder(buttonBuilder)).toBe(true);
    });

    it("should return false for a builder of different type", () => {
        const contextMenuBuilder = new ContextMenu({ name: "testContextMenu", type: 2 });
        expect(isButtonBuilder(contextMenuBuilder)).toBe(false);
    });

    it("should return false for an object that is not a builder", () => {
        const notABuilder = {
            title: "Not a builder",
        };
        expect(isButtonBuilder(notABuilder)).toBe(false);
    });

    it("should return false for null", () => {
        expect(isButtonBuilder(null)).toBe(false);
    });

    it("should return false for undefined", () => {
        expect(isButtonBuilder(undefined)).toBe(false);
    });
});
