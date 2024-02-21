import { Injectable } from '@nestjs/common';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { CreateProfileDTO } from '../dto/create-profile.dto';
import { UpdateProfileDTO } from '../dto/update-profile.dto';
import { SearchProfileParams } from '../dto/search-profile.dto';
import { BuildProfileService } from 'src/domain/services/profile/find-profile.service';

@Injectable()
export class ProfileUsecases {
  constructor(
    private profileAdapter: ProfileAdapter,
    private readonly buildProfileService: BuildProfileService,
  ) { }
  async createOne(data: CreateProfileDTO) {
    const createProfileId = this.profileAdapter.createOne(data);
    return createProfileId;
  }
  async getOne(profileId: string) {
    return this.buildProfileService.build(profileId);
  }

  async search(searchParams: SearchProfileParams) {
    return this.profileAdapter.search(searchParams);
  }

  async updateProfileImage() { }

  async updateOne(data: UpdateProfileDTO) {
    const condition = { profile_id: data.profile_id };
    const updateData = {
      username: data.username,
      avatar_url: data.avatar_url,
      first_name: data.first_name,
      last_name: data.last_name,
      profile_id: data.profile_id,
    };
    const isProfileUpdated = this.profileAdapter.updateOne(
      condition,
      updateData,
    );
    // TODO: sync change with chat database
    return isProfileUpdated;
  }
}
