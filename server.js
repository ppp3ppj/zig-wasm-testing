const fs = require('fs');

const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const url = new URL(req.url);

        console.log(`Request received for: ${url.pathname}`); // Debug logging

        if (url.pathname === "/wasm_exec.js") {
            // Serve the wasm_exec.js file
            const file = Bun.file("wasm-go-life/wasm_exec.js");
            if (file) {
                return new Response(file, {
                    headers: {
                        'Content-Type': 'application/javascript'
                    }
                });
            }
        } else if (url.pathname === "/go-life.wasm") {
            // Serve the WebAssembly file
            const file = Bun.file("wasm-go-life/go-life.wasm");
            if (file) {
                console.log("Serving go-life.wasm with correct MIME type"); // Debug logging
                return new Response(file, {
                    headers: {
                        'Content-Type': 'application/wasm'
                    }
                });
            } else {
                console.log("File not found: go-life.wasm"); // Debug logging
            }
        } else if (url.pathname === "/main" || url.pathname === "/main.html") {
            // Serve the HTML file by default
            const html = fs.readFileSync("wasm-go-life/main.html", "utf8");
            return new Response(html, {
                headers: {
                    'Content-Type': 'text/html'
                }
            });
        }
        else if (url.pathname === "/" || url.pathname === "/index.html") {
            // Serve the HTML file by default
            const html = fs.readFileSync("wasm-go-life/index.html", "utf8");
            return new Response(html, {
                headers: {
                    'Content-Type': 'text/html'
                }
            });
        }
        else {
            // Handle 404 Not Found
            console.log("404 Not Found: ", url.pathname); // Debug logging
            return new Response("404 Not Found", { status: 404 });
        }

        // Default to 404 if the file is not found
        return new Response("404 Not Found", { status: 404 });
    },
});

console.log(`Listening on http://localhost:${server.port} ...`);
