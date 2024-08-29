import { expect, test } from "bun:test";
import { add } from "..";

test("Test: Add 5 + 5", () => {
  expect(add(5, 5)).toBe(10);
});
