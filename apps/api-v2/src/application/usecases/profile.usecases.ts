import { Injectable } from '@nestjs/common';
import { ProfileAdapter } from 'src/infrastructure/kysely/adapters/profile.adapter';
import { CreateProfileDTO } from '../dto/create-profile.dto';
import { UpdateProfileDTO } from '../dto/update-profile.dto';
import { SearchProfileParams } from '../dto/search-profile.dto';

@Injectable()
export class ProfileUsecases {
  constructor(private profileAdapter: ProfileAdapter) { }
  async createOne(data: CreateProfileDTO) {
    const createProfileId = this.profileAdapter.createOne(data);
    return true;
  }
  async getOne(id: number) {
    return this.profileAdapter.getOne(id);
  }

  async search(searchParams: SearchProfileParams) {
    return this.profileAdapter.search(searchParams);
  }

  async updateProfileImage() { }

  async updateOne(data: UpdateProfileDTO) {
    const isProfileUpdated = this.profileAdapter.updateOne(data);
    // TODO: sync change with chat database
    return isProfileUpdated;
  }
}
