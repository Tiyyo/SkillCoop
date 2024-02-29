import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateThemeUserPreferencesDTO {
  @IsString()
  @IsNotEmpty()
  user_id: string;
  @IsString()
  @IsNotEmpty()
  name: 'light' | 'dark';
}
