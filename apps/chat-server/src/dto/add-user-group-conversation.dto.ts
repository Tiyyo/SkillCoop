import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class AddUserGroupConversationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  conversation_id: number;
  @ArrayNotEmpty()
  @IsString({ each: true })
  @IsArray()
  participants_ids: string[];
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsEnum([0, 1])
  is_admin: 0 | 1;
}