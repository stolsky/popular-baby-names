/* globals expect, test */

import { select } from "d3";

test("check if d3 method select is available", () => {
    expect(select).toBeInstanceOf(Function);
});

test("adds 3 - 2 to equal 1", () => {
    expect(3 - 2).toBe(1);
});
