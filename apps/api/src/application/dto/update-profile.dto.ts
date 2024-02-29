import { IsNotEmpty, IsString } from 'class-validator';
import { CreateProfileDTO } from './create-profile.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {
  @IsNotEmpty()
  @IsString()
  profile_id: string;
}
