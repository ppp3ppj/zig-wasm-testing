const sourceDevice = await Bun.file('zig-out/bin/device_info.wasm').arrayBuffer();
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

export const deviceInfoWasm = dataStr;
