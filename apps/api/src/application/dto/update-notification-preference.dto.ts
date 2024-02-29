import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNotificationUserPreferencesDTO {
  @IsString()
  @IsNotEmpty()
  user_id: string;
  @IsString()
  @IsNotEmpty()
  type_name: string;
  @IsOptional()
  @IsBoolean()
  email: boolean;
  @IsOptional()
  @IsBoolean()
  push: boolean;
  @IsOptional()
  @IsBoolean()
  website: boolean;
}
