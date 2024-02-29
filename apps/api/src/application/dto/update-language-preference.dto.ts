import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLanguageUserPreferencesDTO {
  @IsString()
  @IsNotEmpty()
  user_id: string;
  @IsString()
  @IsNotEmpty()
  name: string;
}
