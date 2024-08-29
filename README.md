# Build WASM
`
zig build-exe src/add.zig -target wasm32-freestanding -fno-entry --export=add -O ReleaseFast
`
