import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

export class UpdateUserOnConversationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  conversation_id: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  user_id: string;
  @IsOptional()
  @IsDateString()
  last_seen?: string;
  @IsOptional()
  @IsNumber()
  @IsEnum([0, 1])
  is_admin?: 0 | 1;
}