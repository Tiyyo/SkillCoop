import { Injectable } from '@nestjs/common';
import { ImageService } from 'src/domain/services/image/image.service';
import { CreateSocialUserService } from 'src/domain/services/user/create-social-user.service';
import { VerifiedUserAccountService } from 'src/domain/services/user/verified-account.service';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';

@Injectable()
export class SocialAuthUserStrategyService {
  constructor(
    private readonly createImageService: ImageService,
    private readonly verifiedEmailService: VerifiedUserAccountService,
    private readonly createSocialUserSerice: CreateSocialUserService,
    private readonly profileAdapter: ProfileAdapter,
  ) {}
  async createProfile(
    picture: string | null,
    given_name: string,
    family_name: string,
    userId: string,
  ) {
    const username = `${given_name} ${family_name[0]}`;
    await this.createImageService.save(picture);
    await this.profileAdapter.createOne({
      username,
      avatar_url: picture,
      first_name: given_name,
      last_name: family_name,
      profile_id: userId,
    });
  }
  async createUser({
    email,
    given_name,
    family_name,
    picture,
  }: {
    email: string;
    given_name: string;
    family_name: string;
    picture: string;
  }) {
    const user = await this.createSocialUserSerice.create(email);
    await this.verifiedEmailService.makeVerified(user.id);
    await this.createImageService.save(picture);
    const username = `${given_name} ${family_name[0]}`;
    await this.profileAdapter.createOne({
      username,
      avatar_url: picture,
      first_name: given_name,
      last_name: family_name,
      profile_id: user.id,
    });
    return user;
  }
}
