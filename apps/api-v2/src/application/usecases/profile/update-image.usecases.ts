import { Inject, Injectable } from '@nestjs/common';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { ApplicationException } from 'src/application/exceptions/application.exception';
import { UploadImageService } from 'src/application/services/upload.service';
import { ImageService } from 'src/domain/services/image/image.service';

@Injectable()
export class UpdateImageProfileUsecases {
  constructor(
    private profileAdapter: ProfileAdapter,
    @Inject('UploadService')
    private readonly uploadImageService: UploadImageService,
    private readonly imageService: ImageService,
  ) { }

  async updateProfileImage(file: any, profileId: string) {
    const WIDTH_AVATAR = 100;

    if (!file) {
      throw new ApplicationException('No file provided', 'ProfileUsecases');
    }

    const profile = await this.profileAdapter.findOne({
      profile_id: profileId,
    });
    if (!profile) {
      throw new ApplicationException('Profile not found', 'ProfileUsecases');
    }

    const { username, avatar_url } = profile;
    file.originalname = `avatar_${username}`;

    const { key, link } = await this.uploadImageService.uploadImage(file, {
      height: WIDTH_AVATAR,
      width: WIDTH_AVATAR,
    });
    console.log('key', key);
    console.log('link', link);
    console.log(
      'If key and link are not null, then the image was uploaded successfully',
    );
    await this.imageService.save(link, key, WIDTH_AVATAR);
    await this.profileAdapter.updateOne(
      { profile_id: profileId },
      { avatar_url: link },
    );
    if (avatar_url) {
      await this.imageService.delete(avatar_url);
    }
    // Sync change with chat database
    return { link };
  }
}
