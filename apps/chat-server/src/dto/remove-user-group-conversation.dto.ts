import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class RemoveUserGroupConversationDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  conversation_id: number;
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  participant_id: number;
}