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


// Add Block Scope Area
{
    // For get string hostname wasm
    const sourceDevice = await Bun.file('device_info.wasm').arrayBuffer();
    const { instance } = await WebAssembly.instantiate(sourceDevice, { env: { print: (x) => console.log(x) } });
    const { get_hostname, memory } = instance.exports;

    // Assume the hostname is null-terminated in memory.
    const getStringFromMemory = (ptr) => {
        const mem = new Uint8Array(memory.buffer);
        let str = "";
        let byte = 0;
        while ((byte = mem[ptr++]) !== 0) {
            str += String.fromCharCode(byte);
        }
        return str;
    };

    const hostnamePointer = get_hostname(); // Get the pointer to the hostname string
    const dataStr = getStringFromMemory(hostnamePointer); // Convert the pointer to a string
    console.log("Host name is", dataStr);
}


{
    const sourceDoubleString = await Bun.file('double_string.wasm').arrayBuffer();
    const { instance } = await WebAssembly.instantiate(sourceDoubleString, { env: { print: (x) => console.log(x) } });
    const { doubleString, memory} = instance.exports;

    const inputString = "Hello! ppp.";

    const memoryView = new Uint8Array(memory.buffer);
    const { written } = new TextEncoder().encodeInto(inputString, memoryView);

    console.log(`written: ${written}, input.length: ${inputString.length}`);

    const outputLength = doubleString(0, written, memoryView.byteLength);

    const outputView = new Uint8Array(memory.buffer, 0, outputLength);
    console.log(outputView);
    const output = new TextDecoder().decode(outputView);
    console.log(output);
}

