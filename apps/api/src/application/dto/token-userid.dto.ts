import { IsNotEmpty, IsString } from 'class-validator';

export class TokenUserIdDTO {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
