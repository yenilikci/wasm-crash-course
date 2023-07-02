class WasmLoader {
    constructor() { }

    async wasm(path) {
        console.log(`Fetching ${path}`);

        if (!WebAssembly.instantiateStreaming) {
            return this.wasmFallback(path);
        }

        const { instance } = await WebAssembly.instantiateStreaming(fetch(path));

        return instance?.exports;
    }

    async wasmFallback(path) {
        console.log(`Using Fallback ${path}`);

        const repsonse = await fetch(path);
        const bytes = await repsonse?.arrayBuffer();
        const { instance } = await WebAssembly.instantiate(bytes);

        return instance?.exports;
    }
}