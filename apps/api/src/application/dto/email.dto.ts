import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailDTO {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
