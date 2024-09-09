const sourceDoubleString = await Bun.file('zig-out/bin/double_string.wasm').arrayBuffer();
const { instance } = await WebAssembly.instantiate(sourceDoubleString, { env: { print: (x) => console.log(x) } });
const { doubleString, memory} = instance.exports;

/**
 * This func double string
 * @param {string} input
 * @returns {string} input double string
 *
*/
export function doubleStringWasm(input)  {
    const memoryView = new Uint8Array(memory.buffer);
    const { written } = new TextEncoder().encodeInto(input, memoryView);
    const outputLength = doubleString(0, written, memoryView.byteLength);
    const outputView = new Uint8Array(memory.buffer, 0, outputLength);
    const output = new TextDecoder().decode(outputView);
    return output;
}
