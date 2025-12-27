import init, { grayscale } from "./pkg/image_processing_wasm.js";

await init();

const input = document.getElementById("file");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const processBtn = document.getElementById("processBtn");
const resultsDiv = document.getElementById("results"); // Add this to your HTML

let imageLoaded = false;

function grayscaleJS(data) {
    for (let i = 0; i < data.length; i += 4) {
        // Standard luminance formula: 0.299R + 0.587G + 0.114B
        const avg = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        data[i] = avg;     // Red
        data[i + 1] = avg; // Green
        data[i + 2] = avg; // Blue
        // data[i+3] is Alpha, we leave it alone
    }
}

input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);
        imageLoaded = true;
        processBtn.disabled = false;
        resultsDiv.innerText = "Ready to benchmark...";
    };
});

processBtn.addEventListener("click", () => {
    if (!imageLoaded) return;

    const originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const jsData = new Uint8ClampedArray(originalImageData.data.buffer.slice(0));
    const wasmData = new Uint8ClampedArray(originalImageData.data.buffer.slice(0));

    // Grayscale using JS
    const jsStart = performance.now();
    grayscaleJS(jsData);
    const jsEnd = performance.now();
    const jsTime = jsEnd - jsStart;

    // Grayscale using webassembly
    const wasmStart = performance.now();
    grayscale(wasmData);
    const wasmEnd = performance.now();
    const wasmTime = wasmEnd - wasmStart;

    const speedup = (jsTime / wasmTime).toFixed(2);

    resultsDiv.innerHTML = `
        <strong>JavaScript Time:</strong> ${jsTime.toFixed(2)}ms<br>
        <strong>Wasm (Rust) Time:</strong> ${wasmTime.toFixed(2)}ms<br>
        <hr>
        <em>Wasm is <strong>${speedup}x</strong> faster than JS</em>
    `;

    const resultImage = new ImageData(wasmData, canvas.width, canvas.height);
    ctx.putImageData(resultImage, 0, 0);
});