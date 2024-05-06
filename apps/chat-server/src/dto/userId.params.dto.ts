import { IsNotEmpty, IsString } from "class-validator";

export class UserIdParamsDto {

  @IsString()
  @IsNotEmpty()
  userId: string
}