import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileIdDTO {
  @IsString()
  @IsNotEmpty()
  profileId: string;
}

export class ProfileIdUnderscoreDTO {
  @IsString()
  @IsNotEmpty()
  profile_id: string;
}
