import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class ConversationIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  conversationId: number
}