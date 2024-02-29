import { ImageAdapter } from 'src/infrastructure/kysely/adapters/image.adapter';
import { LocalImage } from './local-image.service';
import * as sharp from 'sharp';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { UploadImageService } from 'src/application/services/upload.service';
import { ModuleRef } from '@nestjs/core';
import { UploadAWSService } from 'src/infrastructure/s3/upload-aws.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageService {
  private uploadService: UploadImageService;

  constructor(
    private readonly imageAdapter: ImageAdapter,
    // @Inject('UploadService') private readonly uploadService: UploadImageService,
    private moduleRef: ModuleRef,
  ) {}
  async save(url: string, key?: string, size?: number) {
    console.log(this.imageAdapter);
    await this.imageAdapter.createOne({ url, key, size });
  }
  async delete(url: string) {
    const imageDB = await this.imageAdapter.findOne({ url });
    if (!imageDB) {
      throw new ApplicationException('Image not found', 'ImageService');
    }
    await this.imageAdapter.deleteOne({ id: imageDB.id });
    if (imageDB.key) {
      this.uploadService =
        this.uploadService ??
        this.moduleRef.get(UploadAWSService, { strict: false });
      await this.uploadService.deleteImage(imageDB.key);
    }
  }
  resizeImage(image: Buffer, width: number, height: number) {
    const resizedBuffer = sharp(image)
      .resize({
        height,
        width,
      })
      .toBuffer();
    return resizedBuffer;
  }
  // Make sure to return the correct prop when image is local or remote
  async handleOrigin(file: unknown) {
    if (file instanceof LocalImage) {
      const { buffer, originalname, mimetype } = await file.image;
      return { buffer, originalname, mimetype };
    }
    const { buffer, originalname, mimetype } = file as Express.Multer.File;
    return { buffer, originalname, mimetype };
  }
}
