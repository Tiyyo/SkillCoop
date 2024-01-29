import { ArrayNotEmpty, IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPositive } from "class-validator";

export class AddUserGroupConversationDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  conversation_id: number;
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  @IsArray()
  participants_ids: number[];
  @IsNotEmpty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @IsEnum([0, 1])
  is_admin: 0 | 1;
}