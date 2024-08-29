const source = await Bun.file('add.wasm').arrayBuffer();
const result = await WebAssembly.instantiate(source, { env: { print: (x) => console.log(x) } });

/**
 * This func add return the sum of a and b - wasm zig
 * @param {number} a - in zig i32
 * @param {number} b - in zig i32
 * @returns {number} sum of a and b
 *
*/
export const add = result.instance.exports.add;

console.log("data is", add(5, 5));
