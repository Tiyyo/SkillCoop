import { Inject, Injectable } from '@nestjs/common';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { CreateProfileDTO } from '../../dto/create-profile.dto';
import { UpdateProfileDTO } from '../../dto/update-profile.dto';
import {
  SearchProfileDTO,
  SearchProfileParams,
} from '../../dto/search-profile.dto';
import { BuildProfileService } from 'src/domain/services/profile/find-profile.service';
import { EmitEventInterface } from 'src/application/services/event.service';

@Injectable()
export class ProfileUsecases {
  constructor(
    private profileAdapter: ProfileAdapter,
    private readonly buildProfileService: BuildProfileService,
    @Inject('EmitEventService') private eventEmitter: EmitEventInterface,
  ) { }
  async createOne(data: CreateProfileDTO) {
    const createProfileId = this.profileAdapter.createOne(data);
    return createProfileId;
  }
  async getOne(profileId: string) {
    return this.buildProfileService.build(profileId);
  }

  async search(searchParams: SearchProfileDTO) {
    return this.profileAdapter.search(searchParams);
  }
  async updateOne(data: UpdateProfileDTO) {
    const condition = { profile_id: data.profile_id };
    const updateData = {
      username: data.username,
      avatar_url: data.avatar_url,
      first_name: data.first_name,
      last_name: data.last_name,
      profile_id: data.profile_id,
      location: data.location,
      date_of_birth: data.date_of_birth,
    };
    const isProfileUpdated = this.profileAdapter.updateOne(
      condition,
      updateData,
    );
    this.eventEmitter.userUpdated({
      profileId: data.profile_id,
      username: data.username,
      avatar: data.avatar_url,
    });
    return isProfileUpdated;
  }
}
