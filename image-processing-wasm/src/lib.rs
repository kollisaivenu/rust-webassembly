use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn grayscale(pixels: &mut [u8]) {
    // pixels is flattened into one single array [R, G, B, A, R, G, B, A, ...]
    for i in (0..pixels.len()).step_by(4) {
        let r = pixels[i] as u32;
        let g = pixels[i + 1] as u32;
        let b = pixels[i + 2] as u32;

        let gray = ((r + g + b) / 3) as u8;

        pixels[i]     = gray;
        pixels[i + 1] = gray;
        pixels[i + 2] = gray;
        // alpha stays the same
    }
}