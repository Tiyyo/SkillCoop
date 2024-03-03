import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class UpdateUserOnConversationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  conversation_id: number;
  @IsNotEmpty()
  @IsString()
  user_id: string;
  @IsOptional()
  @IsDateString()
  last_seen?: string;
  @IsOptional()
  @IsNumber()
  @IsEnum([0, 1])
  is_admin?: 0 | 1;
}