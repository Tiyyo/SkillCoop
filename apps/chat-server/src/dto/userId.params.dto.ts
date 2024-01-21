import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class UserIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  userId: number
}