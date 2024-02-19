import { CreateImageDTO } from '../../application/dto/create-image.dto';
import { UploadImageDTO } from '../../application/dto/upload-image.dto';
import { ImageEntity } from '../entities/image.entity';

export abstract class ImageRepository {
  abstract upload(data: UploadImageDTO): Promise<{ key: string; url: string }>;
  abstract createOne(data: CreateImageDTO): Promise<boolean>;
  abstract getOne(id: number): Promise<ImageEntity>;
  abstract deleteOne(id: number): Promise<boolean>;
}
