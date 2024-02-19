import { CreateProfileDTO } from '../../application/dto/create-profile.dto';
import { SearchProfileParams } from '../../application/dto/search-profile.dto';
import { UpdateProfileDTO } from '../../application/dto/update-profile.dto';
import { ProfileEntity } from '../entities/profile.entity';

export abstract class ProfileRepository {
  abstract createOne(data: CreateProfileDTO): Promise<boolean>;
  abstract getOne(id: number): Promise<ProfileEntity>;
  abstract search(
    searchParams: SearchProfileParams,
  ): Promise<Array<ProfileEntity>>;
  abstract updateProfileImage(id: string, image: string): Promise<boolean>;
  abstract updateOne(data: UpdateProfileDTO): Promise<boolean>;
}
