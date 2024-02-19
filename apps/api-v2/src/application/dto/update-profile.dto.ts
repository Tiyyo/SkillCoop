import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { CreateProfileDTO } from './create-profile.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  profile_id: number;
}
