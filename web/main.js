import init, { grayscale } from "./pkg/image_processing_wasm.js";

await init();

const input = document.getElementById("file");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const processBtn = document.getElementById("processBtn");

let imageLoaded = false;

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
    };
});

processBtn.addEventListener("click", () => {
    if (!imageLoaded) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    grayscale(imageData.data);
    ctx.putImageData(imageData, 0, 0);
});