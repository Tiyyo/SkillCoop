import { Injectable } from '@nestjs/common';
import { BuildProfileService } from 'src/domain/services/profile/find-profile.service';

@Injectable()
export class GetMeUserUsecases {
  constructor(private readonly buildProfileService: BuildProfileService) { }
  public async getProfile(profileId: string) {
    return await this.buildProfileService.build(profileId);
  }
}
