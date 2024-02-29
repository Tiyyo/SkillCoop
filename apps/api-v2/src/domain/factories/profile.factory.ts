import { CreateProfileDTO } from '../../application/dto/create-profile.dto';

export class ProfileFacotry {
  constructor(private createProfileDto: CreateProfileDTO) {}
  public createProfile() {
    const newProfile = this.createProfileDto;
    return newProfile;
  }
}
