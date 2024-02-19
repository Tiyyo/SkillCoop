import { CreateImageDTO } from 'src/application/dto/create-image.dto';
import { UploadImageDTO } from 'src/application/dto/upload-image.dto';
import { ImageRepository } from 'src/domain/repositories/image.repository';

export class ImageAdapter implements ImageRepository {
  async createOne(data: CreateImageDTO): Promise<boolean> {
    const result = data;
    console.log('ImageAdapter.createOne', result);
    return true;
  }
  async deleteOne(id: number): Promise<boolean> {
    console.log('ImageAdapter.deleteOne', id);
    return true;
  }
  async getOne(id: number) {
    console.log('ImageAdapter.getOne', id);
    return {
      key: 'key',
      url: 'https://www.google.com',
    };
  }
  async upload(buffer: UploadImageDTO): Promise<{ key: string; url: string }> {
    console.log('ImageAdapter.upload', buffer);
    return {
      key: 'image-key',
      url: 'https://www.google.com',
    };
  }
}
