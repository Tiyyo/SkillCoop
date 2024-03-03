import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class RemoveUserGroupConversationDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  conversation_id: number;
  @IsNotEmpty()
  @IsString()
  participant_id: string;
}