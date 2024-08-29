const fs = require('fs');
const source = fs.readFileSync('./add.wasm');

WebAssembly.instantiate(source, {env: { print: (x) => console.log(x) } })
.then((result) => {
    const add = result.instance.exports.add;
        let a = add(1, 2);
        console.log(a);
});
