/* globals describe, expect, it */

import { has_property, is_number, is_string } from "../src/utilities.js";

describe("test utility method has_property", () => {

    const mockedObject = { propA: "valA", propB: "valB" };

    it("has_property returns true if object has property", () => {
        const result = has_property(mockedObject, "propA");
        expect(result).toBe(true);
    });

    it("has_property returns false if property not exists", () => {
        const result = has_property(mockedObject, "noProp");
        expect(result).toBe(false);
    });

});

describe("test utility method is_number", () => {

    it("is_number returns true if checked against a decimal number", () => {
        expect(is_number(5)).toBe(true);
    });

    it("is_number returns true if checked against a binary number", () => {
        expect(is_number(0b001110)).toBe(true);
    });

    it("is_number returns true if checked against a hexadecimal number", () => {
        expect(is_number(0x897d5)).toBe(true);
    });

    it("is_number returns false if checked against something different than a number", () => {
        expect(is_number(null)).toBe(false);
        expect(is_number(undefined)).toBe(false);
        expect(is_number("test")).toBe(false);
    });

    it("is_number returns false even if value can be parsed like \"5\"", () => {
        expect(is_number("5")).toBe(false);
    });

});

describe("test utility method is_string", () => {

    it("is_String returns true if it is any string", () => {
        expect(is_string("")).toBe(true);
        expect(is_string("5")).toBe(true);
        expect(is_string("t")).toBe(true);
        expect(is_string("not a very long string test")).toBe(true);
        expect(is_string("{ propA: \"valA\", propB: \"valB\" }")).toBe(true);
    });

    it("is_String returns false if checked against someting other than a string", () => {
        expect(is_string(undefined)).toBe(false);
        expect(is_string(null)).toBe(false);
        expect(is_string(5)).toBe(false);
        expect(is_string({ propA: "valA", propB: "valB" })).toBe(false);
        expect(is_string(["valA", "valB"])).toBe(false);
    });

});
