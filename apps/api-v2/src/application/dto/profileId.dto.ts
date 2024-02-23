import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileIdDTO {
  @IsString()
  @IsNotEmpty()
  profileId: string;
}
