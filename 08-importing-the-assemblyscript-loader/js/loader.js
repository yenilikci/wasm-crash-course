class WasmLoader {
    constructor() {
        this._imports = {
            "env": {
                abort() {
                    throw new Error('Abort called from wasm file')
                }
            },
            "index": {
                log(n) {
                    console.log(n);
                }
            }
        }
    }

    async wasm(path, imports = this._imports) {
        console.log(`Fetching ${path}`);

        if (!loader.instantiateStreaming) {
            return this.wasmFallback(path, imports);
        }

        const { instance } = await loader.instantiateStreaming(fetch(path), imports);

        return instance?.exports;
    }

    async wasmFallback(path, imports) {
        console.log(`Using Fallback ${path}`);

        const repsonse = await fetch(path);
        const bytes = await repsonse?.arrayBuffer();
        const { instance } = await loader.instantiate(bytes, imports);

        return instance?.exports;
    }
} 