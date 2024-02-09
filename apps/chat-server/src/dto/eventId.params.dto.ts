import { Type } from "class-transformer";
import { IsNumber, IsPositive } from "class-validator";

export class EventIdParamsDto {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  eventId: number
}