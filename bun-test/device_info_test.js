import { expect, test } from "bun:test";
import { deviceInfoWasm } from "../src-js/device_info.js"

test("Test: Get Device Info", () => {
  expect(deviceInfoWasm).toBe("ppp");
});
