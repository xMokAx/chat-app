import { Crop } from "react-image-crop";

// draw on canvas
export const cropToCanvas = (
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  crop: Required<Crop>
) => {
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");

  ctx!!.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    256,
    256
  );
};

// As Base64 string
// const base64Image = canvas.toDataURL('image/jpeg');

// as a blob
export const canvasToImage = (
  canvas: HTMLCanvasElement
): Promise<Blob | null> =>
  new Promise(resolve => {
    canvas.toBlob(
      blob => {
        resolve(blob);
      },
      "image/jpeg",
      1
    );
  });
