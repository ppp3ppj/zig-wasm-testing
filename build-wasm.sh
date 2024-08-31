#!/usr/bin/env bash
zig build-exe src/double_string.zig -target wasm32-freestanding -fno-entry --export=doubleString -O ReleaseFast &&
zig build-exe src/device_info.zig  -target wasm32-freestanding -fno-entry --export=get_hostname -O ReleaseFast
