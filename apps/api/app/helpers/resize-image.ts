import sharp from 'sharp';
// Migrated
function resizeImage(buffer: Buffer, height: number, width: number) {
  const resizedBuffer = sharp(buffer)
    .resize({
      height,
      width,
    })
    .toBuffer();
  return resizedBuffer;
}

export default resizeImage;
