import { expect, test } from "bun:test";
import { doubleStringWasm } from "../src-js/double_string.js"

test("Test: Get double string", () => {
    const input_str = "ppp";
    const expected_output_str = "pppppp";
    expect(doubleStringWasm(input_str)).toBe(expected_output_str);
});
