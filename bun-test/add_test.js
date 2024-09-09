import { expect, test } from "bun:test";
import { addWasm } from "../src-js/add.js"

test("Test: Add 5 + 5", () => {
  expect(addWasm(5, 5)).toBe(10);
});
