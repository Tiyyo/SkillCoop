import { IsNumber, IsPositive } from "class-validator";

export class UserIdParamsDto {

  @IsNumber()
  @IsPositive()
  userId: string
}