import { Button, Modal } from "~/builders";
import { Builders, isModalBuilder } from "~/utils";

describe("isModalBuilder()", () => {
    it("should return true for a valid Modal builder", () => {
        const modalBuilder = new Modal({ id: "testModal" });
        expect(isModalBuilder(modalBuilder)).toBe(true);
    });

    it("should return false for a button builder", () => {
        const buttonBuilder = new Button({ id: "testButton" });
        expect(isModalBuilder(buttonBuilder)).toBe(false);
    });

    it("should return false for an object that is not a builder", () => {
        const notABuilder = {
            title: "Not a builder",
        };
        expect(isModalBuilder(notABuilder)).toBe(false);
    });

    it("should return false for null", () => {
        expect(isModalBuilder(null)).toBe(false);
    });

    it("should return false for undefined", () => {
        expect(isModalBuilder(undefined)).toBe(false);
    });

    it("should return false for a builder of different type", () => {
        class DifferentBuilder {
            constructor(public type: Builders) {}
        }
        const differentBuilder = new DifferentBuilder(Builders.Slash);
        expect(isModalBuilder(differentBuilder)).toBe(false);
    });
});
