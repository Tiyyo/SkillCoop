import { CreateProfileInterface } from '../../application/dto/create-profile.dto';
import { SearchProfileParams } from '../../application/dto/search-profile.dto';
import { ProfileCoreEntity, ProfileEntity } from '../entities/profile.entity';

export abstract class ProfileRepository {
  abstract create(data: CreateProfileInterface): Promise<boolean>;
  abstract findWithNbReview(profileId: string): Promise<ProfileCoreEntity>;
  abstract search(
    searchParams: SearchProfileParams,
  ): Promise<Array<ProfileEntity>>;
}
