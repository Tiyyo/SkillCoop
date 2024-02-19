import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export interface CreateProfileInterface {
  username: string;
  first_name: string | null;
  last_name: string | null;
  date_of_birth: string | null;
  avatar_url: string | null;
  location: string | null;
}

export class CreateProfileDTO {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
  @IsNotEmpty()
  @IsString()
  username: string;
  @IsOptional()
  @IsString()
  first_name: string | null;
  @IsOptional()
  @IsString()
  last_name: string | null;
  @IsOptional()
  @IsDateString()
  date_of_birth: string | null;
  @IsOptional()
  @IsString()
  avatar_url: string | null;
  @IsOptional()
  @IsString()
  location: string | null;
}
