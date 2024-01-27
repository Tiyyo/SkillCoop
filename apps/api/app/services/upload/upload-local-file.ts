import fs from 'fs';
import path from 'path';
import url from 'url';
import { uploadImageToBucket } from './s3.js';
import NotFoundError from '../../helpers/errors/not-found.error.js';
import { image as Image } from '../../models/index.js';
import logger from '../../helpers/logger.js';
import DatabaseError from '../../helpers/errors/database.error.js';

const isProduction = process.env.NODE_ENV === 'production';
const pathToPublicFolder = isProduction
  ? '../../../../public/'
  : '../../../public/';
const dirname = path.dirname(url.fileURLToPath(import.meta.url));

export class LocalImage {
  filename: string;

  constructor(filename: string) {
    this.filename = filename;
  }
  private async getLocalImage() {
    const minmeType = this.filename.split('.').pop();

    const filePath = path.join(dirname, pathToPublicFolder + this.filename);
    try {
      const bufferImage = await fs.promises.readFile(filePath);
      return {
        buffer: bufferImage,
        originalname: this.filename,
        mimetype: `image/${minmeType}`,
      };
    } catch (error) {
      throw new NotFoundError(
        `File could not be found localy, 
         check that filename and its extension are correct` + dirname,
      );
    }
  }
  get image() {
    return this.getLocalImage();
  }
}
export async function saveImageIntoDb({
  key,
  link,
}: {
  key: string;
  link: string;
}) {
  await Image.createOne({
    url: link,
    key,
  });
}

/**
 * 
 * @param fileName 
   @returns key to delete image from bucket and the link of cloudfront image
 */
export async function uploadLocalFile(fileName: string) {
  const localImage = new LocalImage(fileName);
  try {
    const { key, link } = await uploadImageToBucket(localImage, {
      height: 100,
      width: 100,
    });
    try {
      saveImageIntoDb({ key, link });
    } catch (error) {
      if (error instanceof DatabaseError) {
        logger.error('Error while saving image into db' + error.message);
      }
    }
    return { key, link };
  } catch (error) {
    if (error instanceof Error) {
      logger.error(
        'Error while uploading local image to bucket' + error.message,
      );
    }
  }
}
