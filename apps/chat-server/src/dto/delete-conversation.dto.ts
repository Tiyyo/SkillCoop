import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class DeleteConversationParamsDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  conversation_id: number;
  @Type(() => Number)
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  user_id: number;
}