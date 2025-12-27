# WebAssembly Image Processor

A high-performance web application that demonstrates the power of **Rust** and **WebAssembly (Wasm)** by comparing image processing speeds against pure **JavaScript**.

This project implements a grayscale filter algorithm in both Rust (compiled to Wasm) and JavaScript, running them side-by-side to benchmark performance.

## Key Highlights

* **Performance**: The Rust + WebAssembly implementation has demonstrated speeds **almost 2x faster** than the equivalent pure JavaScript implementation for image manipulation tasks.
* **Real-time Benchmarking**: Upload your own images to see live performance comparisons in milliseconds.
* **Modern Stack**: Built using Rust, `wasm-bindgen`, and ES Modules.

## Tech Stack

* **Core Logic**: Rust (compiled to WebAssembly via `wasm-pack`)
* **Frontend**: HTML5, JavaScript (ES6+), Bootstrap 5
* **Tooling**: `wasm-bindgen` for high-level interactions between JS and Rust

## Project Structure

* `image-processing-wasm/`: Contains the Rust source code and Cargo configuration.
    * `src/lib.rs`: The Rust implementation of the grayscale algorithm.
* `web/`: The frontend web application.
    * `index.html`: The UI layout.
    * `main.js`: Handles image loading, canvas manipulation, and benchmarking logic.
    * `pkg/`: (Generated) Contains the compiled Wasm binary and JS glue code.

## Prerequisites

Before you begin, ensure you have the following installed:

1.  **Rust & Cargo**: [Install Rust](https://www.rust-lang.org/tools/install)
2.  **wasm-pack**: [Install wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
3.  **Node.js & npm**: Required to run the local development server via `npx`.

## Build & Run Instructions

### 1. Build the WebAssembly Module

Navigate to the Rust project directory and build the package targeting the web. We will output the bindings directly into the web folder.

```bash
cd image-processing-wasm
wasm-pack build --target web --out-dir ../web/pkg
```
### 2. Run the Application
```bash
cd ../web
npx serve .
```
![Application Screenshot](./ss.png)
