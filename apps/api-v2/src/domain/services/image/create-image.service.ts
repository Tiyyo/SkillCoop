import { ImageAdapter } from 'src/infrastructure/kysely/adapters/image.adapter';

export class CreateImageService {
  constructor(private readonly imageAdapter: ImageAdapter) { }
  async createImage(url: string, key?: string, size?: number) {
    await this.imageAdapter.createOne({ url, key, size });
  }
}
