import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateOneToOneConversationDto {
  @IsNotEmpty()
  @IsString()
  user_id_one: string;
  @IsNotEmpty()
  @IsString()
  user_username_one: string;
  @IsString()
  @IsOptional()
  user_avatar_one: string | null;
  @IsNotEmpty()
  @IsString()
  user_id_two: string;
  @IsNotEmpty()
  @IsString()
  user_username_two: string;
  @IsString()
  @IsOptional()
  user_avatar_two: string | null;
}
