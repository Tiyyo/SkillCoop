import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmailDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  user_id: string;
}
