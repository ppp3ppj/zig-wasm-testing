build:
	GOOS=js GOARCH=wasm go build -o go-life.wasm .
	cp `go env GOROOT`/misc/wasm/wasm_exec.js .
