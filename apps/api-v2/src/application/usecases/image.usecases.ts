import { Injectable } from '@nestjs/common';
import { ImageRepository } from '../../domain/repositories/image.repository';
import { UploadImageDTO } from '../dto/upload-image.dto';
import { CreateImageDTO } from '../dto/create-image.dto';

@Injectable()
export class ImageUsecases {
  constructor(private imageRepository: ImageRepository) { }

  async upload(data: UploadImageDTO) {
    // Upload image to cloud storage
    console.log('ImageUsecases.upload', data);
    const result = await this.imageRepository.upload(data);
    return result;
  }
  async save(data: CreateImageDTO) {
    const result = await this.imageRepository.createOne(data);
    return result;
  }
  async getOne(id: number) {
    return this.imageRepository.getOne(id);
  }
  async deleteOne(id: number) {
    return this.imageRepository.deleteOne(id);
  }
}
